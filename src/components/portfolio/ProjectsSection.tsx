"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const projects = [
  {
    id: "01",
    name: 'Hackie',
    subtitle: 'Professional Ethical Hacking Suite',
    description: 'A complete, professional-grade cybersecurity toolkit in native Kotlin — network scanning, port discovery, packet analysis, and vulnerability assessment across 4 core modules. OWASP-aligned architecture.',
    tags: ['Kotlin', 'Jetpack Compose', 'Coroutines', 'Room DB', 'Hilt'],
    github: 'https://github.com/Sagarverse/Hackie',
    year: '2026',
    category: 'ANDROID',
    award: null,
  },
  {
    id: "02",
    name: 'AgriConnect',
    subtitle: 'AI-Powered Agriculture Platform',
    description: 'CNN crop disease detection achieving 92%+ accuracy across 38 classes. ML yield prediction. Flutter cross-platform app with 3 real-time market price APIs and offline SMS alerts for rural users.',
    tags: ['Python', 'TensorFlow', 'Flutter', 'Azure', 'CNN'],
    github: 'https://github.com/Sagarverse/Agriconnect',
    year: '2025',
    category: 'AI / ML',
    award: 'Winner — Udaya 1.0 Hackathon',
  },
  {
    id: "03",
    name: 'Recycle in Mars',
    subtitle: 'Habitat Resource Management',
    description: 'AI-driven waste management simulation for Mars habitats. Resource allocation optimization algorithms. Interactive dashboard with D3.js featuring 6 data panels.',
    tags: ['React.js', 'Node.js', 'D3.js', 'Python'],
    github: 'https://github.com/Sagarverse',
    year: '2025',
    category: 'FULL-STACK',
    award: 'Global Nominee — NASA Space Apps',
  },
  {
    id: "04",
    name: 'OrganicChain',
    subtitle: 'Blockchain AgriTech Supply Chain',
    description: 'Tamper-proof farm-to-consumer tracking using Ethereum smart contracts. On-chain immutability and real-time traceability reducing supply-chain fraud risk.',
    tags: ['Ethereum', 'Solidity', 'React.js', 'Smart Contracts'],
    github: 'https://github.com/Sagarverse/OrganicChain',
    year: '2026',
    category: 'BLOCKCHAIN',
    award: 'Winner — Eurekathon 3.0',
  },
  {
    id: "05",
    name: 'GenAI Pipelines',
    subtitle: 'RAG & LLM Agent Systems',
    description: 'Production-ready RAG pipelines using LangChain with Pinecone and ChromaDB. Claude & GPT-4 integration with custom prompt engineering, automating 5+ data analysis workflows.',
    tags: ['LangChain', 'Claude API', 'GPT-4', 'Pinecone', 'FastAPI'],
    github: 'https://github.com/Sagarverse',
    year: '2026',
    category: 'GenAI',
    award: null,
  },
  {
    id: "06",
    name: 'Speaky',
    subtitle: 'AI-Powered Smart Teleprompter',
    description: 'Premium teleprompter app with Gemini AI script generation, stealth Ghost Mode, deep TTS customization. Sub-200ms UI transitions for flawless presentations.',
    tags: ['Flutter', 'Dart', 'Gemini AI', 'TTS'],
    github: 'https://github.com/Sagarverse/Speaky',
    year: '2025',
    category: 'MOBILE',
    award: null,
  },
];

export default function ProjectsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative py-40 md:py-56 px-6 md:px-16" id="projects">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-start gap-6 md:gap-12 mb-20 md:mb-32">
          <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-600 uppercase mt-2 shrink-0">( 03 )</span>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-mono tracking-[0.3em] text-neutral-500 uppercase mb-6"
            >
              Selected Work
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-serif italic text-neutral-300 max-w-2xl leading-[1.2]"
            >
              Projects that won awards, solved problems, and shipped to production.
            </motion.p>
          </div>
        </div>

        {/* Project List — Editorial Line Items */}
        <div className="border-t border-white/[0.04]">
          {projects.map((project, idx) => (
            <motion.a
              key={project.id}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group block border-b border-white/[0.04] py-8 md:py-12 relative overflow-hidden"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Hover background */}
              <motion.div
                className="absolute inset-0 bg-white/[0.02]"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIdx === idx ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10 grid grid-cols-12 items-center gap-4">
                {/* Number */}
                <div className="col-span-1 hidden md:block">
                  <span className="text-xs font-mono text-neutral-700">{project.id}</span>
                </div>

                {/* Name */}
                <div className="col-span-12 md:col-span-4">
                  <motion.h3
                    className="text-2xl md:text-4xl font-black tracking-[-0.03em] text-white transition-colors duration-300"
                    animate={{ x: hoveredIdx === idx ? 10 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.name}
                  </motion.h3>
                  <p className="text-sm text-neutral-500 mt-1">{project.subtitle}</p>
                  {project.award && (
                    <span className="inline-block mt-2 text-[10px] font-mono tracking-[0.15em] uppercase text-amber-500/80 bg-amber-500/5 px-3 py-1 rounded-full border border-amber-500/10">
                      {project.award}
                    </span>
                  )}
                </div>

                {/* Category */}
                <div className="col-span-6 md:col-span-2 hidden md:block">
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-600">{project.category}</span>
                </div>

                {/* Year */}
                <div className="col-span-3 md:col-span-1 hidden md:block">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-600">{project.year}</span>
                </div>

                {/* Tags */}
                <div className="col-span-12 md:col-span-3 flex flex-wrap gap-1.5 mt-3 md:mt-0">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded bg-white/[0.03] text-neutral-500 border border-white/[0.04]">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="col-span-1 hidden md:flex justify-end">
                  <motion.span
                    className="text-neutral-600 text-lg"
                    animate={{
                      x: hoveredIdx === idx ? 5 : 0,
                      opacity: hoveredIdx === idx ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-end"
        >
          <a
            href="https://github.com/Sagarverse"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-500 hover:text-white transition-colors magnetic"
          >
            <span>View all on GitHub</span>
            <span className="w-8 h-[1px] bg-neutral-600 group-hover:w-12 transition-all" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
