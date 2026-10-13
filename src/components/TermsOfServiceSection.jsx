import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  ArrowLeft,
  Volume2,
  VolumeX,
  Shield,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Download,
  Mail,
  Home,
  Terminal,
  ExternalLink,
  Briefcase,
} from 'lucide-react';
import { portfolioImages, contactData, downloadResume } from '../data/portfolioData';
import { playUiClick, playUiHover, toggleAudioMute, getIsAudioMuted } from '../utils/audio';

export const TermsOfServiceSection = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('18:56');
  const [isMuted, setIsMuted] = useState(false);

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

  const handleNavigatePrivacy = () => {
    playUiClick();
    navigate('/privacy');
  };

  const handleNavigateContact = () => {
    playUiClick();
    navigate('/contact');
  };

  const handleDownloadCv = () => {
    playUiClick();
    downloadResume();
  };

  return (
    <div className="relative w-full h-[100dvh] min-h-[100dvh] overflow-hidden bg-[#07090e] select-none flex flex-col justify-between">
      {/* Fullscreen Cinematic Background Art */}
      <div className="absolute inset-0 z-0">
        <img
          src={portfolioImages.skills}
          alt="Terms of Service Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.1]"
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
            className="p-2 rounded-lg bg-black/70 border border-white/20 hover:border-pink-400 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase"
            title="Press ESC or Click to return to main menu"
          >
            <ArrowLeft className="w-4 h-4 text-pink-400" />
            <span className="hidden sm:inline">ESC // RETURN HUB</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <span className="text-[10px] sm:text-xs font-mono-code text-pink-400 uppercase tracking-widest font-bold">
                LEGAL DIRECTIVE // SEC-02
              </span>
            </div>
            <h1 className="font-bebas text-2xl sm:text-4xl text-white tracking-wider leading-none">
              TERMS OF SERVICE
            </h1>
          </div>
        </div>

        {/* Center: Switch tabs between Privacy and Terms */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-black/80 border border-white/15 rounded-lg font-mono-code text-xs">
          <button
            onClick={handleNavigatePrivacy}
            onMouseEnter={playUiHover}
            className="px-3 py-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>PRIVACY POLICY</span>
          </button>
          <button
            className="px-3 py-1.5 rounded bg-pink-500/20 text-pink-300 border border-pink-400/40 font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,42,133,0.2)]"
          >
            <FileText className="w-3.5 h-3.5 text-pink-400" />
            <span>TERMS OF SERVICE</span>
          </button>
        </div>

        {/* Right: Clock & Audio HUD */}
        <div className="flex items-center gap-2 sm:gap-4 font-mono-code">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs text-white font-bold">{currentTime}</span>
            <span className="text-[10px] text-pink-400 font-bold">RATIFIED // 2026</span>
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
        <button
          onClick={handleNavigatePrivacy}
          className="flex-1 py-1.5 px-3 rounded bg-black/60 text-slate-400 border border-white/10 text-center"
        >
          PRIVACY POLICY
        </button>
        <button className="flex-1 py-1.5 px-3 rounded bg-pink-500/20 text-pink-300 border border-pink-400/40 font-bold text-center">
          TERMS OF SERVICE
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA - SCROLLABLE TERMINAL                                    */}
      {/* ========================================================================= */}
      <main className="relative z-20 flex-1 overflow-y-auto px-3.5 sm:px-8 md:px-12 py-4 sm:py-6 custom-game-scrollbar">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Terminal Banner / Overview Card */}
          <div className="glass-panel p-5 sm:p-7 rounded-2xl border border-pink-500/30 shadow-[0_0_35px_rgba(255,42,133,0.12)] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10 font-mono-code text-xs">
              <div className="flex items-center gap-2 text-pink-300">
                <Terminal className="w-4 h-4" />
                <span className="font-bold">DOCUMENT: TERMS-DIRECTIVE-v2.6</span>
              </div>
              <div className="text-slate-400">
                IN EFFECT: <span className="text-pink-400 font-bold">OCTOBER 2026</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              These Terms of Service ("Terms") govern your access to and interaction with the web portfolio, interactive media experience, and digital services provided by <strong className="text-white font-semibold">Binil B</strong>. By accessing this web application, downloading curriculum vitae documents, or commissioning development contracts, you agree to comply with and be bound by these directives.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono-code text-[11px]">
              <div className="p-2.5 rounded-lg bg-black/50 border border-white/10 flex items-center gap-2.5">
                <Scale className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <div>
                  <div className="text-slate-400">AGREEMENT TYPE</div>
                  <div className="text-white font-bold">Digital Usage & Service Terms</div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-black/50 border border-white/10 flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <div>
                  <div className="text-slate-400">SPECIALIZATION</div>
                  <div className="text-white font-bold">Full-Stack & UI/UX Design</div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-black/50 border border-white/10 flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-slate-400">DIRECT INQUIRIES</div>
                  <div className="text-white font-bold">33binilb@gmail.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: Acceptance & Permitted Use */}
          <section className="glass-panel p-5 sm:p-7 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-400/40 flex items-center justify-center font-mono-code text-xs font-bold">
                01
              </span>
              <h2 className="font-bebas text-xl sm:text-2xl text-white tracking-wide">
                ACCEPTANCE & PERMITTED USE
              </h2>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              <p>
                You are granted a revocable, non-exclusive, non-transferable license to access this site solely for personal review, talent evaluation, recruiting, or commissioning engineering services. Under this license:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono-code text-xs">
                <div className="p-3.5 rounded-lg bg-black/40 border border-emerald-500/30 space-y-1">
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>PERMITTED CONDUCT</span>
                  </div>
                  <ul className="text-slate-300 font-sans text-[12px] space-y-1 list-disc list-inside">
                    <li>Evaluating Binil B for full-time, part-time, or contract roles.</li>
                    <li>Exploring interactive mission sectors and case studies.</li>
                    <li>Downloading the official PDF CV/Resume for recruitment.</li>
                    <li>Connecting via official channels (Email, WhatsApp, LinkedIn).</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-lg bg-black/40 border border-red-500/30 space-y-1">
                  <div className="text-red-400 font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>PROHIBITED CONDUCT</span>
                  </div>
                  <ul className="text-slate-300 font-sans text-[12px] space-y-1 list-disc list-inside">
                    <li>Automated scraping, crawling, or aggressive data extraction.</li>
                    <li>Attempting denial-of-service (DDoS) or network stress tests.</li>
                    <li>Impersonating Binil B or misrepresenting portfolio case studies.</li>
                    <li>Reverse-engineering proprietary client code samples.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Intellectual Property Rights */}
          <section className="glass-panel p-5 sm:p-7 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center font-mono-code text-xs font-bold">
                02
              </span>
              <h2 className="font-bebas text-xl sm:text-2xl text-white tracking-wide">
                INTELLECTUAL PROPERTY & ATTRIBUTIONS
              </h2>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              <p>
                The digital assets on this platform fall into distinct intellectual property categories:
              </p>
              
              <div className="space-y-2.5 pl-2 sm:pl-4 border-l-2 border-pink-500/40 font-mono-code text-xs">
                <div>
                  <strong className="text-pink-300 block">A. Creator's Original Work & UI Architecture</strong>
                  <span className="text-slate-300 font-sans">
                    All custom React component code, bespoke styling algorithms, layout compositions, copywriting, and custom UI design tokens engineered by Binil B remain his exclusive intellectual property.
                  </span>
                </div>
                <div>
                  <strong className="text-pink-300 block">B. Client Works & Production Showcase</strong>
                  <span className="text-slate-300 font-sans">
                    Logos, trademarks, and project branding for clients and past employers (including Media7 News, Astrivix, Pixel Junkie Studio, NRET, Bijush, Grace, and others) are the property of their respective trademark holders and are showcased here strictly under portfolio fair use to demonstrate design and development contributions.
                  </span>
                </div>
                <div>
                  <strong className="text-pink-300 block">C. Aesthetic Homage & Creative Direction</strong>
                  <span className="text-slate-300 font-sans">
                    The Vice City and game HUD aesthetic is an artistic, transformative interactive experience paying homage to iconic open-world gaming culture. No affiliation with or endorsement by Rockstar Games or Take-Two Interactive is claimed.
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Professional Services & Contracts */}
          <section className="glass-panel p-5 sm:p-7 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center font-mono-code text-xs font-bold">
                03
              </span>
              <h2 className="font-bebas text-xl sm:text-2xl text-white tracking-wide">
                FREELANCE ENGAGEMENTS & CONTRACT PROPOSALS
              </h2>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              <p>
                When engaging Binil B for software engineering, frontend architecture, or UI/UX design:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono-code text-xs">
                <li className="p-3 rounded-lg bg-black/40 border border-white/10 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Statements of Work (SOW) define milestones, deliverables, and exact timelines.</span>
                </li>
                <li className="p-3 rounded-lg bg-black/40 border border-white/10 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Code handoffs include full repository transfer or designated deployment access.</span>
                </li>
                <li className="p-3 rounded-lg bg-black/40 border border-white/10 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>UI/UX assets are delivered in editable Figma files with organized design systems.</span>
                </li>
                <li className="p-3 rounded-lg bg-black/40 border border-white/10 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Standard post-launch support and bug fixes as agreed in the formal agreement.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4: Limitation of Liability & Disclaimers */}
          <section className="glass-panel p-5 sm:p-7 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center justify-center font-mono-code text-xs font-bold">
                04
              </span>
              <h2 className="font-bebas text-xl sm:text-2xl text-white tracking-wide">
                DISCLAIMER OF WARRANTIES & LIMITATION OF LIABILITY
              </h2>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              <p>
                This portfolio website and its interactive simulations are provided on an <strong className="text-white">"AS IS"</strong> and <strong className="text-white">"AS AVAILABLE"</strong> basis without warranties of any kind.
              </p>
              <div className="p-4 rounded-xl bg-black/50 border border-amber-500/30 text-slate-300 text-xs font-mono-code space-y-2">
                <div>
                  <span className="text-amber-400 font-bold">A. AUDIO & HARDWARE:</span> Interactive audio effects and ambient soundtrack playback are optional and can be toggled via the HUD audio button at any time.
                </div>
                <div>
                  <span className="text-amber-400 font-bold">B. EXTERNAL DESTINATIONS:</span> Binil B is not responsible for the availability, content, or privacy practices of external websites linked from this portfolio (such as external project URLs or social platforms).
                </div>
                <div>
                  <span className="text-amber-400 font-bold">C. LIABILITY CAP:</span> In no event shall Binil B be liable for any indirect, punitive, or consequential damages resulting from website access or inability to access the service.
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Governing Law & Jurisdiction */}
          <section className="glass-panel p-5 sm:p-7 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center font-mono-code text-xs font-bold">
                05
              </span>
              <h2 className="font-bebas text-xl sm:text-2xl text-white tracking-wide">
                GOVERNING LAW & JURISDICTION
              </h2>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              <p>
                These Terms shall be interpreted and governed in accordance with the substantive laws of India, without regard to conflict of law principles. Any legal inquiry or proceeding arising from these Terms shall be resolved in the competent courts of Kerala, India. Parties agree to attempt good-faith informal negotiation before initiating formal legal proceedings.
              </p>
            </div>
          </section>

          {/* Action Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-950/60 via-black to-cyan-950/60 border border-pink-500/40 shadow-[0_0_40px_rgba(255,42,133,0.15)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-[10px] font-mono-code text-pink-300 font-bold uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                <span>READY TO COMMISSION A PROJECT?</span>
              </div>
              <h3 className="font-bebas text-2xl text-white tracking-wide">
                HIRE BINIL B FOR YOUR NEXT VENTURE
              </h3>
              <p className="text-xs text-slate-300 font-mono-code">
                Full-Stack MERN Architecture • Responsive Design • Figma UI Kits
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={handleNavigateContact}
                onMouseEnter={playUiHover}
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-mono-code text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(255,42,133,0.4)] transition-all cursor-pointer"
              >
                START CONTRACT DISCUSSION
              </button>
              <button
                onClick={handleDownloadCv}
                onMouseEnter={playUiHover}
                className="px-4 py-2.5 rounded-lg bg-black/70 hover:bg-white/10 border border-white/20 text-slate-200 hover:text-white font-mono-code text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>DOWNLOAD RESUME</span>
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
          <span className="w-2 h-2 rounded-full bg-pink-500" />
          <span className="hidden sm:inline">LEGAL STATUS:</span>
          <span className="text-pink-400 font-bold">RATIFIED 2026</span>
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
            onClick={handleNavigatePrivacy}
            onMouseEnter={playUiHover}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            PRIVACY POLICY
          </button>
        </div>
      </footer>
    </div>
  );
};
