import React, { useState } from 'react';
import { CinematicGameScreen } from './CinematicGameScreen';
import { portfolioImages, projectsData } from '../data/portfolioData';
import { playUiClick, playUiHover } from '../utils/audio';
import { X, ExternalLink, CheckCircle, Eye } from 'lucide-react';

export const ProjectsSection = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [showAllModal, setShowAllModal] = useState(false);

    const handleProjectClick = (proj) => {
        playUiClick();
        setSelectedProject(proj);
    };

    return (
      <CinematicGameScreen
        title="PROJECTS"
        scriptSubtitle="Showcase"
        scriptColor="text-[#00f0ff]"
        cash="$2,100,000"
        stars={3}
        locationName="MARINA BAYFRONT"
        locationSubtitle="Bayfront Strip"
        objectiveText="INSPECT THE COMPLETED BUILDS"
        backgroundImage={portfolioImages.projects}
        modals={
          // Project Detail Modal
          selectedProject ? (
            <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
              <div className="w-full max-w-xl bg-[#0b0e14] border border-cyan-500/50 rounded-xl p-4 sm:p-6 shadow-[0_0_50px_rgba(0,240,255,0.3)] space-y-3 sm:space-y-4 max-h-[88dvh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono-code">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-[11px] sm:text-xs font-bold text-cyan-400 tracking-widest uppercase">
                      OPERATION DOSSIER // MISSION {selectedProject.id}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Screenshot Image Preview */}
                {selectedProject.img && (
                  <div className="relative rounded-lg overflow-hidden border border-white/15 bg-black/80 aspect-video max-h-56 w-full shadow-lg">
                    <img
                      src={selectedProject.img}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = portfolioImages.projects;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-cyan-500/40 text-[10px] font-mono-code text-cyan-300 font-bold uppercase">
                      {selectedProject.role}
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 text-[10px] font-mono-code font-bold uppercase">
                      {selectedProject.role}
                    </span>
                    {selectedProject.badge && (
                      <span className="text-[10px] font-mono-code text-slate-400 uppercase">
                        {selectedProject.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-300 font-light mt-1 leading-relaxed">
                    {selectedProject.fullDescription || selectedProject.shortDescription}
                  </p>
                </div>

                {/* Tools & Tech Stack */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider">
                    TOOLS & ARSENAL
                  </div>
                  <div className="p-2.5 rounded bg-black/60 border border-white/10 font-mono-code text-xs text-cyan-300">
                    {selectedProject.tools}
                  </div>
                </div>

                {/* Highlights / Features */}
                {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                  <div className="space-y-1.5 pt-1 border-t border-white/10">
                    <div className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider">
                      MISSION SPECIFICATIONS
                    </div>
                    {selectedProject.keyFeatures.map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Links */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2 font-mono-code text-xs">
                  {selectedProject.link ? (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playUiClick}
                      className="flex-1 py-2.5 px-3 rounded bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-black font-bold uppercase flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>LAUNCH LIVE WEBSITE</span>
                    </a>
                  ) : (
                    <div className="flex-1 py-2.5 px-3 rounded bg-slate-800/80 border border-white/10 text-slate-400 font-bold uppercase flex items-center justify-center gap-2 text-center text-[11px]">
                      <span>ACADEMIC CAPSTONE ARCHIVE</span>
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="py-2.5 px-4 rounded bg-white/10 text-white hover:bg-white/15 cursor-pointer text-center"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          ) : showAllModal ? (
            // All Projects Modal
            <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
              <div className="w-full max-w-3xl bg-[#0b0e14] border border-cyan-500/50 rounded-xl p-4 sm:p-6 shadow-[0_0_50px_rgba(0,240,255,0.3)] space-y-3.5 max-h-[88dvh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono-code">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-[11px] sm:text-xs font-bold text-cyan-400 tracking-widest uppercase">
                      ALL MISSIONS & OPERATIONS ({projectsData.length})
                    </span>
                  </div>
                  <button
                    onClick={() => setShowAllModal(false)}
                    className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projectsData.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => {
                        setShowAllModal(false);
                        setSelectedProject(proj);
                      }}
                      className="group p-3 rounded-lg bg-black/60 hover:bg-black/90 border border-white/10 hover:border-cyan-400/60 transition-all cursor-pointer space-y-2 flex flex-col justify-between"
                    >
                      {proj.img && (
                        <div className="relative rounded overflow-hidden aspect-[16/9] bg-black/40 border border-white/10">
                          <img
                            src={proj.img}
                            alt={proj.title}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = portfolioImages.projects;
                            }}
                          />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono-code mb-1">
                          <span className="text-cyan-400 font-bold">MISSION {proj.id}</span>
                          <span className="text-slate-400">{proj.role}</span>
                        </div>
                        <div className="font-bebas text-lg text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                          {proj.title}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono-code mt-0.5 truncate">
                          {proj.tools}
                        </div>
                      </div>
                      <div className="pt-1 flex items-center justify-between text-[10px] font-mono-code text-cyan-300">
                        <span>INSPECT DOSSIER</span>
                        <Eye className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null
        }
      >
        {/* Left Docked Project List as in Reference GTA HUD */}
        <div className="space-y-2 max-w-sm sm:max-w-md">
          {/* Header indicator */}
          <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-400 px-0.5">
            <span className="text-cyan-400 font-bold">OPERATIONS // SHOWCASE</span>
            <span>{projectsData.length} MISSIONS LOGGED</span>
          </div>

          {/* Scrollable list of all 7 projects */}
          <div className="space-y-1.5 sm:space-y-2 max-h-[38dvh] sm:max-h-[50dvh] overflow-y-auto pr-1 scrollbar-thin">
            {projectsData.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                onMouseEnter={playUiHover}
                className="group p-2.5 rounded-md bg-black/60 hover:bg-black/85 border border-white/15 hover:border-cyan-400/60 backdrop-blur-md transition-all duration-150 flex items-start gap-2.5 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
              >
                {/* Mission ID badge with + */}
                <div className="w-5 h-5 rounded-sm bg-cyan-400/20 border border-cyan-400/60 flex items-center justify-center text-cyan-300 text-[10px] font-mono-code font-bold flex-shrink-0 mt-0.5 group-hover:bg-cyan-400/30">
                  {project.id}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-bebas text-base sm:text-lg text-white tracking-wide leading-tight group-hover:text-cyan-300 transition-colors truncate">
                    {project.title.toUpperCase()}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-cyan-400/90 font-mono-code truncate">
                    {project.role}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono-code truncate">
                    {project.tools}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button: VIEW ALL PROJECTS ▸ */}
          <div className="pt-1">
            <button
              onClick={() => {
                playUiClick();
                setShowAllModal(true);
              }}
              onMouseEnter={playUiHover}
              className="group px-4 py-2 rounded-md bg-gradient-to-r from-[#00b4d8] via-[#00f0ff] to-[#0077b6] hover:brightness-110 text-black font-bebas text-base sm:text-lg tracking-wider uppercase flex items-center gap-2 border border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-150 cursor-pointer active:scale-95"
            >
              <span>VIEW ALL {projectsData.length} PROJECTS</span>
              <span className="text-sm group-hover:translate-x-1 transition-transform">▸</span>
            </button>
          </div>
        </div>
      </CinematicGameScreen>
    );
};

