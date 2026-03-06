"use client";
import { useState, useEffect } from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { useUserStore } from '@/store/useUserStore';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DashboardMain() {
  const { stats, setStats } = useDashboardStore();
  const user = useUserStore((s) => s.user);
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.stats) {
          setStats(data.stats);
        }
      })
      .catch(err => console.error("Dashboard fetch error:", err));
  }, [setStats]);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const quickLinks = [
    { name: 'Notes', href: '/notes', icon: '📝', color: 'from-purple-500 to-pink-500', count: stats.totalNotes },
    { name: 'Clipboard', href: '/clipboard', icon: '📋', color: 'from-blue-500 to-cyan-500', count: stats.clipboardActivity },
    { name: 'Storage', href: '/files', icon: '📁', color: 'from-emerald-500 to-teal-500', count: stats.totalFiles },
    { name: 'Tasks', href: '/todo', icon: '✅', color: 'from-orange-500 to-yellow-500', count: 0 },
  ];

  return (
    <div className="min-h-screen py-24 px-4 pb-48">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <motion.div
              className="absolute -top-12 -left-12 w-32 h-32 bg-blue-500/10 blur-3xl -z-10"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <h1 className="text-5xl md:text-7xl font-black text-white mb-3 tracking-tighter">
              {mounted ? getGreeting() : "Loading..."}, <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                {user?.name || 'Explorer'}
              </span>
            </h1>
            <p className="text-gray-400 text-lg font-medium max-w-md leading-relaxed">
              Your digital sanctuary is active. <span className="text-blue-400/80">Everything is synced.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card group p-6 flex flex-col items-end relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-2 relative z-10">Local Time</span>
            <span className="text-4xl md:text-5xl font-black font-mono text-white tracking-tight relative z-10">
              {mounted ? (
                <>
                  {formattedTime.split(' ')[0]}
                  <span className="text-blue-500 ml-1 animate-pulse">:</span>
                  <span className="text-2xl align-top ml-1 text-gray-400">{time.getSeconds().toString().padStart(2, '0')}</span>
                </>
              ) : (
                <span className="opacity-20">00:00:00</span>
              )}
            </span>
          </motion.div>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {quickLinks.map((link, idx) => (
            <Link href={link.href} key={link.name}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, type: 'spring', damping: 15 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card group p-8 cursor-pointer relative overflow-hidden h-full flex flex-col justify-between border-white/[0.05] hover:border-white/20 transition-all"
              >
                <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    {link.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{link.name}</h3>
                  <p className="text-sm text-gray-500 font-medium">Manage your {link.name.toLowerCase()}</p>
                </div>

                <div className="mt-8 flex items-end justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-white">{link.count}</span>
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Items</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Secondary Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-200">Recent Activity</h2>
              <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest">View History</button>
            </div>
            <div className="space-y-4">
              {stats.recentActivity.map((a: any, i: number) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={i}
                  className="glass-card p-5 flex items-center gap-5 border-white/[0.03] hover:border-white/10 transition-all hover:bg-white/[0.05]"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                    ⚡
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-200 font-medium">{a.action}</p>
                    <p className="text-xs text-gray-500 font-medium">{new Date(a.createdAt).toLocaleDateString()} · {new Date(a.createdAt).toLocaleTimeString()}</p>
                  </div>
                  <div className="text-[10px] font-black uppercase px-2 py-1 rounded-md bg-white/5 text-gray-600">Sync</div>
                </motion.div>
              ))}
              {stats.recentActivity.length === 0 && (
                <div className="text-center py-20 glass-card border-dashed border-white/10 text-gray-600">
                  <div className="text-3xl mb-4 text-white/5">🌫️</div>
                  <p className="font-medium">No recent signals detected.</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8 text-gray-200">System Pulse</h2>
            <div className="glass-card p-8 bg-gradient-to-br from-blue-600/5 to-purple-600/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-2xl rounded-full" />
              <div className="space-y-6 relative z-10">
                <StatusItem label="API Infrastructure" status="Operational" color="bg-emerald-500" />
                <StatusItem label="Data Synchronization" status="Live" color="bg-emerald-500" />
                <StatusItem label="Encrypted Storage" status="Secured" color="bg-emerald-500" />
                <StatusItem label="Cloud Network" status="Optimized" color="bg-sky-500" />
              </div>

              <div className="mt-10 pt-10 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute inset-0" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500 relative" />
                  </div>
                  <span className="text-xs font-bold text-emerald-500/80 uppercase tracking-widest">All Systems Healthy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusItem({ label, status, color }: { label: string; status: string; color: string }) {
  return (
    <div className="flex justify-between items-center group/item">
      <span className="text-sm text-gray-400 font-medium group-hover/item:text-gray-300 transition-colors">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-black text-gray-200 uppercase tracking-widest">{status}</span>
        <div className={`w-1.5 h-1.5 rounded-full ${color} shadow-[0_0_8px_${color === 'bg-emerald-500' ? '#10b981' : '#0ea5e9'}]`} />
      </div>
    </div>
  );
}
