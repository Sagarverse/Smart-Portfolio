"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

const features = [
    {
        title: 'Universal Clipboard',
        description: 'Real-time clipboard synchronization across all your devices. Copy once, paste everywhere.',
        icon: '📋',
        href: '/clipboard',
        color: 'from-blue-500/20 to-cyan-500/20',
        borderColor: 'border-blue-500/30',
        textColor: 'text-blue-400'
    },
    {
        title: 'Secure Notes',
        description: 'Capture your thoughts in a high-performance markdown editor with instant cloud sync.',
        icon: '📝',
        href: '/notes',
        color: 'from-purple-500/20 to-pink-500/20',
        borderColor: 'border-purple-500/30',
        textColor: 'text-purple-400'
    },
    {
        title: 'Cloud Storage',
        description: 'Fast, secure, and permanent storage for your files. Accessible from any web browser.',
        icon: '📁',
        href: '/files',
        color: 'from-emerald-500/20 to-teal-500/20',
        borderColor: 'border-emerald-500/30',
        textColor: 'text-emerald-400'
    }
];

export default function FeaturesPreview() {
    return (
        <section className="py-32 px-4 relative overflow-hidden" id="features">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                        Powerful Productivity Suite
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Beyond the portfolio, SGR is a full-fledged ecosystem designed to streamline your digital workflow.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Link href={feature.href}>
                                <div className={`group relative p-10 h-full rounded-3xl border ${feature.borderColor} bg-gradient-to-br ${feature.color} backdrop-blur-xl hover:scale-[1.02] transition-all cursor-pointer shadow-2xl shadow-black/50`}>
                                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform origin-left">{feature.icon}</div>
                                    <h3 className={`text-2xl font-bold mb-4 ${feature.textColor}`}>
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed mb-8">
                                        {feature.description}
                                    </p>
                                    <div className={`inline-flex items-center gap-2 text-sm font-bold ${feature.textColor} group-hover:underline`}>
                                        Launch Tool ↗
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
