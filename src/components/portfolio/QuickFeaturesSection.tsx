"use client";
import { motion } from 'framer-motion';

export default function QuickFeaturesSection() {
  const features = [
    {
      icon: '⚡',
      title: 'Instant Capture',
      description: 'Create notes, todos, and clipboard entries in seconds',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '🔄',
      title: 'Real-time Sync',
      description: 'All your data syncs instantly across all devices',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: '🛡️',
      title: 'Encrypted Storage',
      description: 'Your data is encrypted and stored securely',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '📊',
      title: 'Smart Dashboard',
      description: 'Track productivity with beautiful analytics',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: '⌨️',
      title: 'Keyboard Shortcuts',
      description: 'Save time with customizable keyboard shortcuts',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: '📱',
      title: 'PWA Support',
      description: 'Works offline as a progressive web app',
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative py-20 px-4 md:py-32">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Time-Saving Features
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to boost productivity and stay organized
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              {/* Border Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 group-hover:border-white/30 transition-all duration-300" />

              {/* Content */}
              <div className="relative p-8 h-full flex flex-col gap-4">
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  {feature.description}
                </p>

                {/* Hover Indicator */}
                <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.color} rounded-full transition-all duration-300`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Ready to transform your productivity?
          </p>
          <motion.a
            href="/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-bold text-white hover:shadow-2xl transition-all"
          >
            <span>Start Free Today</span>
            <span>→</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
