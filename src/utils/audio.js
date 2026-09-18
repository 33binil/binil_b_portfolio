// Web Audio API synthesized sound effects for Game HUD experience
let audioCtx = null;
let isAudioMuted = false;
function getAudioContext() {
    if (typeof window === 'undefined')
        return null;
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}
export function toggleAudioMute() {
    isAudioMuted = !isAudioMuted;
    if (typeof window !== 'undefined') {
        localStorage.setItem('binil_portfolio_muted', isAudioMuted ? 'true' : 'false');
    }
    return isAudioMuted;
}
export function getIsAudioMuted() {
    if (typeof window !== 'undefined' && localStorage.getItem('binil_portfolio_muted') === 'true') {
        isAudioMuted = true;
    }
    return isAudioMuted;
}
export function playUiClick() {
    if (isAudioMuted)
        return;
    try {
        const ctx = getAudioContext();
        if (!ctx)
            return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
    }
    catch {
        // Graceful fallback
    }
}
export function playUiHover() {
    if (isAudioMuted)
        return;
    try {
        const ctx = getAudioContext();
        if (!ctx)
            return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(380, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
    }
    catch {
        // Graceful fallback
    }
}
export function playLoadingBlip(frequency = 600) {
    if (isAudioMuted)
        return;
    try {
        const ctx = getAudioContext();
        if (!ctx)
            return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    }
    catch {
        // Graceful fallback
    }
}

export function playMissionPassed() {
    if (isAudioMuted)
        return;
    try {
        const ctx = getAudioContext();
        if (!ctx)
            return;
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const startTime = ctx.currentTime + idx * 0.08;
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0.05, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(startTime);
            osc.stop(startTime + 0.25);
        });
    }
    catch {
        // Graceful fallback
    }
}
