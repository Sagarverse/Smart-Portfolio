"use client";
import { motion } from 'framer-motion';

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  icon: string;
  color: string;
}

interface GoalProgressWidgetProps {
  goals: Goal[];
}

export default function GoalProgressWidget({ goals }: GoalProgressWidgetProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all group">
      {/* Background glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 opacity-5 group-hover:opacity-10 blur-2xl transition-all" />

      {/* Header */}
      <div className="mb-8 relative z-10">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="text-2xl">🎯</span> Weekly Goals
        </h3>
      </div>

      {/* Goals List */}
      <div className="space-y-6 relative z-10">
        {goals.map((goal) => {
          const percentage = (goal.current / goal.target) * 100;
          const isComplete = goal.current >= goal.target;

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group/goal"
            >
              {/* Goal Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{goal.icon}</span>
                  <div>
                    <p className="font-semibold text-white text-sm">{goal.name}</p>
                    <p className="text-xs text-gray-500">
                      <span className={isComplete ? 'text-green-400 font-bold' : 'text-white'}>
                        {goal.current}
                      </span>
                      <span className="text-gray-600"> / {goal.target}</span>
                    </p>
                  </div>
                </div>
                {isComplete && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-xl">
                    ✨
                  </motion.span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(percentage, 100)}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full rounded-full bg-gradient-to-r ${goal.color} shadow-lg`}
                />
              </div>

              {/* Percentage */}
              <p className="text-xs text-gray-500 mt-2 font-medium">
                {Math.min(Math.round(percentage), 100)}% complete
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Motivational Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 pt-6 border-t border-white/5 relative z-10"
      >
        <p className="text-xs text-center text-gray-500">
          Keep up the great work! <span className="text-green-400 font-bold">You're on track</span> 🚀
        </p>
      </motion.div>
    </div>
  );
}
