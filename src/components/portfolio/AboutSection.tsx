"use client";

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 40%"]
  });

  const paragraph = "I build things at the intersection of design and engineering. From AI-powered agriculture platforms that won national hackathons, to Android cybersecurity suites used by professionals, to being nominated globally by NASA from 57,000+ participants — I approach every project with obsessive attention to craft, performance, and user experience.";
  const words = paragraph.split(" ");

  return (
    <section className="relative py-40 md:py-56 px-6 md:px-16" id="about" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        
        {/* Section Number + Title — Editorial Style */}
        <div className="flex items-start gap-6 md:gap-12 mb-20 md:mb-32">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono tracking-[0.3em] text-neutral-600 uppercase mt-2 shrink-0"
          >
            ( 01 )
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-mono tracking-[0.3em] text-neutral-500 uppercase"
          >
            About
          </motion.h2>
        </div>

        {/* Text Scrub — Large Editorial */}
        <div className="max-w-5xl ml-auto md:pl-24">
          <p className="text-2xl md:text-[2.8rem] leading-[1.3] tracking-[-0.02em] font-light">
            {words.map((word, i) => (
              <Word key={i} word={word} index={i} total={words.length} progress={scrollYProgress} />
            ))}
          </p>
        </div>

        {/* Pull Quote — Italic Serif */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 md:mt-40 max-w-3xl"
        >
          <blockquote className="text-3xl md:text-5xl font-serif italic text-neutral-300 leading-[1.2] tracking-[-0.02em]">
            "Engineering is not just about code — it's about crafting experiences that feel inevitable."
          </blockquote>
        </motion.div>

        {/* Stats — Minimal */}
        <div className="mt-24 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04]">
          {[
            { value: "12+", label: "Projects" },
            { value: "4×", label: "Hackathon Wins" },
            { value: "8.67", label: "CGPA" },
            { value: "25+", label: "Repositories" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0a0a0a] p-8 md:p-12"
            >
              <p className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">{stat.value}</p>
              <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Word({ word, index, total, progress }: { word: string; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total;
  const end = start + (1 / total);

  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const color = useTransform(progress, [start, end], ["#262626", "#e5e5e5"]);

  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.3em]">
      {word}
    </motion.span>
  );
}
