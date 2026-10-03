'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, CloudRain, Disc, Radio } from 'lucide-react';

type AudioPreset = 'rain_and_drone' | 'rain_only' | 'drone_only';

export const AmbientAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.35);
  const [preset, setPreset] = useState<AudioPreset>('rain_and_drone');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const rainGainRef = useRef<GainNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const droneOscsRef = useRef<OscillatorNode[]>([]);

  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11; // scaling
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Rain filter chain (gentle roof/window raindrops)
      const rainFilter = ctx.createBiquadFilter();
      rainFilter.type = 'lowpass';
      rainFilter.frequency.setValueAtTime(800, ctx.currentTime);

      const rainGain = ctx.createGain();
      rainGain.gain.setValueAtTime(preset === 'drone_only' ? 0 : 0.4, ctx.currentTime);
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

      const freqs = [65.41, 98.00, 130.81, 196.00]; // C2, G2, C3, G3 warm chord
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
    } catch (e) {
      console.warn('Web Audio initialization error:', e);
    }
  };

  const togglePlay = async () => {
    if (!audioCtxRef.current) {
      initAudio();
    }

    if (audioCtxRef.current?.state === 'suspended') {
      await audioCtxRef.current.resume();
    }

    if (isPlaying) {
      if (audioCtxRef.current) {
        await audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      if (audioCtxRef.current?.state === 'suspended') {
        await audioCtxRef.current.resume();
      }
      setIsPlaying(true);
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
      rainGainRef.current.gain.setTargetAtTime(newPreset === 'drone_only' ? 0 : 0.4, t, 0.1);
    }
    if (droneGainRef.current) {
      droneGainRef.current.gain.setTargetAtTime(newPreset === 'rain_only' ? 0 : 0.18, t, 0.1);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Controls Popover */}
      {isOpen && (
        <div className="mb-3 w-72 rounded-2xl border border-slate-800/80 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300">
          <div className="mb-3 flex items-center justify-between border-b border-slate-800/60 pb-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-ping" />
              <span className="text-xs font-medium tracking-wider text-slate-300 uppercase">
                Ambient Rain & Drone
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Sound Presets */}
          <div className="mb-3 grid grid-cols-3 gap-1 rounded-lg bg-slate-900/80 p-1">
            <button
              onClick={() => changePreset('rain_and_drone')}
              className={`flex flex-col items-center gap-1 rounded-md py-1.5 text-[11px] font-medium transition-all ${
                preset === 'rain_and_drone'
                  ? 'bg-sky-500/20 text-sky-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Radio className="h-3.5 w-3.5" />
              <span>Full Mix</span>
            </button>
            <button
              onClick={() => changePreset('rain_only')}
              className={`flex flex-col items-center gap-1 rounded-md py-1.5 text-[11px] font-medium transition-all ${
                preset === 'rain_only'
                  ? 'bg-sky-500/20 text-sky-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CloudRain className="h-3.5 w-3.5" />
              <span>Rain</span>
            </button>
            <button
              onClick={() => changePreset('drone_only')}
              className={`flex flex-col items-center gap-1 rounded-md py-1.5 text-[11px] font-medium transition-all ${
                preset === 'drone_only'
                  ? 'bg-sky-500/20 text-sky-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Disc className="h-3.5 w-3.5" />
              <span>Drone</span>
            </button>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleMute}
              className="text-slate-400 hover:text-sky-300 transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
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
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-sky-400"
            />
            <span className="w-8 text-right font-mono text-[10px] text-slate-400">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>

          <div className="mt-2 text-[10px] text-slate-500 leading-tight">
            Procedural rain & lo-fi drone generated in-browser. No external streams needed.
          </div>
        </div>
      )}

      {/* Floating Compact Toggle Pill */}
      <div className="flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-950/85 p-1.5 shadow-xl backdrop-blur-md transition-all duration-200 hover:border-slate-700">
        <button
          onClick={togglePlay}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
            isPlaying
              ? 'bg-sky-500/20 text-sky-300 shadow-md shadow-sky-500/10 hover:bg-sky-500/30'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
          title={isPlaying ? 'Pause ambient atmosphere' : 'Play ambient Hyderabad rain & night drone'}
          aria-label={isPlaying ? 'Pause ambient atmosphere' : 'Play ambient audio'}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </button>

        {/* Dynamic Equalizer Waves when active */}
        {isPlaying && (
          <div className="flex items-center gap-0.5 px-1.5">
            <span className="h-3 w-0.5 animate-pulse rounded-full bg-sky-400" />
            <span className="h-4.5 w-0.5 animate-pulse rounded-full bg-sky-300 [animation-delay:0.2s]" />
            <span className="h-2 w-0.5 animate-pulse rounded-full bg-sky-400 [animation-delay:0.4s]" />
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 items-center gap-1.5 rounded-full px-2.5 text-xs text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors"
          title="Audio settings"
        >
          <CloudRain className={`h-3.5 w-3.5 ${isPlaying ? 'text-sky-400' : 'text-slate-500'}`} />
          <span className="hidden sm:inline font-sans text-[11px] font-medium tracking-wide">
            {isPlaying ? 'Rain & Drone' : 'Ambient Audio'}
          </span>
        </button>
      </div>
    </div>
  );
};
