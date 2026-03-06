"use client";
import { motion } from 'framer-motion';

const projects = [
  {
    name: 'AgriConnect AI',
    description: 'Winner of Udaya 1.0 Hackathon. A sophisticated AI-powered agriculture platform utilizing IoT sensors for real-time soil analysis, crop health monitoring, and automated irrigation. Built with Python and TensorFlow for predictive modeling.',
    tags: ['Python', 'IoT', 'AI', 'TensorFlow', 'Cloud'],
    github: 'https://github.com/sgrkannada',
    live: '#',
  },
  {
    name: 'Recycle in Mars',
    description: 'NASA Space Apps Challenge Global Nominee. A visionary sustainability project designing closed-loop recycling infrastructure for extraterrestrial habitats. Featured interactive 3D visualizations built with Three.js and React.',
    tags: ['React', 'Three.js', 'Sustainability', '3D UI'],
    github: 'https://github.com/sgrkannada',
    live: '#',
  },
  {
    name: 'SGR Productivity Hub',
    description: 'A premium full-stack ecosystem featuring cross-platform clipboard synchronization, secure cloud storage with Firebase, and an encrypted personal wiki. Optimized for high-performance and seamless data persistence across devices.',
    tags: ['Next.js', 'Prisma', 'Supabase', 'Firebase', 'Glassmorphism'],
    github: '#',
    live: '#',
  },
];

export default function ProjectsSection() {
  return (
    <section className="py-32 px-4" id="projects">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Work</h2>
          <div className="w-20 h-1 bg-purple-600 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all"
            >
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{project.name}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex gap-4">
                  <a href={project.github} className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                    Source Code ↗
                  </a>
                  <a href={project.live} className="text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
                    Live Demo ↗
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
