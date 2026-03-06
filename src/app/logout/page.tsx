"use client";
import { useEffect } from 'react';

import { useUserStore } from '@/store/useUserStore';

export default function LogoutPage() {
  const logout = useUserStore((s) => s.logout);
  useEffect(() => {
    logout();
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.location.href = '/login';
  }, [logout]);
  return <div className="text-center py-16 text-blue-400">Logging out...</div>;
}
