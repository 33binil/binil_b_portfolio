import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { SECTORS } from '../data/sectorsData';
import { playUiClick, playUiHover } from '../utils/audio';
export const SectorHeader = ({ currentSectorId }) => {
    const navigate = useNavigate();
    const currentIndex = SECTORS.findIndex((s) => s.id === currentSectorId);
    const currentSector = SECTORS[currentIndex];
    const nextSector = currentIndex >= 0 && currentIndex < SECTORS.length - 1 ? SECTORS[currentIndex + 1] : SECTORS[0];
    const prevSector = currentIndex > 0 ? SECTORS[currentIndex - 1] : SECTORS[SECTORS.length - 1];
    const handleReturnToHub = () => {
        playUiClick();
        navigate('/');
    };
    const handleNavigateNext = () => {
        playUiClick();
        navigate(nextSector.path);
    };
    const handleNavigatePrev = () => {
        playUiClick();
        navigate(prevSector.path);
    };
    return (<div className="pt-24 pb-6 border-b border-cyan-500/20 bg-[#06080d]/80 backdrop-blur-md relative z-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar: Return to Hub + Breadcrumb + Sector Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Back to Hub Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={handleReturnToHub} onMouseEnter={playUiHover} className="group px-3.5 py-2 rounded-lg bg-black/60 hover:bg-cyan-950/70 border border-white/15 hover:border-cyan-400 text-xs font-mono-code text-slate-300 hover:text-white transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-sm active:scale-95">
              <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-0.5 transition-transform"/>
              <Home className="w-3.5 h-3.5 text-slate-400"/>
              <span>RETURN TO MISSION HUB</span>
            </button>

            {/* Breadcrumb display */}
            <div className="hidden md:flex items-center gap-1.5 text-xs font-mono-code text-slate-400">
              <span>HUB</span>
              <span className="text-slate-600">/</span>
              <span className="text-pink-400 font-bold">{currentSector?.missionTag || 'SECTOR'}</span>
            </div>
          </div>

          {/* Previous / Next Sector Quick Controls */}
          <div className="flex items-center gap-2">
            <button onClick={handleNavigatePrev} onMouseEnter={playUiHover} title={`Previous: ${prevSector.label}`} className="px-3 py-1.5 rounded-lg bg-black/40 hover:bg-slate-900 border border-white/10 hover:border-slate-600 text-xs font-mono-code text-slate-400 hover:text-slate-200 transition-all cursor-pointer flex items-center gap-1.5">
              <ArrowLeft className="w-3 h-3 text-slate-400"/>
              <span className="hidden sm:inline">PREV:</span>
              <span className="text-slate-300">{prevSector.label}</span>
            </button>

            <button onClick={handleNavigateNext} onMouseEnter={playUiHover} title={`Next: ${nextSector.label}`} className="px-3.5 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 hover:border-cyan-300 text-xs font-mono-code text-cyan-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
              <span className="hidden sm:inline">NEXT:</span>
              <span className="font-bold text-white">{nextSector.label}</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400"/>
            </button>
          </div>
        </div>
      </div>
    </div>);
};
