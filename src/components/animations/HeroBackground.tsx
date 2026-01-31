"use client";
import { motion } from "framer-motion";

export const HeroBackground = () => (
  <div className="fixed inset-0 -z-10 bg-[#030014] overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 10, repeat: Infinity }}
      className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]"
    />
  </div>
);
