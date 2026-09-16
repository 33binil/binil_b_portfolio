import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Volume2, VolumeX, Star, Shield, Download, ExternalLink, X } from 'lucide-react';
import { portfolioImages, contactData } from '../data/portfolioData';
import { playUiClick, playUiHover, playMissionPassed, toggleAudioMute, getIsAudioMuted } from '../utils/audio';
const MENU_ITEMS = [
    { id: 'start', label: 'START GAME', path: '/about' },
    { id: 'about', label: 'ABOUT ME', path: '/about', hasUserIcon: true },
    { id: 'skills', label: 'SKILLS', path: '/skills' },
    { id: 'projects', label: 'PROJECTS', path: '/projects' },
    { id: 'experience', label: 'EXPERIENCE', path: '/experience' },
    { id: 'academy', label: 'ACADEMY', path: '/education' },
    { id: 'services', label: 'SERVICES', path: '/services' },
    { id: 'contact', label: 'CONTACT', path: '/contact' },
    { id: 'exit', label: 'EXIT GAME', path: '/exit' },
];
export const HeroSection = () => {
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState('18:56');
    const [isMuted, setIsMuted] = useState(false);
    const [countdownSeconds, setCountdownSeconds] = useState(26);
    const [showExitModal, setShowExitModal] = useState(false);
    // Synchronize audio state
    useEffect(() => {
        setIsMuted(getIsAudioMuted());
    }, []);
    // Live in-game clock and countdown timer
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
    // Keyboard navigation for authentic game console feel (W/S, Arrow Up/Down, Enter)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (showExitModal) {
                if (e.key === 'Escape')
                    setShowExitModal(false);
                return;
            }
            if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
                e.preventDefault();
                playUiHover();
                setSelectedIndex((prev) => (prev + 1) % MENU_ITEMS.length);
            }
            else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
                e.preventDefault();
                playUiHover();
                setSelectedIndex((prev) => (prev - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
            }
            else if (e.key === 'Enter') {
                e.preventDefault();
                handleMenuItemClick(MENU_ITEMS[selectedIndex], selectedIndex);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, showExitModal]);
    const handleMenuItemClick = (item, index) => {
        playUiClick();
        setSelectedIndex(index);
        if (item.id === 'exit') {
            setTimeout(() => {
                navigate('/exit');
            }, 150);
            return;
        }
        if (item.id === 'start') {
            playMissionPassed();
        }
        if (item.path) {
            setTimeout(() => {
                navigate(item.path);
            }, 150);
        }
    };
    const handleToggleMute = () => {
        const muted = toggleAudioMute();
        setIsMuted(muted);
    };
    const handleDownloadResume = () => {
        playUiClick();
        window.print();
    };
    return (<div className="relative w-full h-[100dvh] min-h-[100dvh] overflow-hidden bg-[#07090e] select-none flex flex-col justify-between">
      {/* Fullscreen Cinematic Background Art (Character + Sports Car + Vice City Sunset) */}
      <div className="absolute inset-0 z-0">
        <img
          src={portfolioImages.hero}
          alt="Binil B - Vice City Supercar Scene"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[75%_center] sm:object-[70%_center] md:object-center filter brightness-[0.92] contrast-[1.08]"
        />

        {/* Ambient Dark Gradient: High black on left for content, rapidly tapering to very low/clear on right to view person */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(4,6,9,0.95)_18%,rgba(4,6,9,0.82)_26%,rgba(4,6,9,0.32)_46%,rgba(4,6,9,0.06)_65%,transparent_82%)] pointer-events-none"/>
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,6,9,0.65)_10%,transparent_22%,transparent_82%,rgba(4,6,9,0.30)_100%)] pointer-events-none"/>
        <div className="absolute inset-0 bg-scanlines opacity-12 pointer-events-none"/>
      </div>

      {/* ========================================================================= */}
      {/* TOP HUD BAR: LOGO (LEFT) | COMPASS & COUNTDOWN (CENTER) | STATUS (RIGHT)  */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full px-3.5 sm:px-8 md:px-12 pt-3 sm:pt-6 flex items-start justify-between pointer-events-none flex-shrink-0">
        {/* Top Left: Logo / Branding ("BINIL BUILDS Portfolio") */}
        <div className="pointer-events-auto flex flex-col items-start -mt-0.5 sm:mt-0">
          <h1 className="font-bebas text-3xl sm:text-5xl md:text-6xl lg:text-[76px] leading-[0.85] tracking-wider text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            BINIL
          </h1>
          <h2 className="font-bebas text-3xl sm:text-5xl md:text-6xl lg:text-[76px] leading-[0.85] tracking-wider text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            BUILDS
          </h2>
          <span className="font-script text-xl sm:text-3xl md:text-4xl lg:text-5xl text-[#ff2a85] -rotate-6 ml-2 sm:ml-6 -mt-1 sm:-mt-2 drop-shadow-[0_0_15px_rgba(255,42,133,0.9)] font-bold tracking-wide">
            Portfolio
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
            108 : 15 : 33 : {String(countdownSeconds).padStart(2, '0')}
          </div>
        </div>

        {/* Top Right: GTA Clock, Cash, Weapon/Health & Sound HUD */}
        <div className="pointer-events-auto flex flex-col items-end text-right font-mono-code">
          {/* In-Game Clock */}
          <div className="text-sm sm:text-xl md:text-2xl font-bold text-white tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {currentTime}
          </div>

          {/* Neon Green Cash / Net Worth */}
          <div className="text-base sm:text-2xl md:text-3xl font-bold text-[#32f38d] tracking-wide drop-shadow-[0_0_12px_rgba(50,243,141,0.6)]">
            $1,250,000
          </div>

          {/* Health & Armor + Star Level */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
            <div className="flex items-center gap-0.5 text-[#ffd200]">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current"/>
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current"/>
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current"/>
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current"/>
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current"/>
            </div>

            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-black/60 border border-white/20 rounded">
              <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#32f38d]"/>
              <span className="text-[10px] sm:text-xs font-bold text-white">100</span>
            </div>

            {/* Audio Toggle */}
            <button onClick={handleToggleMute} className="p-1 rounded bg-black/60 border border-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer" title={isMuted ? 'Unmute Audio' : 'Mute Audio'}>
              {isMuted ? <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-400"/> : <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400"/>}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MIDDLE LEFT: THE ICONIC GAME START MENU LIST                              */}
      {/* ========================================================================= */}
      <div className="relative z-20 px-3.5 sm:px-8 md:px-12 flex-1 overflow-y-auto min-h-0 flex flex-col justify-center max-w-sm sm:max-w-md w-full py-1.5 sm:py-0">
        <nav aria-label="Game Start Menu" className="flex flex-col space-y-0.5 sm:space-y-1.5">
          {MENU_ITEMS.map((item, idx) => {
            const isSelected = selectedIndex === idx;
            return (<button key={item.id} onClick={() => handleMenuItemClick(item, idx)} onMouseEnter={() => {
                    if (selectedIndex !== idx) {
                        playUiHover();
                        setSelectedIndex(idx);
                    }
                }} className={`group relative text-left py-1 sm:py-2 px-2.5 sm:px-4 rounded-md transition-all duration-150 flex items-center justify-between cursor-pointer ${isSelected
                    ? 'bg-gradient-to-r from-[#ff1f7d] via-[#ff2a85] to-[#f41459] text-white shadow-[0_0_25px_rgba(255,42,133,0.6)] translate-x-1 sm:translate-x-2 font-bold'
                    : 'text-slate-200/90 hover:text-white hover:translate-x-1'}`}>
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                  <span className={`font-bebas text-lg sm:text-2xl tracking-wide leading-none transition-colors ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                    {item.label}
                  </span>

                  {item.hasUserIcon && (<User className={`w-3 h-3 sm:w-4 sm:h-4 ${isSelected ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}/>)}
                </div>

                {/* Right Arrow Indicator on Active Item */}
                {isSelected && (<span className="font-bebas text-base sm:text-xl text-white animate-pulse pr-1">
                    &gt;
                  </span>)}
              </button>);
        })}
        </nav>

        {/* Keyboard hint */}
        <div className="hidden sm:flex items-center gap-3 pt-3 text-[10px] sm:text-xs font-mono-code text-slate-400">
          <span>[W / S] NAVIGATE</span>
          <span>•</span>
          <span>[ENTER] SELECT</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM HUD BAR: RADAR & OBJECTIVE (LEFT) | SIGNATURE QUOTE (RIGHT)         */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full px-3.5 sm:px-8 md:px-12 pb-3 sm:pb-6 flex items-end justify-between gap-3 pointer-events-none flex-shrink-0">
        {/* Bottom Left: Tactical Radar & Current Objective Widget */}
        <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-3.5 md:gap-4 min-w-0">
          {/* Radar Box */}
          <div className="relative w-11 h-11 sm:w-16 sm:h-16 rounded-md bg-black/80 border border-cyan-500/40 p-0.5 sm:p-1 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.2)] flex-shrink-0">
            {/* Radar Grid Texture */}
            <div className="absolute inset-0 bg-radar-grid opacity-50"/>

            {/* Radar Concentric Rings */}
            <div className="absolute w-8 h-8 sm:w-12 sm:h-12 rounded-full border border-cyan-500/30"/>
            <div className="absolute w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-cyan-500/40"/>

            {/* North Indicator */}
            <span className="absolute top-0.5 left-1 text-[8px] sm:text-[9px] font-mono-code font-bold text-cyan-300">
              N
            </span>

            {/* Crosshairs */}
            <div className="absolute w-full h-[1px] bg-cyan-500/20"/>
            <div className="absolute h-full w-[1px] bg-cyan-500/20"/>

            {/* Sweeping Radar Scanner */}
            <div className="absolute inset-0 rounded-md border-t border-cyan-400/60 animate-spin" style={{ animationDuration: '4s' }}/>

            {/* Blinking Player Ping */}
            <div className="relative w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff2a85] shadow-[0_0_10px_#ff2a85] animate-ping"/>
            <div className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ff2a85]"/>
          </div>

          {/* Current Objective Text */}
          <div className="font-mono-code min-w-0">
            <div className="text-[9px] sm:text-[11px] font-bold text-[#ff2a85] tracking-widest uppercase flex items-center gap-1 sm:gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a85] animate-pulse"/>
              <span>CURRENT OBJECTIVE</span>
            </div>
            <div className="font-bebas text-sm sm:text-xl text-white tracking-wide leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] truncate sm:whitespace-normal">
              BUILD NEXT LEVEL DIGITAL EXPERIENCES
            </div>
            <div className="hidden sm:block text-[10px] text-slate-400 tracking-wide font-sans">
              Vice City Inspired • Build Different • Stay Legendary
            </div>
          </div>
        </div>

        {/* Bottom Center / Mobile Tag */}
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

      {/* ========================================================================= */}
      {/* EXIT GAME / ACTION MODAL                                                  */}
      {/* ========================================================================= */}
      {showExitModal && (<div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0a0d14] border border-[#ff2a85]/50 rounded-xl p-6 shadow-[0_0_50px_rgba(255,42,133,0.3)] space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 font-mono-code">
                <span className="w-2 h-2 rounded-full bg-[#ff2a85] animate-ping"/>
                <span className="text-xs font-bold text-[#ff2a85] tracking-widest uppercase">
                  MISSION PAUSED
                </span>
              </div>
              <button onClick={() => setShowExitModal(false)} className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white">
                <X className="w-5 h-5"/>
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-bebas text-3xl text-white tracking-wide">
                READY TO EXIT OR SAVE PROGRESS?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                You can download Binil's official CV/Resume, inspect his GitHub profile, or resume your exploration of the missions dossier.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <button onClick={handleDownloadResume} className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#ff1f7d] to-[#ff2a85] hover:opacity-95 text-white font-mono-code text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,42,133,0.4)] cursor-pointer">
                <Download className="w-4 h-4"/>
                <span>DOWNLOAD RESUME (CV)</span>
              </button>

              <a href={contactData.github} target="_blank" rel="noopener noreferrer" onClick={() => playUiClick()} className="w-full py-3 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-mono-code text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer">
                <ExternalLink className="w-4 h-4"/>
                <span>VISIT GITHUB REPOSITORIES</span>
              </a>

              <button onClick={() => setShowExitModal(false)} className="w-full py-2.5 px-4 rounded-lg bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-mono-code text-xs tracking-wider transition-colors cursor-pointer">
                RESUME EXPLORATION
              </button>
            </div>
          </div>
        </div>)}
    </div>);
};
