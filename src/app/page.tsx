// Sagar M. — Portfolio
import HeroSection from '@/components/portfolio/HeroSection';
import MarqueeTicker from '@/components/portfolio/MarqueeTicker';
import AboutSection from '@/components/portfolio/AboutSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import ContactSection from '@/components/portfolio/ContactSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-200 noise-bg">
      <HeroSection />
      <MarqueeTicker />
      <AboutSection />
      <div className="section-divider max-w-7xl mx-auto" />
      <SkillsSection />
      <div className="section-divider max-w-7xl mx-auto" />
      <ProjectsSection />
      <div className="section-divider max-w-7xl mx-auto" />
      <ExperienceSection />
      <div className="section-divider max-w-7xl mx-auto" />
      <ContactSection />
    </main>
  );
}
