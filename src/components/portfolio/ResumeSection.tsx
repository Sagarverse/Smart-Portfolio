"use client";
import { motion } from 'framer-motion';

export default function ResumeSection() {
  return (
    <section className="py-32 px-4 bg-gray-950/50" id="resume">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Curriculum Vitae</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A comprehensive overview of my professional journey, academic background, and technical expertise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group p-4 rounded-3xl bg-white/5 border border-white/10 overflow-hidden shadow-2xl shadow-blue-500/5"
        >
          <div className="aspect-[21/29.7] w-full max-w-3xl mx-auto overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm">
            <iframe
              src="/resume.pdf"
              title="Resume PDF"
              className="w-full h-full bg-white opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent flex items-end justify-center pb-12 opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
            <motion.a
              href="/resume.pdf"
              download
              className="pointer-events-auto px-10 py-4 bg-white text-gray-950 font-bold rounded-xl shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
            >
              <span>📥</span> Download Full Resume (PDF)
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
