import { Toaster } from 'react-hot-toast';
import '../styles/tailwind.css';
import Navbar from '@/components/layout/Navbar';
import QuickCreateButton from '@/components/QuickCreateButton';
import OnboardingTour from '@/components/OnboardingTour';
import AuthModal from '@/components/auth/AuthModal';
import LenisProvider from '@/components/ui/LenisProvider';
import CustomCursor from '@/components/ui/CustomCursor';
import Preloader from '@/components/ui/Preloader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-slate-200 selection:bg-blue-500/30 overflow-x-hidden" suppressHydrationWarning>
        <Preloader />
        <CustomCursor />
        
        {/* Global Mesh Gradient Background */}
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-purple-600/10 blur-[120px] animate-pulse delay-1000" />
          <div className="absolute top-[20%] right-[15%] w-[25%] h-[25%] rounded-full bg-cyan-600/5 blur-[100px] animate-pulse delay-500" />
        </div>

        <LenisProvider>
          <Navbar />
          <main className="relative z-0">
            {children}
          </main>
          <QuickCreateButton />
          <OnboardingTour />
          <AuthModal />

          <Toaster position="top-right" toastOptions={{
            className: 'glass-card !bg-gray-900/60 !backdrop-blur-xl !border-white/10 !text-white !rounded-2xl !py-4 !px-6 shadow-2xl',
            duration: 4000,
          }} />
        </LenisProvider>
      </body>
    </html>
  );
}
