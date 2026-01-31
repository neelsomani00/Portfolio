"use client";
import React from "react";
import { Home, User, Briefcase, Mail } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl flex items-center gap-8">
      <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
        <Home size={16} /> <span>Home</span>
      </Link>
      <div className="h-4 w-[1px] bg-white/10" />
      <Link href="#projects" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
        <Briefcase size={16} /> <span>Projects</span>
      </Link>
      <div className="h-4 w-[1px] bg-white/10" />
      <Link href="mailto:neelsomani00@gmail.com" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
        <Mail size={16} /> <span>Contact</span>
      </Link>
    </nav>
  );
};
