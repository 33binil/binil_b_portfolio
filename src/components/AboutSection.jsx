import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CinematicGameScreen } from './CinematicGameScreen';
import { portfolioImages } from '../data/portfolioData';
import { playUiClick, playUiHover } from '../utils/audio';
import { X, Layers, Code2 } from 'lucide-react';

export const AboutSection = () => {
    const navigate = useNavigate();
    const [showDossierModal, setShowDossierModal] = useState(false);
    const [activeTab, setActiveTab] = useState('all'); // 'all' | 'uiux' | 'fullstack'

    const handleViewJourney = () => {
        playUiClick();
        navigate('/experience');
    };

    const handleOpenDossier = (tab = 'all') => {
        playUiClick();
        setActiveTab(tab);
        setShowDossierModal(true);
    };

    return (
      <CinematicGameScreen
        title="ABOUT"
        scriptSubtitle="Me"
        scriptColor="text-[#ff7a45]"
        cash="$1,425,000"
        stars={1}
        locationName="OCEAN DRIVE"
        locationSubtitle="Vice Beach"
        objectiveText="LEARN WHO YOU ARE DEALING WITH"
        backgroundImage={portfolioImages.about}
        modals={
          showDossierModal ? (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
              <div className="w-full max-w-lg bg-[#0b0e14] border border-[#ff7a45]/50 rounded-xl p-4 sm:p-6 shadow-[0_0_50px_rgba(255,122,69,0.3)] space-y-3.5 max-h-[88dvh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono-code">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ff7a45] animate-ping" />
                    <span className="text-[11px] sm:text-xs font-bold text-[#ff7a45] tracking-widest uppercase">
                      PLAYER DOSSIER // DECRYPTED
                    </span>
                  </div>
                  <button
                    onClick={() => setShowDossierModal(false)}
                    className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Identity & Intro */}
                <div>
                  <div className="text-[11px] font-mono-code text-[#ff7a45] uppercase tracking-wider font-bold">
                    HELLO, I'M
                  </div>
                  <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide">
                    BINIL B
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-300 font-light mt-1.5 leading-relaxed font-sans">
                    I'm a passionate UI/UX Designer and MERN Stack Developer who loves crafting responsive, user-friendly web apps. Using MongoDB, Express.js, React, Node.js, HTML, CSS, JavaScript, and Tailwind CSS, I design and build clean, interactive UIs with robust backends to deliver seamless user experiences.
                  </p>
                </div>

                {/* Section 1: UI/UX DESIGN */}
                <div className="p-3 sm:p-3.5 rounded-lg bg-black/60 border border-[#ff7a45]/30 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#ff7a45]" />
                    <h4 className="font-bebas text-base sm:text-lg text-[#ff7a45] tracking-wide">
                      UI/UX DESIGN
                    </h4>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-300 font-light leading-relaxed font-sans">
                    I craft intuitive and visually appealing user experiences with a strong focus on usability, accessibility, and modern design principles. From wireframes to polished prototypes, I design interfaces that balance creativity with functionality to deliver seamless digital experiences.
                  </p>
                </div>

                {/* Section 2: FULL-STACK DEVELOPMENT */}
                <div className="p-3 sm:p-3.5 rounded-lg bg-black/60 border border-cyan-400/30 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-cyan-300" />
                    <h4 className="font-bebas text-base sm:text-lg text-cyan-300 tracking-wide">
                      FULL-STACK DEVELOPMENT
                    </h4>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-300 font-light leading-relaxed font-sans">
                    I build responsive, scalable, and interactive web applications with a focus on clean code, performance, and seamless user experience. Leveraging the MERN stack (MongoDB, Express.js, React, Node.js) along with modern frontend technologies like HTML, CSS, JavaScript, and Tailwind CSS, I deliver fast, dynamic, and user-friendly interfaces backed by robust server-side functionality.
                  </p>
                </div>

                {/* Technical Stack Tags */}
                <div className="p-2.5 rounded bg-black/40 border border-white/10 font-mono-code text-xs">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                    PRIMARY WEAPONRY // TECH ARSENAL
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300">MongoDB</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300">Express.js</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#32f38d]">React</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300">Node.js</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#ff7a45]">Tailwind CSS</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-pink-400">UI/UX</span>
                  </div>
                </div>

                {/* Modal Footer Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => {
                      setShowDossierModal(false);
                      navigate('/experience');
                    }}
                    className="flex-1 py-2.5 px-4 rounded bg-gradient-to-r from-[#ff7a45] to-[#ff2a85] text-white font-mono-code text-xs font-bold uppercase tracking-wider cursor-pointer text-center"
                  >
                    EXPLORE CAREER JOURNEY
                  </button>
                  <button
                    onClick={() => setShowDossierModal(false)}
                    className="py-2.5 px-4 rounded bg-white/10 text-white font-mono-code text-xs hover:bg-white/15 cursor-pointer"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          ) : null
        }
      >
        {/* Left Docked Content as in Reference Image 4 */}
        <div className="space-y-2.5 max-w-sm sm:max-w-md">
          {/* Identity Eyebrow & Intro Bio */}
          <div>
            <div className="text-[10px] sm:text-[11px] font-mono-code text-[#ff7a45] uppercase tracking-wider font-bold">
              HELLO, I'M
            </div>
            <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide leading-none mt-0.5">
              BINIL B
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-200/95 font-light leading-relaxed font-sans mt-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              I'm a passionate UI/UX Designer and MERN Stack Developer who loves crafting responsive, user-friendly web apps. Using MongoDB, Express.js, React, Node.js, HTML, CSS, JavaScript, and Tailwind CSS, I design and build clean, interactive UIs with robust backends to deliver seamless user experiences.
            </p>
          </div>

          {/* Interactive Core Pillars (UI/UX DESIGN & FULL-STACK DEVELOPMENT) */}
          <div className="space-y-2 pt-0.5">
            {/* UI/UX DESIGN Card */}
            <div
              onClick={() => handleOpenDossier('uiux')}
              onMouseEnter={playUiHover}
              className="group p-2.5 sm:p-3 rounded-md bg-black/60 hover:bg-black/85 border border-white/15 hover:border-[#ff7a45]/60 backdrop-blur-md transition-all duration-150 flex items-start gap-2.5 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            >
              <div className="w-4 h-4 rounded-sm bg-[#ff7a45]/20 border border-[#ff7a45]/60 flex items-center justify-center text-[#ff7a45] text-xs font-bold flex-shrink-0 mt-0.5 group-hover:bg-[#ff7a45]/30">
                +
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bebas text-base sm:text-lg text-white tracking-wide leading-tight group-hover:text-[#ff7a45] transition-colors">
                  UI/UX DESIGN
                </div>
                <div className="text-[11px] sm:text-xs text-slate-300 font-sans font-light line-clamp-2 mt-0.5">
                  I craft intuitive and visually appealing user experiences with a strong focus on usability, accessibility, and modern design principles. From wireframes to polished prototypes...
                </div>
              </div>
            </div>

            {/* FULL-STACK DEVELOPMENT Card */}
            <div
              onClick={() => handleOpenDossier('fullstack')}
              onMouseEnter={playUiHover}
              className="group p-2.5 sm:p-3 rounded-md bg-black/60 hover:bg-black/85 border border-white/15 hover:border-cyan-400/60 backdrop-blur-md transition-all duration-150 flex items-start gap-2.5 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            >
              <div className="w-4 h-4 rounded-sm bg-cyan-400/20 border border-cyan-400/60 flex items-center justify-center text-cyan-300 text-xs font-bold flex-shrink-0 mt-0.5 group-hover:bg-cyan-400/30">
                +
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bebas text-base sm:text-lg text-white tracking-wide leading-tight group-hover:text-cyan-300 transition-colors">
                  FULL-STACK DEVELOPMENT
                </div>
                <div className="text-[11px] sm:text-xs text-slate-300 font-sans font-light line-clamp-2 mt-0.5">
                  I build responsive, scalable, and interactive web applications with a focus on clean code, performance, and seamless user experience (MERN Stack)...
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons: VIEW DOSSIER / VIEW JOURNEY */}
          <div className="pt-1 flex items-center gap-2">
            <button
              onClick={() => handleOpenDossier('all')}
              onMouseEnter={playUiHover}
              className="group px-4 py-2 rounded-md bg-gradient-to-r from-[#ff7a45] via-[#ff5436] to-[#ff2a85] hover:brightness-110 text-white font-bebas text-base sm:text-lg tracking-wider uppercase flex items-center gap-2 border border-orange-300/40 shadow-[0_0_20px_rgba(255,122,69,0.5)] transition-all duration-150 cursor-pointer active:scale-95"
            >
              <span>VIEW DOSSIER</span>
              <span className="text-sm group-hover:translate-x-1 transition-transform">▸</span>
            </button>

            <button
              onClick={handleViewJourney}
              onMouseEnter={playUiHover}
              className="px-3.5 py-2 rounded-md bg-black/60 hover:bg-black/80 border border-white/20 hover:border-cyan-400/60 text-slate-300 hover:text-white font-mono-code text-xs transition-all cursor-pointer"
            >
              JOURNEY ▸
            </button>
          </div>
        </div>
      </CinematicGameScreen>
    );
};
