"use client";
import { motion } from 'framer-motion';

interface StatCardProps {
  icon: string;
  label: string;
  value: number | string;
  trend?: number;
  color: string;
  detail?: string;
}

export default function ProductivityStatCard({ icon, label, value, trend, color, detail }: StatCardProps) {
  const isPositivetrend = trend && trend >= 0;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative overflow-hidden rounded-2xl p-6 group backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all cursor-default`}
    >
      {/* Animated gradient background */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-15 blur-2xl transition-all duration-500 group-hover:scale-150`} />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className={`text-3xl p-3 rounded-xl bg-gradient-to-br ${color} bg-opacity-10`}>
            {icon}
          </div>
          {trend !== undefined && (
            <div className={`text-xs font-bold px-3 py-1 rounded-full ${isPositivetrend ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {isPositivetrend ? '↑' : '↓'} {Math.abs(trend)}%
            </div>
          )}
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-400 font-medium mb-1">{label}</p>
          <p className="text-3xl font-black text-white">{value}</p>
        </div>

        {detail && <p className="text-xs text-gray-500 font-medium">{detail}</p>}
      </div>
    </motion.div>
  );
}
