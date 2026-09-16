import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { playUiClick, playUiHover } from '../utils/audio';
export const Footer = () => {
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        playUiClick();
        navigate(path);
    };
    const handleScrollToTop = () => {
        playUiClick();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (<footer className="relative bg-[#040609] border-t border-cyan-500/20 text-slate-400 py-12 overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none"/>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="text-center md:text-left space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-bebas text-3xl text-white tracking-wider">BINIL B</span>
              <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                PRO PORTFOLIO
              </span>
            </div>
            <p className="text-xs font-mono-code text-cyan-300">
              Frontend Developer • UI/UX Designer • Full-Stack Developer
            </p>
            <p className="text-[11px] text-slate-400 font-mono-code">
              "Vice City Inspired • Build Different • Stay Legendary"
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono-code">
            <button onClick={() => handleNavigate('/')} onMouseEnter={playUiHover} className="hover:text-cyan-300 transition-colors cursor-pointer">
              HUB
            </button>
            <span className="text-slate-700">•</span>
            <button onClick={() => handleNavigate('/about')} onMouseEnter={playUiHover} className="hover:text-cyan-300 transition-colors cursor-pointer">
              ABOUT
            </button>
            <span className="text-slate-700">•</span>
            <button onClick={() => handleNavigate('/skills')} onMouseEnter={playUiHover} className="hover:text-cyan-300 transition-colors cursor-pointer">
              SKILLS
            </button>
            <span className="text-slate-700">•</span>
            <button onClick={() => handleNavigate('/projects')} onMouseEnter={playUiHover} className="hover:text-cyan-300 transition-colors cursor-pointer">
              PROJECTS
            </button>
            <span className="text-slate-700">•</span>
            <button onClick={() => handleNavigate('/experience')} onMouseEnter={playUiHover} className="hover:text-cyan-300 transition-colors cursor-pointer">
              EXPERIENCE
            </button>
            <span className="text-slate-700">•</span>
            <button onClick={() => handleNavigate('/contact')} onMouseEnter={playUiHover} className="hover:text-cyan-300 transition-colors cursor-pointer">
              CONTACT
            </button>
          </div>

          <button onClick={handleScrollToTop} onMouseEnter={playUiHover} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 border border-white/15 hover:border-cyan-400 text-xs font-mono-code text-slate-300 hover:text-white transition-all shadow-md cursor-pointer group">
            <span>TOP OF PAGE</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-y-1 transition-transform"/>
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono-code text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
            <span className="text-emerald-400">SYSTEM STATUS: ALL SECTORS OPERATIONAL</span>
          </div>

          <div>
            © {new Date().getFullYear()} BINIL B. ALL MISSIONS ARCHIVED.
          </div>
        </div>
      </div>
    </footer>);
};
