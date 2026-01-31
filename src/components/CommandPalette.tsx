"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Search, X } from 'lucide-react';

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const res = await fetch('/api/suggest', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResponse(data.result);
    setLoading(false);
  };

  return (
    <>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md hover:bg-white/10 transition-all text-slate-400 text-sm"
        >
          <Search size={16} />
          <span>Press <kbd className="font-sans text-xs border border-white/20 px-1 rounded">⌘K</kbd> to ask AI...</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4 border-b border-white/10">
                <Terminal size={20} className="text-purple-400" />
                <input 
                  autoFocus
                  placeholder="Type a skill (e.g. Next.js, Automation)..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-lg"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={() => setIsOpen(false)}><X size={20} /></button>
              </div>
              <div className="p-6 min-h-[100px]">
                {loading ? <div className="animate-pulse text-purple-400">Consulting Neel's brain...</div> : 
                 response ? <div className="text-slate-300 leading-relaxed">{response}</div> :
                 <div className="text-slate-500">Search my technical stack or process.</div>}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
