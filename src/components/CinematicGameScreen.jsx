import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, Shield, Star, ArrowLeft } from 'lucide-react';
import { playUiClick, playUiHover, toggleAudioMute, getIsAudioMuted } from '../utils/audio';
export const CinematicGameScreen = ({ backgroundImage, superTitle, title, scriptSubtitle, scriptColor = 'text-[#ff2a85]', cash = '$1,425,000', stars = 2, locationName, locationSubtitle = 'Vice City', objectiveText, children, modals, onBack, showMissionPassed = true, }) => {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState('18:56');
    const [isMuted, setIsMuted] = useState(false);
    const [countdownSeconds, setCountdownSeconds] = useState(24);
    useEffect(() => {
        setIsMuted(getIsAudioMuted());
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
        const countdownInterval = setInterval(() => {
            setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 59));
        }, 1000);
        return () => {
            clearInterval(timeInterval);
            clearInterval(countdownInterval);
        };
    }, []);
    const handleBackToMenu = () => {
        playUiClick();
        if (onBack) {
            onBack();
        }
        else {
            navigate('/');
        }
    };
    const handleToggleMute = () => {
        const muted = toggleAudioMute();
        setIsMuted(muted);
    };
    // Keyboard navigation: Escape key returns to menu
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                handleBackToMenu();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
    return (<div className="relative w-full h-[100dvh] min-h-[100dvh] overflow-hidden bg-[#07090e] select-none flex flex-col justify-between">
      {/* Fullscreen Cinematic Background Art */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[75%_center] sm:object-[70%_center] md:object-center filter brightness-[0.92] contrast-[1.08]"
        />

        {/* Ambient Dark Gradient: High black on left for content, rapidly tapering to very low/clear on right to view person */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(4,6,9,0.95)_18%,rgba(4,6,9,0.82)_26%,rgba(4,6,9,0.32)_46%,rgba(4,6,9,0.06)_65%,transparent_82%)] pointer-events-none"/>
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,6,9,0.65)_10%,transparent_22%,transparent_82%,rgba(4,6,9,0.30)_100%)] pointer-events-none"/>
        <div className="absolute inset-0 bg-scanlines opacity-12 pointer-events-none"/>
      </div>

      {/* ========================================================================= */}
      {/* TOP HUD BAR                                                               */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full px-3.5 sm:px-8 md:px-12 pt-3 sm:pt-6 flex items-start justify-between pointer-events-none flex-shrink-0">
        {/* Top Left: Title + Script Subtitle */}
        <div className="pointer-events-auto flex flex-col items-start -mt-0.5 sm:mt-0">
          {superTitle && (<div className="text-[9px] sm:text-xs font-mono-code text-slate-400 tracking-[0.2em] uppercase font-bold mb-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {superTitle}
            </div>)}
          <h1 className="font-bebas text-3xl sm:text-5xl md:text-6xl lg:text-[76px] leading-[0.85] tracking-wider text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            {title}
          </h1>
          <span className={`font-script text-xl sm:text-3xl md:text-4xl lg:text-5xl -rotate-6 ml-2 sm:ml-6 -mt-1 sm:-mt-2 font-bold tracking-wide drop-shadow-[0_0_15px_currentColor] ${scriptColor}`}>
            {scriptSubtitle}
          </span>
        </div>

        {/* Top Center: Coordinates & Mission Countdown (Desktop & Tablet) */}
        <div className="hidden md:flex flex-col items-center text-center font-mono-code pt-1">
          <div className="flex items-center gap-1 text-[11px] text-white/80 font-bold tracking-widest uppercase">
            <span className="text-white text-[10px]">▲</span>
            <span>104.9</span>
          </div>
          <div className="text-[10px] text-[#ff2a85] font-bold tracking-wider uppercase mt-1 drop-shadow-[0_0_8px_#ff2a85]">
            LEONIDA DROPS IN
          </div>
          <div className="text-sm md:text-base font-bold text-white tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            108 : 15 : 32 : {String(countdownSeconds).padStart(2, '0')}
          </div>
        </div>

        {/* Top Right: Clock, Cash, Health, Back Button & Mission Passed Stamp */}
        <div className="pointer-events-auto flex flex-col items-end text-right font-mono-code">
          {/* In-Game Clock */}
          <div className="text-sm sm:text-xl md:text-2xl font-bold text-white tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {currentTime}
          </div>

          {/* Neon Green Cash with Currency Box */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="text-base sm:text-2xl md:text-3xl font-bold text-[#32f38d] tracking-wide drop-shadow-[0_0_12px_rgba(50,243,141,0.6)]">
              {cash}
            </div>
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-black/70 border border-[#32f38d]/50 flex items-center justify-center text-[9px] sm:text-[10px] text-[#32f38d] font-bold">
              $
            </div>
          </div>

          {/* Health & Armor + Star Level + Audio */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
            <div className="flex items-center gap-0.5 text-[#ffd200]">
              {[1, 2, 3, 4, 5].map((s) => (<Star key={s} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${s <= stars ? 'fill-[#ffd200]' : 'text-slate-600'}`}/>))}
            </div>

            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-black/60 border border-white/20 rounded">
              <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#32f38d]"/>
              <span className="text-[10px] sm:text-xs font-bold text-white">100</span>
            </div>

            <button onClick={handleToggleMute} className="p-1 rounded bg-black/60 border border-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer" title={isMuted ? 'Unmute Audio' : 'Mute Audio'}>
              {isMuted ? (<VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-400"/>) : (<Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400"/>)}
            </button>
          </div>

          {/* ESC - BACK TO MENU Button - Blinking Lighted Neon Beacon */}
          <button onClick={handleBackToMenu} onMouseEnter={playUiHover} className="group relative mt-1.5 sm:mt-3 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-md border-2 text-[11px] sm:text-xs font-mono-code font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 sm:gap-2 animate-neon-beacon overflow-hidden backdrop-blur-md" title="Press ESC or Click to return to main start menu">
            {/* Blinking Signal Light LED */}
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-90"/>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#ff2a85] shadow-[0_0_8px_#ff2a85]"/>
            </span>

            <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-300 group-hover:-translate-x-0.5 transition-transform"/>
            <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              ESC <span className="text-cyan-300 font-normal">|</span> BACK
            </span>

            {/* Subtle animated light gleam over button */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"/>
          </button>

          {/* Authentic MISSION PASSED Stamp (Desktop / Tablet) */}
          {showMissionPassed && (<div className="hidden sm:block mt-2.5 text-right">
              <div className="font-bebas text-xl sm:text-3xl text-white tracking-wider leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                MISSION PASSED
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono-code text-cyan-300 font-bold tracking-wider mt-0.5 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
                Respect + <span className="text-[#32f38d]">+ $250,000</span>
              </div>
            </div>)}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3D IN-SCENE LOCATION BADGE (CENTER GROUND - Desktop only to not block)   */}
      {/* ========================================================================= */}
      <div className="hidden md:flex absolute left-1/2 bottom-[18%] md:bottom-[21%] -translate-x-1/2 pointer-events-none z-10 flex-col items-center">
        <div className="px-4 py-1.5 md:px-5 md:py-2 rounded-sm bg-black/70 border border-cyan-400/50 backdrop-blur-sm shadow-[0_0_20px_rgba(0,240,255,0.3)]">
          <span className="font-bebas text-lg sm:text-xl text-white tracking-[0.25em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] whitespace-nowrap">
            {locationName}
          </span>
        </div>
        {locationSubtitle && (<span className="text-[9px] font-mono-code text-cyan-300 tracking-widest uppercase mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {locationSubtitle}
          </span>)}
      </div>

      {/* ========================================================================= */}
      {/* MIDDLE LEFT: THE SCREEN CONTENT (Scrollable on mobile)                    */}
      {/* ========================================================================= */}
      <div className="relative z-20 px-3.5 sm:px-8 md:px-12 flex-1 overflow-y-auto min-h-0 flex flex-col justify-center max-w-sm sm:max-w-md w-full py-2 sm:py-0">
        {children}
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM HUD BAR: RADAR & OBJECTIVE (LEFT) | SIGNATURE QUOTE (RIGHT)         */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full px-3.5 sm:px-8 md:px-12 pb-3 sm:pb-6 flex items-end justify-between gap-3 pointer-events-none flex-shrink-0">
        {/* Bottom Left: Tactical Radar & Current Objective */}
        <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-3.5 md:gap-4 min-w-0">
          {/* Radar Box */}
          <div className="relative w-11 h-11 sm:w-16 sm:h-16 rounded-md bg-black/80 border border-cyan-500/40 p-0.5 sm:p-1 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.2)] flex-shrink-0">
            {/* Radar Grid Texture */}
            <div className="absolute inset-0 bg-radar-grid opacity-50"/>
            <div className="absolute w-8 h-8 sm:w-12 sm:h-12 rounded-full border border-cyan-500/30"/>
            <div className="absolute w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-cyan-500/40"/>
            <span className="absolute top-0.5 left-1 text-[8px] sm:text-[9px] font-mono-code font-bold text-cyan-300">
              N
            </span>
            <div className="absolute w-full h-[1px] bg-cyan-500/20"/>
            <div className="absolute h-full w-[1px] bg-cyan-500/20"/>
            <div className="absolute inset-0 rounded-md border-t border-cyan-400/60 animate-spin" style={{ animationDuration: '4s' }}/>
            <div className="relative w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff2a85] shadow-[0_0_10px_#ff2a85] animate-ping"/>
            <div className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ff2a85]"/>
          </div>

          {/* Current Objective */}
          <div className="font-mono-code min-w-0">
            <div className="text-[9px] sm:text-[11px] font-bold text-[#ff2a85] tracking-widest uppercase flex items-center gap-1 sm:gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a85] animate-pulse"/>
              <span>CURRENT OBJECTIVE</span>
            </div>
            <div className="font-bebas text-sm sm:text-xl text-white tracking-wide leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] truncate sm:whitespace-normal">
              {objectiveText}
            </div>
            <div className="hidden sm:block text-[10px] text-slate-400 tracking-wide font-sans">
              Vice City Inspired • Build Different • Stay Legendary
            </div>
          </div>
        </div>

        {/* Bottom Center Tag */}
        <div className="hidden lg:block text-center font-bebas text-sm tracking-[0.3em] text-slate-500/70">
          BINIL.BUILDS
        </div>

        {/* Bottom Right: Cursive Signature Quote (Desktop & Tablet) */}
        <div className="hidden sm:block pointer-events-auto text-right font-mono-code">
          <div className="font-script text-base sm:text-xl text-slate-200 tracking-wide italic leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            "Code is my weapon, Creativity is my world."
          </div>
          <div className="font-script text-base sm:text-xl text-[#ff2a85] tracking-wider mt-0.5 drop-shadow-[0_0_10px_rgba(255,42,133,0.8)]">
            — Binil B
          </div>
        </div>
      </div>

      {/* Modals & Overlays */}
      {modals}
    </div>);
};
