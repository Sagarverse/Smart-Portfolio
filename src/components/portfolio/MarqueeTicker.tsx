"use client";

import { motion } from 'framer-motion';

const tickerItems = [
  "NASA Space Apps Global Nominee",
  "4× Hackathon Winner",
  "12+ Projects Shipped",
  "Full-Stack Developer",
  "AI/ML Engineer", 
  "Android Developer",
  "B.Tech Data Science",
  "Microsoft Azure Certified",
];

export default function MarqueeTicker() {
  const repeated = [...tickerItems, ...tickerItems];

  return (
    <div className="py-8 border-y border-white/[0.04] overflow-hidden bg-[#0a0a0a] relative">
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center mx-8">
            <span className="text-sm md:text-base font-medium tracking-[0.05em] text-neutral-500 uppercase">
              {item}
            </span>
            <span className="ml-8 w-1.5 h-1.5 rounded-full bg-neutral-700 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
