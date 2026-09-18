import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { LoadingScreen } from './components/LoadingScreen';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { MissionCompleteSection } from './components/MissionCompleteSection';

function AppContent() {
  const location = useLocation();
  const [initialLoading, setInitialLoading] = useState(() => {
    // If the user navigates directly to the explicit /loading route, don't double mount
    if (typeof window !== 'undefined' && window.location.hash.includes('/loading')) {
      return false;
    }
    return true;
  });

  if (initialLoading && location.pathname !== '/loading') {
    return (
      <div className="w-full h-[100dvh] min-h-[100dvh] overflow-hidden bg-[#06080d] text-slate-100 font-sans relative">
        <LoadingScreen onComplete={() => setInitialLoading(false)} redirectPath={location.pathname || "/"} />
      </div>
    );
  }

  return (
    <div className="w-full h-[100dvh] min-h-[100dvh] overflow-hidden bg-[#06080d] text-slate-100 font-sans selection:bg-pink-500 selection:text-white relative">
      <main className="w-full h-full">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/loading" element={<LoadingScreen redirectPath="/" />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/skills" element={<SkillsSection />} />
          <Route path="/projects" element={<ProjectsSection />} />
          <Route path="/experience" element={<ExperienceSection />} />
          <Route path="/education" element={<EducationSection />} />
          <Route path="/services" element={<ServicesSection />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/exit" element={<MissionCompleteSection />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

