import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CinematicGameScreen } from './CinematicGameScreen';
import { portfolioImages } from '../data/portfolioData';
import { playUiClick, playUiHover } from '../utils/audio';
import { X } from 'lucide-react';
const PRIMARY_SKILLS = [
    { name: 'HTML / CSS', percent: 95, category: 'Core' },
    { name: 'JAVASCRIPT (ES6+)', percent: 95, category: 'Language' },
    { name: 'ASTRO / GSAP', percent: 88, category: 'Animation' },
    { name: 'PYTHON', percent: 75, category: 'Backend' },
    { name: 'UI / UX', percent: 90, category: 'Design' },
    { name: 'AI / AUTOMATION', percent: 85, category: 'AI' },
];
const EXTENDED_ARSENAL = [
    { name: 'React.js / Next.js', level: '94%', desc: 'Component architectures & SSR/SSG' },
    { name: 'JavaScript (ES6+)', level: '95%', desc: 'Modern async/await, DOM architectures & dynamic modules' },
    { name: 'Tailwind CSS', level: '96%', desc: 'Pixel-perfect responsive utility design' },
    { name: 'Node.js / Express', level: '86%', desc: 'REST APIs, serverless microservices' },
    { name: 'PostgreSQL / Mongo', level: '82%', desc: 'Database modelling & fast indexing' },
    { name: 'Figma & UI Systems', level: '92%', desc: 'Wireframes, interactive prototypes & design systems' },
];
export const SkillsSection = () => {
    const navigate = useNavigate();
    const [showArsenalModal, setShowArsenalModal] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);
    return (<CinematicGameScreen title="SKILLS" scriptSubtitle="Unlocked" scriptColor="text-[#00f0ff]" cash="$1,850,000" stars={3} locationName="PORT KELBRAY" locationSubtitle="Tech Terminal" objectiveText="REVIEW UNLOCKED ABILITIES" backgroundImage={portfolioImages.skills} modals={showArsenalModal ? (<div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
            <div className="w-full max-w-lg bg-[#0b0e14] border border-cyan-500/50 rounded-xl p-4 sm:p-6 shadow-[0_0_50px_rgba(0,240,255,0.25)] space-y-3 sm:space-y-4 max-h-[85dvh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono-code">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"/>
                  <span className="text-[11px] sm:text-xs md:text-sm font-bold text-cyan-400 tracking-widest uppercase">
                    DEVELOPMENT ARSENAL // EXPANDED
                  </span>
                </div>
                <button onClick={() => setShowArsenalModal(false)} className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5"/>
                </button>
              </div>

              <div className="space-y-2 sm:space-y-2.5">
                {EXTENDED_ARSENAL.map((item, idx) => (<div key={idx} className="p-2 sm:p-2.5 rounded bg-black/60 border border-white/10 flex items-center justify-between font-mono-code gap-2">
                    <div className="min-w-0">
                      <div className="text-xs text-white font-bold truncate">{item.name}</div>
                      <div className="text-[10px] text-slate-400 font-sans">{item.desc}</div>
                    </div>
                    <span className="text-xs text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 flex-shrink-0">
                      {item.level}
                    </span>
                  </div>))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button onClick={() => {
                setShowArsenalModal(false);
                navigate('/projects');
            }} className="flex-1 py-2.5 px-4 rounded bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-mono-code text-xs font-bold uppercase tracking-wider cursor-pointer text-center">
                  INSPECT COMPLETED PROJECTS
                </button>
                <button onClick={() => setShowArsenalModal(false)} className="py-2.5 px-4 rounded bg-white/10 text-white font-mono-code text-xs hover:bg-white/15 cursor-pointer">
                  CLOSE
                </button>
              </div>
            </div>
          </div>) : null}>
      {/* Left Docked Skill Bars as in Reference Image 2 */}
      <div className="space-y-2.5 sm:space-y-3 max-w-sm sm:max-w-md">
        {PRIMARY_SKILLS.map((skill, idx) => {
            const isSelected = selectedSkill === skill.name;
            return (<div key={idx} onClick={() => {
                    playUiClick();
                    setSelectedSkill(skill.name);
                }} className="group cursor-pointer">
              <div className="flex items-center justify-between text-xs font-mono-code mb-1">
                <span className="font-bebas text-sm sm:text-base text-white tracking-wider group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </span>
                <span className="text-[11px] sm:text-xs text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]">
                  {skill.percent}%
                </span>
              </div>

              {/* Progress Track and Glowing Bar */}
              <div className="w-full h-2 rounded-sm bg-black/80 border border-white/15 overflow-hidden p-0.5">
                <div className="h-full rounded-xs bg-gradient-to-r from-[#00b4d8] via-[#00f0ff] to-[#70e000] shadow-[0_0_10px_rgba(0,240,255,0.5)] transition-all duration-700 group-hover:brightness-125" style={{ width: `${skill.percent}%` }}/>
              </div>
            </div>);
        })}

        {/* Action Button: VIEW FULL ARSENAL */}
        <div className="pt-2">
          <button onClick={() => {
            playUiClick();
            setShowArsenalModal(true);
        }} onMouseEnter={playUiHover} className="group px-4 py-2 rounded-md bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 hover:brightness-110 text-black font-bebas text-base sm:text-lg tracking-wider uppercase flex items-center gap-2 border border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-150 cursor-pointer active:scale-95">
            <span>VIEW FULL ARSENAL</span>
            <span className="text-sm group-hover:translate-x-1 transition-transform">▸</span>
          </button>
        </div>
      </div>
    </CinematicGameScreen>);
};
