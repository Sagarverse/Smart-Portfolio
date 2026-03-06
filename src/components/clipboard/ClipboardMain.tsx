"use client";
import { useState, useEffect } from 'react';
import { useClipboardStore } from '@/store/useClipboardStore';
import { useClipboardSync } from '@/hooks/useClipboardSync';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClipboardMain() {
  const { history, addClipboard, clearHistory } = useClipboardStore();
  const [inputText, setInputText] = useState('');
  const [autoSync, setAutoSync] = useState(false);

  // Integrated Real-time Sync
  const { emitClipboardUpdate } = useClipboardSync((text) => {
    addClipboard({ id: Date.now().toString(), text, createdAt: new Date().toISOString() });

    // Auto-copy to this device if enabled
    if (autoSync && typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text).catch(() => {
        console.warn("Auto-copy blocked by browser. Page must be focused.");
      });
    }
  });

  // Auto-read from this device when focused
  useEffect(() => {
    const handleFocus = async () => {
      if (!autoSync) return;
      try {
        const text = await navigator.clipboard.readText();
        if (text && text !== history[0]?.text) {
          handleSyncNewItem(text);
        }
      } catch (err) {
        console.warn("Clipboard read permission denied or unavailable.");
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [autoSync, history]);

  const handleSyncNewItem = async (textToSync?: string) => {
    const finalVal = textToSync || inputText;
    if (!finalVal.trim()) return;

    const newItem = {
      text: finalVal,
      createdAt: new Date().toISOString()
    };

    // 1. Broadcast to other devices
    emitClipboardUpdate(finalVal);

    // 2. Save to database
    try {
      const res = await fetch('/api/clipboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      const data = await res.json();
      if (data.item) {
        addClipboard(data.item);
        if (!textToSync) setInputText('');
      }
    } catch (err) {
      console.error("Failed to sync clipboard:", err);
    }
  };

  useEffect(() => {
    // Only fetch once on mount
    if (history.length > 0) return; // Don't re-fetch if we already have items
    
    fetch('/api/clipboard')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.history) && data.history.length > 0) {
          // Sort by creation date (newest first) and deduplicate by ID
          const uniqueMap = new Map();
          data.history.forEach((item: any) => {
            if (!uniqueMap.has(item.id)) {
              uniqueMap.set(item.id, item);
            }
          });
          const uniqueItems = Array.from(uniqueMap.values())
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          
          // Bulk replace instead of individual adds to prevent duplicates
          uniqueItems.forEach((item, index) => {
            setTimeout(() => addClipboard(item), index * 50);
          });
        }
      })
      .catch(err => console.error("Clipboard fetch error:", err));
  }, []); // Empty dependency - run once on mount only // Added history to dependencies

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

  return (
    <div className="min-h-screen py-24 px-4 pb-48 relative overflow-hidden">
      {/* Background Section Glow */}
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-600/5 blur-[150px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-20"
        >
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4 block">Neural Link</span>
            <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-500 tracking-tighter">
              Universal Clipboard
            </h1>
            <div className="flex flex-wrap items-center gap-6 mt-6">
              <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-md">
                Sync perfectly across all your devices in real-time.
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setAutoSync(!autoSync)}
                className={`flex items-center gap-3 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${autoSync ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-gray-500 border-white/10'}`}
              >
                <div className={`w-2 h-2 rounded-full ${autoSync ? 'bg-emerald-400 animate-pulse' : 'bg-gray-600'}`} />
                Auto-Sync {autoSync ? 'Active' : 'Standby'}
              </motion.button>
            </div>
          </div>
          <button
            onClick={clearHistory}
            className="px-8 py-4 bg-red-500/5 text-red-500 border border-red-500/10 rounded-2xl hover:bg-red-500 hover:text-white transition-all font-black uppercase tracking-widest text-xs"
          >
            Purge History
          </button>
        </motion.div>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-20 glass-card p-2 border-white/[0.05]"
        >
          <div className="flex flex-col md:flex-row gap-4 p-6 rounded-[1.8rem] bg-white/[0.02]">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Transmit data..."
              className="flex-1 bg-transparent border-none focus:ring-0 p-4 min-h-[120px] text-white text-lg font-medium placeholder-gray-600 resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSyncNewItem()}
              className="md:w-32 bg-white text-black font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-2 group"
            >
              <span>Bridge</span>
              <span className="group-hover:translate-y-[-2px] group-hover:translate-x-[2px] transition-transform">↗</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid gap-6">
          <AnimatePresence mode="popLayout">
            {history.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group glass-card p-8 border-white/[0.03] hover:border-white/20 transition-all hover:bg-white/[0.05] flex justify-between items-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex-1 mr-8">
                  <p className="text-white text-xl font-bold tracking-tight leading-relaxed">{item.text}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">
                      Transmitted {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => copyToClipboard(item.text)}
                  className="w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl text-white shadow-2xl hover:bg-white hover:text-black transition-all group/copy"
                  title="Capture to Device"
                >
                  <svg className="group-hover/copy:scale-110 transition-transform" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>

          {history.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-32 text-center glass-card border-dashed border-white/10 bg-white/[0.01]"
            >
              <div className="text-6xl mb-8 grayscale opacity-20">📡</div>
              <h3 className="text-2xl font-black text-gray-500 uppercase tracking-widest mb-2">Frequency Empty</h3>
              <p className="text-gray-600 font-medium">No transmissions detected in the local hub.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
