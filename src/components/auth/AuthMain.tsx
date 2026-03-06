"use client";
import { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import GoogleOAuthButton from './GoogleOAuthButton';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function AuthMain({ mode }: { mode: 'login' | 'register' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const setUser = useUserStore((s) => s.setUser);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!email || !password || (mode === 'register' && !name)) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const body = mode === 'login' ? { email, password } : { email, password, name };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
        toast.success(mode === 'login' ? 'Welcome back!' : 'Account created successfully!');
        // Small delay for visual feedback, then redirect
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 500);
      } else {
        const errorMessage = data.error || 'Authentication failed';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      const errorMessage = 'Something went wrong. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[2.5rem] blur opacity-25" />
        <div className="relative p-10 rounded-[2.5rem] bg-gray-900/40 backdrop-blur-3xl border border-white/10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Join the Hub'}
            </h1>
            <p className="text-gray-400 text-sm font-medium">
              {mode === 'login' ? 'Sign in to access your productivity suite.' : 'Create your account and start organizing.'}
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <AuthInput
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon="👤"
                disabled={loading}
              />
            )}
            <AuthInput
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon="📧"
              disabled={loading}
            />
            <AuthInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon="🔒"
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 mt-4 h-[56px] flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                mode === 'login' ? 'Sign In' : 'Sign Up'
              )}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4 text-xs text-gray-600 uppercase tracking-widest font-bold">
            <div className="flex-1 h-px bg-white/5" />
            <span>Or continue with</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <GoogleOAuthButton disabled={loading} />

          <div className="mt-8 text-center text-sm">
            <span className="text-gray-500">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            </span>
            <a
              href={mode === 'login' ? '/register' : '/login'}
              className="ml-2 font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              {mode === 'login' ? 'Create one' : 'Sign in'}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function AuthInput({
  type,
  placeholder,
  value,
  onChange,
  icon,
  disabled = false,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: string;
  disabled?: boolean;
}) {
  return (
    <div className="relative group">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-50 group-focus-within:opacity-100 transition-opacity">
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required
        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-blue-500/50 focus:bg-white/10 text-white placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all outline-none"
      />
    </div>
  );
}
