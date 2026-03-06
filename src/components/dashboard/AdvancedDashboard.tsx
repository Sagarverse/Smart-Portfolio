"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductivityStatCard from './ProductivityStatCard';
import ProductivityChart from './ProductivityChart';
import GoalProgressWidget from './GoalProgressWidget';
import ActivityTimeline from './ActivityTimeline';

interface DashboardData {
  stats?: {
    totalNotes: number;
    totalFiles: number;
    clipboardActivity: number;
    totalTodos: number;
    completedTodos: number;
    completionRate: number;
    recentActivity: any[];
  };
}

export default function AdvancedDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Dashboard error:', err);
        setLoading(false);
      });
  }, []);

  const stats = data?.stats || {
    totalNotes: 0,
    totalFiles: 0,
    clipboardActivity: 0,
    totalTodos: 0,
    completedTodos: 0,
    completionRate: 0,
    recentActivity: [],
  };

  // Sample productivity data for the week
  const weeklyData = [
    { label: 'Mon', value: 3 },
    { label: 'Tue', value: 5 },
    { label: 'Wed', value: 4 },
    { label: 'Thu', value: 6 },
    { label: 'Fri', value: 7 },
    { label: 'Sat', value: 2 },
    { label: 'Sun', value: 1 },
  ];

  // Sample goals
  const goals = [
    {
      id: '1',
      name: 'Daily Notes',
      target: 5,
      current: Math.min(stats.totalNotes % 5 + 2, 5),
      icon: '📝',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: '2',
      name: 'Complete Todos',
      target: 10,
      current: stats.completedTodos,
      icon: '✅',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: '3',
      name: 'Save Files',
      target: 20,
      current: stats.totalFiles,
      icon: '📁',
      color: 'from-orange-500 to-yellow-500',
    },
  ];

  // Convert recent activity to timeline events
  const timelineEvents = stats.recentActivity.slice(0, 10).map((activity: any, idx: number) => {
    const activityStr = activity.action || '';
    let type: 'note' | 'todo' | 'file' | 'clipboard' = 'clipboard';
    let emoji = '📋';
    
    if (activityStr.includes('Note')) {
      type = 'note';
      emoji = '📝';
    } else if (activityStr.includes('Todo')) {
      type = 'todo';
      emoji = '✅';
    } else if (activityStr.includes('File')) {
      type = 'file';
      emoji = '📁';
    }
    
    return {
      id: idx.toString(),
      type,
      title: activityStr,
      time: new Date(activity.createdAt),
      emoji,
    };
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }} className="text-4xl">
          ⚙️
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 pb-32">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tighter">
            Productivity <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Analytics</span>
          </h1>
          <p className="text-gray-400 text-lg">Track your performance and achieve your goals</p>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ProductivityStatCard icon="📝" label="Total Notes" value={stats.totalNotes} trend={12} color="from-purple-500 to-pink-500" detail="Keep growing" />
          <ProductivityStatCard icon="✅" label="Todos Completed" value={stats.completedTodos} trend={8} color="from-blue-500 to-cyan-500" detail={`${stats.completionRate}% completion rate`} />
          <ProductivityStatCard icon="📁" label="Files Stored" value={stats.totalFiles} trend={5} color="from-orange-500 to-yellow-500" detail="Well organized" />
          <ProductivityStatCard icon="📋" label="Clipboard Items" value={stats.clipboardActivity} trend={-3} color="from-green-500 to-emerald-500" detail="Quick access ready" />
        </div>

        {/* Charts and Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Productivity Chart - spans 2 columns */}
          <div className="lg:col-span-2">
            <ProductivityChart title="Content Creation" data={weeklyData} color="from-blue-500 to-purple-600" height={250} />
          </div>

          {/* Goals Widget */}
          <div>
            <GoalProgressWidget goals={goals} />
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="mb-8">
          <ActivityTimeline events={timelineEvents} />
        </div>

        {/* Insights Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-2xl p-8 backdrop-blur-xl border border-white/10 group">
          {/* Background glow */}
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-5 group-hover:opacity-10 blur-3xl transition-all" />

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">🎯</span> Insights & Recommendations
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Insight 1 */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <p className="text-sm text-gray-300 mb-3">
                  <strong className="text-white">Peak Productivity:</strong> You're most productive on <span className="text-blue-400">Fridays</span> with an average of 7 items created.
                </p>
              </motion.div>

              {/* Insight 2 */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <p className="text-sm text-gray-300 mb-3">
                  <strong className="text-white">Task Completion:</strong> You're at <span className="text-green-400">{stats.completionRate}% completion</span> rate. Keep it up!
                </p>
              </motion.div>

              {/* Insight 3 */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <p className="text-sm text-gray-300 mb-3">
                  <strong className="text-white">Organization:</strong> You have <span className="text-purple-400">{stats.totalNotes} notes</span> neatly organized.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
