import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Download, Terminal } from 'lucide-react';
import { playUiClick, playUiHover } from '../utils/audio';
const NAV_ITEMS = [
    { path: '/', label: 'START', mission: 'MISSION 01' },
    { path: '/about', label: 'ABOUT', mission: 'MISSION 02' },
    { path: '/skills', label: 'SKILLS', mission: 'MISSION 03' },
    { path: '/projects', label: 'PROJECTS', mission: 'MISSION 04' },
    { path: '/experience', label: 'EXPERIENCE', mission: 'MISSION 05' },
    { path: '/education', label: 'ACADEMY', mission: 'MISSION 06' },
    { path: '/services', label: 'SERVICES', mission: 'MISSION 07' },
    { path: '/contact', label: 'CONTACT', mission: 'MISSION 08' },
];
export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const handleNavClick = (path) => {
        playUiClick();
        navigate(path);
        setMobileMenuOpen(false);
    };
    const handleResumeDownload = () => {
        playUiClick();
        window.print();
    };
    return (<header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      <nav aria-label="Main Navigation" className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled
            ? 'py-2.5 bg-[#070a10]/95 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'py-4 bg-[#06080d]/60 backdrop-blur-sm'}`}>
        <div className="flex items-center justify-between">
          {/* Brand HUD Logo */}
          <button onClick={() => handleNavClick('/')} onMouseEnter={playUiHover} className="flex items-center gap-3 text-left group cursor-pointer">
            <div className="relative w-9 h-9 rounded-md bg-gradient-to-br from-pink-500/20 via-purple-600/30 to-cyan-500/30 border border-cyan-400/40 flex items-center justify-center group-hover:border-pink-500 transition-colors">
              <Terminal className="w-5 h-5 text-cyan-300 group-hover:text-pink-400 transition-colors"/>
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping"/>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bebas text-2xl tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                  BINIL B
                </span>
                <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  PRO
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono-code text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>
                <span className="text-emerald-400 font-semibold tracking-wide">AVAILABLE FOR PROJECTS</span>
              </div>
            </div>
          </button>

          {/* Desktop HUD Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (<button key={item.path} onClick={() => handleNavClick(item.path)} onMouseEnter={playUiHover} className={`relative px-3 py-1.5 rounded text-xs font-mono-code tracking-wider uppercase transition-all duration-200 cursor-pointer ${isActive
                    ? 'text-cyan-300 font-bold bg-cyan-950/60 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}>
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-pink-500 rounded-full shadow-[0_0_8px_#ff2a85]"/>)}
                </button>);
        })}
          </div>

          {/* Right Action: Download Resume & Exit Button */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button onClick={handleResumeDownload} onMouseEnter={playUiHover} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-mono-code font-semibold tracking-wider text-pink-300 hover:text-white bg-pink-950/40 hover:bg-pink-600/80 border border-pink-500/50 hover:border-pink-400 transition-all duration-200 shadow-[0_0_15px_rgba(255,42,133,0.15)] cursor-pointer">
              <Download className="w-3.5 h-3.5"/>
              <span>DOWNLOAD RESUME</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={handleResumeDownload} className="p-2 rounded bg-pink-950/40 border border-pink-500/40 text-pink-300 text-xs flex items-center gap-1 font-mono-code" title="Download Resume">
              <Download className="w-3.5 h-3.5"/>
            </button>

            <button onClick={() => {
            playUiClick();
            setMobileMenuOpen(!mobileMenuOpen);
        }} className="p-2 rounded-md bg-slate-900 border border-slate-700 text-slate-300 hover:text-white" aria-label="Toggle mobile navigation menu">
              {mobileMenuOpen ? <X className="w-5 h-5 text-pink-400"/> : <Menu className="w-5 h-5 text-cyan-300"/>}
            </button>
          </div>
        </div>
      </nav>

      {/* Cinematic Full-Screen Mobile HUD Menu */}
      {mobileMenuOpen && (<div className="fixed inset-0 top-16 z-50 bg-[#07090e]/98 backdrop-blur-xl border-t border-cyan-500/30 p-6 flex flex-col justify-between overflow-y-auto lg:hidden">
          <div className="space-y-2">
            <div className="text-[11px] font-mono-code text-pink-400 tracking-widest uppercase mb-3">
              SELECT MISSION SECTOR:
            </div>
            {NAV_ITEMS.map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (<button key={item.path} onClick={() => handleNavClick(item.path)} className={`w-full text-left p-3 rounded-lg flex items-center justify-between border transition-all ${isActive
                        ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : 'bg-black/40 border-white/10 text-slate-300 hover:border-pink-500/50 hover:text-white'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono-code text-slate-500">0{idx + 1}</span>
                    <span className="font-bebas text-xl tracking-wider">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-mono-code text-slate-400">{item.mission}</span>
                </button>);
            })}
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <button onClick={handleResumeDownload} className="w-full py-3 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-mono-code text-sm font-bold flex items-center justify-center gap-2 border border-pink-400 shadow-[0_0_20px_rgba(255,42,133,0.4)]">
              <Download className="w-4 h-4"/>
              <span>DOWNLOAD RESUME (PDF)</span>
            </button>

            <div className="text-center text-[10px] font-mono-code text-slate-400">
              BINIL B • FRONTEND DEVELOPER & UI/UX DESIGNER • KERALA, INDIA
            </div>
          </div>
        </div>)}
    </header>);
};
