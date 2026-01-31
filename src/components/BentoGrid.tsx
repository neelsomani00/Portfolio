import { ArrowUpRight, Zap, Code, Cpu } from "lucide-react";

const items = [
  { title: "AI-Powered Apps", desc: "LLM integration & RAG pipelines", icon: <Cpu />, size: "md:col-span-2" },
  { title: "Architecture", desc: "Clean, scalable systems", icon: <Code />, size: "md:col-span-1" },
  { title: "Performance", desc: "99+ Lighthouse scores", icon: <Zap />, size: "md:col-span-1" },
  { title: "Featured Project", desc: "A deep dive into my latest build", icon: <ArrowUpRight />, size: "md:col-span-2" },
];

export const BentoGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto p-4">
    {items.map((item, i) => (
      <div key={i} className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all ${item.size}`}>
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="mb-4 text-purple-400">{item.icon}</div>
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
            <p className="text-slate-400 text-sm">{item.desc}</p>
          </div>
          <div className="mt-8 h-24 w-full bg-white/5 rounded-xl animate-pulse" /> {/* Skeleton */}
        </div>
      </div>
    ))}
  </div>
);
