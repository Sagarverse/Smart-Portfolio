"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function OnboardingTour() {
  const [step, setStep] = useState(0);
  const [showTour, setShowTour] = useState(false);
  const [hasSeenTour, setHasSeenTour] = useState(true);

  useEffect(() => {
    // Check if user has already seen the tour
    const hasSeen = localStorage.getItem('onboarding_tour_seen');
    if (!hasSeen) {
      setHasSeenTour(false);
      setShowTour(true);
    }
  }, []);

  const steps = [
    {
      title: '📊 Dashboard Overview',
      description: 'Track your productivity with real-time stats',
      action: 'View Dashboard',
      href: '/dashboard',
    },
    {
      title: '📝 Quick Notes',
      description: 'Capture ideas instantly and organize with tags',
      action: 'Create Note',
      href: '/notes',
    },
    {
      title: '✅ Task Manager',
      description: 'Stay on top of your todos with priorities and due dates',
      action: 'Create Todo',
      href: '/todo',
    },
    {
      title: '📋 Clipboard Sync',
      description: 'Store and sync your clipboard items across devices',
      action: 'Open Clipboard',
      href: '/clipboard',
    },
    {
      title: '📁 File Manager',
      description: 'Upload and organize your important files',
      action: 'Upload Files',
      href: '/files',
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem('onboarding_tour_seen', 'true');
      setShowTour(false);
      toast.success('Tour completed! Enjoy SGR Hub 🚀');
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_tour_seen', 'true');
    setShowTour(false);
  };

  if (hasSeenTour || !showTour) return null;

  const currentStep = steps[step];

  return (
    <AnimatePresence>
      {showTour && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSkip}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Tour Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-gradient-to-b from-gray-900 to-gray-950 border border-white/10 rounded-3xl p-8 shadow-2xl">
              {/* Step Indicator */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-semibold text-blue-400">Step {step + 1} of {steps.length}</span>
                <div className="flex gap-1">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        i === step ? 'bg-blue-500 w-8' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-3xl font-bold mb-4 text-white">{currentStep.title}</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">{currentStep.description}</p>
              </motion.div>

              {/* Actions */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSkip}
                  className="flex-1 px-6 py-3 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition-all"
                >
                  Skip Tour
                </motion.button>

                <motion.a
                  href={currentStep.href}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-xl transition-all cursor-pointer"
                >
                  {currentStep.action}
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                  title="Next"
                >
                  →
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
