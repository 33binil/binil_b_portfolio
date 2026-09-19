import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CinematicGameScreen } from './CinematicGameScreen';
import { portfolioImages } from '../data/portfolioData';
import { playUiClick, playUiHover } from '../utils/audio';
import { X, Layers, CheckCircle2 } from 'lucide-react';

const PRIMARY_SKILLS = [
  {
    name: 'FIGMA / ADOBE XD',
    percent: 95,
    category: 'Design & Prototyping',
    desc: 'Wireframing, high-fidelity UI kits, design systems, vector editing, component libraries & interactive flows.',
  },
  {
    name: 'GIT / GITHUB',
    percent: 92,
    category: 'Version Control',
    desc: 'Repository management, branching workflows, pull requests, merge conflict resolution & team collaboration.',
  },
  {
    name: 'FRONTEND DEVELOPING',
    percent: 96,
    category: 'Frontend Engineering',
    desc: 'Engineering responsive, high-performance user interfaces with React, Next.js, modern CSS, Tailwind, and JavaScript.',
  },
  {
    name: 'FULL STACK DEVELOPING',
    percent: 92,
    category: 'Full Stack Architecture',
    desc: 'Architecting complete end-to-end web applications integrating MongoDB, Express.js, React, Node.js, and secure REST APIs.',
  },
  {
    name: 'PYTHON (BACKEND & FULL STACK)',
    percent: 88,
    category: 'Backend & Automation',
    desc: 'Server-side scripting, RESTful API architecture, automation, data handling, and full-stack web integration with Python frameworks.',
  },
  {
    name: 'JAVA (OOP & BACKEND)',
    percent: 85,
    category: 'Backend & Systems',
    desc: 'Object-Oriented Programming (OOP), enterprise backend services, data structures, robust API logic, and full-stack software development.',
  },
  {
    name: 'REACT.JS / NEXT.JS',
    percent: 94,
    category: 'Frontend Frameworks',
    desc: 'Modern component architecture, custom hooks, dynamic routing, state management & SSR applications.',
  },
  {
    name: 'JAVASCRIPT (ES6+)',
    percent: 95,
    category: 'Core Language',
    desc: 'Modern async/await syntax, promises, closures, dynamic DOM architecture & modular programming.',
  },
  {
    name: 'NODE.JS / MERN STACK',
    percent: 88,
    category: 'Backend & APIs',
    desc: 'RESTful API architecture, Express server routing, MongoDB integration, middleware & full-stack flows.',
  },
  {
    name: 'UI / UX DESIGN',
    percent: 93,
    category: 'User Experience',
    desc: 'User-centric wireframes, user personas, journey mapping, UX flows, accessibility & responsive design.',
  },
];

