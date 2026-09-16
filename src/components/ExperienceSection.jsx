import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CinematicGameScreen } from './CinematicGameScreen';
import { portfolioImages } from '../data/portfolioData';
import { playUiClick, playUiHover } from '../utils/audio';
import { X, CheckCircle } from 'lucide-react';
const TIMELINE = [
    {
        period: 'NOW',
        role: 'SEO Analyst | Web Developer | Web Maintenance',
        company: 'Media7 News & Entertainments',
        shortDescription: 'Developing and maintaining company websites, contributing to the Media7 News Portal, building Grace Financials, and creating AI-powered SEO workflows.',
        fullDescription: 'Working as an SEO Analyst and Web Developer, developing and maintaining company websites, contributing to the Media7 News Portal, building the Grace Financials website, creating AI-powered SEO workflows for the editorial team, and ensuring website performance, optimization, and reliability.',
        dotColor: '#00f0ff',
        achievements: [
            'Developing and maintaining company websites & publishing systems',
            'Contributing to the Media7 News Portal daily production features',
            'Building and deploying the Grace Financials corporate website',
            'Creating AI-powered SEO workflows for editorial content creation',
            'Ensuring site performance, search crawl health, and uptime reliability',
        ],
    },
    {
        period: 'NOW',
        role: 'Freelance & Upskilling',
        company: 'Astrivix.corp',
        shortDescription: 'Collaborating with clients on Figma UI/UX, developing responsive React frontends, and upskilling in design systems and advanced frameworks.',
        fullDescription: 'Working as a freelancer at Astrivix.corp, collaborating with clients to design intuitive UI/UX experiences in Figma and develop responsive frontends using React and Tailwind CSS. Delivered branding assets, interactive prototypes, and modern web interfaces while actively upskilling in design systems, accessibility, and advanced frontend frameworks.',
        dotColor: '#a855f7',
        achievements: [
            'Designing intuitive UI/UX experiences and wireframes in Figma',
            'Developing responsive, performant frontends with React and Tailwind CSS',
            'Delivering cohesive branding assets and interactive prototypes',
            'Upskilling in design systems, accessibility, and advanced frontend frameworks',
        ],
    },
    {
        period: '2024 – 2026',
        role: 'UI/UX Designer & Web Developer',
        company: 'Pixel Junkie Creative Studio',
        shortDescription: 'Designed intuitive Figma interfaces, built interactive React/Tailwind frontends, integrated MERN features, and deployed on Vercel and Netlify.',
        fullDescription: 'Designed intuitive user interfaces in Figma and developed responsive, interactive frontends with React and Tailwind CSS. Built and integrated full-stack features using the MERN stack (MongoDB, Express.js, React, Node.js). Delivered branding assets, landing pages, and optimized web experiences deployed on Vercel and Netlify, helping clients strengthen their digital presence.',
        dotColor: '#ff2a85',
        achievements: [
            'Designed intuitive user interfaces in Figma and developed responsive frontends with React and Tailwind CSS',
            'Built and integrated full-stack features using the MERN stack (MongoDB, Express.js, React, Node.js)',
            'Delivered branding assets, landing pages, and conversion-focused web experiences',
            'Deployed and optimized production projects via Vercel and Netlify',
        ],
    },
    {
        period: '2025',
        role: 'Full Stack Web Development Intern',
        company: 'Nano Robotics Embed Technologies (NRET) - Bengaluru, India',
        shortDescription: 'Developed responsive React/Tailwind frontends, optimized layouts for performance & accessibility, and deployed via Git, Vercel, and Netlify.',
        fullDescription: 'Developed responsive frontends using React and Tailwind CSS, optimized layouts for performance and accessibility, and deployed projects via Git, Vercel, and Netlify. Assisted in creating branding assets and strategic landing pages to enhance client presence.',
        dotColor: '#f59e0b',
        achievements: [
            'Developed responsive frontends using React and Tailwind CSS',
            'Optimized layouts for peak performance, responsiveness, and accessibility',
            'Deployed projects via Git, Vercel, and Netlify version control workflows',
            'Assisted in creating branding assets and strategic client landing pages',
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
                <p className="text-xs sm:text-sm text-slate-300 font-light mt-2.5 leading-relaxed font-sans">
                  {selectedTimelineItem.fullDescription || selectedTimelineItem.description}
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
                <button onClick={() => setSelectedTimelineItem(null)} className="w-full py-2.5 px-4 rounded bg-white/10 text-white font-mono-code text-xs hover:bg-white/15 cursor-pointer">
                  CLOSE DOSSIER
                </button>
              </div>
            </div>
          </div>) : null}>
      {/* Left Docked Connected Timeline as in Reference Image 1 */}
      <div className="relative pl-6 space-y-3 sm:space-y-3.5 max-w-sm sm:max-w-md max-h-[74vh] overflow-y-auto custom-game-scrollbar pr-2">
        {/* Vertical Connecting Line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[1.5px] bg-gradient-to-b from-[#00f0ff] via-[#a855f7] via-[#ff2a85] to-[#f59e0b] opacity-60"/>

        {TIMELINE.map((item, idx) => (<div key={idx} onClick={() => {
                playUiClick();
                setSelectedTimelineItem(item);
            }} onMouseEnter={playUiHover} className="group relative cursor-pointer">
            {/* Timeline Dot */}
            <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-black border-2 transition-transform duration-200 group-hover:scale-125 shadow-[0_0_10px_currentColor]" style={{ borderColor: item.dotColor, color: item.dotColor }}>
              <div className="w-1.5 h-1.5 rounded-full mx-auto my-0.5" style={{ backgroundColor: item.dotColor }}/>
            </div>

            {/* Content */}
            <div className="p-2.5 sm:p-3 rounded-md bg-black/60 hover:bg-black/85 border border-white/10 hover:border-purple-400/50 backdrop-blur-sm transition-all duration-200 shadow-md">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] sm:text-[11px] font-mono-code font-bold tracking-wider uppercase" style={{ color: item.dotColor }}>
                  {item.period}
                </span>
                <span className="text-[9px] font-mono-code text-slate-400 opacity-60 group-hover:opacity-100 group-hover:text-cyan-300 transition-opacity">
                  VIEW DOSSIER ▸
                </span>
              </div>
              <div className="font-bebas text-base sm:text-lg text-white tracking-wide leading-tight mt-0.5 group-hover:text-purple-300 transition-colors">
                {item.role}
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono-code text-cyan-400/90 font-medium">
                {item.company}
              </div>
              <div className="text-[11px] text-slate-300 font-sans font-light mt-1 leading-snug line-clamp-2">
                {item.shortDescription || item.description}
              </div>
            </div>
          </div>))}
      </div>
    </CinematicGameScreen>);
};
