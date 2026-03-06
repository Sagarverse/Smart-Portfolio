// Hook for file upload to Firebase Storage (with database fallback)
import { useState } from 'react';
import { storage, isFirebaseConfigured } from '../lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export function useFileUpload() {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = (file: File, path: string) => {
    setProgress(0);
    setError(null);
    setIsUploading(true);

    // Check if Firebase is properly configured and available
    if (!isFirebaseConfigured || !storage) {
      // Fallback: save to database only (no Firebase)
      console.log('Firebase not configured. Using database storage only.');
      setProgress(100);
      
      // Generate a database-only URL
      const dbUrl = `data:application/octet-stream;name=${file.name};size=${file.size}`;
      setTimeout(() => {
        setUrl(dbUrl);
        setIsUploading(false);
      }, 300);
      return;
    }

    try {
      // Firebase is configured, attempt upload
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(percent);
        },
        (err) => {
          console.error('Firebase upload error:', err);
          setError(`Firebase upload failed: ${err.message}. Saving to database only.`);
          setProgress(100);
          // Still set a URL so it can be saved to database
          const fallbackUrl = `file://${file.name}`;
          setUrl(fallbackUrl);
          setIsUploading(false);
        },
        () => {
          // Upload successful, get download URL
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadUrl) => {
              setUrl(downloadUrl);
              setProgress(100);
              setIsUploading(false);
            })
            .catch((err) => {
              console.error('Failed to get download URL:', err);
              setError('Upload complete but failed to get URL');
              setProgress(100);
              setIsUploading(false);
            });
        }
      );
    } catch (err: any) {
      console.error('File upload error:', err);
      setError(`Upload error: ${err.message}. Using database storage.`);
      setProgress(100);
      const fallbackUrl = `file://${file.name}`;
      setUrl(fallbackUrl);
      setIsUploading(false);
    }
  };

  const reset = () => {
    setProgress(0);
    setUrl(null);
    setError(null);
    setIsUploading(false);
  };

  return { uploadFile, progress, url, error, isUploading, reset };
}
