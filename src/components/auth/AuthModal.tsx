"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/store/useUserStore';

export default function AuthModal() {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    setMounted(true);
    
    // Check if user is already logged in
    if (user) {
      setShowModal(false);
      return;
    }

    // Show for all non-logged-in users (once per browser session unless refreshed)
    const hasDismissedThisSession = sessionStorage.getItem('auth_modal_dismissed');

    if (!hasDismissedThisSession) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleDismiss = () => {
    sessionStorage.setItem('auth_modal_dismissed', 'true');
    setShowModal(false);
  };

  if (!mounted || user || !showModal) return null;

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100]"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-lg mx-4"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-[2.5rem] blur-xl opacity-40" />
              
              {/* Card Content */}
              <div className="relative bg-gray-900/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
                {/* Close Button */}
                <button
                  onClick={handleDismiss}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all group"
                  title="Maybe later"
                >
                  <span className="text-xl group-hover:rotate-90 transition-transform">×</span>
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl shadow-blue-500/30">
                    <span className="text-4xl">🚀</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-black text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100">
                  Welcome to SGR Hub!
                </h2>

                {/* Description */}
                <p className="text-gray-400 text-center mb-8 text-base leading-relaxed">
                  Your personal productivity suite with <span className="text-white font-semibold">notes</span>, <span className="text-white font-semibold">todos</span>, <span className="text-white font-semibold">files</span>, and more. Sign in to unlock all features!
                </p>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { icon: '📝', label: 'Smart Notes' },
                    { icon: '✅', label: 'Task Manager' },
                    { icon: '📁', label: 'File Storage' },
                    { icon: '📋', label: 'Clipboard Sync' },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                    >
                      <span className="text-xl">{feature.icon}</span>
                      <span className="text-sm font-semibold text-gray-300">{feature.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.a
                    href="/register"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-center shadow-xl shadow-blue-500/20 hover:shadow-2xl transition-all"
                  >
                    Create Free Account
                  </motion.a>

                  <motion.a
                    href="/login"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full py-4 rounded-2xl border-2 border-white/20 text-white font-bold text-center hover:bg-white/5 transition-all"
                  >
                    Sign In
                  </motion.a>

                  <button
                    onClick={handleDismiss}
                    className="w-full py-3 text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors"
                  >
                    Continue as guest
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
