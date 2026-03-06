"use client";
import { useEffect, useState } from 'react';
import { useNotesStore } from '@/store/useNotesStore';
import { useNotesSync } from '@/hooks/useNotesSync';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotesMain() {
  const { notes, setNotes, addNote } = useNotesStore();
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Integrated Real-time Sync
  useNotesSync((updatedNotes) => {
    setNotes(updatedNotes);
  });

  useEffect(() => {
    fetch('/api/notes')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.notes)) {
          setNotes(data.notes);
        }
      })
      .catch(err => console.error("Notes fetch error:", err));
  }, [setNotes]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title || !newNote.content) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newNote.title,
          content: newNote.content,
          tags: newNote.tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        addNote(data.note);
        setIsCreating(false);
        setNewNote({ title: '', content: '', tags: '' });
      }
    } catch (err) {
      console.error("Failed to create note:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-24 px-4 pb-48 relative overflow-hidden">
      {/* Background Section Glow */}
      <div className="absolute top-1/4 right-0 w-[50%] h-[50%] bg-purple-600/5 blur-[150px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20"
        >
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500 mb-4 block">Archive of Intelligence</span>
            <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-500 tracking-tighter">
              Personal Wiki
            </h1>
            <p className="text-gray-400 mt-4 text-lg font-medium leading-relaxed">
              Your digital cognitive extension. <span className="text-purple-400/80">Always synchronized.</span>
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreating(true)}
            className="px-10 py-5 bg-white text-black rounded-2xl font-black shadow-2xl hover:bg-purple-500 hover:text-white transition-all group shrink-0"
          >
            Create New Intel <span className="ml-2 group-hover:rotate-90 transition-transform inline-block">+</span>
          </motion.button>
        </motion.div>

        {/* Modal for Creating Notes */}
        <AnimatePresence>
          {isCreating && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCreating(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl glass-card p-10 border-white/10"
              >
                <h2 className="text-3xl font-black mb-8 tracking-tighter">New Intelligence Entry</h2>
                <form onSubmit={handleCreate} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2">Subject</label>
                    <input
                      required
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                      placeholder="Enter title..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2">Content</label>
                    <textarea
                      required
                      rows={6}
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors resize-none"
                      placeholder="Detailed content..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2">Tags (comma separated)</label>
                    <input
                      value={newNote.tags}
                      onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                      placeholder="Work, AI, Research..."
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-8 py-4 bg-purple-500 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-purple-600 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Syncing...' : 'Secure Entry'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCreating(false)}
                      className="px-8 py-4 bg-white/5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {notes.map((note, idx) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group glass-card p-10 cursor-pointer border-white/[0.03] hover:border-white/20 transition-all hover:bg-white/[0.05] relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <h2 className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors tracking-tight leading-tight">
                    {note.title}
                  </h2>
                  {note.pinned && <span className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-sm">📌</span>}
                </div>

                <p className="text-gray-400 text-lg font-medium leading-relaxed mb-8 line-clamp-4 relative z-10">
                  {note.content}
                </p>

                <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                  {(typeof note.tags === 'string' ? JSON.parse(note.tags || '[]') : note.tags)?.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 text-gray-400 border border-white/5 text-[10px] font-black uppercase tracking-widest group-hover:border-purple-500/20 group-hover:text-purple-300 transition-all">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/5 flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500/40" />
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                      {note.updatedAt ? new Date(note.updatedAt).toLocaleDateString() : 'Draft'}
                    </span>
                  </div>
                  <div className="flex gap-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">✏️</button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">🗑️</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {notes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center glass-card border-dashed border-white/10 bg-white/[0.01]"
          >
            <div className="text-6xl mb-8 grayscale opacity-20">📂</div>
            <h3 className="text-2xl font-black text-gray-500 uppercase tracking-widest mb-2">Vault Empty</h3>
            <p className="text-gray-600 font-medium">Capture your cognitive breakthroughs.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
