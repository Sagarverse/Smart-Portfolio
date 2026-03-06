"use client";
import { useState, useEffect } from 'react';
import { useTodoStore } from '@/store/useTodoStore';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function TodoMain() {
  const { todos, setTodos, addTodo, updateTodo, deleteTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/todo')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.todos)) {
          setTodos(data.todos);
        }
      })
      .catch(err => console.error("Todo fetch error:", err));
  }, [setTodos]);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo }),
      });
      const data = await res.json();
      if (res.ok) {
        addTodo(data.todo);
        setNewTodo('');
        toast.success('Task added');
      }
    } catch (err) {
      toast.error('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const res = await fetch('/api/todo', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed: !completed }),
      });
      const data = await res.json();
      if (res.ok) {
        updateTodo(data.todo);
      }
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/todo?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        deleteTodo(id);
        toast.success('Task deleted');
      }
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className="min-h-screen py-24 px-4 pb-48">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-4 block">Execution Phase</span>
          <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-500 tracking-tighter">
            Daily Focus
          </h1>
          <p className="text-gray-400 mt-4 text-lg font-medium leading-relaxed">
            Eliminate distractions. <span className="text-orange-400/80">Conquer the day.</span>
          </p>
        </motion.div>

        {/* Add Todo Input */}
        <motion.form
          onSubmit={handleAddTodo}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative group mb-16"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative flex gap-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Deploy excellence..."
              className="flex-1 px-8 py-5 glass-card bg-white/[0.03] text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/30 focus:bg-white/5 transition-all text-lg font-medium"
            />
            <button
              type="submit"
              disabled={loading || !newTodo.trim()}
              className="px-10 bg-white text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50 disabled:scale-100 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-yellow-500 group-hover:text-white"
            >
              {loading ? '...' : 'Add'}
            </button>
          </div>
        </motion.form>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group glass-card p-5 flex items-center gap-5 border-white/[0.03] hover:border-white/20 transition-all hover:bg-white/[0.05]"
              >
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => toggleTodo(todo.id, todo.completed)}
                  className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${todo.completed
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : 'border-white/10 hover:border-orange-500/50 hover:bg-white/5'
                    }`}
                >
                  {todo.completed && <span className="text-sm">✓</span>}
                </motion.button>

                <span className={`flex-1 text-lg font-bold tracking-tight transition-all ${todo.completed ? 'text-gray-600 line-through' : 'text-gray-200'
                  }`}>
                  {todo.title}
                </span>

                <button
                  onClick={() => handleDelete(todo.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-red-400 transition-all"
                  title="Delete Task"
                >
                  <span className="text-xl">🗑️</span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {todos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center glass-card border-dashed border-white/10"
            >
              <div className="text-5xl mb-6 grayscale opacity-20">🎯</div>
              <p className="text-gray-500 text-xl font-black uppercase tracking-widest">Target Cleared</p>
              <p className="text-gray-600 mt-2 font-medium">All objectives have been met.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
