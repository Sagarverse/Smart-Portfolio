"use client";
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Development Hub',
    skills: [
      { name: 'Python & SQL', icon: '🐍' },
      { name: 'JavaScript & React', icon: '⚛️' },
      { name: 'Flutter & Dart', icon: '📱' },
      { name: 'Node.js & Express', icon: '🟢' },
    ],
  },
  {
    title: 'Data Science & AI',
    skills: [
      { name: 'Pandas & NumPy', icon: '📊' },
      { name: 'Scikit-learn', icon: '🤖' },
      { name: 'TensorFlow', icon: '🧠' },
      { name: 'MATLAB', icon: '📉' },
    ],
  },
  {
    title: 'Infrastructure',
    skills: [
      { name: 'Microsoft Azure', icon: '🟦' },
      { name: 'Firebase', icon: '🔥' },
      { name: 'Prisma & PostgreSQL', icon: '💎' },
      { name: 'Git & GitHub', icon: '🚀' },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section className="py-40 px-4 relative overflow-hidden" id="skills">
      {/* Background Section Detail */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4 block">Proven expertise</span>
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Tech Stack</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-10 group hover:border-white/20 transition-all relative overflow-hidden"
            >
              {/* Card Glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <h3 className="text-2xl font-black mb-8 text-white group-hover:text-blue-400 transition-colors">
                {category.title}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill, sIdx) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-4 text-gray-400 group-hover:text-gray-200 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl shadow-sm">
                      {skill.icon}
                    </div>
                    <span className="font-bold tracking-tight text-lg">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
