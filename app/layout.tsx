import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar";
import { ThemeProvider } from "@/components/common/theme-provider";
import { Footer } from "@/components/common/footer";
import Container from "@/components/common/container";
import dbConnect from '../lib/mongodb';
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quiz Mania",
  description: "A NextJS Application for attempting Quiz",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const conn = await dbConnect();
  console.log(conn);
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <Container>
            <Toaster/>
            {children}
            <Footer />
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
