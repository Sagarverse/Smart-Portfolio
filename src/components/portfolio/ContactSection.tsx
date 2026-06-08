"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (res.ok) setSent(true);
      else setError('Failed to send.');
    } catch { setError('Something went wrong.'); }
    finally { setLoading(false); }
  }

  return (
    <section className="relative py-40 md:py-56 px-6 md:px-16" id="contact">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Label */}
        <div className="flex items-start gap-6 md:gap-12 mb-20 md:mb-32">
          <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-600 uppercase mt-2 shrink-0">( 05 )</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-mono tracking-[0.3em] text-neutral-500 uppercase"
          >
            Contact
          </motion.h2>
        </div>

        {/* Giant CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-black tracking-[-0.06em] leading-[0.85] text-white mb-8">
            Let's<br />
            <span className="font-serif italic font-normal text-neutral-400">work</span>{" "}
            together.
          </h2>
        </motion.div>

        {/* Two Column: Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-lg text-neutral-500 leading-relaxed font-light max-w-md">
              Have an idea, a project, or just want to connect? I'm always open to interesting conversations and new challenges.
            </p>

            <div className="space-y-6 pt-4">
              <a href="mailto:sagisagar1974@gmail.com" className="group flex items-baseline gap-8 py-4 border-b border-white/[0.04] hover:border-white/[0.08] transition-colors">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-600 shrink-0">Email</span>
                <span className="text-white group-hover:text-neutral-300 transition-colors">sagisagar1974@gmail.com</span>
              </a>
              <div className="flex items-baseline gap-8 py-4 border-b border-white/[0.04]">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-600 shrink-0">Location</span>
                <span className="text-neutral-400">Bengaluru, Karnataka, India</span>
              </div>
              <a href="https://github.com/Sagarverse" target="_blank" rel="noopener noreferrer" className="group flex items-baseline gap-8 py-4 border-b border-white/[0.04] hover:border-white/[0.08] transition-colors">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-600 shrink-0">GitHub</span>
                <span className="text-white group-hover:text-neutral-300 transition-colors">github.com/Sagarverse</span>
              </a>
              <a href="https://linkedin.com/in/sagarverse" target="_blank" rel="noopener noreferrer" className="group flex items-baseline gap-8 py-4 border-b border-white/[0.04] hover:border-white/[0.08] transition-colors">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-600 shrink-0">LinkedIn</span>
                <span className="text-white group-hover:text-neutral-300 transition-colors">linkedin.com/in/sagarverse</span>
              </a>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <p className="text-4xl font-serif italic text-neutral-300 mb-4">Thank you.</p>
                <p className="text-neutral-500">I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-600 block mb-3">Name</label>
                  <input name="name" type="text" required className="w-full bg-transparent border-b border-white/[0.06] pb-3 text-white text-lg focus:outline-none focus:border-white/20 transition-colors placeholder:text-neutral-700" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-600 block mb-3">Email</label>
                  <input name="email" type="email" required className="w-full bg-transparent border-b border-white/[0.06] pb-3 text-white text-lg focus:outline-none focus:border-white/20 transition-colors placeholder:text-neutral-700" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-600 block mb-3">Message</label>
                  <textarea name="message" required rows={4} className="w-full bg-transparent border-b border-white/[0.06] pb-3 text-white text-lg focus:outline-none focus:border-white/20 transition-colors resize-none placeholder:text-neutral-700" placeholder="Tell me about your project..." />
                </div>
                <button type="submit" disabled={loading} className="group mt-4 flex items-center gap-4 text-[11px] font-mono tracking-[0.3em] uppercase text-white hover:text-neutral-300 transition-colors disabled:opacity-50 magnetic">
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                  <span className="w-8 h-[1px] bg-white group-hover:w-16 transition-all" />
                </button>
                {error && <p className="text-red-400/70 text-sm mt-4">{error}</p>}
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-40 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-700">© 2025 Sagar M.</span>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-700">Designed & Built by Sagar M.</span>
        </div>
      </div>
    </section>
  );
}
