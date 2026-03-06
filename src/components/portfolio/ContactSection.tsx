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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setSent(true);
      else setError('Failed to send message.');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-32 px-4 relative" id="contact">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Have a project in mind? Or just want to say hi? I'm always open to discussing new ideas and opportunities.
            </p>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">📧</span>
                <span>sagisagar1974@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">📍</span>
                <span>Bengaluru, Karnataka</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-10"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-4xl mb-6">✓</div>
                <h3 className="text-2xl font-bold mb-2 text-white">Message Sent!</h3>
                <p className="text-gray-400">I'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input name="name" type="text" required placeholder="Name" className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors" />
                </div>
                <div>
                  <input name="email" type="email" required placeholder="Email" className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors" />
                </div>
                <div>
                  <textarea name="message" required placeholder="Your Message" className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors min-h-[150px]" />
                </div>
                <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-bold shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-50">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
