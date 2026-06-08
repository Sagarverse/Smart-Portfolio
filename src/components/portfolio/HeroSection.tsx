"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const roles = ["Full-Stack Developer", "AI/ML Engineer", "Android Developer", "Data Scientist"];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 3000);
    return () => clearInterval(t);
  }, []);

  // Staggered letter animation
  const name = "Sagar M.";
  const letters = name.split("");

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-16 md:pb-24">

        {/* Top bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.8 }}
          className="absolute top-8 left-6 md:left-16 right-6 md:right-16 flex justify-between items-center"
        >
          <span className="text-[11px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Portfolio / 2025</span>
          <span className="text-[11px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Bengaluru, India</span>
        </motion.div>

        {/* Giant Name */}
        <div className="mb-8">
          <h1 className="text-[16vw] md:text-[11vw] font-black tracking-[-0.06em] leading-[0.85] text-white flex overflow-hidden">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: "120%", rotate: 8 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{
                  delay: 2.6 + i * 0.04,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="inline-block"
                style={{ display: letter === " " ? "inline" : "inline-block" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Bottom info row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            {/* Rotating role */}
            <div className="h-8 overflow-hidden mb-6">
              <motion.p
                key={roleIndex}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm font-mono tracking-[0.15em] uppercase text-neutral-400"
              >
                {roles[roleIndex]}
              </motion.p>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.8 }}
              className="text-lg md:text-xl text-neutral-500 leading-relaxed font-light"
            >
              Multi-award-winning engineer. NASA Global Nominee.
              <br className="hidden md:block" />
              4× Hackathon Champion. 12+ projects shipped.
            </motion.p>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-600">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-12 bg-gradient-to-b from-neutral-500 to-transparent"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Cinematic Photo — Asymmetric Placement */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[10%] right-[5%] md:right-[8%] w-[45vw] md:w-[28vw] h-[60vh] md:h-[70vh] z-0"
      >
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ delay: 2.2, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="relative w-full h-full overflow-hidden"
        >
          <Image
            src="/sagar-profile.jpg"
            alt="Sagar M."
            fill
            className="object-cover object-top grayscale-[30%] contrast-[1.1]"
            priority
            sizes="(max-width: 768px) 45vw, 28vw"
          />
          {/* Cinematic color grading overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-70" />
          <div className="absolute inset-0 bg-[#0a0a0a]/10 mix-blend-multiply" />
        </motion.div>
      </motion.div>

      {/* Floating Stats near photo */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.6, duration: 0.6 }}
        style={{ y: y2 }}
        className="absolute bottom-[25%] right-[36%] md:right-[38%] z-20 hidden md:block"
      >
        <div className="text-right">
          <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-600 mb-1">CGPA</p>
          <p className="text-4xl font-black text-white tracking-tight">8.67</p>
        </div>
      </motion.div>

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-0 w-[50%] h-[40%] bg-amber-900/5 rounded-full blur-[150px] -z-10" />
    </section>
  );
}