const EXTENDED_ARSENAL = [
  {
    category: 'DESIGN',
    name: 'Figma / Adobe XD',
    level: '95%',
    tag: 'CORE',
    desc: 'Design systems, wireframes, user testing, vector assets & interactive prototyping',
  },
  {
    category: 'TOOLS',
    name: 'Git / GitHub',
    level: '92%',
    tag: 'CORE',
    desc: 'Version control, multi-branch workflows, pull requests, issue tracking & collaborative repositories',
  },
  {
    category: 'FRONTEND',
    name: 'Frontend Developing',
    level: '96%',
    tag: 'CORE',
    desc: 'Engineering responsive, high-performance web interfaces with React, Next.js, Tailwind, and JavaScript',
  },
  {
    category: 'FRONTEND',
    name: 'Python Web & UI Integration',
    level: '86%',
    tag: 'ADVANCED',
    desc: 'Full-stack Python web interfaces, template engines, dynamic UI rendering & API integration',
  },
  {
    category: 'FRONTEND',
    name: 'Java Web & Full Stack UI',
    level: '82%',
    tag: 'WORKING',
    desc: 'Full-stack client-server interaction, Java web frontends, UI component binding & desktop/web architectures',
  },
  {
    category: 'FRONTEND',
    name: 'React.js / Next.js',
    level: '94%',
    tag: 'ADVANCED',
    desc: 'Component architectures, state machines, SSR/SSG rendering & performance audits',
  },
  {
    category: 'FRONTEND',
    name: 'JavaScript (ES6+)',
    level: '95%',
    tag: 'CORE',
    desc: 'Modern async/await, DOM architectures, functional methods & dynamic modules',
  },
  {
    category: 'FRONTEND',
    name: 'Tailwind CSS & Modern CSS',
    level: '96%',
    tag: 'CORE',
    desc: 'Pixel-perfect responsive utility design, responsive grids & transition keyframes',
  },
  {
    category: 'BACKEND',
    name: 'Full Stack Developing',
    level: '92%',
    tag: 'CORE',
    desc: 'Complete end-to-end full stack architecture connecting MongoDB, Express, React, and Node.js with secure cloud APIs',
  },
  {
    category: 'BACKEND',
    name: 'Python (Backend & REST APIs)',
    level: '88%',
    tag: 'ADVANCED',
    desc: 'Server-side scripting, RESTful APIs, automation & backend data processing',
  },
  {
    category: 'BACKEND',
    name: 'Java (OOP & Backend Services)',
    level: '85%',
    tag: 'ADVANCED',
    desc: 'Object-Oriented Programming (OOP), enterprise backend architecture, multithreading & robust algorithms',
  },
  {
    category: 'BACKEND',
    name: 'Node.js / Express.js',
    level: '86%',
    tag: 'ADVANCED',
    desc: 'REST APIs, serverless handlers, CORS, middleware pipelines & token auth',
  },
  {
    category: 'BACKEND',
    name: 'MongoDB / MySQL',
    level: '82%',
    tag: 'WORKING',
    desc: 'Database modelling, collections, relational queries & fast indexing',
  },
  {
    category: 'DESIGN',
    name: 'UI / UX Design & Wireframing',
    level: '93%',
    tag: 'CORE',
    desc: 'User personas, journey mapping, wireframing, usability heuristics & design tokens',
  },
  {
    category: 'TOOLS',
    name: 'VS Code & Tooling',
    level: '95%',
    tag: 'CORE',
    desc: 'Linters, formatters, dev tools, terminals & debugging workspaces',
  },
  {
    category: 'TOOLS',
    name: 'Vercel / Render Deployment',
    level: '90%',
    tag: 'ADVANCED',
    desc: 'CI/CD pipeline builds, preview deployments, domain mapping & SSL certificates',
  },
];

