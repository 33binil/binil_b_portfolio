import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CinematicGameScreen } from './CinematicGameScreen';
import { portfolioImages } from '../data/portfolioData';
import { playUiClick, playUiHover } from '../utils/audio';
import { X } from 'lucide-react';
const SERVICE_CAPABILITIES = [
    {
        title: 'FULL-STACK WEB APPS',
        shortDesc: 'Modern React, Next.js, Node & database architecture',
        scope: 'Production-ready web applications built for speed and high traffic.',
    },
    {
        title: 'CINEMATIC UI/UX DESIGN',
        shortDesc: 'High-converting interactive aesthetics & GSAP motion',
        scope: 'Memorable brand interfaces and game-inspired interactive experiences.',
    },
    {
        title: 'AI INTEGRATIONS & AGENTS',
        shortDesc: 'Gemini, OpenAI, autonomous workflow engineering',
        scope: 'Smart automations, chatbots, predictive pipelines and tool integrations.',
    },
    {
        title: 'PERFORMANCE & CODE AUDITING',
        shortDesc: 'Sub-second speeds, SEO optimization & strict typing',
        scope: 'Refactoring bottlenecks and hardening production deployments.',
    },
];
export const ServicesSection = () => {
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState(null);
    const handleCommissionClick = () => {
        playUiClick();
        navigate('/contact');
    };
    return (<CinematicGameScreen title="SERVICES" scriptSubtitle="Contracts" scriptColor="text-[#32f38d]" cash="$2,500,000" stars={4} locationName="FINANCIAL DISTRICT" locationSubtitle="Vice Downtown" objectiveText="COMMISSION CUSTOM DIGITAL BUILDS" backgroundImage={portfolioImages.skills} modals={selectedService ? (<div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
            <div className="w-full max-w-md bg-[#0b0e14] border border-emerald-500/50 rounded-xl p-4 sm:p-6 shadow-[0_0_50px_rgba(50,243,141,0.25)] space-y-3 sm:space-y-4 max-h-[85dvh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono-code">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"/>
                  <span className="text-[11px] sm:text-xs font-bold text-emerald-400 tracking-widest uppercase">
                    CONTRACT SCOPE // {selectedService.title}
                  </span>
                </div>
                <button onClick={() => setSelectedService(null)} className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5"/>
                </button>
              </div>

              <div>
                <h3 className="font-bebas text-xl sm:text-2xl text-white tracking-wide">
                  {selectedService.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light mt-2 leading-relaxed">
                  {selectedService.scope}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button onClick={() => {
                setSelectedService(null);
                navigate('/contact');
            }} className="flex-1 py-2.5 px-4 rounded bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-mono-code text-xs font-bold uppercase tracking-wider cursor-pointer text-center">
                  DISPATCH MISSION REQUEST
                </button>
                <button onClick={() => setSelectedService(null)} className="py-2.5 px-4 rounded bg-white/10 text-white font-mono-code text-xs hover:bg-white/15 cursor-pointer">
                  CLOSE
                </button>
              </div>
            </div>
          </div>) : null}>
      {/* Left Docked Cards */}
      <div className="space-y-2.5 max-w-sm sm:max-w-md">
        {SERVICE_CAPABILITIES.map((item, idx) => (<div key={idx} onClick={() => {
                playUiClick();
                setSelectedService(item);
            }} onMouseEnter={playUiHover} className="group p-2.5 sm:p-3 rounded-md bg-black/60 hover:bg-black/85 border border-white/15 hover:border-emerald-400/60 backdrop-blur-md transition-all duration-150 flex items-start gap-2.5 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            {/* Cyan square with + */}
            <div className="w-4 h-4 rounded-sm bg-cyan-400/20 border border-cyan-400/60 flex items-center justify-center text-cyan-300 text-xs font-bold flex-shrink-0 mt-0.5 group-hover:bg-cyan-400/30">
              +
            </div>

            <div className="flex-1 min-w-0 font-mono-code">
              <div className="font-bebas text-base sm:text-lg text-white tracking-wide leading-tight group-hover:text-emerald-300 transition-colors">
                {item.title}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-sans font-light truncate mt-0.5">
                {item.shortDesc}
              </div>
            </div>
          </div>))}

        {/* Action Button: COMMISSION A BUILD ▸ */}
        <div className="pt-1.5">
          <button onClick={handleCommissionClick} onMouseEnter={playUiHover} className="group px-4 py-2 rounded-md bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 hover:brightness-110 text-black font-bebas text-base sm:text-lg tracking-wider uppercase flex items-center gap-2 border border-emerald-300 shadow-[0_0_20px_rgba(50,243,141,0.4)] transition-all duration-150 cursor-pointer active:scale-95">
            <span>COMMISSION A BUILD</span>
            <span className="text-sm group-hover:translate-x-1 transition-transform">▸</span>
          </button>
        </div>
      </div>
    </CinematicGameScreen>);
};
