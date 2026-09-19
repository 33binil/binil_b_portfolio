import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CinematicGameScreen } from './CinematicGameScreen';
import { portfolioImages, downloadResume } from '../data/portfolioData';
import { playUiClick, playUiHover } from '../utils/audio';
import { Download, Home } from 'lucide-react';
export const MissionCompleteSection = () => {
    const navigate = useNavigate();
    const handleBackHome = () => {
        playUiClick();
        navigate('/');
    };
    const handleDownloadResume = () => {
        downloadResume();
    };
    return (<CinematicGameScreen superTitle="THANK YOU FOR VISITING" title="MISSION COMPLETE" scriptSubtitle="See you soon!" scriptColor="text-[#ff2a85]" cash="$3,000,000" stars={5} locationName="SUNSET BOULEVARD" locationSubtitle="Ocean Drive" objectiveText="RIDE OFF INTO THE SUNRISE" backgroundImage={portfolioImages.complete} showMissionPassed={true}>
      {/* Left Docked Content as in Reference Image 6 */}
      <div className="space-y-4 max-w-sm sm:max-w-md">
        <p className="text-xs sm:text-sm lg:text-lg text-slate-200 font-light leading-relaxed font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          You've explored Binil's missions, technical arsenal, completed operations, and credentials. Ready to partner on high-impact builds?
        </p>

        {/* Action Button: BACK TO HOME ▸ */}
        <div className="space-y-2.5 pt-1">
          <button onClick={handleBackHome} onMouseEnter={playUiHover} className="group px-5 py-2.5 rounded-md bg-gradient-to-r from-[#ff1f7d] via-[#ff2a85] to-[#f41459] hover:brightness-110 text-white font-bebas text-lg sm:text-xl lg:text-3xl tracking-wider uppercase flex items-center gap-2 border border-pink-400 shadow-[0_0_25px_rgba(255,42,133,0.5)] transition-all duration-150 cursor-pointer active:scale-95">
            <Home className="w-4 h-4"/>
            <span>BACK TO HOME</span>
            <span className="text-base group-hover:translate-x-1 transition-transform">▸</span>
          </button>

          <button onClick={handleDownloadResume} onMouseEnter={playUiHover} className="w-full py-2 px-3 rounded-md bg-black/60 hover:bg-black/80 border border-white/20 hover:border-cyan-400/60 text-slate-300 hover:text-white font-mono-code text-xs lg:text-base flex items-center justify-center gap-2 transition-all cursor-pointer">
            <Download className="w-3.5 h-3.5 text-cyan-400"/>
            <span>DOWNLOAD RESUME (PDF)</span>
          </button>
        </div>
      </div>
    </CinematicGameScreen>);
};
