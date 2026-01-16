import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "@/models/user-model";
import bcrypt from "bcryptjs";
import dbConnect from "./lib/mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          await dbConnect();

          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            return null; // ✅ correct: no throw
          }

          const { password: _, _id, ...rest } = user.toObject();

          return {
            id: _id.toString(),
            ...rest,
          };
        } catch (error) {
          console.error("AUTH ERROR:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user && "id" in user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
});
