'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, CloudRain, Disc, Radio, Keyboard, X } from 'lucide-react';

type AudioPreset = 'rain_and_drone' | 'rain_only' | 'drone_only' | 'coding_night';

export const AmbientAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.35);
  const [preset, setPreset] = useState<AudioPreset>('coding_night');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const rainGainRef = useRef<GainNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const typingGainRef = useRef<GainNode | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const droneOscsRef = useRef<OscillatorNode[]>([]);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Play a single mechanical key tap
  const triggerKeyTap = (ctx: AudioContext, destination: GainNode) => {
    if (ctx.state !== 'running') return;
    const now = ctx.currentTime;

    try {
      // 1. Transient click (filtered noise burst)
      const clickBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.025), ctx.sampleRate);
      const data = clickBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (data.length * 0.25));
      }

      const clickSource = ctx.createBufferSource();
      clickSource.buffer = clickBuffer;

      const clickFilter = ctx.createBiquadFilter();
      clickFilter.type = 'bandpass';
      clickFilter.frequency.setValueAtTime(2400 + (Math.random() - 0.5) * 600, now);
      clickFilter.Q.setValueAtTime(3.5, now);

      const clickGain = ctx.createGain();
      clickGain.gain.setValueAtTime(0.12 * (0.8 + Math.random() * 0.4), now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      clickSource.connect(clickFilter);
      clickFilter.connect(clickGain);
      clickGain.connect(destination);
      clickSource.start(now);

      // 2. Body clack (subtle bottom-out thud)
      const thudOsc = ctx.createOscillator();
      thudOsc.type = 'triangle';
      thudOsc.frequency.setValueAtTime(160 + (Math.random() - 0.5) * 40, now);

      const thudGain = ctx.createGain();
      thudGain.gain.setValueAtTime(0.08, now);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      thudOsc.connect(thudGain);
      thudGain.connect(destination);
      thudOsc.start(now);
      thudOsc.stop(now + 0.04);
    } catch {
      // audio safety
    }
  };

  // Schedule rhythmic typing bursts simulating a late-night coding marathon
  const scheduleTypingLoop = () => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    const nextDelay = Math.random() > 0.85 ? 600 + Math.random() * 1200 : 90 + Math.random() * 160;

    typingTimerRef.current = setTimeout(() => {
      if (audioCtxRef.current && typingGainRef.current && isPlaying && !isMuted) {
        if (preset === 'coding_night') {
          triggerKeyTap(audioCtxRef.current, typingGainRef.current);
        }
      }
      scheduleTypingLoop();
    }, nextDelay);
  };

  const initAudio = () => {
    if (typeof window === 'undefined') return;
    if (audioCtxRef.current) return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 1. Rain Synthesizer (Pink Noise + Lowpass/Bandpass filtering)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.153852;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.016898;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const rainFilter = ctx.createBiquadFilter();
      rainFilter.type = 'lowpass';
      rainFilter.frequency.setValueAtTime(800, ctx.currentTime);

      const rainGain = ctx.createGain();
      rainGain.gain.setValueAtTime(preset === 'drone_only' ? 0 : 0.38, ctx.currentTime);
      rainGainRef.current = rainGain;

      whiteNoise.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(masterGain);
      whiteNoise.start();
      noiseNodeRef.current = whiteNoise;

      // 2. Midnight Drone Synthesizer (Warm detuned low ambient drone)
      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(preset === 'rain_only' ? 0 : 0.18, ctx.currentTime);
      droneGainRef.current = droneGain;

      const freqs = [65.41, 98.0, 130.81, 196.0];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 0.8, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.25 / freqs.length, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(droneGain);
        osc.start();
        oscs.push(osc);
      });

      droneOscsRef.current = oscs;
      droneGain.connect(masterGain);

      // 3. Mechanical Keyboard Taps Synthesizer
      const typingGain = ctx.createGain();
      typingGain.gain.setValueAtTime(preset === 'coding_night' ? 0.35 : 0, ctx.currentTime);
      typingGain.connect(masterGain);
      typingGainRef.current = typingGain;

      scheduleTypingLoop();
    } catch (e) {
      console.warn('Web Audio initialization error:', e);
    }
  };

  const togglePlay = async () => {
    if (!audioCtxRef.current) {
      initAudio();
    }

    if (audioCtxRef.current?.state === 'suspended') {
      try {
        await audioCtxRef.current.resume();
      } catch {}
    }

    if (isPlaying) {
      if (audioCtxRef.current) {
        try {
          await audioCtxRef.current.suspend();
        } catch {}
      }
      setIsPlaying(false);
    } else {
      if (audioCtxRef.current?.state === 'suspended') {
        try {
          await audioCtxRef.current.resume();
        } catch {}
      }
      setIsPlaying(true);
      scheduleTypingLoop();
    }
  };

  const handleMute = () => {
    if (!masterGainRef.current || !audioCtxRef.current) return;
    if (isMuted) {
      masterGainRef.current.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.05);
      setIsMuted(false);
    } else {
      masterGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.05);
      setIsMuted(true);
    }
  };

  const handleVolume = (newVol: number) => {
    setVolume(newVol);
    if (masterGainRef.current && audioCtxRef.current && !isMuted) {
      masterGainRef.current.gain.setTargetAtTime(newVol, audioCtxRef.current.currentTime, 0.05);
    }
  };

  const changePreset = (newPreset: AudioPreset) => {
    setPreset(newPreset);
    if (!audioCtxRef.current) return;
    const t = audioCtxRef.current.currentTime;

    if (rainGainRef.current) {
      rainGainRef.current.gain.setTargetAtTime(newPreset === 'drone_only' ? 0 : 0.38, t, 0.1);
    }
    if (droneGainRef.current) {
      droneGainRef.current.gain.setTargetAtTime(newPreset === 'rain_only' ? 0 : 0.18, t, 0.1);
    }
    if (typingGainRef.current) {
      typingGainRef.current.gain.setTargetAtTime(newPreset === 'coding_night' ? 0.35 : 0, t, 0.1);
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      {/* Expanded Controls Popover */}
      {isOpen && (
        <div
          role="region"
          aria-label="Ambient sound settings"
          className="mb-3 w-80 rounded-2xl border border-slate-800/80 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 animate-fade-in"
        >
          <div className="mb-3 flex items-center justify-between border-b border-slate-800/60 pb-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-ping" />
              <span className="text-xs font-medium tracking-wider text-slate-300 uppercase">
                Atmosphere Synthesizer
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
              aria-label="Close sound settings"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Sound Presets */}
          <div className="mb-3 grid grid-cols-2 gap-1.5 rounded-lg bg-slate-900/80 p-1.5">
            <button
              onClick={() => changePreset('coding_night')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[11px] font-medium transition-all ${
                preset === 'coding_night'
                  ? 'bg-sky-500/20 text-sky-300 shadow-sm border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Keyboard className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span className="truncate">Late-Night Coding</span>
            </button>

            <button
              onClick={() => changePreset('rain_and_drone')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[11px] font-medium transition-all ${
                preset === 'rain_and_drone'
                  ? 'bg-sky-500/20 text-sky-300 shadow-sm border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Radio className="h-3.5 w-3.5 text-sky-400 shrink-0" />
              <span className="truncate">Rain + Drone</span>
            </button>

            <button
              onClick={() => changePreset('rain_only')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[11px] font-medium transition-all ${
                preset === 'rain_only'
                  ? 'bg-sky-500/20 text-sky-300 shadow-sm border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CloudRain className="h-3.5 w-3.5 text-blue-400 shrink-0" />
              <span className="truncate">Midnight Rain</span>
            </button>

            <button
              onClick={() => changePreset('drone_only')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[11px] font-medium transition-all ${
                preset === 'drone_only'
                  ? 'bg-sky-500/20 text-sky-300 shadow-sm border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Disc className="h-3.5 w-3.5 text-purple-400 shrink-0" />
              <span className="truncate">Lo-Fi Pad Hum</span>
            </button>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleMute}
              className="text-slate-400 hover:text-sky-300 transition-colors focus:outline-none"
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label={isMuted ? 'Unmute ambient audio' : 'Mute ambient audio'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4 text-rose-400" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolume(parseFloat(e.target.value))}
              aria-label="Ambient audio volume"
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-sky-400"
            />
            <span className="w-8 text-right font-mono text-[10px] text-slate-400">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>

          <div className="mt-2.5 text-[10px] text-slate-500 leading-tight">
            Procedural rain, deep drone, and mechanical keys generated live in-browser via Web Audio. Zero external network streams.
          </div>
        </div>
      )}

      {/* Floating Compact Toggle Pill */}
      <div className="flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-950/85 p-1.5 shadow-xl backdrop-blur-md transition-all duration-200 hover:border-slate-700">
        <button
          onClick={togglePlay}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
            isPlaying
              ? 'bg-sky-500/20 text-sky-300 shadow-md shadow-sky-500/10 hover:bg-sky-500/30'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
          title={isPlaying ? 'Pause ambient atmosphere' : 'Play ambient Hyderabad soundscape'}
          aria-label={isPlaying ? 'Pause ambient atmosphere' : 'Play ambient audio'}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </button>

        {/* Dynamic Equalizer Waves when active */}
        {isPlaying && (
          <div className="flex items-center gap-0.5 px-1.5">
            <span className="h-3 w-0.5 animate-pulse rounded-full bg-sky-400" />
            <span className="h-[18px] w-0.5 animate-pulse rounded-full bg-amber-300 [animation-delay:0.2s]" />
            <span className="h-2 w-0.5 animate-pulse rounded-full bg-sky-400 [animation-delay:0.4s]" />
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 items-center gap-1.5 rounded-full px-2.5 text-xs text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors focus:outline-none"
          title="Audio settings"
          aria-label="Toggle ambient audio settings"
          aria-expanded={isOpen}
        >
          <CloudRain className={`h-3.5 w-3.5 ${isPlaying ? 'text-sky-400' : 'text-slate-500'}`} />
          <span className="hidden sm:inline font-sans text-[11px] font-medium tracking-wide">
            {isPlaying ? (preset === 'coding_night' ? 'Night Coding' : 'Atmosphere') : 'Soundscape'}
          </span>
        </button>
      </div>
    </div>
  );
};
