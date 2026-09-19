import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, FastForward, CheckCircle2, Terminal, Cpu, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { portfolioImages } from '../data/portfolioData';
import { playUiClick, playUiHover, playLoadingBlip, playMissionPassed, toggleAudioMute, getIsAudioMuted } from '../utils/audio';

const LOADING_SLIDES = [
  {
    image: portfolioImages.hero,
    title: "VICE CITY PROLOGUE",
    tag: "SYSTEM INITIALIZATION",
    subtitle: "Binil B • Full-Stack Developer & UI/UX Designer",
    tip: "Use [W] / [S] or Arrow keys to seamlessly navigate the command terminal on desktop."
  },
  {
    image: portfolioImages.projects,
    title: "THE PROJECT ARSENAL",
    tag: "SECTOR 04 DOSSIER",
    subtitle: "Production MERN Apps, Real-Time Systems & Client Portals",
    tip: "Click on any project card in the PROJECTS sector to inspect live deployment links and source code."
  },
  {
    image: portfolioImages.skills,
    title: "TECHNICAL MATRIX",
    tag: "SECTOR 03 ARSENAL",
    subtitle: "React 19, Node.js, Express, MongoDB, Tailwind CSS & REST APIs",
    tip: "All client solutions are engineered for high responsiveness, SEO optimization, and sub-second load times."
  },
  {
    image: portfolioImages.experience,
    title: "FIELD OPERATIONS",
    tag: "SECTOR 05 VERIFIED",
    subtitle: "Proven Experience at PixelJunkie Studios & Astrivix Tech",
    tip: "Check the EXPERIENCE sector for real-world client achievements and full-stack responsibilities."
  },
  {
    image: portfolioImages.complete,
    title: "MISSION SUCCESS",
    tag: "MISSION DOSSIER",
    subtitle: "Ready to Transform Ideas into High-Impact Web Applications",
    tip: "Need rapid full-stack turnaround? Binil is available for high-priority contracts and full-time roles."
  }
];

const SYSTEM_LOGS = [
  "MOUNTING REACT 19 VIRTUAL DOM...",
  "INITIALIZING TAILWIND CSS V4 ENGINE...",
  "ESTABLISHING HIGH-FIDELITY WEB AUDIO SYNTH...",
  "CACHING HIGH-RESOLUTION SECTOR ASSETS...",
  "CONNECTING CLIENT-SIDE REPOSITORIES...",
  "SYNCHRONIZING VICE CITY RADAR PROTOCOLS...",
  "OPTIMIZING VIEWPORT DISPLAY GRIDS...",
  "SYSTEM INTEGRITY 100% // READY FOR DEPLOYMENT"
];

