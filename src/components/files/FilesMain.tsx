"use client";
import { useEffect, useRef } from 'react';
import { useFilesStore } from '@/store/useFilesStore';
import { useFileUpload } from '@/hooks/useFileUpload';
import { motion, AnimatePresence } from 'framer-motion';

export default function FilesMain() {
  const { files, setFiles } = useFilesStore();
  const { uploadFile, progress, url, error: uploadError, isUploading, reset } = useFileUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch files only once on mount
    fetch('/api/files')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.files)) {
          // Deduplicate by ID and sort by creation date
          const uniqueMap = new Map();
          data.files.forEach((file: any) => {
            if (!uniqueMap.has(file.id)) {
              uniqueMap.set(file.id, file);
            }
          });
          const uniqueFiles = Array.from(uniqueMap.values())
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setFiles(uniqueFiles);
        }
      })
      .catch(err => console.error("Files fetch error:", err));
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = `${Date.now()}_${file.name}`;
    const path = `user_files/${fileName}`;

    try {
      // Start upload process
      uploadFile(file, path);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      // Reset input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Effect to sync file metadata to database once URL is available
  useEffect(() => {
    if (url && !isUploading) {
      let isMounted = true;
      
      const persistMetadata = async () => {
        try {
          const fileName = url.includes('/') 
            ? url.split('/').pop()?.split('?')[0] || 'uploaded_file'
            : url.includes(';name=') 
            ? url.split(';name=')[1] 
            : 'uploaded_file';
          
          const res = await fetch('/api/files', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: fileName,
              url: url,
              type: 'application/octet-stream',
              size: 0,
            }),
          });
          
          if (res.ok && isMounted) {
            const data = await res.json();
            // Deduplicate: only add if not already in files array
            const exists = files.some(f => f.id === data.file.id);
            if (!exists) {
              setFiles([data.file, ...files]);
            }
            // Reset upload state after successful save
            reset();
          } else if (!res.ok) {
            console.error('Failed to save file metadata');
          }
        } catch (err) {
          console.error("Failed to persist file metadata:", err);
        }
      };
      
      persistMetadata();
      
      return () => {
        isMounted = false;
      };
    }
  }, [url, isUploading, reset, files, setFiles]);

  return (
    <div className="min-h-screen bg-transparent py-32 px-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20"
        >
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-4 block">Secure Asset Vault</span>
            <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-white to-cyan-400 tracking-tighter mb-4">
              Cloud Storage
            </h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Encrypted, decentralized-ready, and accessible from anywhere in the world.
            </p>
          </div>

          <div className="relative group w-full md:w-auto">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full md:w-auto px-10 py-5 bg-white text-gray-950 rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:scale-105 transition-all flex items-center justify-center gap-3 active:scale-95">
              <span className="text-xl">📤</span> Upload New Asset
            </button>
          </div>
        </motion.div>

        {progress > 0 && progress < 100 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-12 p-8 rounded-3xl glass-card border-emerald-500/30"
          >
            <div className="flex justify-between mb-4 text-xs font-black uppercase tracking-widest text-emerald-400">
              <div className="flex items-center gap-2">
                <span className="animate-pulse">●</span> Transmitting Data...
              </div>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}

        {uploadError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-12 p-6 rounded-2xl glass-card border-yellow-500/30 bg-yellow-500/10"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-bold text-yellow-400 mb-1">Upload Notice</p>
                <p className="text-sm text-gray-300">{uploadError}</p>
                {uploadError.includes('Firebase') && (
                  <p className="text-xs text-gray-400 mt-2">
                    Files will be stored in the database. Configure Firebase for cloud storage.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {files.map((file, idx) => (
              <motion.div
                key={file.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05, type: 'spring', damping: 20, stiffness: 100 }}
                className="glass-card p-6 group hover:border-white/20 transition-all flex flex-col h-full relative"
              >
                {/* File Icon / Preview */}
                <div className="mb-6 aspect-video rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-4xl group-hover:bg-white/10 transition-colors relative overflow-hidden">
                  {file.type.includes('image') ? (
                    <>
                      <img src={file.url} alt="" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                      <span className="absolute">🖼️</span>
                    </>
                  ) : '📄'}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex-1 min-w-0 mb-6">
                  <h3 className="font-bold text-white text-lg truncate mb-1" title={file.name}>{file.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-black uppercase text-emerald-400 border border-emerald-500/20">
                      {file.type.split('/')[1]?.toUpperCase() || 'DATA'}
                    </span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">
                      {Math.round(file.size / 1024)} KB
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-emerald-400 transition-colors flex items-center gap-1 group/link"
                  >
                    Download <span className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform">↗</span>
                  </a>
                  <button 
                    onClick={async () => {
                      try {
                        // Delete from database
                        await fetch(`/api/files?id=${file.id}`, { method: 'DELETE' });
                        // Remove from store
                        useFilesStore.setState(state => ({
                          files: state.files.filter(f => f.id !== file.id)
                        }));
                      } catch (err) {
                        console.error('Failed to delete file:', err);
                      }
                    }}
                    className="w-8 h-8 rounded-lg bg-red-500/5 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20 flex items-center justify-center hover:scale-110"
                    title="Delete file"
                  >
                    🗑️
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {files.length === 0 && !progress && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-40 text-center rounded-[3rem] border border-dashed border-white/5 bg-white/[0.01]"
          >
            <div className="text-6xl mb-8 opacity-20">🧊</div>
            <h3 className="text-2xl font-black text-gray-400 mb-2 uppercase tracking-tighter">Vault Empty</h3>
            <p className="text-gray-600 font-medium">No assets currently stored in the decentralized link.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
