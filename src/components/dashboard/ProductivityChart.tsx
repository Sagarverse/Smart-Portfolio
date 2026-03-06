"use client";
import { motion } from 'framer-motion';

interface ChartDataPoint {
  label: string;
  value: number;
  maxValue?: number;
}

interface ProductivityChartProps {
  title: string;
  data: ChartDataPoint[];
  color: string;
  height?: number;
}

export default function ProductivityChart({ title, data, color, height = 200 }: ProductivityChartProps) {
  const maxValue = Math.max(...data.map(d => d.maxValue || d.value), 10);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const barVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: '100%',
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all group">
      {/* Background glow */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 blur-2xl transition-all`} />

      {/* Header */}
      <div className="mb-6 relative z-10">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-xs text-gray-500 mt-1 font-medium">Last 7 days</p>
      </div>

      {/* Chart */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-end justify-between gap-2 relative z-10"
        style={{ height }}
      >
        {data.map((point, idx) => (
          <motion.div key={idx} className="flex-1 flex flex-col items-center gap-2 group/bar">
            {/* Bar */}
            <motion.div
              variants={barVariants}
              className={`w-full rounded-t-lg bg-gradient-to-t ${color} shadow-lg group-hover/bar:shadow-xl transition-all opacity-80 group-hover/bar:opacity-100 relative overflow-hidden`}
              style={{ minHeight: '8px' }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/bar:opacity-20 animate-pulse" />
            </motion.div>

            {/* Label */}
            <div className="text-center w-full">
              <p className="text-xs font-semibold text-gray-300">{point.value}</p>
              <p className="text-[10px] text-gray-500 font-medium">{point.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-white/5 relative z-10">
        <p className="text-xs text-gray-500 text-center">Peak: <span className="text-white font-bold">{maxValue} items</span></p>
      </div>
    </div>
  );
}
