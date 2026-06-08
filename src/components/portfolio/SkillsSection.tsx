"use client";

import { motion } from 'framer-motion';

const skillGroups = [
  { label: "Languages", items: "Java · Python · JavaScript · Kotlin · Dart · SQL · C · Solidity" },
  { label: "Frontend", items: "React.js · Next.js · Tailwind CSS · Framer Motion · HTML5 · CSS3" },
  { label: "Backend", items: "Node.js · Express.js · REST APIs · GraphQL · Prisma · Firebase" },
  { label: "AI / ML", items: "TensorFlow · PyTorch · Scikit-learn · LangChain · OpenCV · Pandas · NumPy" },
  { label: "GenAI", items: "Claude API · GPT-4 · Prompt Engineering · RAG · Pinecone · ChromaDB" },
  { label: "Mobile", items: "Flutter · Jetpack Compose · Material 3 · MVVM · Room DB · Hilt DI" },
  { label: "Cloud", items: "Azure (DP-900) · AWS · Docker · GitHub Actions · Vercel · Terraform" },
  { label: "Databases", items: "PostgreSQL · MongoDB · Firebase Firestore · Redis · Supabase · SQLite" },
  { label: "Security", items: "Ethical Hacking · OWASP Top 10 · Penetration Testing · Network Scanning" },
  { label: "Blockchain", items: "Ethereum · Solidity · Smart Contracts · DApps · Supply-Chain" },
];

export default function SkillsSection() {
  return (
    <section className="relative py-40 md:py-56 px-6 md:px-16" id="skills">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-start gap-6 md:gap-12 mb-20 md:mb-32">
          <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-600 uppercase mt-2 shrink-0">( 02 )</span>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-mono tracking-[0.3em] text-neutral-500 uppercase mb-6"
            >
              Capabilities
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-serif italic text-neutral-300 max-w-2xl leading-[1.2]"
            >
              The tools I use to bring ideas to life.
            </motion.p>
          </div>
        </div>

        {/* Skills Table */}
        <div className="border-t border-white/[0.04]">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03 }}
              className="group grid grid-cols-12 gap-4 py-6 md:py-8 border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors duration-500 px-2 md:px-4 items-baseline"
            >
              <div className="col-span-12 md:col-span-3">
                <span className="text-xs font-mono tracking-[0.2em] uppercase text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  {group.label}
                </span>
              </div>
              <div className="col-span-12 md:col-span-9">
                <p className="text-base md:text-lg text-neutral-400 group-hover:text-neutral-200 transition-colors font-light tracking-wide">
                  {group.items}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
