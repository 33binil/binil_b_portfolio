import React, { useEffect } from 'react';
import { Volume2, VolumeX, AlertTriangle, Radio, Play } from 'lucide-react';
import { playUiClick, playUiHover, setAudioMuted } from '../utils/audio';

export function AudioWarningPrompt({ onSelectChoice }) {
  const handleChoice = (shouldMute) => {
    playUiClick();
    setAudioMuted(shouldMute);

    // Notify all global listeners (HUD buttons, BackgroundMusic, etc.)
    window.dispatchEvent(
      new CustomEvent('portfolio-audio-mute-change', { detail: { isMuted: shouldMute } })
    );

    if (onSelectChoice) {
      onSelectChoice(shouldMute);
    }
  };

  // Keyboard accessibility: Enter or Space to Play, Esc or M to Mute
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleChoice(false);
      } else if (e.key === 'Escape' || e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        handleChoice(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="audio-advisory-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#04060a]/90 backdrop-blur-md select-none px-4 py-6 font-mono-code"
    >
      {/* Outer ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-[#ff2a85]/15 via-cyan-500/15 to-[#ffd200]/10 blur-[100px] rounded-full" />
      </div>

      {/* Main Advisory Modal Window matching user screenshot */}
      <div className="relative w-full max-w-[580px] rounded-3xl border-2 border-[#ff2a85]/40 bg-[#090d16] p-6 sm:p-8 shadow-[0_0_60px_rgba(255,42,133,0.25)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Bar: Warning & Step Badge */}
        <div className="flex items-start justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#ffd200]/10 border border-[#ffd200]/40 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-[#ffd200] animate-pulse" />
            </div>
            <div>
              <div className="text-xs sm:text-[13px] font-black tracking-widest text-[#ffd200] uppercase">
                SYSTEM ADVISORY // AUDIO NOTICE
              </div>
              <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                Vice City Radio 98.3 FM Broadcast Ready
              </div>
            </div>
          </div>

          <div className="px-3 py-1 rounded bg-[#ff2a85]/20 border border-[#ff2a85]/40 text-[#ff2a85] text-[11px] font-bold tracking-widest uppercase shrink-0">
            STEP 2 OF 2
          </div>
        </div>

        {/* Title */}
        <h2
          id="audio-advisory-title"
          className="text-2xl sm:text-3xl font-black text-white tracking-wide uppercase mb-3"
        >
          AUDIO EXPERIENCE CONFIG
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-sans">
          This interactive portfolio is equipped with an authentic GTA-style background soundtrack:
        </p>

        {/* Track Info Box */}
        <div className="rounded-xl bg-black/60 border border-white/10 p-3 flex items-center gap-3.5 mb-5">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff2a85] via-purple-600 to-cyan-400 flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(255,42,133,0.4)]">
            <Radio className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <div className="text-xs sm:text-sm font-bold text-white truncate tracking-wide">
              Aswin Ram — To The Road (feat. ABY)
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-cyan-400 tracking-wider mt-0.5">
              SELECTED PORTFOLIO SOUNDTRACK • 98.3 FM
            </div>
          </div>
        </div>

        {/* Choice Prompt Text */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 font-sans">
          Please choose whether to enable the soundtrack before loading the main game terminal:
        </p>

        {/* Options Grid: Play With Song vs Mute & Continue */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          {/* Option 1: PLAY WITH SONG */}
          <button
            onClick={() => handleChoice(false)}
            onMouseEnter={playUiHover}
            className="group relative flex flex-col items-center justify-center text-center p-4 rounded-2xl border-2 border-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 text-white transition-all duration-200 active:scale-[0.98] shadow-[0_0_25px_rgba(0,240,255,0.25)] hover:shadow-[0_0_35px_rgba(0,240,255,0.4)] cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-full bg-cyan-400 flex items-center justify-center text-black shadow-[0_0_12px_rgba(0,240,255,0.6)] group-hover:scale-105 transition-transform">
                <Play className="w-4 h-4 fill-black text-black ml-0.5" />
              </div>
              <Volume2 className="w-5 h-5 text-cyan-300" />
            </div>
            <span className="text-sm font-black tracking-wider uppercase text-cyan-300 group-hover:text-white">
              PLAY WITH SONG
            </span>
            <span className="text-[11px] text-slate-300 font-sans mt-0.5 font-medium">
              Start with music & HUD effects
            </span>
          </button>

          {/* Option 2: MUTE & CONTINUE */}
          <button
            onClick={() => handleChoice(true)}
            onMouseEnter={playUiHover}
            className="group flex flex-col items-center justify-center text-center p-4 rounded-2xl border-2 border-white/15 hover:border-pink-500/60 bg-black/50 hover:bg-pink-500/10 text-slate-300 hover:text-white transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-slate-800/90 group-hover:bg-pink-500/30 flex items-center justify-center text-pink-400 mb-2 transition-colors">
              <VolumeX className="w-5 h-5" />
            </div>
            <span className="text-sm font-black tracking-wider uppercase text-slate-200 group-hover:text-pink-300">
              MUTE & CONTINUE
            </span>
            <span className="text-[11px] text-slate-400 font-sans mt-0.5 font-medium">
              Silent mode (can unmute later)
            </span>
          </button>
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-white/10 pt-4">
          <span>Shortcuts: [ENTER / SPACE] Play • [ESC / M] Mute</span>
          <span className="text-[#32f38d] font-bold tracking-wider">
            READY TO LAUNCH
          </span>
        </div>
      </div>
    </div>
  );
}
