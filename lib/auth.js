"use server";

import dbConnect from "./mongodb";
import User from "@/models/user-model";
import bcrypt from "bcryptjs";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";


export async function credentialLogin({ email, password }) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      ok: true,
      message: "Login successful",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return {
          ok: false,
          message: "Invalid email or password",
        };
      }
    }

    console.error("Login Error:", error);

    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}

export async function signup({ name, email, password, role }) {
  try {
    await dbConnect();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return { success: true, user: newUser };
  } catch (error) {
    console.error("Signup Error:", error);
    return { success: false, message: error.message };
  }
}
