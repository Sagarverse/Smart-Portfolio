"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuickCreateButton() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: '📝', label: 'New Note', href: '/notes' },
    { icon: '✅', label: 'New Todo', href: '/todo' },
    { icon: '📋', label: 'Copy to Clipboard', href: '/clipboard' },
    { icon: '📁', label: 'Upload File', href: '/files' },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-20 right-0 flex flex-col gap-3"
          >
            {actions.map((action, idx) => (
              <motion.a
                key={action.label}
                href={action.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg text-white font-semibold hover:bg-white/20 transition-all group"
              >
                <span className="text-xl">{action.icon}</span>
                <span className="text-sm">{action.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-xl flex items-center justify-center text-2xl font-bold text-white hover:shadow-2xl transition-all"
      >
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
      </motion.button>

      {/* Overlay to close menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 -z-10"
        />
      )}
    </div>
  );
}
