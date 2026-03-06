"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/useUserStore';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Notes', href: '/notes', icon: '📝' },
    { name: 'Clipboard', href: '/clipboard', icon: '📋' },
    { name: 'Files', href: '/files', icon: '📁' },
    { name: 'Todo', href: '/todo', icon: '✅' },
];

export default function Navbar() {
    const pathname = usePathname();
    const user = useUserStore((s) => s.user);
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (pathname === '/login' || pathname === '/register') return null;
    if (!mounted) return null;

    return (
        <nav className="fixed bottom-6 left-0 right-0 z-50 px-4 pointer-events-none">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="max-w-2xl mx-auto px-6 py-3 rounded-[2.5rem] border border-white/10 bg-gray-900/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between pointer-events-auto relative overflow-hidden group"
            >
                {/* Inner Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

                <div className="flex items-center gap-8 relative z-10">
                    <Link href="/" className="group/logo flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs shadow-lg shadow-blue-500/20 group-hover/logo:scale-110 transition-transform">
                            ✨
                        </div>
                        <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            SGR
                        </span>
                    </Link>

                    <div className="h-6 w-px bg-white/10 mx-2" />

                    <div className="flex items-center gap-1 md:gap-4">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative px-4 py-2 flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 rounded-2xl'}`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute inset-0 bg-white/10 rounded-2xl z-[-1] shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="text-base">{item.icon}</span>
                                    <span className="hidden md:block">{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    {user ? (
                        <div className="relative">
                            <motion.button
                                onClick={() => setIsOpen(!isOpen)}
                                className="w-10 h-10 flex items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 hover:border-blue-400/50 transition-all group"
                                title={`Account - ${user.name || user.email}`}
                            >
                                <span className="text-lg group-hover:scale-110 transition-transform">👤</span>
                            </motion.button>

                            {/* Account Dropdown Menu */}
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    className="absolute top-14 right-0 w-64 rounded-2xl border border-white/10 bg-gray-900/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                                >
                                    {/* User Info */}
                                    <div className="px-4 py-4 border-b border-white/5 bg-gradient-to-br from-blue-500/10 to-purple-600/10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-black text-sm">
                                                {(user.name || user.email)[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm">{user.name || 'User'}</p>
                                                <p className="text-gray-400 text-xs truncate">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-2">
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all border-l-2 border-transparent hover:border-blue-500"
                                        >
                                            <span className="text-lg">📊</span>
                                            <span className="text-sm font-medium">Dashboard</span>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setIsOpen(false);
                                                // Settings logic here
                                                alert('Settings coming soon!');
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all border-l-2 border-transparent hover:border-purple-500 text-left"
                                        >
                                            <span className="text-lg">⚙️</span>
                                            <span className="text-sm font-medium">Settings</span>
                                        </button>
                                        <hr className="my-2 border-white/5" />
                                        <Link
                                            href="/logout"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all border-l-2 border-transparent hover:border-red-500"
                                        >
                                            <span className="text-lg">🚪</span>
                                            <span className="text-sm font-medium">Logout</span>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    ) : null}
                </div>
            </motion.div>
        </nav>
    );
}
