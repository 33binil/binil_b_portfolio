import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle, AlertTriangle, Lightbulb, Terminal, Layers } from 'lucide-react';
import { playUiClick } from '../utils/audio';
export const ProjectDetailModal = ({ project, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (project) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [project, onClose]);
    if (!project)
        return null;
    return (<div role="dialog" aria-modal="true" aria-labelledby="case-study-title" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#090d16] border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-y-auto flex flex-col">
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#090d16]/95 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-2 font-mono-code text-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"/>
            <span className="text-cyan-400 font-bold uppercase tracking-wider">CASE STUDY DOSSIER</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 truncate max-w-[200px] sm:max-w-none">{project.category}</span>
          </div>

          <button onClick={() => {
            playUiClick();
            onClose();
        }} className="p-1.5 rounded-lg bg-white/5 hover:bg-pink-600/30 text-slate-300 hover:text-pink-300 border border-white/10 transition-colors cursor-pointer" aria-label="Close case study modal">
            <X className="w-5 h-5"/>
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Main Hero Visual & Title */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-[16/9] max-h-80 group">
            <img src={project.image} alt={project.title} referrerPolicy="no-referrer" className="w-full h-full object-cover object-center filter brightness-90 contrast-105"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/40 to-transparent"/>
            
            <div className="absolute bottom-4 left-4 right-4">
              {project.badge && (<span className="inline-block px-2.5 py-1 mb-2 rounded bg-pink-500/30 border border-pink-400/60 text-pink-300 text-[10px] font-mono-code font-bold uppercase tracking-wider">
                  {project.badge}
                </span>)}
              <h2 id="case-study-title" className="font-bebas text-3xl sm:text-5xl text-white tracking-wide leading-none">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Technology Arsenal Badges */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider">
              TECHNOLOGY STACK
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (<span key={tech} className="px-3 py-1 rounded-md text-xs font-mono-code bg-slate-900 border border-cyan-500/30 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                  {tech}
                </span>))}
            </div>
          </div>

          {/* Project Overview */}
          <div className="glass-panel p-5 rounded-xl border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400 font-bold uppercase tracking-wider">
              <Terminal className="w-4 h-4 text-cyan-400"/>
              <span>PROJECT OVERVIEW</span>
            </div>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-light">
              {project.fullDescription}
            </p>
          </div>

          {/* The Challenge & The Approach (2-Column Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="glass-panel p-5 rounded-xl border-l-4 border-l-amber-400 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono-code text-amber-400 font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4"/>
                <span>THE CHALLENGE</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {project.challenge}
              </p>
            </div>

            <div className="glass-panel p-5 rounded-xl border-l-4 border-l-cyan-400 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400 font-bold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4"/>
                <span>THE APPROACH</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {project.approach}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <div className="text-xs font-mono-code text-pink-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4"/>
              <span>KEY FEATURES & FUNCTIONALITY</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((feat, idx) => (<div key={idx} className="glass-panel p-3.5 rounded-lg border border-white/5 flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5"/>
                  <span className="leading-snug">{feat}</span>
                </div>))}
            </div>
          </div>

          {/* Challenges & Solutions */}
          {project.challengesAndSolutions.length > 0 && (<div className="space-y-3">
              <div className="text-xs font-mono-code text-purple-400 font-bold uppercase tracking-wider">
                CHALLENGES & SOLUTIONS SOLVED
              </div>
              <div className="space-y-3">
                {project.challengesAndSolutions.map((cs, idx) => (<div key={idx} className="glass-panel p-4 rounded-lg border border-purple-500/20 space-y-2">
                    <div className="text-xs font-mono-code text-amber-300 flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">OBSTACLE</span>
                      <span>{cs.challenge}</span>
                    </div>
                    <div className="text-xs font-mono-code text-emerald-300 flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">SOLUTION</span>
                      <span className="text-slate-300 font-light">{cs.solution}</span>
                    </div>
                  </div>))}
              </div>
            </div>)}

          {/* Result Outcome */}
          <div className="glass-panel p-5 rounded-xl border border-emerald-500/30 bg-emerald-950/10 space-y-2">
            <div className="text-xs font-mono-code text-emerald-400 font-bold uppercase tracking-wider">
              PROJECT RESULT & OUTCOME
            </div>
            <p className="text-slate-200 text-sm leading-relaxed font-light">
              {project.result}
            </p>
          </div>

          {/* Bottom Actions: Live Demo & GitHub */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono-code text-slate-400">
              ARCHITECTURE REVIEW COMPLETE
            </div>

            <div className="flex items-center gap-3">
              {project.liveUrl && (<a href={project.liveUrl} target="_blank" rel="noreferrer" onClick={playUiClick} className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black font-mono-code text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <ExternalLink className="w-3.5 h-3.5"/>
                  <span>LIVE WEBSITE</span>
                </a>)}
              {project.githubUrl && (<a href={project.githubUrl} target="_blank" rel="noreferrer" onClick={playUiClick} className="px-5 py-2.5 rounded-lg glass-panel hover:bg-white/10 text-white font-mono-code text-xs font-semibold tracking-wider flex items-center gap-2 border border-slate-700 transition-colors">
                  <Github className="w-3.5 h-3.5"/>
                  <span>SOURCE CODE</span>
                </a>)}
            </div>
          </div>
        </div>
      </div>
    </div>);
};
