"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, Layout, Zap } from "lucide-react";

const steps = [
  {
    title: "Discovery & AI Strategy",
    icon: <Sparkles className="text-purple-400" />,
    content: "We define the project scope and identify where AI can automate manual tasks or enhance user experience."
  },
  {
    title: "High-Fi Design & Prototyping",
    icon: <Layout className="text-blue-400" />,
    content: "I build a responsive, high-performance frontend using Next.js and Tailwind CSS, ensuring 99+ Lighthouse scores."
  },
  {
    title: "Development & Deployment",
    icon: <Zap className="text-emerald-400" />,
    content: "Final code is optimized, tested, and deployed to Vercel with automated CI/CD pipelines for 100% uptime."
  }
];

export const ProcessAccordion = () => {
  const [expanded, setExpanded] = useState<number | false>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        My Engineering Process
      </h2>
      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i} className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === i ? false : i)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                {step.icon}
                <span className="font-medium text-lg">{step.title}</span>
              </div>
              <motion.div
                animate={{ rotate: expanded === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} className="text-slate-500" />
              </motion.div>
            </button>
            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-16 pb-6 text-slate-400 leading-relaxed">
                    {step.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
