import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Volume2, VolumeX, Shield, Star, Download, ExternalLink, X, Menu, ArrowLeft } from 'lucide-react';
import { contactData, portfolioImages } from '../data/portfolioData';
import { playUiClick, playUiHover, playMissionPassed, toggleAudioMute, getIsAudioMuted } from '../utils/audio';
export const GAME_MENU_ITEMS = [
    { id: 'start', label: 'START GAME', path: '/' },
    { id: 'about', label: 'ABOUT ME', path: '/about', hasUserIcon: true },
    { id: 'skills', label: 'SKILLS', path: '/skills' },
    { id: 'projects', label: 'PROJECTS', path: '/projects' },
    { id: 'experience', label: 'EXPERIENCE', path: '/experience' },
    { id: 'achievements', label: 'ACHIEVEMENTS', path: '/achievements' },
    { id: 'academy', label: 'ACADEMY', path: '/education' },
    { id: 'services', label: 'SERVICES', path: '/services' },
    { id: 'contact', label: 'CONTACT', path: '/contact' },
    { id: 'exit', label: 'EXIT GAME', path: '', isAction: true },
];
export const GameScreenLayout = ({ activeMenuId, scriptSubtitle, missionCode, missionObjective, backgroundImage, children, }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentTime, setCurrentTime] = useState('18:56');
    const [isMuted, setIsMuted] = useState(false);
    const [countdownSeconds, setCountdownSeconds] = useState(26);
    const [showExitModal, setShowExitModal] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const activeIndex = GAME_MENU_ITEMS.findIndex((item) => item.id === activeMenuId);
    const [highlightedIndex, setHighlightedIndex] = useState(activeIndex >= 0 ? activeIndex : 0);
    useEffect(() => {
        setIsMuted(getIsAudioMuted());
    }, []);
    useEffect(() => {
        if (activeIndex >= 0) {
            setHighlightedIndex(activeIndex);
        }
    }, [activeIndex]);
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
    // Keyboard navigation for authentic game console feel (W/S, Arrow Up/Down, Enter, Esc)
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Don't intercept if user is typing in an input or textarea
            const target = e.target;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')
                return;
            if (showExitModal) {
                if (e.key === 'Escape')
                    setShowExitModal(false);
                return;
            }
            if (e.key === 'Escape') {
                if (location.pathname !== '/') {
                    e.preventDefault();
                    playUiClick();
                    navigate('/');
                }
                return;
            }
            if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
                e.preventDefault();
                playUiHover();
                setHighlightedIndex((prev) => (prev + 1) % GAME_MENU_ITEMS.length);
            }
            else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
                e.preventDefault();
                playUiHover();
                setHighlightedIndex((prev) => (prev - 1 + GAME_MENU_ITEMS.length) % GAME_MENU_ITEMS.length);
            }
            else if (e.key === 'Enter') {
                e.preventDefault();
                const selected = GAME_MENU_ITEMS[highlightedIndex];
                if (selected) {
                    handleMenuItemClick(selected);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [highlightedIndex, showExitModal, location.pathname]);
    const handleMenuItemClick = (item) => {
        playUiClick();
        setMobileMenuOpen(false);
        if (item.isAction && item.id === 'exit') {
            setShowExitModal(true);
            return;
        }
        if (item.id === 'start') {
            playMissionPassed();
            navigate('/');
            return;
        }
        if (item.path) {
            navigate(item.path);
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
    const currentBg = backgroundImage || portfolioImages.hero;
    return (<div className="relative w-full min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-[#07090e] select-none flex flex-col justify-between">
      {/* Fullscreen Cinematic Background Art with Ambient Vignette */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src={currentBg} alt="Cinematic Vice City Background" referrerPolicy="no-referrer" className="w-full h-full object-cover object-[70%_center] md:object-center filter brightness-[0.42] contrast-[1.15]"/>

        {/* Ambient Dark Gradient Vignette for UI Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#040609]/98 via-[#040609]/85 to-[#040609]/75"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#040609]/95 via-transparent to-[#040609]/70"/>
        <div className="absolute inset-0 bg-scanlines opacity-20"/>
      </div>

      {/* ========================================================================= */}
      {/* TOP HUD BAR: LOGO (LEFT) | COMPASS & MISSION (CENTER) | STATUS (RIGHT)   */}
      {/* ========================================================================= */}
      <header className="relative z-30 w-full px-4 sm:px-8 md:px-12 pt-4 sm:pt-6 flex items-start justify-between flex-shrink-0">
        {/* Top Left: Logo / Branding ("BINIL BUILDS <Subtitle>") */}
        <button onClick={() => {
            playUiClick();
            navigate('/');
        }} className="flex flex-col items-start text-left cursor-pointer group pointer-events-auto">
          <div className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[0.82] tracking-wider text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] group-hover:text-cyan-300 transition-colors">
            BINIL
          </div>
          <div className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[0.82] tracking-wider text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            BUILDS
          </div>
          <span className="font-script text-2xl sm:text-3xl text-[#ff2a85] -rotate-6 ml-3 sm:ml-5 -mt-1 drop-shadow-[0_0_15px_rgba(255,42,133,0.9)] font-bold tracking-wide">
            {scriptSubtitle}
          </span>
        </button>

        {/* Top Center: Coordinates & Mission Identifier */}
        <div className="hidden sm:flex flex-col items-center text-center font-mono-code pt-1 pointer-events-none">
          <div className="flex items-center gap-1 text-[11px] text-white/80 font-bold tracking-widest uppercase">
            <span className="text-white text-[10px]">▲</span>
            <span>104.9</span>
          </div>
          <div className="text-[11px] text-[#ff2a85] font-bold tracking-wider uppercase mt-1 drop-shadow-[0_0_8px_#ff2a85]">
            {missionCode}
          </div>
          <div className="text-sm md:text-base font-bold text-white tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            108 : 15 : 33 : {String(countdownSeconds).padStart(2, '0')}
          </div>
        </div>

        {/* Top Right: GTA Clock, Cash, Weapon/Health & Sound HUD */}
        <div className="flex flex-col items-end text-right font-mono-code pointer-events-auto">
          {/* In-Game Clock */}
          <div className="text-lg sm:text-2xl font-bold text-white tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {currentTime}
          </div>

          {/* Neon Green Cash / Net Worth */}
          <div className="text-lg sm:text-2xl md:text-3xl font-bold text-[#32f38d] tracking-wide drop-shadow-[0_0_12px_rgba(50,243,141,0.6)]">
            $1,250,000
          </div>

          {/* Health & Armor + Star Level + Audio Toggle */}
          <div className="flex items-center gap-2 mt-1">
            <div className="hidden sm:flex items-center gap-0.5 text-[#ffd200]">
              <Star className="w-3 h-3 fill-current"/>
              <Star className="w-3 h-3 fill-current"/>
              <Star className="w-3 h-3 fill-current"/>
              <Star className="w-3 h-3 fill-current"/>
              <Star className="w-3 h-3 fill-current"/>
            </div>

            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-black/60 border border-white/20 rounded">
              <Shield className="w-3 h-3 text-[#32f38d]"/>
              <span className="text-xs font-bold text-white">100</span>
            </div>

            {/* Audio Toggle */}
            <button onClick={handleToggleMute} className="p-1 rounded bg-black/60 border border-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer" title={isMuted ? 'Unmute Audio' : 'Mute Audio'}>
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-pink-400"/> : <Volume2 className="w-3.5 h-3.5 text-cyan-400"/>}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button onClick={() => {
            playUiClick();
            setMobileMenuOpen(!mobileMenuOpen);
        }} className="lg:hidden p-1 rounded bg-black/60 border border-pink-500/50 text-pink-400 hover:text-white" title="Toggle Game Menu">
              {mobileMenuOpen ? <X className="w-4 h-4"/> : <Menu className="w-4 h-4"/>}
            </button>
          </div>

          {/* Quick Return to Hub on Subpages */}
          {location.pathname !== '/' && (<button onClick={() => {
                playUiClick();
                navigate('/');
            }} className="mt-2 hidden sm:flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900/80 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 hover:text-white text-[10px] tracking-wider uppercase transition-colors">
              <ArrowLeft className="w-3 h-3"/>
              <span>HUB [ESC]</span>
            </button>)}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN GAME BODY: AUTHENTIC LEFT MENU + CENTER/RIGHT MISSION DOSSIER        */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full px-4 sm:px-8 md:px-12 my-3 lg:my-auto flex-grow flex flex-col lg:flex-row items-stretch lg:items-center gap-6 lg:gap-10 overflow-visible lg:overflow-hidden">
        {/* ========================================================= */}
        {/* LEFT COLUMN: THE ICONIC GAME START/PAUSE MENU LIST        */}
        {/* ========================================================= */}
        <div className="hidden lg:flex flex-col flex-shrink-0 w-64 xl:w-72">
          <nav aria-label="Game Start Menu" className="flex flex-col space-y-1 sm:space-y-1.5">
            {GAME_MENU_ITEMS.map((item, idx) => {
            const isCurrent = item.id === activeMenuId;
            const isHighlighted = highlightedIndex === idx;
            return (<button key={item.id} onClick={() => handleMenuItemClick(item)} onMouseEnter={() => {
                    if (highlightedIndex !== idx) {
                        playUiHover();
                        setHighlightedIndex(idx);
                    }
                }} className={`group relative text-left py-1.5 px-3 sm:py-2 sm:px-4 rounded-md transition-all duration-150 flex items-center justify-between cursor-pointer ${isCurrent || isHighlighted
                    ? 'bg-gradient-to-r from-[#ff1f7d] via-[#ff2a85] to-[#f41459] text-white shadow-[0_0_25px_rgba(255,42,133,0.6)] translate-x-1 sm:translate-x-2 font-bold'
                    : 'text-slate-300/90 hover:text-white hover:translate-x-1'}`}>
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <span className={`font-bebas text-xl sm:text-2xl tracking-wide leading-none transition-colors ${isCurrent || isHighlighted ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                      {item.label}
                    </span>

                    {item.hasUserIcon && (<User className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isCurrent || isHighlighted ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}/>)}
                  </div>

                  {/* Right Arrow Indicator on Active Item */}
                  {(isCurrent || isHighlighted) && (<span className="font-bebas text-lg sm:text-xl text-white animate-pulse pr-1">
                      &gt;
                    </span>)}
                </button>);
        })}
          </nav>

          {/* Keyboard navigation hint */}
          <div className="flex items-center gap-2.5 pt-4 text-[10px] font-mono-code text-slate-400">
            <span>[W / S] NAVIGATE</span>
            <span>•</span>
            <span>[ENTER] SELECT</span>
            <span>•</span>
            <span>[ESC] HUB</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CENTER/RIGHT: MISSION DOSSIER CONTENT PANEL               */}
        {/* ========================================================= */}
        <div className="flex-grow w-full lg:max-w-[calc(100%-19rem)] xl:max-w-[calc(100%-20rem)] lg:h-[calc(100vh-190px)] lg:max-h-[calc(100vh-190px)] flex flex-col justify-start">
          {/* Glassmorphic Cyber Briefing Frame */}
          <div className="relative w-full h-full glass-panel bg-black/60 border border-cyan-500/30 rounded-xl p-4 sm:p-6 lg:p-7 shadow-[0_0_40px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-y-auto custom-game-scrollbar">
            {/* Corner Crosshairs */}
            <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none"/>
            <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none"/>
            <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-pink-500 pointer-events-none"/>
            <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-pink-500 pointer-events-none"/>

            {/* Injected Mission Page Content */}
            <div className="relative z-10 w-full space-y-6">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM HUD BAR: RADAR & OBJECTIVE (LEFT) | SIGNATURE QUOTE (RIGHT)        */}
      {/* ========================================================================= */}
      <footer className="relative z-30 w-full px-4 sm:px-8 md:px-12 pb-4 sm:pb-6 flex flex-col sm:flex-row items-end sm:items-end justify-between gap-4 flex-shrink-0">
        {/* Bottom Left: Tactical Radar & Current Objective Widget */}
        <div className="flex items-center gap-3.5 pointer-events-auto">
          {/* Radar Box */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-black/85 border border-cyan-500/40 p-1 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.2)] flex-shrink-0">
            {/* Radar Grid Texture */}
            <div className="absolute inset-0 bg-radar-grid opacity-50"/>

            {/* Radar Concentric Rings */}
            <div className="absolute w-10 h-10 rounded-full border border-cyan-500/30"/>
            <div className="absolute w-5 h-5 rounded-full border border-cyan-500/40"/>

            {/* North Indicator */}
            <span className="absolute top-1 left-1.5 text-[8px] font-mono-code font-bold text-cyan-300">
              N
            </span>

            {/* Crosshairs */}
            <div className="absolute w-full h-[1px] bg-cyan-500/20"/>
            <div className="absolute h-full w-[1px] bg-cyan-500/20"/>

            {/* Sweeping Radar Scanner */}
            <div className="absolute inset-0 rounded-md border-t border-cyan-400/70 animate-spin" style={{ animationDuration: '4s' }}/>

            {/* Blinking Player Ping */}
            <div className="relative w-2 h-2 rounded-full bg-[#ff2a85] shadow-[0_0_10px_#ff2a85] animate-ping"/>
            <div className="absolute w-1.5 h-1.5 rounded-full bg-[#ff2a85]"/>
          </div>

          {/* Current Objective Text */}
          <div className="font-mono-code">
            <div className="text-[10px] sm:text-[11px] font-bold text-[#ff2a85] tracking-widest uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a85] animate-pulse"/>
              <span>CURRENT OBJECTIVE</span>
            </div>
            <div className="font-bebas text-base sm:text-xl text-white tracking-wide leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {missionObjective}
            </div>
            <div className="text-[10px] text-slate-400 tracking-wide font-sans">
              Vice City Inspired • Build Different • Stay Legendary
            </div>
          </div>
        </div>

        {/* Bottom Center / Mobile Tag */}
        <div className="hidden lg:block text-center font-bebas text-sm tracking-[0.3em] text-slate-500/70">
          BINIL.BUILDS
        </div>

        {/* Bottom Right: Cursive Signature Quote */}
        <div className="text-right font-mono-code pointer-events-auto">
          <div className="font-script text-lg sm:text-xl md:text-2xl text-slate-200 tracking-wide italic leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            "Code is my weapon, Creativity is my world."
          </div>
          <div className="font-script text-lg sm:text-xl text-[#ff2a85] tracking-wider mt-0.5 drop-shadow-[0_0_10px_rgba(255,42,133,0.8)]">
            — Binil B
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* MOBILE FULLSCREEN GAME MENU POPUP (WHEN TOGGLED)                          */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (<div className="fixed inset-0 z-50 bg-[#07090e]/98 backdrop-blur-xl border-t border-cyan-500/40 p-6 flex flex-col justify-between overflow-y-auto lg:hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <div className="font-bebas text-3xl text-white">BINIL BUILDS</div>
              <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                MENU
              </span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-white">
              <X className="w-6 h-6 text-pink-400"/>
            </button>
          </div>

          <div className="space-y-2 py-4">
            <div className="text-[11px] font-mono-code text-pink-400 tracking-widest uppercase mb-2">
              SELECT MISSION SECTOR:
            </div>
            {GAME_MENU_ITEMS.map((item, idx) => {
                const isCurrent = item.id === activeMenuId;
                return (<button key={item.id} onClick={() => handleMenuItemClick(item)} className={`w-full text-left p-3 rounded-lg flex items-center justify-between border transition-all ${isCurrent
                        ? 'bg-gradient-to-r from-[#ff1f7d] to-[#ff2a85] border-pink-400 text-white shadow-[0_0_15px_rgba(255,42,133,0.5)] font-bold'
                        : 'bg-black/50 border-white/10 text-slate-200 hover:border-pink-500/50 hover:text-white'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono-code text-slate-400">0{idx + 1}</span>
                    <span className="font-bebas text-2xl tracking-wider">{item.label}</span>
                  </div>
                  <span className="font-bebas text-lg">&gt;</span>
                </button>);
            })}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <button onClick={handleDownloadResume} className="w-full py-3 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-mono-code text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-pink-400 shadow-[0_0_20px_rgba(255,42,133,0.4)]">
              <Download className="w-4 h-4"/>
              <span>DOWNLOAD RESUME (PDF)</span>
            </button>
          </div>
        </div>)}

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
                MISSION PAUSE MENU
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Save progress, download Binil's official CV/Resume, or inspect his open-source code repositories.
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
                RESUME CURRENT MISSION
              </button>
            </div>
          </div>
        </div>)}
    </div>);
};
