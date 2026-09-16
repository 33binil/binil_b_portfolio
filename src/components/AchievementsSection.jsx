import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CinematicGameScreen } from './CinematicGameScreen';
import { portfolioImages } from '../data/portfolioData';
import { playUiClick, playUiHover, playMissionPassed } from '../utils/audio';
import { X, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
const ACHIEVEMENTS = [
    {
        title: 'FIRST PROJECT',
        description: 'Shipped my first live web build',
        category: 'Milestone',
        metric: '100% Deployed',
    },
    {
        title: 'GLOBAL CLIENTS',
        description: 'Delivered across 3 continents',
        category: 'Reach',
        metric: 'Global Client Network',
    },
    {
        title: 'VIRAL BUILDER',
        description: '2 lakh+ views on a single reel',
        category: 'Content',
        metric: '200,000+ Impressions',
    },
    {
        title: 'DEDICATION',
        description: '1000+ hours of consistency',
        category: 'Craft',
        metric: 'Daily Code Commits',
    },
];
export const AchievementsSection = () => {
    const navigate = useNavigate();
    const [showCertModal, setShowCertModal] = useState(false);
    const [selectedAchievement, setSelectedAchievement] = useState(null);
    const handleOpenCertificate = () => {
        playUiClick();
        playMissionPassed();
        setShowCertModal(true);
        confetti({
            particleCount: 60,
            spread: 80,
            origin: { y: 0.6, x: 0.4 },
            colors: ['#ff2a85', '#00f0ff', '#ffd200'],
        });
    };
    return (<CinematicGameScreen title="ACHIEVEMENTS" scriptSubtitle="Unlocked" scriptColor="text-[#ff2a85]" cash="$2,375,000" stars={4} locationName="DOWNTOWN" locationSubtitle="Vice Central" objectiveText="COLLECT EVERY UNLOCKED TROPHY" backgroundImage={portfolioImages.achievements} modals={showCertModal ? (<div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
            <div className="w-full max-w-lg bg-[#0b0e14] border border-[#ff2a85]/50 rounded-xl p-4 sm:p-6 shadow-[0_0_50px_rgba(255,42,133,0.3)] space-y-3 sm:space-y-4 max-h-[85dvh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono-code">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff2a85] animate-ping"/>
                  <span className="text-[11px] sm:text-xs font-bold text-[#ff2a85] tracking-widest uppercase">
                    CERTIFICATE & HONORS TERMINAL
                  </span>
                </div>
                <button onClick={() => setShowCertModal(false)} className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5"/>
                </button>
              </div>

              <div className="p-3 sm:p-4 rounded-lg bg-black/60 border border-[#ff2a85]/30 text-center space-y-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ff2a85]/20 text-[#ff2a85] flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(255,42,133,0.5)]">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6"/>
                </div>
                <h4 className="font-bebas text-xl sm:text-3xl text-white tracking-wide">
                  VERIFIED FULL-STACK BUILDER
                </h4>
                <p className="text-xs text-slate-300 font-sans font-light">
                  Official verification of advanced proficiency in modern Web Architectures,
                  JavaScript, and UI/UX Systems.
                </p>
                <div className="text-[10px] font-mono-code text-cyan-300 pt-1">
                  ISSUED TO: BINIL B // CREDENTIAL ID: BN-2026-GTA
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <div className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider">
                  TROPHY HONORS
                </div>
                {ACHIEVEMENTS.map((ach, idx) => (<div key={idx} className="p-2 rounded bg-black/40 border border-white/10 flex items-center justify-between font-mono-code text-xs gap-2">
                    <span className="text-white font-bold truncate">{ach.title}</span>
                    <span className="text-cyan-400 flex-shrink-0">{ach.metric}</span>
                  </div>))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button onClick={() => {
                setShowCertModal(false);
                navigate('/contact');
            }} className="flex-1 py-2.5 px-4 rounded bg-gradient-to-r from-[#ff1f7d] to-[#ff2a85] text-white font-mono-code text-xs font-bold uppercase tracking-wider cursor-pointer text-center">
                  COMMISSION A PROJECT
                </button>
                <button onClick={() => setShowCertModal(false)} className="py-2.5 px-4 rounded bg-white/10 text-white font-mono-code text-xs hover:bg-white/15 cursor-pointer">
                  CLOSE
                </button>
              </div>
            </div>
          </div>) : null}>
      {/* Left Docked Achievement Cards as in Reference Image 3 */}
      <div className="space-y-2.5 max-w-sm">
        {ACHIEVEMENTS.map((item, idx) => (<div key={idx} onClick={handleOpenCertificate} onMouseEnter={playUiHover} className="group p-2.5 sm:p-3 rounded-md bg-black/60 hover:bg-black/85 border border-white/15 hover:border-[#ff2a85]/60 backdrop-blur-md transition-all duration-150 flex items-start gap-2.5 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            {/* Cyan square with + */}
            <div className="w-4 h-4 rounded-sm bg-cyan-400/20 border border-cyan-400/60 flex items-center justify-center text-cyan-300 text-xs font-bold flex-shrink-0 mt-0.5 group-hover:bg-cyan-400/30">
              +
            </div>

            <div className="flex-1 min-w-0 font-mono-code">
              <div className="font-bebas text-base sm:text-lg text-white tracking-wide leading-tight group-hover:text-pink-400 transition-colors">
                {item.title}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-sans font-light truncate mt-0.5">
                {item.description}
              </div>
            </div>
          </div>))}

        {/* Action Button: VIEW CERTIFICATE ▸ */}
        <div className="pt-1.5">
          <button onClick={handleOpenCertificate} onMouseEnter={playUiHover} className="group px-4 py-2 rounded-md bg-gradient-to-r from-[#ff1f7d] via-[#ff2a85] to-[#f41459] hover:brightness-110 text-white font-bebas text-base sm:text-lg tracking-wider uppercase flex items-center gap-2 border border-pink-400/50 shadow-[0_0_20px_rgba(255,42,133,0.5)] transition-all duration-150 cursor-pointer active:scale-95">
            <span>VIEW CERTIFICATE</span>
            <span className="text-sm group-hover:translate-x-1 transition-transform">▸</span>
          </button>
        </div>
      </div>
    </CinematicGameScreen>);
};
