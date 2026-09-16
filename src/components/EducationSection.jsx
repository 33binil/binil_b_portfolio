import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CinematicGameScreen } from './CinematicGameScreen';
import { portfolioImages } from '../data/portfolioData';
import { playUiClick, playUiHover } from '../utils/audio';
import { X } from 'lucide-react';
const ACADEMY_ITEMS = [
    {
        degree: 'B.TECH IN COMPUTER SCIENCE & IT',
        institution: 'University Technical Campus',
        year: '2022 - 2026',
        grade: 'First Class with Distinction',
        highlights: 'Algorithms, Data Structures, Web Technologies, Distributed Systems',
    },
    {
        degree: 'META FRONTEND CERTIFIED SPECIALIST',
        institution: 'Meta / Coursera Professional',
        year: '2023',
        grade: 'Certified Expert',
        highlights: 'Advanced React, State Management, UI Architecture & Best Practices',
    },
    {
        degree: 'UI/UX DESIGN & DESIGN SYSTEMS',
        institution: 'Design Institute & Open Web',
        year: '2023',
        grade: 'Completed',
        highlights: 'Figma prototyping, micro-interactions, responsive accessibility',
    },
];
export const EducationSection = () => {
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);
    return (<CinematicGameScreen title="ACADEMY" scriptSubtitle="Credentials" scriptColor="text-[#ffd200]" cash="$1,750,000" stars={3} locationName="ACADEMY BLVD" locationSubtitle="Tech Quarter" objectiveText="VERIFY ACADEMIC CREDENTIALS" backgroundImage={portfolioImages.about} modals={selectedItem ? (<div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
            <div className="w-full max-w-md bg-[#0b0e14] border border-[#ffd200]/50 rounded-xl p-4 sm:p-6 shadow-[0_0_50px_rgba(255,210,0,0.25)] space-y-3 sm:space-y-4 max-h-[85dvh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono-code">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ffd200] animate-ping"/>
                  <span className="text-[11px] sm:text-xs font-bold text-[#ffd200] tracking-widest uppercase">
                    ACCREDITATION DOSSIER
                  </span>
                </div>
                <button onClick={() => setSelectedItem(null)} className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5"/>
                </button>
              </div>

              <div>
                <h3 className="font-bebas text-2xl text-white tracking-wide">
                  {selectedItem.degree}
                </h3>
                <div className="text-xs font-mono-code text-cyan-300 font-bold mt-0.5">
                  {selectedItem.institution} • {selectedItem.year}
                </div>
                {selectedItem.highlights && (<p className="text-xs text-slate-300 font-light mt-2 leading-relaxed">
                    {selectedItem.highlights}
                  </p>)}
              </div>

              <div className="pt-2">
                <button onClick={() => setSelectedItem(null)} className="w-full py-2 rounded bg-white/10 text-white font-mono-code text-xs hover:bg-white/15 cursor-pointer">
                  CLOSE DOSSIER
                </button>
              </div>
            </div>
          </div>) : null}>
      {/* Left Docked Cards */}
      <div className="space-y-2.5 max-w-sm">
        {ACADEMY_ITEMS.map((item, idx) => (<div key={idx} onClick={() => {
                playUiClick();
                setSelectedItem(item);
            }} onMouseEnter={playUiHover} className="group p-2.5 sm:p-3 rounded-md bg-black/60 hover:bg-black/85 border border-white/15 hover:border-[#ffd200]/60 backdrop-blur-md transition-all duration-150 flex items-start gap-2.5 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            {/* Cyan square with + */}
            <div className="w-4 h-4 rounded-sm bg-cyan-400/20 border border-cyan-400/60 flex items-center justify-center text-cyan-300 text-xs font-bold flex-shrink-0 mt-0.5 group-hover:bg-cyan-400/30">
              +
            </div>

            <div className="flex-1 min-w-0 font-mono-code">
              <div className="font-bebas text-base sm:text-lg text-white tracking-wide leading-tight group-hover:text-[#ffd200] transition-colors">
                {item.degree}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-sans font-light truncate mt-0.5">
                {item.institution} ({item.year})
              </div>
            </div>
          </div>))}

        {/* Action Button: EXPLORE ARSENAL ▸ */}
        <div className="pt-1.5">
          <button onClick={() => {
            playUiClick();
            navigate('/skills');
        }} onMouseEnter={playUiHover} className="group px-4 py-2 rounded-md bg-gradient-to-r from-[#e0a900] via-[#ffd200] to-[#ffaa00] hover:brightness-110 text-black font-bebas text-base sm:text-lg tracking-wider uppercase flex items-center gap-2 border border-amber-300 shadow-[0_0_20px_rgba(255,210,0,0.4)] transition-all duration-150 cursor-pointer active:scale-95">
            <span>EXPLORE ARSENAL</span>
            <span className="text-sm group-hover:translate-x-1 transition-transform">▸</span>
          </button>
        </div>
      </div>
    </CinematicGameScreen>);
};
