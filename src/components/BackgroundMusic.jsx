import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getIsAudioMuted, setAudioMuted } from '../utils/audio';

const YOUTUBE_VIDEO_ID = '39Y5nVMpqMk';

export function BackgroundMusic() {
  const location = useLocation();
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(() => getIsAudioMuted());
  const [volume, setVolume] = useState(70);
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  // Helper to send postMessage commands directly to YouTube iframe
  const sendIframeCommand = (func, args = []) => {
    try {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func, args }),
          '*'
        );
      }
    } catch (err) {
      console.warn('IFrame postMessage notice:', err);
    }
  };

  // Safe play action - triggers playback
  const triggerPlay = () => {
    if (getIsAudioMuted()) return;
    setHasStartedPlaying(true);
    setIsMuted(false);

    // Direct postMessage guarantee first
    sendIframeCommand('unMute');
    sendIframeCommand('setVolume', [volume]);
    sendIframeCommand('playVideo');

    // YouTube API object if available
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      try {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume);
        playerRef.current.playVideo();
      } catch (err) {
        console.warn('YT playVideo notice:', err);
      }
    }
  };

  // Safe mute action
  const triggerMute = (muteState) => {
    setIsMuted(muteState);
    if (muteState) {
      if (playerRef.current && typeof playerRef.current.mute === 'function') {
        try {
          playerRef.current.mute();
        } catch {}
      }
      sendIframeCommand('mute');
    } else {
      if (playerRef.current && typeof playerRef.current.unMute === 'function') {
        try {
          playerRef.current.unMute();
          playerRef.current.setVolume(volume);
          playerRef.current.playVideo();
        } catch {}
      }
      sendIframeCommand('unMute');
      sendIframeCommand('setVolume', [volume]);
      sendIframeCommand('playVideo');
      setHasStartedPlaying(true);
    }
  };

  // Event listener: Triggered explicitly when user clicks [ PLAY WITH SONG ]
  useEffect(() => {
    const handleStartSong = () => {
      setAudioMuted(false);
      triggerPlay();
      const t1 = setTimeout(triggerPlay, 250);
      const t2 = setTimeout(triggerPlay, 700);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    };

    window.addEventListener('portfolio-play-soundtrack', handleStartSong);
    return () => window.removeEventListener('portfolio-play-soundtrack', handleStartSong);
  }, [volume]);

  // Synchronize with top HUD audio mute toggle buttons and advisory prompt
  useEffect(() => {
    const handleMuteChange = (e) => {
      const nextMuted = e.detail?.isMuted ?? getIsAudioMuted();
      triggerMute(nextMuted);
    };

    window.addEventListener('portfolio-audio-mute-change', handleMuteChange);
    return () => window.removeEventListener('portfolio-audio-mute-change', handleMuteChange);
  }, [volume]);

  // Initialize YouTube IFrame API
  useEffect(() => {
    let checkTimer = null;

    const initYT = () => {
      if (!window.YT || !window.YT.Player || !iframeRef.current) return;
      if (playerRef.current) return;

      try {
        playerRef.current = new window.YT.Player(iframeRef.current, {
          events: {
            onReady: (event) => {
              const muted = getIsAudioMuted();
              setIsMuted(muted);
              if (muted) {
                event.target.mute();
              } else {
                event.target.unMute();
                event.target.setVolume(volume);
                if (hasStartedPlaying) {
                  try {
                    event.target.playVideo();
                    sendIframeCommand('playVideo');
                  } catch {}
                }
              }
            },
            onStateChange: (event) => {
              if (event.data === 0) { // ENDED -> loop
                event.target.playVideo();
                sendIframeCommand('playVideo');
              }
            }
          }
        });
      } catch (err) {
        console.warn('YT Player init warning:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      initYT();
    } else {
      checkTimer = setInterval(() => {
        if (window.YT && window.YT.Player && iframeRef.current) {
          clearInterval(checkTimer);
          initYT();
        }
      }, 250);
    }

    return () => {
      if (checkTimer) clearInterval(checkTimer);
    };
  }, [volume, hasStartedPlaying]);

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 right-0 w-[1px] h-[1px] opacity-[0.001] pointer-events-none -z-50 overflow-hidden"
    >
      <iframe
        ref={iframeRef}
        id="vice-city-youtube-iframe"
        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=0&mute=${isMuted ? '1' : '0'}&loop=1&playlist=${YOUTUBE_VIDEO_ID}&playsinline=1&controls=0&rel=0&modestbranding=1`}
        title="Background Soundtrack"
        className="w-1 h-1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}
