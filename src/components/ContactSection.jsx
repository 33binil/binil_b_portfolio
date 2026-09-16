import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CinematicGameScreen } from './CinematicGameScreen';
import { portfolioImages, contactData } from '../data/portfolioData';
import { playUiClick, playUiHover, playMissionPassed } from '../utils/audio';
import { X, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
const CONTACT_ITEMS = [
    {
        label: 'EMAIL',
        value: '33binilb@gmail.com',
        href: 'mailto:33binilb@gmail.com',
        isLink: true,
    },
    {
        label: 'LOCATION',
        value: 'Kerala, India',
    },
    {
        label: 'LINKEDIN',
        value: '/in/binil-b',
        href: contactData.linkedin,
        isLink: true,
    },
    {
        label: 'INSTAGRAM',
        value: '@binil.builds',
        href: 'https://instagram.com',
        isLink: true,
    },
];
export const ContactSection = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.name || !formState.email || !formState.message)
            return;
        setIsSubmitting(true);
        playUiClick();
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            playMissionPassed();
            confetti({
                particleCount: 80,
                spread: 100,
                origin: { y: 0.6, x: 0.5 },
                colors: ['#00f0ff', '#ff2a85', '#ffd200'],
            });
        }, 800);
    };
    return (<CinematicGameScreen title="CONTACT" scriptSubtitle="Let's Connect" scriptColor="text-[#00f0ff]" cash="$3,000,000" stars={5} locationName="THE KEYS" locationSubtitle="South Keys" objectiveText="OPEN A SECURE LINE OF CONTACT" backgroundImage={portfolioImages.contact} modals={showModal ? (<div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
            <div className="w-full max-w-md bg-[#0b0e14] border border-cyan-500/50 rounded-xl p-4 sm:p-6 shadow-[0_0_50px_rgba(0,240,255,0.3)] space-y-3 sm:space-y-4 max-h-[85dvh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono-code">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"/>
                  <span className="text-[11px] sm:text-xs font-bold text-cyan-400 tracking-widest uppercase">
                    COMM-LINK // 256-BIT ENCRYPTED
                  </span>
                </div>
                <button onClick={() => setShowModal(false)} className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5"/>
                </button>
              </div>

              {isSubmitted ? (<div className="py-6 text-center space-y-3 font-mono-code">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(50,243,141,0.5)]">
                    <CheckCircle2 className="w-6 h-6"/>
                  </div>
                  <h4 className="font-bebas text-2xl text-white tracking-wide">
                    TRANSMISSION DISPATCHED
                  </h4>
                  <p className="text-xs text-slate-300 font-sans">
                    Thank you! Your encrypted message has been received by Binil B.
                  </p>
                  <button onClick={() => {
                    setIsSubmitted(false);
                    setShowModal(false);
                }} className="px-4 py-2 rounded bg-cyan-500 text-black font-bold uppercase text-xs cursor-pointer">
                    RETURN TO HUD
                  </button>
                </div>) : (<form onSubmit={handleSubmit} className="space-y-3 font-mono-code text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase block mb-1">
                      CODENAME / NAME *
                    </label>
                    <input required type="text" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} placeholder="e.g. Alex Drake" className="w-full px-3 py-2 rounded bg-black/60 border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-xs"/>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase block mb-1">
                      COMM EMAIL *
                    </label>
                    <input required type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} placeholder="alex@example.com" className="w-full px-3 py-2 rounded bg-black/60 border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-xs"/>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase block mb-1">
                      ENCRYPTED TRANSMISSION *
                    </label>
                    <textarea required rows={3} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} placeholder="Specify requirements, product mission, or project vision..." className="w-full px-3 py-2 rounded bg-black/60 border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-xs resize-none"/>
                  </div>

                  <button type="submit" disabled={isSubmitting} onMouseEnter={playUiHover} className="w-full py-2.5 rounded bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer disabled:opacity-50">
                    <Send className="w-3.5 h-3.5"/>
                    <span>{isSubmitting ? 'DISPATCHING...' : 'DISPATCH MESSAGE'}</span>
                  </button>
                </form>)}
            </div>
          </div>) : null}>
      {/* Left Docked Contact Cards as in Reference Image 5 */}
      <div className="space-y-2.5 max-w-sm">
        {CONTACT_ITEMS.map((item, idx) => {
            const content = (<div className="group p-2.5 sm:p-3 rounded-md bg-black/60 hover:bg-black/85 border border-white/15 hover:border-cyan-400/60 backdrop-blur-md transition-all duration-150 flex items-start gap-2.5 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
              {/* Cyan square with + */}
              <div className="w-4 h-4 rounded-sm bg-cyan-400/20 border border-cyan-400/60 flex items-center justify-center text-cyan-300 text-xs font-bold flex-shrink-0 mt-0.5 group-hover:bg-cyan-400/30">
                +
              </div>

              <div className="flex-1 min-w-0 font-mono-code">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                  {item.label}
                </div>
                <div className="text-xs sm:text-[13px] text-white font-medium truncate mt-0.5 group-hover:text-cyan-300 transition-colors">
                  {item.value}
                </div>
              </div>
            </div>);
            if (item.isLink && item.href) {
                return (<a key={idx} href={item.href} target={item.href.startsWith('mailto:') ? '_self' : '_blank'} rel="noopener noreferrer" onClick={playUiClick} className="block">
                {content}
              </a>);
            }
            return (<div key={idx} onClick={playUiClick}>
              {content}
            </div>);
        })}

        {/* Action Button: SEND MESSAGE ▸ */}
        <div className="pt-1.5">
          <button onClick={() => {
            playUiClick();
            setShowModal(true);
        }} onMouseEnter={playUiHover} className="group px-4 py-2 rounded-md bg-gradient-to-r from-[#00b4d8] via-[#00f0ff] to-[#0077b6] hover:brightness-110 text-black font-bebas text-base sm:text-lg tracking-wider uppercase flex items-center gap-2 border border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-150 cursor-pointer active:scale-95">
            <span>SEND MESSAGE</span>
            <span className="text-sm group-hover:translate-x-1 transition-transform">▸</span>
          </button>
        </div>
      </div>
    </CinematicGameScreen>);
};