export const LoadingScreen = ({ onComplete, redirectPath = '/' }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [logIndex, setLogIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [autoEnterCountdown, setAutoEnterCountdown] = useState(2);
  const hasFinishedRef = useRef(false);

  // Sync mute state on mount & listen to changes
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

  // Slide rotation every 3.8s
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % LOADING_SLIDES.length);
    }, 3800);
    return () => clearInterval(slideTimer);
  }, []);

  // System logs rotation
  useEffect(() => {
    const logTimer = setInterval(() => {
      setLogIndex((prev) => (prev < SYSTEM_LOGS.length - 1 ? prev + 1 : prev));
    }, 350);
    return () => clearInterval(logTimer);
  }, []);

  // Simulated game engine loading curve with realistic pauses & acceleration
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Non-linear progression that feels like authentic game loading
      let increment = 1;
      if (currentProgress < 20) {
        increment = Math.random() * 4 + 2;
      } else if (currentProgress < 55) {
        increment = Math.random() * 5 + 3;
      } else if (currentProgress < 85) {
        increment = Math.random() * 3 + 1.5;
      } else if (currentProgress < 98) {
        increment = Math.random() * 2 + 0.8;
      } else {
        increment = 1;
      }

      currentProgress = Math.min(100, Math.round((currentProgress + increment) * 10) / 10);
      
      // Sound blips at key milestones
      if (Math.floor(currentProgress) % 25 === 0 && Math.floor(currentProgress) !== 0) {
        playLoadingBlip(500 + currentProgress * 4);
      }

      setProgress(Math.floor(currentProgress));

      if (currentProgress >= 100) {
        clearInterval(interval);
        handleLoadingFinish();
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleLoadingFinish = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsComplete(true);
    playMissionPassed();
  };

  // Auto-transition countdown when complete
  useEffect(() => {
    if (!isComplete) return;

    const timer = setInterval(() => {
      setAutoEnterCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerEnter();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isComplete]);

  const triggerEnter = () => {
    playUiClick();
    if (onComplete) {
      onComplete();
    } else {
      navigate(redirectPath);
    }
  };

  const handleSkip = () => {
    triggerEnter();
  };

  const handleToggleMute = () => {
    const muted = toggleAudioMute();
    setIsMuted(muted);
  };

  // Keyboard accessibility: Enter or Space to skip/enter, Esc to skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
        e.preventDefault();
        triggerEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeSlide = LOADING_SLIDES[currentSlideIndex];

  // Dynamic status text based on progress
  const getStatusText = (prog) => {
    if (prog < 20) return "INITIALIZING SYSTEM KERNEL & DISPLAY MATRIX...";
    if (prog < 45) return "PRE-FETCHING HIGH-RES SECTOR DOSSIERS & ASSETS...";
    if (prog < 70) return "CONNECTING MERN STACK & CLIENT PROTOCOLS...";
    if (prog < 90) return "CALIBRATING HUD RADAR & SYNTHESIZER SOUND ENGINE...";
    if (prog < 100) return "FINALIZING MISSION ENVIRONMENT...";
    return "SYSTEM READY // CLICK OR PRESS ENTER TO ENGAGE";
  };

  return (
    <div id="loading-screen" className="relative w-full h-[100dvh] min-h-[100dvh] overflow-hidden bg-[#06080d] select-none flex flex-col justify-between text-white">
      {/* Background Slideshow with Smooth Crossfade */}
      <div className="absolute inset-0 z-0">
        {LOADING_SLIDES.map((slide, idx) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlideIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[75%_center] md:object-center filter brightness-[0.80] contrast-[1.12] scale-105 animate-[pulse_10s_ease-in-out_infinite]"
            />
          </div>
        ))}

        {/* Ambient Dark Gradient & Vignette Layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,8,13,0.3)_0%,rgba(6,8,13,0.85)_75%,rgba(6,8,13,0.98)_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(4,6,9,0.95)_0%,rgba(4,6,9,0.70)_35%,rgba(4,6,9,0.40)_60%,rgba(4,6,9,0.90)_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,6,9,0.85)_0%,transparent_20%,transparent_75%,rgba(4,6,9,0.95)_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* TOP HEADER: BRANDING, STATUS TELEMETRY & CONTROLS                          */}
      {/* ========================================================================= */}
      <header className="relative z-20 w-full px-4 sm:px-8 md:px-12 pt-4 sm:pt-6 flex items-start justify-between">
        {/* Left: Branding & Subtitle */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff2a85] animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono-code font-bold text-[#ff2a85] tracking-[0.25em] uppercase">
              MISSION DOSSIER // BOOT SEQUENCE
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <h1 className="font-bebas text-3xl sm:text-5xl tracking-wider text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              BINIL B
            </h1>
            <span className="font-script text-xl sm:text-3xl text-cyan-400 -rotate-3 font-bold tracking-wide drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]">
              Portfolio
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-300 font-mono-code tracking-wider hidden sm:block">
            UI/UX DESIGNER & MERN STACK DEVELOPER
          </p>
        </div>

        {/* Center: System Telemetry (Desktop) */}
        <div className="hidden lg:flex flex-col items-center font-mono-code text-[11px] text-slate-300 bg-black/60 border border-white/10 px-4 py-2 rounded-md backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-3 text-cyan-300 font-bold">
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-[#ff2a85]" />
              ENGINE: REACT 19
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#32f38d]" />
              STATUS: NOMINAL
            </span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            LATENCY: 18ms • ASIA-EAST1 RUNTIME
          </div>
        </div>

        {/* Right: Audio Control & Skip Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleToggleMute}
            onMouseEnter={playUiHover}
            className="p-2 sm:px-3 sm:py-2 rounded-md bg-black/70 hover:bg-black/90 border border-white/20 hover:border-cyan-400/50 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 font-mono-code text-xs"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            aria-label="Toggle Audio"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-pink-400" />
                <span className="hidden sm:inline text-[11px]">MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline text-[11px]">AUDIO ON</span>
              </>
            )}
          </button>

          <button
            onClick={handleSkip}
            onMouseEnter={playUiHover}
            className="group px-3 sm:px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 hover:border-pink-500/60 text-white font-mono-code text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-sm active:scale-95 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            title="Skip loading sequence and enter portfolio"
          >
            <span>SKIP INTRO</span>
            <FastForward className="w-3.5 h-3.5 text-[#ff2a85] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MIDDLE SECTION: ARTWORK BADGE & SYSTEM DIAGNOSTIC LOGS                    */}
      {/* ========================================================================= */}
      <main className="relative z-20 w-full px-4 sm:px-8 md:px-12 my-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* Left: Active Sector Card */}
        <div className="max-w-lg bg-black/60 border border-cyan-500/30 p-4 sm:p-6 rounded-lg backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-all">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold bg-[#ff2a85]/20 text-[#ff2a85] border border-[#ff2a85]/40">
              {activeSlide.tag}
            </span>
            <span className="text-[10px] font-mono-code text-slate-400">
              [ {currentSlideIndex + 1} / {LOADING_SLIDES.length} ]
            </span>
          </div>

          <h2 className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mt-1">
            {activeSlide.title}
          </h2>

          <p className="text-xs sm:text-sm text-cyan-300 font-mono-code font-medium mt-1 drop-shadow">
            {activeSlide.subtitle}
          </p>

          <div className="mt-3 pt-3 border-t border-white/10 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#ffd200] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 font-sans italic leading-relaxed">
              "{activeSlide.tip}"
            </p>
          </div>
        </div>

        {/* Right: Scrolling Diagnostic Terminal Stream (Tablet & Desktop) */}
        <div className="hidden sm:flex flex-col items-end max-w-sm text-right font-mono-code text-xs">
          <div className="flex items-center gap-1.5 text-cyan-300 font-bold mb-1.5 text-[11px] uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>DIAGNOSTIC TELEMETRY</span>
          </div>

          <div className="w-full bg-black/75 border border-white/10 rounded-md p-3 space-y-1.5 text-[11px] backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.7)] text-left">
            {SYSTEM_LOGS.slice(0, logIndex + 1).slice(-4).map((log, idx, arr) => {
              const isLatest = idx === arr.length - 1;
              return (
                <div
                  key={`${log}-${idx}`}
                  className={`flex items-center justify-between gap-2 ${
                    isLatest ? 'text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  <span className="truncate">&gt; {log}</span>
                  <CheckCircle2 className={`w-3 h-3 flex-shrink-0 ${isLatest ? 'text-[#32f38d]' : 'text-slate-600'}`} />
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* BOTTOM SECTION: PROGRESS BAR, STATUS, & ENTER ACTION                      */}
      {/* ========================================================================= */}
      <footer className="relative z-20 w-full px-4 sm:px-8 md:px-12 pb-5 sm:pb-8 flex flex-col space-y-3">
        {/* Top of Progress Bar: Progress % & Status Message */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 font-mono-code">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-cyan-300 tracking-wider">
              {getStatusText(progress)}
            </span>
          </div>

          <div className="flex items-baseline gap-2 self-end sm:self-auto">
            <span className="text-xs text-slate-400 uppercase tracking-widest">LOADING</span>
            <span className="font-bebas text-3xl sm:text-4xl text-white tracking-wider leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
              {progress}%
            </span>
          </div>
        </div>

        {/* Authentic Multi-Segmented Glowing Game Loading Bar */}
        <div className="relative w-full h-3.5 sm:h-4 bg-black/80 border border-white/20 rounded-full p-0.5 overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.9)]">
          {/* Internal Progress Fill with Neon Gradient and Animated Glow */}
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#ff1f7d] via-[#ff2a85] to-[#00f0ff] transition-all duration-75 relative overflow-hidden shadow-[0_0_15px_rgba(255,42,133,0.8)]"
            style={{ width: `${progress}%` }}
          >
            {/* Animated Striped Scanlines */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.15)_0,rgba(255,255,255,0.15)_8px,transparent_8px,transparent_16px)] animate-[move-bg_2s_linear_infinite]" />

            {/* Glowing Leading Head Edge */}
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-white shadow-[0_0_15px_#fff]" />
          </div>
        </div>

        {/* Bottom Interactive Trigger Area */}
        <div className="flex items-center justify-between pt-1">
          <div className="text-[11px] font-mono-code text-slate-400 hidden sm:flex items-center gap-3">
            <span>[SPACE / ENTER] ADVANCE</span>
            <span>•</span>
            <span>[ESC] SKIP INTRO</span>
          </div>

          {/* If 100% complete, prominent Enter Button. Otherwise, subtle loading hints */}
          {isComplete ? (
            <button
              onClick={triggerEnter}
              onMouseEnter={playUiHover}
              className="group ml-auto px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg bg-gradient-to-r from-[#ff1f7d] via-[#ff2a85] to-[#f41459] hover:brightness-110 text-white font-bebas text-xl sm:text-2xl tracking-wider uppercase flex items-center gap-2.5 border-2 border-pink-400 shadow-[0_0_35px_rgba(255,42,133,0.8)] transition-all duration-150 cursor-pointer active:scale-95 animate-neon-beacon"
              autoFocus
            >
              <span>ENTER PORTFOLIO</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              <span className="text-xs font-mono-code font-normal bg-black/40 px-2 py-0.5 rounded border border-white/20">
                AUTO IN {autoEnterCountdown}s
              </span>
            </button>
          ) : (
            <div className="ml-auto text-xs font-mono-code text-slate-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>SYNCHRONIZING ASSETS...</span>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
