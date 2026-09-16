import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Cpu, FolderGit2, Briefcase, Trophy, GraduationCap, Sparkles, Mail, ArrowRight, Radio, } from 'lucide-react';
import { SECTORS } from '../data/sectorsData';
import { playUiClick, playUiHover } from '../utils/audio';
export const MissionHubGrid = () => {
    const navigate = useNavigate();
    const getSectorIcon = (id) => {
        switch (id) {
            case 'about':
                return <User className="w-5 h-5 text-pink-400"/>;
            case 'skills':
                return <Cpu className="w-5 h-5 text-cyan-400"/>;
            case 'projects':
                return <FolderGit2 className="w-5 h-5 text-purple-400"/>;
            case 'experience':
                return <Briefcase className="w-5 h-5 text-amber-400"/>;
            case 'achievements':
                return <Trophy className="w-5 h-5 text-emerald-400"/>;
            case 'education':
                return <GraduationCap className="w-5 h-5 text-cyan-400"/>;
            case 'services':
                return <Sparkles className="w-5 h-5 text-pink-400"/>;
            case 'contact':
            default:
                return <Mail className="w-5 h-5 text-emerald-400"/>;
        }
    };
    const getAccentBorder = (color) => {
        switch (color) {
            case 'cyan':
                return 'hover:border-cyan-400/80 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] group-hover:border-cyan-400';
            case 'pink':
                return 'hover:border-pink-500/80 hover:shadow-[0_0_25px_rgba(255,42,133,0.2)] group-hover:border-pink-500';
            case 'purple':
                return 'hover:border-purple-500/80 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] group-hover:border-purple-500';
            case 'amber':
                return 'hover:border-amber-400/80 hover:shadow-[0_0_25px_rgba(251,191,36,0.2)] group-hover:border-amber-400';
            case 'emerald':
            default:
                return 'hover:border-emerald-400/80 hover:shadow-[0_0_25px_rgba(52,211,153,0.2)] group-hover:border-emerald-400';
        }
    };
    const getBadgeStyle = (color) => {
        switch (color) {
            case 'cyan':
                return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
            case 'pink':
                return 'bg-pink-500/20 text-pink-300 border-pink-500/40';
            case 'purple':
                return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
            case 'amber':
                return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
            case 'emerald':
            default:
                return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
        }
    };
    const handleCardClick = (path) => {
        playUiClick();
        navigate(path);
    };
    return (<section className="relative z-10 pt-10 pb-20">
      {/* Section Header: Single Page Mission Directory Notice */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono-code text-cyan-400 font-bold uppercase tracking-widest mb-1.5">
            <Radio className="w-3.5 h-3.5 text-pink-500 animate-pulse"/>
            <span>DIRECT SECTOR PORTALS // MULTI-PAGE SYSTEM</span>
          </div>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-tight leading-none">
            SELECT A SECTOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">TO EXPLORE</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-mono-code max-w-2xl mt-2">
            Click any sector card to enter that dedicated mission page directly. No endless scrolling required.
          </p>
        </div>

        <div className="text-right hidden sm:block font-mono-code text-xs text-slate-400">
          <div className="text-emerald-400 font-semibold">ALL SECTORS ONLINE</div>
          <div>8 UNLOCKED MISSIONS</div>
        </div>
      </div>

      {/* Grid of Interactive Mission Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {SECTORS.map((sector) => {
            return (<div key={sector.id} onClick={() => handleCardClick(sector.path)} onMouseEnter={playUiHover} className={`group glass-panel p-5 rounded-xl border border-white/10 ${getAccentBorder(sector.accentColor)} transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between active:scale-[0.98] shadow-lg`}>
              {/* Top Card Bar: Mission Tag & Badge */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono-code font-bold tracking-wider text-slate-400">
                    {sector.missionTag}
                  </span>
                  <span className={`text-[9px] font-mono-code px-2 py-0.5 rounded border uppercase font-semibold ${getBadgeStyle(sector.accentColor)}`}>
                    {sector.badge}
                  </span>
                </div>

                {/* Card Icon & Title */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-slate-900 transition-all">
                    {getSectorIcon(sector.id)}
                  </div>
                  <div>
                    <h3 className="font-bebas text-2xl text-white tracking-wide group-hover:text-cyan-300 transition-colors leading-tight">
                      {sector.label}
                    </h3>
                    <div className="text-[10px] font-mono-code text-slate-400 uppercase truncate max-w-[170px]">
                      {sector.category}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-xs font-light leading-relaxed font-sans line-clamp-3 mb-4">
                  {sector.description}
                </p>
              </div>

              {/* Bottom Card Action: Status & Direct Enter Button */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono-code text-slate-400 truncate max-w-[130px]">
                  {sector.stats}
                </span>

                <div className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold text-cyan-400 group-hover:text-pink-400 transition-colors">
                  <span>ENTER</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"/>
                </div>
              </div>

              {/* High-tech corner bracket accents */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/20 group-hover:border-cyan-400 transition-colors"/>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/20 group-hover:border-cyan-400 transition-colors"/>
            </div>);
        })}
      </div>
    </section>);
};
