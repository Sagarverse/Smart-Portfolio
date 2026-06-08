"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2200;
    const interval = 20;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCount(Math.min(Math.round((step / steps) * 100), 100));
      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => setIsLoading(false), 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-end justify-between p-8 md:p-16 bg-[#0a0a0a]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-600"
          >
            Portfolio / 2025
          </motion.span>
          
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-8xl md:text-[12rem] font-black tracking-tighter text-white/10 leading-none"
          >
            {count}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
