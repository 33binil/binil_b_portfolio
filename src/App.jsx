import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { LoadingScreen } from './components/LoadingScreen';
import { AudioWarningPrompt } from './components/AudioWarningPrompt';
import { BackgroundMusic } from './components/BackgroundMusic';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { MissionCompleteSection } from './components/MissionCompleteSection';
import { setAudioMuted } from './utils/audio';

function AppContent() {
  const location = useLocation();
  const [initialLoading, setInitialLoading] = useState(() => {
    // If the user navigates directly to explicit /loading, don't double mount
    if (typeof window !== 'undefined' && window.location.hash.includes('/loading')) {
      return false;
    }
    return true;
  });

  const [showAudioWarning, setShowAudioWarning] = useState(false);

  // Step 1: Loading Screen on initial visit
  if (initialLoading && location.pathname !== '/loading') {
    return (
      <div className="w-full h-[100dvh] min-h-[100dvh] overflow-hidden bg-[#06080d] text-slate-100 font-sans relative">
        <LoadingScreen
          onComplete={() => {
            setInitialLoading(false);
            setShowAudioWarning(true);
          }}
          redirectPath={location.pathname || "/"}
        />
      </div>
    );
  }

  // Step 2: Audio Experience Config / System Advisory Dialog
  if (showAudioWarning) {
    return (
      <div className="w-full h-[100dvh] min-h-[100dvh] overflow-hidden bg-[#06080d] text-slate-100 font-sans relative">
        <AudioWarningPrompt
          onSelectChoice={(shouldMute) => {
            setAudioMuted(shouldMute);

            if (!shouldMute) {
              // User clicked [ PLAY WITH SONG ]: un-mute and immediately start the soundtrack
              window.dispatchEvent(
                new CustomEvent('portfolio-audio-mute-change', { detail: { isMuted: false } })
              );
              window.dispatchEvent(new CustomEvent('portfolio-play-soundtrack'));
            } else {
              // User clicked [ MUTE & CONTINUE ]: mute audio
              window.dispatchEvent(
                new CustomEvent('portfolio-audio-mute-change', { detail: { isMuted: true } })
              );
            }

            setShowAudioWarning(false);
          }}
        />
      </div>
    );
  }

  // Step 3: Hero page and interactive game terminal
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
      <BackgroundMusic />
      <AppContent />
    </Router>
  );
}
