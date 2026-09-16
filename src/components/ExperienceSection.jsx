import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CinematicGameScreen } from './CinematicGameScreen';
import { portfolioImages } from '../data/portfolioData';
import { playUiClick, playUiHover } from '../utils/audio';
import { X, CheckCircle } from 'lucide-react';
const TIMELINE = [
    {
        period: '2024 - PRESENT',
        role: 'Founder & Lead Engineer',
        company: 'Code Constellation',
        description: 'Cinematic web experiences for clients across India, South Africa and Canada.',
        dotColor: '#00f0ff',
        achievements: [
            'Architected 12+ enterprise client web applications',
            'Engineered interactive 3D WebGL & GSAP animations',
            'Maintained 99.8% uptime with modern edge deployments',
        ],
    },
    {
        period: '2023 - 2024',
        role: 'Freelance Full Stack Developer',
        company: 'Independent Contractor',
        description: 'Custom web apps and digital products for startups and student founders.',
        dotColor: '#a855f7',
        achievements: [
            'Delivered full-stack SaaS platforms with Stripe & Auth',
            'Designed responsive UI/UX systems in Figma and Tailwind CSS',
        ],
    },
    {
        period: '2022 - 2023',
        role: 'Learning & Exploring',
        company: 'Open Source Community',
        description: 'Development, design, automation — building in public from day one.',
        dotColor: '#ff2a85',
        achievements: [
            'Shipped daily open-source experiments and UI components',
            'Deep dived into JavaScript runtime internals & React internals',
        ],
    },
];
export const ExperienceSection = () => {
    const navigate = useNavigate();
    const [selectedTimelineItem, setSelectedTimelineItem] = useState(null);
    return (<CinematicGameScreen title="EXPERIENCE" scriptSubtitle="Journey" scriptColor="text-[#a855f7]" cash="$1,625,000" stars={2} locationName="CALLE SUNSET" locationSubtitle="Sunset Strip" objectiveText="TRACE THE FULL CAREER PATH" backgroundImage={portfolioImages.experience} modals={selectedTimelineItem ? (<div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
            <div className="w-full max-w-md bg-[#0b0e14] border border-purple-500/50 rounded-xl p-4 sm:p-6 shadow-[0_0_50px_rgba(168,85,247,0.3)] space-y-3 sm:space-y-4 max-h-[85dvh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono-code">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"/>
                  <span className="text-[11px] sm:text-xs font-bold text-purple-400 tracking-widest uppercase">
                    CAREER MILESTONE // {selectedTimelineItem.period}
                  </span>
                </div>
                <button onClick={() => setSelectedTimelineItem(null)} className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5"/>
                </button>
              </div>

              <div>
                <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide">
                  {selectedTimelineItem.role}
                </h3>
                <div className="text-xs font-mono-code text-cyan-400 font-semibold mt-0.5">
                  {selectedTimelineItem.company}
                </div>
                <p className="text-xs text-slate-300 font-light mt-2 leading-relaxed">
                  {selectedTimelineItem.description}
                </p>
              </div>

              {selectedTimelineItem.achievements && (<div className="space-y-1.5 pt-2 border-t border-white/10">
                  <div className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider">
                    KEY ACHIEVEMENTS
                  </div>
                  {selectedTimelineItem.achievements.map((ach, idx) => (<div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-sans">
                      <CheckCircle className="w-3.5 h-3.5 text-purple-400 flex-shrink-0"/>
                      <span>{ach}</span>
                    </div>))}
                </div>)}

              <div className="pt-2">
                <button onClick={() => setSelectedTimelineItem(null)} className="w-full py-2 px-4 rounded bg-white/10 text-white font-mono-code text-xs hover:bg-white/15 cursor-pointer">
                  CLOSE DOSSIER
                </button>
              </div>
            </div>
          </div>) : null}>
      {/* Left Docked Connected Timeline as in Reference Image 1 */}
      <div className="relative pl-6 space-y-4 sm:space-y-5 max-w-sm">
        {/* Vertical Connecting Line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[1.5px] bg-gradient-to-b from-[#00f0ff] via-[#a855f7] to-[#ff2a85] opacity-60"/>

        {TIMELINE.map((item, idx) => (<div key={idx} onClick={() => {
                playUiClick();
                setSelectedTimelineItem(item);
            }} onMouseEnter={playUiHover} className="group relative cursor-pointer">
            {/* Timeline Dot */}
            <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-black border-2 transition-transform duration-200 group-hover:scale-125 shadow-[0_0_10px_currentColor]" style={{ borderColor: item.dotColor, color: item.dotColor }}>
              <div className="w-1.5 h-1.5 rounded-full mx-auto my-0.5" style={{ backgroundColor: item.dotColor }}/>
            </div>

            {/* Content */}
            <div className="p-2 sm:p-2.5 rounded-md bg-black/50 hover:bg-black/80 border border-white/10 hover:border-purple-400/50 backdrop-blur-sm transition-all duration-200">
              <div className="text-[10px] sm:text-[11px] font-mono-code font-bold tracking-wider uppercase" style={{ color: item.dotColor }}>
                {item.period}
              </div>
              <div className="font-bebas text-base sm:text-lg text-white tracking-wide leading-tight mt-0.5 group-hover:text-purple-300 transition-colors">
                {item.role}, {item.company}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-sans font-light mt-0.5 leading-snug">
                {item.description}
              </div>
            </div>
          </div>))}
      </div>
    </CinematicGameScreen>);
};
