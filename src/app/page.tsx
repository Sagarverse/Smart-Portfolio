// Main landing page for Personal Productivity Hub
import HeroSection from '@/components/portfolio/HeroSection';
import QuickFeaturesSection from '@/components/portfolio/QuickFeaturesSection';
import FeaturesPreview from '@/components/portfolio/FeaturesPreview';
import AboutSection from '@/components/portfolio/AboutSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import ResumeSection from '@/components/portfolio/ResumeSection';
import ContactSection from '@/components/portfolio/ContactSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white dark">
      <HeroSection />
      <QuickFeaturesSection />
      <FeaturesPreview />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ResumeSection />
      <ContactSection />
    </main>
  );
}
