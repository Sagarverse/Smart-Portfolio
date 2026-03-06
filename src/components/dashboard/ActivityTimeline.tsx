"use client";
import { motion } from 'framer-motion';

interface TimelineEvent {
  id: string;
  type: 'note' | 'todo' | 'file' | 'clipboard';
  title: string;
  time: Date;
  emoji: string;
}

interface ActivityTimelineProps {
  events: TimelineEvent[];
}

export default function ActivityTimeline({ events }: ActivityTimelineProps) {
  const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (secondsAgo < 60) return 'just now';
    if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m ago`;
    if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)}h ago`;
    return `${Math.floor(secondsAgo / 86400)}d ago`;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      note: 'from-purple-500 to-pink-500',
      todo: 'from-blue-500 to-cyan-500',
      file: 'from-orange-500 to-red-500',
      clipboard: 'from-green-500 to-emerald-500',
    };
    return colors[type] || 'from-gray-500 to-gray-600';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all group">
      {/* Background glow */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-500 to-indigo-500 opacity-5 group-hover:opacity-10 blur-2xl transition-all" />

      {/* Header */}
      <div className="mb-6 relative z-10">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="text-2xl">⚡</span> Activity Timeline
        </h3>
        <p className="text-xs text-gray-500 mt-1 font-medium">Your recent actions</p>
      </div>

      {/* Timeline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-0 relative z-10"
      >
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 to-transparent" />

        {/* Events */}
        {events.length > 0 ? (
          events.slice(0, 5).map((event, idx) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              className="pl-12 pb-6 relative group/event"
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`absolute left-0 top-1 w-9 h-9 rounded-full bg-gradient-to-br ${getTypeColor(event.type)} p-0.5 flex items-center justify-center`}
              >
                <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center text-lg">
                  {event.emoji}
                </div>
              </motion.div>

              {/* Event content */}
              <div className="p-3 rounded-lg bg-white/5 group-hover/event:bg-white/10 transition-all border border-white/[0.05] group-hover/event:border-white/20">
                <p className="text-sm font-semibold text-white line-clamp-1">{event.title}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium capitalize">
                  {event.type} · {getTimeAgo(event.time)}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-sm">No recent activity yet. Start creating! 🚀</p>
          </motion.div>
        )}
      </motion.div>

      {/* View More Link */}
      {events.length > 5 && (
        <motion.a
          href="#activity"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 pt-6 border-t border-white/5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors relative z-10 block text-center uppercase tracking-widest"
        >
          View all activity →
        </motion.a>
      )}
    </div>
  );
}
