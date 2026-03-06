"use client";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/useUserStore';

export default function HeroSection() {
  const [isAuth, setIsAuth] = useState(false);
  const [mounted, setMounted] = useState(false);
  const user = useUserStore((s) => s.user);
  const hydrate = useUserStore((s) => s.hydrate);

  useEffect(() => {
    setMounted(true);
    // Hydrate user from /api/auth/me
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    // Check if user exists in store
    if (mounted && user) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [user, mounted]);

  if (!mounted) return null;

  const quickActions = [
    { icon: '📝', label: 'Quick Note', href: '/notes' },
    { icon: '✅', label: 'New Todo', href: '/todo' },
    { icon: '📋', label: 'Clipboard', href: '/clipboard' },
    { icon: '📁', label: 'Files', href: '/files' },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 text-center overflow-hidden">
      {/* Complex Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[150px] -z-10 animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Available for Innovation</span>
        </motion.div>

        <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20 leading-tight">
          Sagar M.
        </h1>

        <p className="text-xl md:text-3xl text-gray-400 max-w-4xl mx-auto mb-14 leading-relaxed font-medium">
          <span className="text-white">Data Science Student</span> & Full-stack Developer specializing in <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">AI and IoT solutions.</span>
        </p>

        {/* Auth Buttons for New Users */}
        {!isAuth ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-14">
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-black rounded-2xl shadow-[0_20px_40px_rgba(59,130,246,0.3)] transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">Sign Up Free 🚀</span>
            </motion.a>

            <motion.a
              href="/login"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group px-12 py-5 border-2 border-white/30 rounded-2xl text-white font-bold backdrop-blur-xl hover:bg-white/10 transition-all"
            >
              <span>Sign In</span>
            </motion.a>

            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group px-12 py-5 text-gray-300 font-bold hover:text-white transition-all"
            >
              <span>Explore Portfolio →</span>
            </motion.a>
          </div>
        ) : (
          /* Quick Actions for Authenticated Users */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <p className="text-sm text-gray-400 mb-6 tracking-widest uppercase">Quick Actions</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action, idx) => (
                <motion.a
                  key={action.label}
                  href={action.href}
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="group relative p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <div className="text-3xl mb-2">{action.icon}</div>
                  <span className="text-sm font-semibold text-white">{action.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Always show primary action */}
        {isAuth && (
          <motion.a
            href="/dashboard"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-5 bg-white text-black font-black rounded-2xl shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">Open Dashboard ⚡</span>
          </motion.a>
        )}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-gray-500">Scroll Down</span>
        <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
      </motion.div>
    </section>
  );
}
