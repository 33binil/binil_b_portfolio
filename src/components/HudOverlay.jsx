import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Volume2, VolumeX, Crosshair, Radio, MapPin, Sparkles } from 'lucide-react';
import { playMissionPassed, playUiClick, toggleAudioMute, getIsAudioMuted } from '../utils/audio';
import confetti from 'canvas-confetti';
const OBJECTIVES_MAP = {
    hero: {
        title: "BINIL'S MISSION HUB",
        subtitle: 'SELECT SECTOR TO EXPLORE',
        tag: 'MISSION 01 // HUB',
    },
    about: {
        title: 'LEARN WHO YOU ARE DEALING WITH',
        subtitle: 'DECRYPT PLAYER DOSSIER & ORIGIN',
        tag: 'MISSION 02 // DOSSIER',
    },
    skills: {
        title: 'REVIEW UNLOCKED ABILITIES',
        subtitle: 'INSPECT FULL-STACK & UI ARSENAL',
        tag: 'MISSION 03 // ARSENAL',
    },
    projects: {
        title: 'INSPECT COMPLETED BUILDS',
        subtitle: 'ANALYZE PRODUCTION DEPLOYMENTS',
        tag: 'MISSION 04 // OPERATIONS',
    },
    experience: {
        title: 'TRACE THE FULL CAREER PATH',
        subtitle: 'FOLLOW INDUSTRY MILESTONES',
        tag: 'MISSION 05 // TIMELINE',
    },
    education: {
        title: 'EXAMINE CREDENTIALS & DEGREES',
        subtitle: 'ACADEMIC FOUNDATION & TRAINING',
        tag: 'MISSION 06 // ACADEMY',
    },
    services: {
        title: 'EVALUATE CAPABILITIES & SERVICES',
        subtitle: 'CUSTOM DIGITAL BUILDS ON DEMAND',
        tag: 'MISSION 07 // CONTRACTS',
    },
    contact: {
        title: 'OPEN A SECURE LINE OF CONTACT',
        subtitle: 'START YOUR NEXT DIGITAL VENTURE',
        tag: 'MISSION 08 // COMM LINK',
    },
};
export const HudOverlay = ({ currentSection }) => {
    const location = useLocation();
    const [isMuted, setIsMuted] = useState(false);
    const [inGameTime, setInGameTime] = useState('18:56');
    const [showMissionPassedBanner, setShowMissionPassedBanner] = useState(false);
    const routeKey = location.pathname === '/' ? 'hero' : location.pathname.replace('/', '');
    const activeSection = currentSection || routeKey;
    const activeObjective = OBJECTIVES_MAP[activeSection] || OBJECTIVES_MAP.hero;
    useEffect(() => {
        setIsMuted(getIsAudioMuted());
        // Update in-game simulated HUD clock
        const updateTime = () => {
            const now = new Date();
            const hrs = String(now.getHours()).padStart(2, '0');
            const mins = String(now.getMinutes()).padStart(2, '0');
            setInGameTime(`${hrs}:${mins}`);
        };
        updateTime();
        const interval = setInterval(updateTime, 10000);
        return () => clearInterval(interval);
    }, []);
    const handleMuteToggle = () => {
        const nextMuted = toggleAudioMute();
        setIsMuted(nextMuted);
        playUiClick();
    };
    const triggerMissionPassed = () => {
        playMissionPassed();
        setShowMissionPassedBanner(true);
        confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.7, x: 0.5 },
            colors: ['#00f0ff', '#ff2a85', '#ffd200', '#ffffff'],
        });
        setTimeout(() => {
            setShowMissionPassedBanner(false);
        }, 3500);
    };
    return (<>
      {/* Top Floating HUD Status Bar */}
      <div className="fixed top-20 right-4 md:right-8 z-30 pointer-events-none hidden sm:flex flex-col items-end gap-1.5 font-mono-code text-[11px] text-slate-300">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 border border-cyan-500/30 rounded shadow-[0_0_15px_rgba(0,240,255,0.15)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
          <span className="text-emerald-300 font-semibold tracking-wider">SYSTEM ONLINE</span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-300">{inGameTime}</span>
          <span className="text-slate-500">|</span>
          <span className="text-amber-300 font-bold">LVL: ADVANCED</span>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-slate-400 bg-black/40 px-2 py-0.5 border border-white/10 rounded">
          <MapPin className="w-3 h-3 text-pink-400"/>
          <span>KERALA, IN // 9.9312° N, 76.2673° E</span>
        </div>
      </div>

      {/* Bottom Left Game Radar / Current Objective HUD Widget */}
      <aside aria-label="Game HUD Objective" className="fixed bottom-4 left-4 md:bottom-6 md:left-8 z-30 max-w-[280px] sm:max-w-xs pointer-events-auto">
        <div className="glass-panel p-2.5 rounded-lg border border-cyan-500/25 relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.7)]">
          {/* Subtle radar grid background */}
          <div className="absolute inset-0 bg-radar-grid opacity-30 pointer-events-none"/>

          {/* Accent corner brackets */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400"/>
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400"/>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400"/>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400"/>

          <div className="relative z-10 flex items-start gap-2.5">
            {/* Animated Radar Reticle */}
            <div className="w-8 h-8 rounded-full border border-cyan-400/50 flex items-center justify-center relative flex-shrink-0 bg-cyan-950/40">
              <Crosshair className="w-4 h-4 text-cyan-300 animate-spin" style={{ animationDuration: '8s' }}/>
              <span className="absolute w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping"/>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[9px] font-mono-code font-bold tracking-widest text-pink-400 uppercase">
                  {activeObjective.tag}
                </span>
                <span className="text-[9px] font-mono-code text-cyan-400/80 px-1 bg-cyan-950/60 rounded border border-cyan-500/20">
                  ACTIVE
                </span>
              </div>
              <h4 className="font-bebas text-sm sm:text-base tracking-wide text-white truncate leading-tight mt-0.5">
                {activeObjective.title}
              </h4>
              <p className="text-[10px] text-slate-400 truncate font-mono-code">
                {activeObjective.subtitle}
              </p>
            </div>
          </div>

          <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] font-mono-code text-slate-400">
            <span className="flex items-center gap-1">
              <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse"/>
              <span>LIVE TRANSMISSION</span>
            </span>
            <button onClick={() => {
            triggerMissionPassed();
        }} className="text-cyan-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1" title="Trigger celebration">
              <Sparkles className="w-2.5 h-2.5 text-amber-300"/>
              <span>PASS CHECK</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Bottom Right Controls: Audio Mute & Mission Quick Trigger */}
      <aside aria-label="Game HUD Audio Controls" className="fixed bottom-4 right-4 md:bottom-6 md:right-8 z-30 flex items-center gap-2">
        <button onClick={handleMuteToggle} className="glass-panel p-2.5 rounded-lg border border-slate-700 hover:border-pink-500/50 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer shadow-lg group flex items-center gap-2 text-xs font-mono-code" title={isMuted ? 'Unmute UI Audio Feedback' : 'Mute UI Audio Feedback'} aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}>
          {isMuted ? (<VolumeX className="w-4 h-4 text-slate-400 group-hover:text-pink-400"/>) : (<Volume2 className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 animate-pulse"/>)}
          <span className="hidden sm:inline text-[10px] text-slate-400">
            {isMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}
          </span>
        </button>
      </aside>

      {/* Mission Passed Cinematic HUD Banner */}
      {showMissionPassedBanner && (<div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity duration-300">
          <div className="text-center transform scale-110 animate-bounce">
            <div className="inline-block px-8 py-3 bg-gradient-to-r from-pink-600/90 via-purple-600/90 to-cyan-600/90 border-2 border-white/80 rounded-xl shadow-[0_0_50px_rgba(255,42,133,0.6)]">
              <div className="text-[12px] font-mono-code font-bold tracking-widest text-amber-300 uppercase">
                OBJECTIVE ACCOMPLISHED
              </div>
              <h2 className="font-bebas text-5xl md:text-7xl tracking-wider text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                MISSION PASSED!
              </h2>
              <div className="text-sm font-mono-code text-cyan-200 tracking-widest mt-1">
                RESPECT +++ // EXPERIENCE UNLOCKED
              </div>
            </div>
          </div>
        </div>)}
    </>);
};
