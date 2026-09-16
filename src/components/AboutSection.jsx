import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CinematicGameScreen } from './CinematicGameScreen';
import { portfolioImages } from '../data/portfolioData';
import { playUiClick, playUiHover } from '../utils/audio';
import { X } from 'lucide-react';
export const AboutSection = () => {
    const navigate = useNavigate();
    const [showDossierModal, setShowDossierModal] = useState(false);
    const handleViewJourney = () => {
        playUiClick();
        navigate('/experience');
    };
    const dossierItems = [
        {
            label: 'AGE',
            value: '20 — Final year B.Tech IT',
        },
        {
            label: 'LOCATION',
            value: 'Kerala, India',
        },
        {
            label: 'STATUS',
            value: 'Building my dreams',
        },
    ];
    return (<CinematicGameScreen title="ABOUT" scriptSubtitle="Me" scriptColor="text-[#ff7a45]" cash="$1,425,000" stars={1} locationName="OCEAN DRIVE" locationSubtitle="Vice Beach" objectiveText="LEARN WHO YOU ARE DEALING WITH" backgroundImage={portfolioImages.about} modals={showDossierModal ? (<div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
            <div className="w-full max-w-lg bg-[#0b0e14] border border-[#ff7a45]/50 rounded-xl p-4 sm:p-6 shadow-[0_0_50px_rgba(255,122,69,0.3)] space-y-3 sm:space-y-4 max-h-[85dvh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono-code">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff7a45] animate-ping"/>
                  <span className="text-[11px] sm:text-xs font-bold text-[#ff7a45] tracking-widest uppercase">
                    PLAYER DOSSIER // DECRYPTED
                  </span>
                </div>
                <button onClick={() => setShowDossierModal(false)} className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5"/>
                </button>
              </div>

              <div className="space-y-2.5 sm:space-y-3 font-sans text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                <p>
                  I'm <strong className="text-white font-medium">Binil B</strong>, a passionate
                  full-stack developer and creative technologist based in Kerala, India. I specialize
                  in building high-performance modern web applications, ultra-clean UI/UX design systems,
                  and immersive interactive experiences.
                </p>
                <p>
                  My engineering workflow bridges modern React, Next.js, and JavaScript with cinematic
                  styling, buttery smooth animations, and robust backend architectures.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-1 sm:pt-2 font-mono-code text-xs">
                <div className="p-2.5 sm:p-3 rounded bg-black/60 border border-white/10">
                  <span className="text-slate-400 text-[10px] uppercase block">SPECIALTY</span>
                  <span className="text-white font-bold">Interactive Frontend & UI/UX</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded bg-black/60 border border-white/10">
                  <span className="text-slate-400 text-[10px] uppercase block">FRAMEWORKS</span>
                  <span className="text-cyan-300 font-bold">React, Vite, Next.js, Node</span>
                </div>
              </div>

              <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row gap-2">
                <button onClick={() => {
                setShowDossierModal(false);
                navigate('/experience');
            }} className="flex-1 py-2.5 px-4 rounded bg-gradient-to-r from-[#ff7a45] to-[#ff2a85] text-white font-mono-code text-xs font-bold uppercase tracking-wider cursor-pointer text-center">
                  EXPLORE CAREER JOURNEY
                </button>
                <button onClick={() => setShowDossierModal(false)} className="py-2.5 px-4 rounded bg-white/10 text-white font-mono-code text-xs hover:bg-white/15 cursor-pointer">
                  CLOSE
                </button>
              </div>
            </div>
          </div>) : null}>
      {/* Left Docked Content as in Reference Image 4 */}
      <div className="space-y-2.5 sm:space-y-4">
        {/* Bio Paragraph */}
        <p className="text-xs sm:text-sm text-slate-200/90 font-light leading-relaxed font-sans max-w-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Hey, I'm <strong className="text-white font-semibold">Binil</strong>. A full-stack developer, designer and AI creator who builds digital experiences that aren't just functional — they're memorable.
        </p>

        {/* 3 Status Info Pills */}
        <div className="space-y-2 max-w-sm">
          {dossierItems.map((item, idx) => (<div key={idx} onClick={() => {
                playUiClick();
                setShowDossierModal(true);
            }} className="group p-2.5 sm:p-3 rounded-md bg-black/60 hover:bg-black/80 border border-white/15 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-200 flex items-start gap-3 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
              {/* Cyan square with + */}
              <div className="w-4 h-4 rounded-sm bg-cyan-400/20 border border-cyan-400/60 flex items-center justify-center text-cyan-300 text-xs font-bold flex-shrink-0 mt-0.5 group-hover:bg-cyan-400/30">
                +
              </div>

              <div className="flex-1 min-w-0 font-mono-code">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                  {item.label}
                </div>
                <div className="text-xs sm:text-[13px] text-white font-medium truncate mt-0.5">
                  {item.value}
                </div>
              </div>
            </div>))}
        </div>

        {/* Action Button: VIEW JOURNEY ▸ */}
        <div className="pt-1">
          <button onClick={handleViewJourney} onMouseEnter={playUiHover} className="group px-5 py-2.5 rounded-md bg-gradient-to-r from-[#ff7a45] via-[#ff5436] to-[#ff2a85] hover:brightness-110 text-white font-bebas text-lg sm:text-xl tracking-wider uppercase flex items-center gap-2 border border-orange-300/40 shadow-[0_0_20px_rgba(255,122,69,0.5)] transition-all duration-150 cursor-pointer active:scale-95">
            <span>VIEW JOURNEY</span>
            <span className="text-base group-hover:translate-x-1 transition-transform">▸</span>
          </button>
        </div>
      </div>
    </CinematicGameScreen>);
};
