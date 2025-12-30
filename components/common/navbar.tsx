"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { ModeToggle } from "./dark-toggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <nav className=" shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            Quiz Mania
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 font-semibold">
            <Link href="/" className="hover:text-blue-500">
              Admin
            </Link>
            <Link href="/quiz" className="hover:text-blue-500">
              My Quiz
            </Link>
            <Link href="/contact" className="hover:text-blue-500">
              Log in
            </Link>

            {/* Dark Mode Button */}
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setOpen(!open)} className="md:hidden">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col gap-4 px-4 py-4">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>

            <ModeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
