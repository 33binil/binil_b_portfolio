import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CinematicGameScreen } from './CinematicGameScreen';
import { portfolioImages, contactData, downloadResume } from '../data/portfolioData';
import { playUiClick, playUiHover, playMissionPassed } from '../utils/audio';
import {
  X,
  Send,
  CheckCircle2,
  Linkedin,
  Instagram,
  Github,
  MessageCircle,
  Mail,
  ExternalLink,
  Download,
  Shield,
  FileText,
  Scale,
  Lock,
  Maximize2,
  Globe,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const CONTACT_ITEMS = [
  {
    name: 'LinkedIn',
    displayName: "Let's Connect",
    subText: 'on LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/33binilb',
    color: '#0A66C2',
    gradient: 'from-[#0A66C2] to-[#0077B5]',
    isPrimary: true,
  },
  {
    name: 'Instagram',
    displayName: 'Instagram',
    subText: '@binil_.b',
    icon: Instagram,
    url: 'https://instagram.com/binil_.b',
    color: '#E4405F',
    gradient: 'from-[#833AB4] via-[#E4405F] to-[#FCAF45]',
  },
  {
    name: 'GitHub',
    displayName: 'Github',
    subText: '@33binilb',
    icon: Github,
    url: 'https://github.com/33binil',
    color: '#ffffff',
    gradient: 'from-[#333] to-[#24292e]',
  },
  {
    name: 'WhatsApp',
    displayName: 'WhatsApp',
    subText: 'Chat with me',
    icon: MessageCircle,
    url: 'https://wa.me/917902931503',
    color: '#25D366',
    gradient: 'from-[#25D366] to-[#128C7E]',
  },
  {
    name: 'Gmail',
    displayName: 'Gmail',
    subText: 'Send me an email',
    icon: Mail,
    url: 'mailto:33binilb@gmail.com',
    color: '#D44638',
    gradient: 'from-[#D44638] to-[#F4B400]',
  },
];

export const ContactSection = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [legalModalType, setLegalModalType] = useState(null); // 'privacy' | 'terms' | null
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Keyboard navigation: Escape key closes active modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (legalModalType) {
          e.preventDefault();
          setLegalModalType(null);
        } else if (showModal) {
          e.preventDefault();
          setShowModal(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [legalModalType, showModal]);

  const handleOpenLegalModal = (type) => {
    playUiClick();
    setLegalModalType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
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

  return (
    <CinematicGameScreen
      title="CONTACT"
      scriptSubtitle="Let's Connect"
      scriptColor="text-[#00f0ff]"
      cash="$3,000,000"
      stars={5}
      locationName="THE KEYS"
      locationSubtitle="South Keys"
      objectiveText="OPEN A SECURE LINE OF CONTACT"
      backgroundImage={portfolioImages.contact}
      modals={
        <>
          {/* Send Message Form Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
              <div className="w-full max-w-md bg-[#0b0e14] border border-cyan-500/50 rounded-xl p-4 sm:p-6 shadow-[0_0_50px_rgba(0,240,255,0.3)] space-y-3 sm:space-y-4 max-h-[85dvh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono-code">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-[11px] sm:text-xs lg:text-base font-bold text-cyan-400 tracking-widest uppercase">
                      COMM-LINK // 256-BIT ENCRYPTED
                    </span>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Quick direct action chips */}
                <div className="flex flex-wrap gap-1.5 pb-1">
                  <a
                    href="https://wa.me/917902931503"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-[10px] font-mono-code font-bold flex items-center gap-1 transition-colors"
                  >
                    <MessageCircle className="w-3 h-3" />
                    WhatsApp
                  </a>
                  <a
                    href="mailto:33binilb@gmail.com"
                    className="px-2.5 py-1 rounded bg-[#D44638]/15 hover:bg-[#D44638]/25 border border-[#D44638]/40 text-[#ff786e] text-[10px] font-mono-code font-bold flex items-center gap-1 transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    Gmail
                  </a>
                  <a
                    href="https://linkedin.com/in/33binilb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 border border-[#0A66C2]/40 text-sky-300 text-[10px] font-mono-code font-bold flex items-center gap-1 transition-colors"
                  >
                    <Linkedin className="w-3 h-3" />
                    LinkedIn
                  </a>
                </div>

                {isSubmitted ? (
                  <div className="py-6 text-center space-y-3 font-mono-code">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(50,243,141,0.5)]">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-bebas text-2xl md:text-3xl text-white tracking-wide">
                      TRANSMISSION DISPATCHED
                    </h4>
                    <p className="text-xs md:text-sm text-slate-300 font-sans">
                      Thank you! Your encrypted message has been logged for Binil B.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setShowModal(false);
                      }}
                      className="px-4 py-2 rounded bg-cyan-500 text-black font-bold uppercase text-xs cursor-pointer"
                    >
                      RETURN TO HUD
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3 font-mono-code text-xs lg:text-base">
                    <div>
                      <label className="text-[10px] lg:text-sm text-slate-400 uppercase block mb-1">
                        CODENAME / NAME *
                      </label>
                      <input
                        required
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Alex Drake"
                        className="w-full px-3 py-2 rounded bg-black/60 border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] lg:text-sm text-slate-400 uppercase block mb-1">
                        COMM EMAIL *
                      </label>
                      <input
                        required
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full px-3 py-2 rounded bg-black/60 border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] lg:text-sm text-slate-400 uppercase block mb-1">
                        ENCRYPTED TRANSMISSION *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Specify requirements, product mission, or project vision..."
                        className="w-full px-3 py-2 rounded bg-black/60 border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-xs resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onMouseEnter={playUiHover}
                      className="w-full py-2.5 rounded bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer disabled:opacity-50 text-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'DISPATCHING...' : 'DISPATCH MESSAGE'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Dedicated Legal Directives Modal (Privacy Policy & Terms of Service) */}
          {legalModalType && (
            <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
              <div className="w-full max-w-2xl bg-[#0b0e14] border border-cyan-500/50 rounded-xl p-4 sm:p-6 shadow-[0_0_50px_rgba(0,240,255,0.3)] space-y-3.5 max-h-[88dvh] flex flex-col">
                {/* Modal Top Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono-code flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        legalModalType === 'privacy' ? 'bg-cyan-400' : 'bg-[#ff2a85]'
                      } animate-ping`}
                    />
                    <span
                      className={`text-[11px] sm:text-xs font-bold ${
                        legalModalType === 'privacy' ? 'text-cyan-400' : 'text-[#ff2a85]'
                      } tracking-widest uppercase`}
                    >
                      LEGAL DIRECTIVE // {legalModalType === 'privacy' ? 'SEC-01 PRIVACY' : 'SEC-02 TERMS'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Tab switchers */}
                    <div className="flex items-center p-0.5 rounded bg-black/80 border border-white/15 text-[10px]">
                      <button
                        onClick={() => {
                          playUiClick();
                          setLegalModalType('privacy');
                        }}
                        className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                          legalModalType === 'privacy'
                            ? 'bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-400/40'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        PRIVACY
                      </button>
                      <button
                        onClick={() => {
                          playUiClick();
                          setLegalModalType('terms');
                        }}
                        className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                          legalModalType === 'terms'
                            ? 'bg-[#ff2a85]/30 text-pink-300 font-bold border border-pink-400/40'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        TERMS
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        playUiClick();
                        navigate(legalModalType === 'privacy' ? '/privacy' : '/terms');
                      }}
                      className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-cyan-300 cursor-pointer hidden sm:flex items-center gap-1 text-[11px]"
                      title="Open full page view"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="text-[10px]">FULL PAGE</span>
                    </button>

                    <button
                      onClick={() => setLegalModalType(null)}
                      className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Modal Document Body */}
                <div className="overflow-y-auto pr-1 space-y-4 custom-game-scrollbar flex-1 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {legalModalType === 'privacy' ? (
                    <div className="space-y-4">
                      <div className="p-3.5 rounded-lg bg-cyan-950/30 border border-cyan-500/30 space-y-1">
                        <div className="font-bebas text-2xl text-white tracking-wide">
                          PRIVACY POLICY PROTOCOL
                        </div>
                        <p className="text-xs text-slate-300 font-sans">
                          Data Controller: <strong className="text-white">Binil B</strong> (Full-Stack Developer & UI/UX Designer, Kerala, India). Direct Contact: <code className="text-cyan-300">33binilb@gmail.com</code>.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="font-mono-code text-xs font-bold text-cyan-400 uppercase">
                          01 // INFORMATION WE COLLECT
                        </div>
                        <p>
                          We collect voluntary communications sent through our contact form, email, WhatsApp, or LinkedIn (including name, email address, and inquiry messages). Standard technical viewport dimensions and local sound mute preferences are stored in your browser's local cache.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="font-mono-code text-xs font-bold text-cyan-400 uppercase">
                          02 // DATA USE & ZERO-SALE COMMITMENT
                        </div>
                        <p>
                          Inquiry details are strictly used to discuss freelance contracts, web development projects, and design consultations. We never sell, monetize, or lease your contact information to advertisers or external brokers.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="font-mono-code text-xs font-bold text-cyan-400 uppercase">
                          03 // THIRD-PARTY MULTIMEDIA SERVICES
                        </div>
                        <p>
                          Background audio tracks stream via YouTube's official IFrame player. Typography is rendered via Google Fonts CDN. In-game sound effects are generated locally using the HTML5 Web Audio API.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="font-mono-code text-xs font-bold text-cyan-400 uppercase">
                          04 // YOUR RIGHTS & REMOVAL
                        </div>
                        <p>
                          You may request complete erasure of your email correspondence or past messages by emailing <code className="text-pink-300">33binilb@gmail.com</code>.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-3.5 rounded-lg bg-pink-950/30 border border-pink-500/30 space-y-1">
                        <div className="font-bebas text-2xl text-white tracking-wide">
                          TERMS OF SERVICE & ENGAGEMENT
                        </div>
                        <p className="text-xs text-slate-300 font-sans">
                          Governing agreement for navigating Binil B's interactive portfolio and commissioning bespoke software solutions.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="font-mono-code text-xs font-bold text-pink-400 uppercase">
                          01 // PERMITTED PORTFOLIO USE
                        </div>
                        <p>
                          You are granted a personal, non-transferable license to review work samples, test interactive simulations, and download CV/Resume documents for hiring and contract evaluation. Automated scraping and network stress testing are strictly prohibited.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="font-mono-code text-xs font-bold text-pink-400 uppercase">
                          02 // INTELLECTUAL PROPERTY
                        </div>
                        <p>
                          All original React code, visual design components, and custom branding belong to Binil B. Client marks and project trademarks (Media7, Astrivix, Pixel Junkie, NRET) remain property of their respective owners. Vice City themes are creative homage.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="font-mono-code text-xs font-bold text-pink-400 uppercase">
                          03 // FREELANCE CONTRACTS & DELIVERABLES
                        </div>
                        <p>
                          Custom software engineering and UI/UX design deliverables are executed pursuant to mutual Statements of Work (SOW) with defined milestone payment structures and full repository handoffs.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="font-mono-code text-xs font-bold text-pink-400 uppercase">
                          04 // DISCLAIMERS & GOVERNING JURISDICTION
                        </div>
                        <p>
                          This website is provided "as is". Audio playback is optional and user-controlled. These Terms are governed by the laws of India with jurisdiction located in Kerala.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer Controls */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono-code text-[11px] text-slate-400 flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>STATUS: RATIFIED 2026</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        playUiClick();
                        navigate(legalModalType === 'privacy' ? '/privacy' : '/terms');
                      }}
                      className="px-2.5 py-1 rounded bg-black/60 hover:bg-white/10 border border-white/20 text-slate-200 hover:text-white cursor-pointer flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3 text-cyan-400" />
                      <span>FULL PAGE VIEW</span>
                    </button>
                    <button
                      onClick={() => setLegalModalType(null)}
                      className="px-3 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 cursor-pointer font-bold"
                    >
                      CLOSE (ESC)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Floating HUD Legal Dock Bar on Contact Screen Bottom Side */}
          <div className="fixed sm:absolute bottom-1 sm:bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-2 px-3 py-1 rounded-full bg-black/90 border border-white/20 backdrop-blur-md font-mono-code text-[10px] sm:text-[11px] shadow-[0_0_20px_rgba(0,0,0,0.85)]">
            <button
              onClick={() => handleOpenLegalModal('privacy')}
              onMouseEnter={playUiHover}
              className="text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <Shield className="w-3 h-3 text-cyan-400" />
              <span>PRIVACY POLICY</span>
            </button>
            <span className="text-slate-600">•</span>
            <button
              onClick={() => handleOpenLegalModal('terms')}
              onMouseEnter={playUiHover}
              className="text-slate-300 hover:text-pink-300 transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <FileText className="w-3 h-3 text-pink-400" />
              <span>TERMS OF SERVICE</span>
            </button>
          </div>
        </>
      }
    >
      {/* Left Docked Contact Cards */}
      <div className="space-y-1.5 sm:space-y-2 max-w-sm sm:max-w-md">
        <div className="flex items-center justify-between text-[10px] lg:text-sm font-mono-code text-slate-400 px-0.5">
          <span className="text-cyan-400 font-bold">
            COMM CHANNELS // {CONTACT_ITEMS.length} ACTIVE
          </span>
          <span>DIRECT LINKS</span>
        </div>

        <div className="space-y-1.5 sm:max-h-[36dvh] max-h-[32dvh] overflow-y-auto pr-1 scrollbar-thin">
          {CONTACT_ITEMS.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <a
                key={idx}
                href={item.url}
                target={item.url.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={playUiClick}
                onMouseEnter={playUiHover}
                className={`group p-2 sm:p-2.5 rounded-md bg-black/65 hover:bg-black/90 backdrop-blur-md transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.5)] border ${
                  item.isPrimary
                    ? 'border-[#0A66C2]/80 hover:border-[#0077B5] shadow-[0_0_15px_rgba(10,102,194,0.25)]'
                    : 'border-white/15 hover:border-cyan-400/60'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Channel Icon with Brand Color */}
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 border border-white/10"
                    style={{
                      backgroundColor: `${item.color}20`,
                      color: item.color,
                    }}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>

                  <div className="min-w-0 font-mono-code">
                    <div className="flex items-center gap-2">
                      <span className="font-bebas text-base sm:text-lg text-white tracking-wide group-hover:text-cyan-300 transition-colors leading-none">
                        {item.displayName}
                      </span>
                      {item.isPrimary && (
                        <span className="px-1.5 py-0.2 text-[8px] font-bold rounded bg-[#0A66C2]/30 text-sky-300 border border-[#0A66C2]/60 leading-none">
                          PRIMARY
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-300 font-sans truncate">
                      {item.subText}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-slate-400 group-hover:text-cyan-400 transition-colors flex-shrink-0">
                  <span className="text-[9px] font-mono-code uppercase hidden sm:inline opacity-70">
                    {item.name}
                  </span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Action Buttons: SEND MESSAGE ▸ & WHATSAPP quick button */}
        <div className="pt-1 flex gap-2">
          <button
            onClick={() => {
              playUiClick();
              setShowModal(true);
            }}
            onMouseEnter={playUiHover}
            className="flex-1 px-4 py-2 rounded-md bg-gradient-to-r from-[#00b4d8] via-[#00f0ff] to-[#0077b6] hover:brightness-110 text-black font-bebas text-base sm:text-lg tracking-wider uppercase flex items-center justify-center gap-1.5 border border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-150 cursor-pointer active:scale-95"
          >
            <span>SEND MESSAGE</span>
            <span className="text-sm group-hover:translate-x-1 transition-transform">▸</span>
          </button>
          <a
            href="https://wa.me/917902931503"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playUiClick}
            onMouseEnter={playUiHover}
            className="px-3 py-2 rounded-md bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 text-[#25D366] font-bebas text-base sm:text-lg tracking-wider uppercase flex items-center gap-1 transition-all cursor-pointer"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WHATSAPP</span>
          </a>
        </div>

        {/* Download Verified Resume */}
        <button
          onClick={downloadResume}
          onMouseEnter={playUiHover}
          className="w-full py-2 px-3 rounded-md bg-black/60 hover:bg-black/80 border border-white/20 hover:border-pink-500/60 text-slate-300 hover:text-white font-mono-code text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-pink-400" />
          <span>DOWNLOAD RESUME (PDF)</span>
        </button>

        {/* ========================================================================= */}
        {/* CONTACT PAGE BOTTOM SIDE: LEGAL DIRECTIVES & POLICIES                     */}
        {/* ========================================================================= */}
        <div className="pt-2 border-t border-white/15 space-y-1.5 font-mono-code">
          <div className="flex items-center justify-between text-[10px] text-slate-400 px-0.5">
            <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              LEGAL DIRECTIVES // POLICIES
            </span>
            <span className="text-slate-400">RATIFIED 2026</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleOpenLegalModal('privacy')}
              onMouseEnter={playUiHover}
              className="p-2 rounded-md bg-black/75 hover:bg-black/95 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all flex items-center justify-center gap-1.5 text-xs font-mono-code font-bold uppercase cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.15)] group"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>PRIVACY POLICY</span>
            </button>

            <button
              onClick={() => handleOpenLegalModal('terms')}
              onMouseEnter={playUiHover}
              className="p-2 rounded-md bg-black/75 hover:bg-black/95 border border-pink-500/50 hover:border-pink-400 text-pink-300 hover:text-white transition-all flex items-center justify-center gap-1.5 text-xs font-mono-code font-bold uppercase cursor-pointer shadow-[0_0_15px_rgba(255,42,133,0.15)] group"
            >
              <FileText className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
              <span>TERMS OF SERVICE</span>
            </button>
          </div>
        </div>
      </div>
    </CinematicGameScreen>
  );
};
