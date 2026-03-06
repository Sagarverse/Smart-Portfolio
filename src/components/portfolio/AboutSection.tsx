"use client";
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="py-32 px-4 relative overflow-hidden" id="about">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-10 md:p-16 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
          </div>

          <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            The Vision
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                I am <span className="text-white font-semibold">Sagar M.</span>, a developer and <span className="text-blue-400">B.Tech Data Science</span> student at <span className="text-blue-400">Dayananda Sagar University</span> specializing in the intersection of AI, IoT, and high-performance full-stack architectures.
              </p>
              <p>
                As a winner of the <span className="text-purple-400 font-bold">Udaya 1.0 Hackathon</span> and a <span className="text-blue-400 font-bold">NASA Space Apps Challenge</span> Nominee, my focus is on engineering scalable solutions that unify complex backend systems with fluid, premium user interfaces.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all hover:bg-white/10 group">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">🎓</span>
                  <h4 className="text-blue-400 font-bold uppercase tracking-widest text-xs">Education</h4>
                </div>
                <p className="text-sm text-gray-400 font-medium">B.Tech in Data Science, Dayananda Sagar University. (Specialization in AI & IoT)</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all hover:bg-white/10 group">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">🏆</span>
                  <h4 className="text-purple-400 font-bold uppercase tracking-widest text-xs">Innovation</h4>
                </div>
                <p className="text-sm text-gray-400 font-medium">Udaya 1.0 Winner | NASA Space Apps Nominee | DevHack 2.0 Cloud Lead</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
