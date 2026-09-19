import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CinematicGameScreen } from './CinematicGameScreen';
import { portfolioImages, educationData } from '../data/portfolioData';
import { playUiClick, playUiHover } from '../utils/audio';
import { X, CheckCircle, GraduationCap, Award, MapPin } from 'lucide-react';

export const EducationSection = () => {
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);

    return (
      <CinematicGameScreen
        title="ACADEMY"
        scriptSubtitle="Credentials"
        scriptColor="text-[#ffd200]"
        cash="$1,750,000"
        stars={3}
        locationName="ACADEMY BLVD"
        locationSubtitle="Tech Quarter"
        objectiveText="VERIFY ACADEMIC CREDENTIALS & CERTIFICATIONS"
        backgroundImage={portfolioImages.academy}
        modals={
          selectedItem ? (
            <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
              <div className="w-full max-w-lg bg-[#0b0e14] border border-[#ffd200]/50 rounded-xl p-4 sm:p-6 shadow-[0_0_50px_rgba(255,210,0,0.3)] space-y-3 sm:space-y-4 max-h-[85dvh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono-code">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ffd200] animate-ping" />
                    <span className="text-[11px] sm:text-xs lg:text-base font-bold text-[#ffd200] tracking-widest uppercase">
                      ACCREDITATION DOSSIER // {selectedItem.badge}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded bg-[#ffd200]/20 text-[#ffd200] border border-[#ffd200]/40 text-[10px] font-mono-code font-bold uppercase flex items-center gap-1">
                      {selectedItem.type === 'Education' ? (
                        <GraduationCap className="w-3 h-3" />
                      ) : (
                        <Award className="w-3 h-3" />
                      )}
                      {selectedItem.category}
                    </span>
                    <span className="text-[11px] lg:text-sm font-mono-code text-cyan-300 font-bold">
                      {selectedItem.period}
                    </span>
                  </div>
                  <h3 className="font-bebas text-2xl sm:text-3xl lg:text-5xl text-white tracking-wide">
                    {selectedItem.degree}
                  </h3>
                  <div className="text-xs lg:text-base font-mono-code text-slate-300 font-medium mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>
                      {selectedItem.institution}
                      {selectedItem.location ? ` — ${selectedItem.location}` : ''}
                    </span>
                  </div>
                  {selectedItem.university && (
                    <div className="text-[11px] lg:text-sm font-mono-code text-slate-400 mt-0.5">
                      Affiliation / Provider: <span className="text-white">{selectedItem.university}</span>
                    </div>
                  )}
                </div>

                {/* Core Focus / Description */}
                <div className="p-3 rounded-lg bg-black/60 border border-white/10 space-y-1">
                  <div className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider">
                    CURRICULUM & SPECIALIZATION
                  </div>
                  <p className="text-xs sm:text-[13px] lg:text-lg text-slate-200 font-light leading-relaxed">
                    {selectedItem.fullDescription}
                  </p>
                </div>

                {/* Mission Highlights */}
                {selectedItem.highlights && selectedItem.highlights.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider">
                      KEY COMPETENCIES & MODULES
                    </div>
                    {selectedItem.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs lg:text-base text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-[#ffd200] flex-shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2 flex gap-2 font-mono-code text-xs">
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      navigate('/skills');
                    }}
                    className="flex-1 py-2.5 px-3 rounded bg-gradient-to-r from-[#e0a900] via-[#ffd200] to-[#ffaa00] hover:brightness-110 text-black font-bold uppercase flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,210,0,0.3)] cursor-pointer"
                  >
                    <span>VIEW SKILLS ARSENAL</span>
                  </button>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="py-2.5 px-4 rounded bg-white/10 text-white hover:bg-white/15 cursor-pointer"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          ) : null
        }
      >
        {/* Left Docked Credentials List */}
        <div className="space-y-2.5 max-w-sm sm:max-w-md">
          {/* Header indicator */}
          <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-400 px-0.5">
            <span className="text-[#ffd200] font-bold">ACCREDITATIONS // {educationData.length} RECORDS</span>
            <span>VERIFIED CREDENTIALS</span>
          </div>

          <div className="space-y-1.5 sm:space-y-2 max-h-[36dvh] sm:max-h-[46dvh] overflow-y-auto pr-1 scrollbar-thin">
            {educationData.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  playUiClick();
                  setSelectedItem(item);
                }}
                onMouseEnter={playUiHover}
                className="group p-2.5 sm:p-3 rounded-md bg-black/60 hover:bg-black/85 border border-white/15 hover:border-[#ffd200]/60 backdrop-blur-md transition-all duration-150 flex items-start gap-2.5 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
              >
                {/* Yellow/Amber square with icon */}
                <div className="w-5 h-5 rounded-sm bg-[#ffd200]/20 border border-[#ffd200]/60 flex items-center justify-center text-[#ffd200] text-xs font-bold flex-shrink-0 mt-0.5 group-hover:bg-[#ffd200]/30">
                  {item.type === 'Education' ? (
                    <GraduationCap className="w-3 h-3" />
                  ) : (
                    <Award className="w-3 h-3" />
                  )}
                </div>

                <div className="flex-1 min-w-0 font-mono-code">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] lg:text-sm text-[#ffd200] font-bold tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[10px] lg:text-sm text-slate-400 truncate">
                      {item.period}
                    </span>
                  </div>
                  <div className="font-bebas text-base sm:text-lg lg:text-2xl text-white tracking-wide leading-tight group-hover:text-[#ffd200] transition-colors truncate mt-0.5">
                    {item.shortTitle}
                  </div>
                  <div className="text-[11px] lg:text-sm text-slate-300 font-sans font-light truncate mt-0.5">
                    {item.institution}
                  </div>
                  <div className="text-[10px] lg:text-sm text-slate-400 font-sans font-light truncate">
                    {item.focus}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons: EXPLORE ARSENAL ▸ */}
          <div className="pt-1 flex gap-2">
            <button
              onClick={() => {
                playUiClick();
                navigate('/skills');
              }}
              onMouseEnter={playUiHover}
              className="flex-1 px-4 py-2 rounded-md bg-gradient-to-r from-[#e0a900] via-[#ffd200] to-[#ffaa00] hover:brightness-110 text-black font-bebas text-base sm:text-lg lg:text-2xl tracking-wider uppercase flex items-center justify-center gap-2 border border-amber-300 shadow-[0_0_20px_rgba(255,210,0,0.4)] transition-all duration-150 cursor-pointer active:scale-95"
            >
              <span>EXPLORE ARSENAL</span>
              <span className="text-sm group-hover:translate-x-1 transition-transform">▸</span>
            </button>
            <button
              onClick={() => {
                playUiClick();
                navigate('/projects');
              }}
              onMouseEnter={playUiHover}
              className="px-3 py-2 rounded-md bg-black/60 hover:bg-black/90 text-white font-bebas text-base sm:text-lg lg:text-2xl tracking-wider uppercase border border-white/20 hover:border-cyan-400 transition-all cursor-pointer"
            >
              <span>PROJECTS ▸</span>
            </button>
          </div>
        </div>
      </CinematicGameScreen>
    );
};