export const SkillsSection = () => {
  const navigate = useNavigate();
  const [showArsenalModal, setShowArsenalModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(PRIMARY_SKILLS[0]);
  const [modalFilter, setModalFilter] = useState('ALL');

  const filteredArsenal = modalFilter === 'ALL'
    ? EXTENDED_ARSENAL
    : EXTENDED_ARSENAL.filter(item => item.category === modalFilter);

  return (
    <CinematicGameScreen
      title="SKILLS"
      scriptSubtitle="Unlocked"
      scriptColor="text-[#00f0ff]"
      cash="$1,850,000"
      stars={3}
      locationName="PORT KELBRAY"
      locationSubtitle="Tech Terminal"
      objectiveText="REVIEW UNLOCKED ABILITIES"
      backgroundImage={portfolioImages.skills}
      modals={
        showArsenalModal ? (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
            <div className="w-full max-w-lg bg-[#0b0e14] border border-cyan-500/50 rounded-xl p-4 sm:p-6 shadow-[0_0_50px_rgba(0,240,255,0.25)] space-y-3 sm:space-y-4 max-h-[85dvh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono-code">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[11px] sm:text-xs md:text-sm font-bold text-cyan-400 tracking-widest uppercase">
                    DEVELOPMENT ARSENAL // EXPANDED
                  </span>
                </div>
                <button
                  onClick={() => setShowArsenalModal(false)}
                  className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5 font-mono-code text-[10px] sm:text-xs lg:text-base">
                {['ALL', 'DESIGN', 'TOOLS', 'FRONTEND', 'BACKEND'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      playUiClick();
                      setModalFilter(cat);
                    }}
                    onMouseEnter={playUiHover}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      modalFilter === cat
                        ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-2 sm:space-y-2.5">
                {filteredArsenal.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 sm:p-2.5 rounded bg-black/60 border border-white/10 hover:border-cyan-500/40 transition-colors flex items-center justify-between font-mono-code gap-2"
                  >
                    <div className="min-w-0">
                      <div className="text-xs lg:text-base text-white font-bold flex items-center gap-1.5">
                        <span className="truncate">{item.name}</span>
                        <span className="text-[9px] lg:text-xs px-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex-shrink-0">
                          {item.tag}
                        </span>
                      </div>
                      <div className="text-[10px] lg:text-sm text-slate-400 font-sans mt-0.5">{item.desc}</div>
                    </div>
                    <span className="text-xs lg:text-base text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 flex-shrink-0">
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => {
                    setShowArsenalModal(false);
                    navigate('/projects');
                  }}
                  className="flex-1 py-2.5 px-4 rounded bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-mono-code text-xs font-bold uppercase tracking-wider cursor-pointer text-center hover:brightness-110 transition-all"
                >
                  INSPECT COMPLETED PROJECTS
                </button>
                <button
                  onClick={() => setShowArsenalModal(false)}
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
      {/* Left Docked Skill Bars with Smooth Tactical Scroll */}
      <div className="max-w-sm sm:max-w-md w-full flex flex-col gap-1.5 sm:gap-2">
        <div className="space-y-1 sm:space-y-1.5 md:space-y-2 max-h-[30dvh] min-[400px]:max-h-[35dvh] sm:max-h-[44dvh] lg:max-h-[50dvh] overflow-y-auto pr-1 scrollbar-thin scroll-pt-2">
          {PRIMARY_SKILLS.map((skill, idx) => {
            const isSelected = selectedSkill.name === skill.name;
            return (
              <div
                key={idx}
                onClick={() => {
                  playUiClick();
                  setSelectedSkill(skill);
                }}
                onMouseEnter={() => {
                  playUiHover();
                  setSelectedSkill(skill);
                }}
                className={`group cursor-pointer p-1.5 rounded transition-all duration-150 ${
                  isSelected
                    ? 'bg-cyan-950/50 border border-cyan-500/60 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono-code mb-1">
                  <span className={`font-bebas text-sm sm:text-base lg:text-xl tracking-wider transition-colors ${
                    isSelected ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]' : 'text-white group-hover:text-cyan-300'
                  }`}>
                    {skill.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] sm:text-[11px] lg:text-sm text-slate-400 hidden sm:inline-block">
                      {skill.category}
                    </span>
                    <span className="text-[11px] sm:text-xs lg:text-base text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]">
                      {skill.percent}%
                    </span>
                  </div>
                </div>

                {/* Progress Track and Glowing Bar */}
                <div className="w-full h-2 rounded-sm bg-black/80 border border-white/15 overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-xs bg-gradient-to-r from-[#00b4d8] via-[#00f0ff] to-[#70e000] shadow-[0_0_10px_rgba(0,240,255,0.5)] transition-all duration-700 group-hover:brightness-125"
                    style={{ width: `${skill.percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Tactical Intel Box for selected skill */}
        {selectedSkill && (
          <div className="p-2.5 sm:p-3 rounded-lg bg-black/85 border border-cyan-500/50 backdrop-blur-md font-mono-code text-[11px] sm:text-xs lg:text-base shadow-[0_0_20px_rgba(0,240,255,0.18)]">
            <div className="flex items-center justify-between text-cyan-300 font-bold mb-1.5 gap-2">
              <span className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse flex-shrink-0" />
                <span className="truncate tracking-wider">{selectedSkill.name}</span>
              </span>
              <span className="text-[9px] sm:text-[10px] lg:text-xs text-pink-400 uppercase tracking-widest px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/40 font-mono-code font-bold flex-shrink-0">
                {selectedSkill.category}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] lg:text-base text-slate-200 font-sans leading-relaxed">
              {selectedSkill.desc}
            </p>
          </div>
        )}

        {/* Action Button: VIEW FULL ARSENAL */}
        <div className="pt-0.5">
          <button
            onClick={() => {
              playUiClick();
              setShowArsenalModal(true);
            }}
            onMouseEnter={playUiHover}
            className="group px-4 py-2 rounded-md bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 hover:brightness-110 text-black font-bebas text-base sm:text-lg lg:text-2xl tracking-wider uppercase flex items-center gap-2 border border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-150 cursor-pointer active:scale-95"
          >
            <span>VIEW FULL ARSENAL</span>
            <span className="text-sm group-hover:translate-x-1 transition-transform">▸</span>
          </button>
        </div>
      </div>
    </CinematicGameScreen>
  );
};
