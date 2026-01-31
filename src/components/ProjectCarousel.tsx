"use client";
import React from "react";
import { motion } from "framer-motion";

const projects = [
  { id: 1, title: "AI Automation", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "SaaS Dashboard", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Web3 App", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800" },
];

export const ProjectCarousel = () => {
  return (
    <div className="flex gap-8 overflow-x-auto pb-10 px-4 no-scrollbar snap-x">
      {projects.map((p) => (
        <motion.div
          key={p.id}
          whileHover={{ y: -10, rotateY: 5 }}
          className="min-w-[300px] h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 snap-center shrink-0"
        >
          <img src={p.img} alt={p.title} className="h-2/3 w-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
          <div className="p-6">
            <h3 className="text-xl font-bold">{p.title}</h3>
            <p className="text-sm text-slate-400 mt-2">Technical Case Study →</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
