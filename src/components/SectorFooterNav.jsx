import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';
import { SECTORS } from '../data/sectorsData';
import { playUiClick, playUiHover } from '../utils/audio';
export const SectorFooterNav = ({ currentSectorId }) => {
    const navigate = useNavigate();
    const currentIndex = SECTORS.findIndex((s) => s.id === currentSectorId);
    const currentSector = SECTORS[currentIndex];
    const nextSector = currentIndex >= 0 && currentIndex < SECTORS.length - 1 ? SECTORS[currentIndex + 1] : SECTORS[0];
    const prevSector = currentIndex > 0 ? SECTORS[currentIndex - 1] : SECTORS[SECTORS.length - 1];
    return (<section className="py-12 border-t border-white/10 bg-[#05070b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Next Mission CTA Box */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(0,240,255,0.1)]">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-[11px] font-mono-code text-pink-400 font-bold uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"/>
              <span>UP NEXT // {nextSector.missionTag}</span>
            </div>
            <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
              CONTINUE TO <span className="text-cyan-400">{nextSector.title}</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm font-mono-code max-w-xl">
              {nextSector.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
            <button onClick={() => {
            playUiClick();
            navigate('/');
        }} onMouseEnter={playUiHover} className="px-5 py-3 rounded-lg bg-black/60 hover:bg-slate-900 border border-white/15 text-xs font-mono-code text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-2">
              <Home className="w-4 h-4 text-slate-400"/>
              <span>RETURN TO MISSION HUB</span>
            </button>

            <button onClick={() => {
            playUiClick();
            navigate(nextSector.path);
        }} onMouseEnter={playUiHover} className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-mono-code text-xs font-bold tracking-wider uppercase border border-pink-400 shadow-[0_0_20px_rgba(255,42,133,0.4)] transition-all cursor-pointer flex items-center gap-2 active:scale-95">
              <span>ENTER NEXT SECTOR</span>
              <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        </div>

        {/* Rapid Sector Jump Bar */}
        <div className="space-y-3">
          <div className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider text-center sm:text-left">
            DIRECT ACCESS TO ALL MISSIONS:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {SECTORS.map((sector) => {
            const isCurrent = sector.id === currentSectorId;
            return (<button key={sector.id} onClick={() => {
                    playUiClick();
                    navigate(sector.path);
                }} onMouseEnter={playUiHover} className={`p-2.5 rounded-lg text-left border transition-all cursor-pointer ${isCurrent
                    ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                    : 'bg-black/40 border-white/10 hover:border-pink-500/50 text-slate-300 hover:text-white'}`}>
                  <div className="text-[9px] font-mono-code text-slate-400">
                    MISSION {sector.missionNumber}
                  </div>
                  <div className="font-bebas text-base tracking-wider truncate">
                    {sector.label}
                  </div>
                </button>);
        })}
          </div>
        </div>
      </div>
    </section>);
};
