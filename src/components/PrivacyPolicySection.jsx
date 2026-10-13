import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  ArrowLeft,
  Volume2,
  VolumeX,
  Star,
  Lock,
  Eye,
  FileText,
  Mail,
  ExternalLink,
  CheckCircle2,
  Terminal,
  Database,
  Globe,
  Home,
  MessageCircle,
} from 'lucide-react';
import { portfolioImages, contactData } from '../data/portfolioData';
import { playUiClick, playUiHover, toggleAudioMute, getIsAudioMuted } from '../utils/audio';

export const PrivacyPolicySection = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('18:56');
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setIsMuted(getIsAudioMuted());
    const handleMuteChange = (e) => {
      if (e.detail && typeof e.detail.isMuted === 'boolean') {
        setIsMuted(e.detail.isMuted);
      }
    };
    window.addEventListener('portfolio-audio-mute-change', handleMuteChange);
    return () => window.removeEventListener('portfolio-audio-mute-change', handleMuteChange);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hrs}:${mins}`);
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 10000);
    return () => clearInterval(timeInterval);
  }, []);

  // Keyboard navigation: Escape key returns to main menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        playUiClick();
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const handleBackToMenu = () => {
    playUiClick();
    navigate('/');
  };

  const handleToggleMute = () => {
    const muted = toggleAudioMute();
    setIsMuted(muted);
  };

  const handleNavigateTerms = () => {
    playUiClick();
    navigate('/terms');
  };

  const handleNavigateContact = () => {
    playUiClick();
    navigate('/contact');
  };

  return (
    <div className="relative w-full h-[100dvh] min-h-[100dvh] overflow-hidden bg-[#07090e] select-none flex flex-col justify-between">
      {/* Fullscreen Cinematic Background Art */}
      <div className="absolute inset-0 z-0">
        <img
          src={portfolioImages.experience}
          alt="Privacy Policy Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1]"
        />
        {/* Dark cyber gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040609]/95 via-[#06080d]/90 to-[#040609]/98 pointer-events-none" />
        <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* TOP HUD BAR                                                               */}
      {/* ========================================================================= */}
      <header className="relative z-20 w-full px-4 sm:px-8 md:px-12 pt-3 sm:pt-5 pb-2 flex items-center justify-between border-b border-white/10 bg-black/60 backdrop-blur-md flex-shrink-0">
        {/* Left: Branding & Page title */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackToMenu}
            onMouseEnter={playUiHover}
            className="p-2 rounded-lg bg-black/70 border border-white/20 hover:border-cyan-400 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase"
            title="Press ESC or Click to return to main menu"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">ESC // RETURN HUB</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[10px] sm:text-xs font-mono-code text-cyan-400 uppercase tracking-widest font-bold">
                LEGAL DIRECTIVE // SEC-01
              </span>
            </div>
            <h1 className="font-bebas text-2xl sm:text-4xl text-white tracking-wider leading-none">
              PRIVACY POLICY
            </h1>
          </div>
        </div>

        {/* Center: Switch tabs between Privacy and Terms */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-black/80 border border-white/15 rounded-lg font-mono-code text-xs">
          <button
            className="px-3 py-1.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.2)]"
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>PRIVACY POLICY</span>
          </button>
          <button
            onClick={handleNavigateTerms}
            onMouseEnter={playUiHover}
            className="px-3 py-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-pink-400" />
            <span>TERMS OF SERVICE</span>
          </button>
        </div>

        {/* Right: Clock & Audio HUD */}
        <div className="flex items-center gap-2 sm:gap-4 font-mono-code">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs text-white font-bold">{currentTime}</span>
            <span className="text-[10px] text-emerald-400 font-bold">VERIFIED // 2026</span>
          </div>

          <button
            onClick={handleToggleMute}
            className="p-2 rounded bg-black/70 border border-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-pink-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="md:hidden relative z-20 px-4 py-2 bg-black/80 border-b border-white/10 flex items-center justify-center gap-2 font-mono-code text-xs">
        <button className="flex-1 py-1.5 px-3 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold text-center">
          PRIVACY POLICY
        </button>
        <button
          onClick={handleNavigateTerms}
          className="flex-1 py-1.5 px-3 rounded bg-black/60 text-slate-400 border border-white/10 text-center"
        >
          TERMS OF SERVICE
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA - SCROLLABLE TERMINAL                                    */}
      {/* ========================================================================= */}
      <main className="relative z-20 flex-1 overflow-y-auto px-3.5 sm:px-8 md:px-12 py-4 sm:py-6 custom-game-scrollbar">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Terminal Banner / Overview Card */}
          <div className="glass-panel p-5 sm:p-7 rounded-2xl border border-cyan-500/30 shadow-[0_0_35px_rgba(0,240,255,0.12)] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10 font-mono-code text-xs">
              <div className="flex items-center gap-2 text-cyan-300">
                <Terminal className="w-4 h-4" />
                <span className="font-bold">DOCUMENT: PRIVACY-DIRECTIVE-v2.6</span>
              </div>
              <div className="text-slate-400">
                EFFECTIVE: <span className="text-emerald-400 font-bold">OCTOBER 2026</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Welcome to the official portfolio and web development showcase of{' '}
              <strong className="text-white font-semibold">Binil B</strong> (Full-Stack Developer & UI/UX Designer, based in Kerala, India). Your privacy and data confidentiality are respected at the highest standard. This Privacy Policy outlines what information is collected, how it is used, and your rights when navigating this interactive application or contacting me for software development contracts.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono-code text-[11px]">
              <div className="p-2.5 rounded-lg bg-black/50 border border-white/10 flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <div>
                  <div className="text-slate-400">DATA CONTROLLER</div>
                  <div className="text-white font-bold">Binil B (Independent)</div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-black/50 border border-white/10 flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <div>
                  <div className="text-slate-400">JURISDICTION</div>
                  <div className="text-white font-bold">Kerala, India (Global)</div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-black/50 border border-white/10 flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-slate-400">COMM-LINK</div>
                  <div className="text-white font-bold">33binilb@gmail.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: Information Collected */}
          <section className="glass-panel p-5 sm:p-7 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center font-mono-code text-xs font-bold">
                01
              </span>
              <h2 className="font-bebas text-xl sm:text-2xl text-white tracking-wide">
                INFORMATION WE COLLECT
              </h2>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              <p>
                This portfolio is an interactive presentation of professional experience, projects, and creative engineering. We do not require account registration or collect sensitive personal credentials. The data we may process includes:
              </p>
              
              <div className="space-y-2.5 pl-2 sm:pl-4 border-l-2 border-cyan-500/40 font-mono-code text-xs">
                <div>
                  <strong className="text-cyan-300 block">A. Direct Inquiries & Communications</strong>
                  <span className="text-slate-300 font-sans">
                    When you voluntarily reach out via the contact form, email (<code className="text-pink-300">33binilb@gmail.com</code>), WhatsApp, LinkedIn, or GitHub, we collect your name, email address, phone number (if supplied), and the text of your inquiry to discuss potential work engagements.
                  </span>
                </div>
                <div>
                  <strong className="text-cyan-300 block">B. Client-Side Preferences (Local Storage)</strong>
                  <span className="text-slate-300 font-sans">
                    We store lightweight local flags in your browser's <code className="text-cyan-300">localStorage</code> (such as your sound mute state <code className="text-pink-300">binil_portfolio_muted</code>) so your audio preferences persist as you browse different sectors.
                  </span>
                </div>
                <div>
                  <strong className="text-cyan-300 block">C. Technical Viewport Metrics</strong>
                  <span className="text-slate-300 font-sans">
                    Standard non-identifying telemetry (e.g. screen dimensions, browser user agent) is evaluated in memory solely to render responsive HUD panels and interactive animations. No persistent tracking fingerprints are recorded.
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Use of Information */}
          <section className="glass-panel p-5 sm:p-7 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-400/40 flex items-center justify-center font-mono-code text-xs font-bold">
                02
              </span>
              <h2 className="font-bebas text-xl sm:text-2xl text-white tracking-wide">
                HOW WE USE YOUR INFORMATION
              </h2>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              <p>
                Any communication details you provide are strictly utilized for the following legitimate purposes:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono-code text-xs">
                <li className="p-3 rounded-lg bg-black/40 border border-white/10 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Responding to contract opportunities, freelance inquiries, and project proposals.</span>
                </li>
                <li className="p-3 rounded-lg bg-black/40 border border-white/10 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Providing custom engineering consultations and UI/UX design wireframe reviews.</span>
                </li>
                <li className="p-3 rounded-lg bg-black/40 border border-white/10 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Delivering downloaded CV/Resume assets upon your explicit click.</span>
                </li>
                <li className="p-3 rounded-lg bg-black/40 border border-white/10 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Ensuring technical stability and glitch-free rendering across device form factors.</span>
                </li>
              </ul>
              <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-200 text-xs font-mono-code flex items-center gap-2">
                <Lock className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <span>
                  <strong>NO DATA SALE:</strong> Your personal information is never sold, traded, rented, or leased to advertisers, marketers, or data brokers.
                </span>
              </div>
            </div>
          </section>

          {/* Section 3: Third-Party Integrations */}
          <section className="glass-panel p-5 sm:p-7 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-400/40 flex items-center justify-center font-mono-code text-xs font-bold">
                03
              </span>
              <h2 className="font-bebas text-xl sm:text-2xl text-white tracking-wide">
                THIRD-PARTY INTEGRATIONS & EMBEDDED MEDIA
              </h2>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              <p>
                To provide a high-fidelity multimedia experience, this portfolio interacts with the following external services:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono-code text-xs">
                <div className="p-3 rounded-lg bg-black/50 border border-white/10">
                  <div className="text-cyan-300 font-bold mb-1">YouTube IFrame Audio Player</div>
                  <div className="text-slate-400 font-sans text-[12px]">
                    The interactive ambient background soundtrack is streamed via the official YouTube IFrame API. When audio is enabled, YouTube may process standard streaming connection data in accordance with Google's Privacy Policy.
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-black/50 border border-white/10">
                  <div className="text-cyan-300 font-bold mb-1">Google Fonts API</div>
                  <div className="text-slate-400 font-sans text-[12px]">
                    Typography (Bebas Neue, Space Grotesk, JetBrains Mono, Outfit) is loaded via Google Fonts CDN to ensure crisp typographic rendering.
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-black/50 border border-white/10">
                  <div className="text-cyan-300 font-bold mb-1">External Social Dispatches</div>
                  <div className="text-slate-400 font-sans text-[12px]">
                    Outbound links to LinkedIn, GitHub, Instagram, and WhatsApp direct you to third-party platforms governed by their independent privacy policies.
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-black/50 border border-white/10">
                  <div className="text-cyan-300 font-bold mb-1">Synthesized Web Audio</div>
                  <div className="text-slate-400 font-sans text-[12px]">
                    All HUD clicking sounds, hover blips, and mission passed chimes are generated entirely client-side using the browser Web Audio API oscillator—zero external audio servers called.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Data Retention & Security */}
          <section className="glass-panel p-5 sm:p-7 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center font-mono-code text-xs font-bold">
                04
              </span>
              <h2 className="font-bebas text-xl sm:text-2xl text-white tracking-wide">
                DATA SECURITY & USER RIGHTS
              </h2>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              <p>
                We enforce industry-standard HTTPS encryption across all transit pathways. You hold complete ownership and control over any correspondence you initiate with Binil B:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono-code text-xs">
                <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                  <div className="text-emerald-400 font-bold">Right to Access</div>
                  <p className="text-slate-400 font-sans text-[12px] mt-1">
                    Request a copy of any emails, contract specifications, or messages you have previously exchanged.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                  <div className="text-emerald-400 font-bold">Right to Erasure</div>
                  <p className="text-slate-400 font-sans text-[12px] mt-1">
                    Request complete deletion of your contact records and email correspondence at any time.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                  <div className="text-emerald-400 font-bold">Local Cache Purge</div>
                  <p className="text-slate-400 font-sans text-[12px] mt-1">
                    Clear your browser's local storage anytime to instantly erase stored audio and layout settings.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Direct Dispatch & Contact Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-black to-pink-950/60 border border-cyan-500/40 shadow-[0_0_40px_rgba(0,240,255,0.15)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-[10px] font-mono-code text-cyan-300 font-bold uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>QUESTIONS CONCERNING YOUR DATA?</span>
              </div>
              <h3 className="font-bebas text-2xl text-white tracking-wide">
                ESTABLISH DIRECT COMM-LINK WITH BINIL B
              </h3>
              <p className="text-xs text-slate-300 font-mono-code">
                Direct Dispatch: 33binilb@gmail.com • Kerala, India
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={handleNavigateContact}
                onMouseEnter={playUiHover}
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-mono-code text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
              >
                OPEN CONTACT FORM
              </button>
              <button
                onClick={handleNavigateTerms}
                onMouseEnter={playUiHover}
                className="px-4 py-2.5 rounded-lg bg-black/70 hover:bg-white/10 border border-white/20 text-slate-200 hover:text-white font-mono-code text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                TERMS OF SERVICE ▸
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* BOTTOM ACTION BAR                                                         */}
      {/* ========================================================================= */}
      <footer className="relative z-20 w-full px-4 sm:px-8 md:px-12 py-3 bg-black/80 border-t border-white/10 flex items-center justify-between font-mono-code text-xs text-slate-400 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="hidden sm:inline">DATA COMPLIANCE:</span>
          <span className="text-emerald-400 font-bold">RATIFIED 2026</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleBackToMenu}
            onMouseEnter={playUiHover}
            className="hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span>MISSION HUB</span>
          </button>
          <span>•</span>
          <button
            onClick={handleNavigateTerms}
            onMouseEnter={playUiHover}
            className="hover:text-pink-300 transition-colors cursor-pointer"
          >
            TERMS OF SERVICE
          </button>
        </div>
      </footer>
    </div>
  );
};
