"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Download } from 'lucide-react';

const links = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#projects' },
    { name: 'Awards', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [hidden, setHidden] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [resumeOpen, setResumeOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (previous !== undefined && latest > previous && latest > 200) {
            setHidden(true);
            setMobileOpen(false);
        } else {
            setHidden(false);
        }
    });

    if (pathname && pathname !== '/' && !pathname.startsWith('/#')) return null;

    return (
        <>
            <motion.nav
                variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] as any }}
                className="fixed top-0 left-0 right-0 z-[100] mix-blend-difference"
            >
                <div className="px-6 md:px-16">
                    <div className="flex items-center justify-between h-20 md:h-24">
                        {/* Logo */}
                        <Link href="/" className="magnetic">
                            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-white">
                                Sagar M.
                            </span>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-10">
                            {links.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors duration-300 magnetic"
                                    whileHover={{ y: -2 }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>

                        {/* Résumé + Mobile Toggle */}
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => setResumeOpen(true)}
                                className="hidden md:block text-[11px] font-mono tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors magnetic"
                            >
                                Résumé ↗
                            </button>

                            <button
                                className="md:hidden flex flex-col gap-[5px] p-2 magnetic"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label="Menu"
                            >
                                <motion.span className="block w-5 h-[1px] bg-white origin-left" animate={mobileOpen ? { rotate: 45 } : { rotate: 0 }} />
                                <motion.span className="block w-5 h-[1px] bg-white" animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} />
                                <motion.span className="block w-5 h-[1px] bg-white origin-left" animate={mobileOpen ? { rotate: -45 } : { rotate: 0 }} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu — Full Screen */}
                <motion.div
                    initial={false}
                    animate={mobileOpen ? { opacity: 1, pointerEvents: "auto" as any } : { opacity: 0, pointerEvents: "none" as any }}
                    transition={{ duration: 0.4 }}
                    className="md:hidden fixed inset-0 top-20 bg-[#0a0a0a]/98 backdrop-blur-xl z-50 flex flex-col justify-center px-6"
                >
                    {links.map((link, i) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            initial={{ opacity: 0, x: -30 }}
                            animate={mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                            transition={{ delay: i * 0.05, duration: 0.3 }}
                            className="text-4xl font-black tracking-tight text-white py-4 border-b border-white/[0.04]"
                        >
                            {link.name}
                        </motion.a>
                    ))}
                    <motion.button
                        onClick={() => {
                            setMobileOpen(false);
                            setResumeOpen(true);
                        }}
                        initial={{ opacity: 0, x: -30 }}
                        animate={mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ delay: links.length * 0.05, duration: 0.3 }}
                        className="text-4xl font-black tracking-tight text-neutral-400 py-4 border-b border-white/[0.04] text-left"
                    >
                        Résumé
                    </motion.button>
                </motion.div>
            </motion.nav>

            {/* Resume Modal Overlay */}
            <AnimatePresence>
                {resumeOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ delay: 0.1, duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                            className="relative w-full max-w-5xl h-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50/80 backdrop-blur">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-sm font-semibold text-neutral-800">Sagar M. Résumé</h3>
                                    <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-neutral-200 text-[10px] font-mono font-medium text-neutral-600 uppercase tracking-widest">
                                        PDF Version
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <a
                                        href="/resume.pdf"
                                        download
                                        className="flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium rounded-full transition-colors"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        <span>Download</span>
                                    </a>
                                    <button
                                        onClick={() => setResumeOpen(false)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-600 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            
                            {/* PDF Viewer */}
                            <div className="flex-1 w-full bg-neutral-100">
                                <iframe
                                    src="/resume.pdf"
                                    className="w-full h-full border-0"
                                    title="Sagar M. Resume"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
