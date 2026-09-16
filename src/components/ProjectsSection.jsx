import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CinematicGameScreen } from './CinematicGameScreen';
import { portfolioImages, projectsData } from '../data/portfolioData';
import { playUiClick, playUiHover } from '../utils/audio';
import { X, ExternalLink, Github, CheckCircle } from 'lucide-react';
export const ProjectsSection = () => {
    const navigate = useNavigate();
    const [selectedProject, setSelectedProject] = useState(null);
    const [showAllModal, setShowAllModal] = useState(false);
    const featuredProjects = projectsData.slice(0, 4);
    const handleProjectClick = (proj) => {
        playUiClick();
        setSelectedProject(proj);
    };
    return (<CinematicGameScreen title="PROJECTS" scriptSubtitle="Showcase" scriptColor="text-[#00f0ff]" cash="$2,100,000" stars={3} locationName="MARINA BAYFRONT" locationSubtitle="Bayfront Strip" objectiveText="INSPECT THE COMPLETED BUILDS" backgroundImage={portfolioImages.projects} modals={
        // Project Detail Modal
        selectedProject ? (<div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
            <div className="w-full max-w-xl bg-[#0b0e14] border border-cyan-500/50 rounded-xl p-4 sm:p-6 shadow-[0_0_50px_rgba(0,240,255,0.3)] space-y-3 sm:space-y-4 max-h-[85dvh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono-code">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"/>
                  <span className="text-[11px] sm:text-xs font-bold text-cyan-400 tracking-widest uppercase">
                    OPERATION DOSSIER // {selectedProject.badge || selectedProject.id.toUpperCase()}
                  </span>
                </div>
                <button onClick={() => setSelectedProject(null)} className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5"/>
                </button>
              </div>

              <div>
                <h3 className="font-bebas text-2xl sm:text-4xl text-white tracking-wide">
                  {selectedProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
                  {selectedProject.fullDescription}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="space-y-1">
                <div className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider">
                  TECHNOLOGY ARSENAL
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((tech, idx) => (<span key={idx} className="px-2 py-0.5 rounded bg-black/60 border border-cyan-500/30 text-[11px] font-mono-code text-cyan-300">
                      {tech}
                    </span>))}
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <div className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider">
                  MISSION ACCOMPLISHMENTS
                </div>
                {selectedProject.keyFeatures.map((hl, idx) => (<div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0"/>
                    <span>{hl}</span>
                  </div>))}
              </div>

              {/* Action Links */}
              <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row gap-2 font-mono-code text-xs">
                {selectedProject.liveUrl && (<a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" onClick={playUiClick} className="flex-1 py-2.5 px-3 rounded bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold uppercase flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                    <ExternalLink className="w-3.5 h-3.5"/>
                    <span>LIVE OPERATION</span>
                  </a>)}
                {selectedProject.githubUrl && (<a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" onClick={playUiClick} className="flex-1 py-2.5 px-3 rounded bg-slate-900 border border-white/20 text-white hover:text-cyan-300 flex items-center justify-center gap-2">
                    <Github className="w-3.5 h-3.5"/>
                    <span>SOURCE REPO</span>
                  </a>)}
              </div>
            </div>
          </div>) : showAllModal ? (
        // All Projects Modal
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
            <div className="w-full max-w-2xl bg-[#0b0e14] border border-cyan-500/50 rounded-xl p-4 sm:p-6 shadow-[0_0_50px_rgba(0,240,255,0.3)] space-y-3 sm:space-y-4 max-h-[85dvh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono-code">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"/>
                  <span className="text-[11px] sm:text-xs font-bold text-cyan-400 tracking-widest uppercase">
                    ALL MISSIONS & OPERATIONS
                  </span>
                </div>
                <button onClick={() => setShowAllModal(false)} className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5"/>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {projectsData.map((proj) => (<div key={proj.id} onClick={() => {
                    setShowAllModal(false);
                    setSelectedProject(proj);
                }} className="p-3 rounded-lg bg-black/60 border border-white/10 hover:border-cyan-400/60 transition-all cursor-pointer space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono-code text-cyan-400">{proj.badge || proj.id.toUpperCase()}</span>
                      <span className="text-[10px] font-mono-code text-slate-400">{proj.category}</span>
                    </div>
                    <div className="font-bebas text-lg text-white tracking-wide">{proj.title}</div>
                    <div className="text-xs text-slate-300 line-clamp-2 font-light">{proj.shortDescription}</div>
                  </div>))}
              </div>
            </div>
          </div>) : null}>
      {/* Left Docked Project List as in Reference Image 7 */}
      <div className="space-y-2.5 max-w-sm">
        {featuredProjects.map((project) => (<div key={project.id} onClick={() => handleProjectClick(project)} onMouseEnter={playUiHover} className="group p-2.5 sm:p-3 rounded-md bg-black/60 hover:bg-black/85 border border-white/15 hover:border-cyan-400/60 backdrop-blur-md transition-all duration-150 flex items-start gap-2.5 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            {/* Cyan square with + */}
            <div className="w-4 h-4 rounded-sm bg-cyan-400/20 border border-cyan-400/60 flex items-center justify-center text-cyan-300 text-xs font-bold flex-shrink-0 mt-0.5 group-hover:bg-cyan-400/30">
              +
            </div>

            <div className="flex-1 min-w-0 font-mono-code">
              <div className="font-bebas text-base sm:text-lg text-white tracking-wide leading-tight group-hover:text-cyan-300 transition-colors">
                {project.title.toUpperCase()}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-sans font-light truncate mt-0.5">
                {project.shortDescription}
              </div>
            </div>
          </div>))}

        {/* Action Button: VIEW ALL PROJECTS ▸ */}
        <div className="pt-1.5">
          <button onClick={() => {
            playUiClick();
            setShowAllModal(true);
        }} onMouseEnter={playUiHover} className="group px-4 py-2 rounded-md bg-gradient-to-r from-[#00b4d8] via-[#00f0ff] to-[#0077b6] hover:brightness-110 text-black font-bebas text-base sm:text-lg tracking-wider uppercase flex items-center gap-2 border border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-150 cursor-pointer active:scale-95">
            <span>VIEW ALL PROJECTS</span>
            <span className="text-sm group-hover:translate-x-1 transition-transform">▸</span>
          </button>
        </div>
      </div>
    </CinematicGameScreen>);
};
