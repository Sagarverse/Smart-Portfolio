// Google OAuth button
"use client";

export default function GoogleOAuthButton({ disabled = false }: { disabled?: boolean }) {
  const handleGoogleAuth = () => {
    if (disabled) return;
    // TODO: Implement Google OAuth flow
    // This will redirect to /api/auth/google endpoint
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.warn('Google OAuth is not configured. Set NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env');
      alert('Google OAuth is not configured yet.');
      return;
    }
    // For now, show a message
    alert('Google OAuth coming soon!');
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleGoogleAuth}
      className="w-full px-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3c0 1.657 1.343 3 3 3s3-1.343 3-3z" />
      </svg>
      Continue with Google
    </button>
  );
}
