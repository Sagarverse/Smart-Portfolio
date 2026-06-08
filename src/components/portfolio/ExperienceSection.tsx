"use client";

import { motion } from 'framer-motion';

const achievements = [
  { title: "NASA Space Apps Challenge", role: "Global Nominee", detail: "Shortlisted from 57,000+ participants · 150+ countries", year: "2025" },
  { title: "Udaya 1.0 Hackathon", role: "Winner", detail: "AgriConnect AI · ₹15,000 Prize", year: "2025" },
  { title: "DSU DevHack 2.0", role: "Winner", detail: "Cloud-based AI Solution · $1,000 Vultr Credit", year: "2025" },
  { title: "Eurekathon 3.0", role: "Winner — Best AgriTech", detail: "Blockchain Supply Chain DApp", year: "2026" },
  { title: "YUVAI National Initiative", role: "Top 50", detail: "AI for Social Impact · National Recognition", year: "2025" },
];

const certifications = [
  "Microsoft Azure DP-900", "Oracle AI Foundation", "Oracle Data Science Professional",
  "GitHub Actions & CI/CD", "Docker (KodeKloud)", "Figma UI/UX Design",
  "Android Dev with Kotlin", "Snowflake for Developers",
];

export default function ExperienceSection() {
  return (
    <section className="relative py-40 md:py-56 px-6 md:px-16" id="experience">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-start gap-6 md:gap-12 mb-20 md:mb-32">
          <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-600 uppercase mt-2 shrink-0">( 04 )</span>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-mono tracking-[0.3em] text-neutral-500 uppercase mb-6"
            >
              Recognition
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-serif italic text-neutral-300 max-w-2xl leading-[1.2]"
            >
              Awards, certifications, and milestones along the way.
            </motion.p>
          </div>
        </div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 py-8 px-4 border-y border-white/[0.04]"
        >
          <div className="grid grid-cols-12 gap-4 items-baseline">
            <div className="col-span-12 md:col-span-2">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-600">2024</span>
            </div>
            <div className="col-span-12 md:col-span-4">
              <h3 className="text-xl font-semibold text-white tracking-tight">NTT Data</h3>
              <p className="text-sm text-neutral-500 mt-1">Trainee — Skill Enhancement</p>
            </div>
            <div className="col-span-12 md:col-span-6">
              <p className="text-neutral-400 font-light">Enterprise IT, ITSM (ServiceNow), agile methodologies, and cross-functional team collaboration within a global IT services environment.</p>
            </div>
          </div>
        </motion.div>

        {/* Achievements Table */}
        <div className="border-t border-white/[0.04]">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group grid grid-cols-12 gap-4 py-6 md:py-8 border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors duration-500 px-2 md:px-4 items-baseline"
            >
              <div className="col-span-2 md:col-span-1">
                <span className="text-[10px] font-mono text-neutral-700">{item.year}</span>
              </div>
              <div className="col-span-10 md:col-span-4">
                <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-neutral-100 transition-colors">{item.title}</h3>
              </div>
              <div className="col-span-6 md:col-span-3">
                <span className="text-sm font-medium text-amber-500/70">{item.role}</span>
              </div>
              <div className="col-span-6 md:col-span-4">
                <p className="text-sm text-neutral-500 font-light">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications — Minimal Tags */}
        <div className="mt-24 md:mt-32">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-600 block mb-8">Certifications</span>
          <div className="flex flex-wrap gap-3">
            {certifications.map(cert => (
              <motion.span
                key={cert}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="px-4 py-2 text-[12px] font-mono tracking-wider text-neutral-500 border border-white/[0.04] rounded-full hover:text-neutral-300 hover:border-white/[0.08] transition-all duration-500"
              >
                {cert}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
