'use client';

import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';

interface TimelinePhase {
  id: string;
  name: string;
  theme: string;
  color: string;
  activeColor: string;
  targetId: string;
}

const PHASES: TimelinePhase[] = [
  {
    id: 'prologue',
    name: 'The Appraisal',
    theme: '“Did you get placed?”',
    color: 'border-slate-700 text-slate-400',
    activeColor: 'border-sky-400 bg-sky-500/20 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.5)]',
    targetId: 'prologue',
  },
  {
    id: 'playground',
    name: 'The Playground',
    theme: 'Warm Amber • Lost Childhood & Sports',
    color: 'border-amber-900/60 text-amber-500/70',
    activeColor: 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]',
    targetId: 'part-1',
  },
  {
    id: 'college',
    name: 'The College Corridor',
    theme: 'Warm Golden Glow • Shared Canteen Chai',
    color: 'border-yellow-900/60 text-yellow-500/70',
    activeColor: 'border-yellow-400 bg-yellow-500/20 text-yellow-200 shadow-[0_0_15px_rgba(250,204,21,0.5)]',
    targetId: 'part-2',
  },
  {
    id: 'fracture',
    name: 'The Fracture',
    theme: 'Deep Navy & Purple • Rejection & Cut',
    color: 'border-indigo-900/60 text-indigo-400/70',
    activeColor: 'border-indigo-400 bg-indigo-500/20 text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.5)]',
    targetId: 'part-3',
  },
  {
    id: 'room',
    name: 'The Hyderabad Room',
    theme: 'Cold Electric Blue • 500+ Apps & Insomnia',
    color: 'border-sky-950 text-sky-500/70',
    activeColor: 'border-cyan-400 bg-cyan-500/20 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.5)]',
    targetId: 'part-4',
  },
  {
    id: 'whispers',
    name: 'The Wall of Whispers',
    theme: 'Ash & Shame • Relatives & Panic Calls',
    color: 'border-rose-950 text-rose-500/70',
    activeColor: 'border-rose-400 bg-rose-500/20 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.5)]',
    targetId: 'part-6',
  },
  {
    id: 'marathon',
    name: 'Seventeen Hours',
    theme: 'Migraine & Keyboard Glare at 4 AM',
    color: 'border-purple-950 text-purple-400/70',
    activeColor: 'border-purple-400 bg-purple-500/20 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.5)]',
    targetId: 'part-7',
  },
  {
    id: 'dawn',
    name: 'The Dawn',
    theme: 'Pale Horizon Gold • Still Standing',
    color: 'border-amber-900/60 text-amber-400/70',
    activeColor: 'border-amber-300 bg-amber-400/25 text-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.6)]',
    targetId: 'part-9',
  },
];

export const EmotionalTimeline: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const positions = PHASES.map((phase) => {
        const el = document.getElementById(phase.targetId);
        if (!el) return { id: phase.id, top: Infinity };
        return { id: phase.id, top: el.getBoundingClientRect().top };
      });

      // Find the phase closest to middle of screen
      let currentIdx = 0;
      for (let i = 0; i < positions.length; i++) {
        if (positions[i].top <= window.innerHeight * 0.45) {
          currentIdx = i;
        }
      }
      setActivePhaseIndex(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPhase = (targetId: string) => {
    if (typeof document !== 'undefined') {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const activePhase = PHASES[activePhaseIndex] || PHASES[0];

  return (
    <>
      {/* Desktop Vertical Journey Line (Fixed Left) */}
      <aside
        aria-label="Emotional Journey Timeline"
        className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-4 py-4 no-print"
      >
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500 uppercase tracking-widest -rotate-90 origin-bottom translate-y-6">
          <Compass className="h-3 w-3" />
          <span>Journey</span>
        </div>

        <div className="relative flex flex-col items-center gap-4 mt-8">
          {/* Central Line Track */}
          <div className="absolute top-2 bottom-2 w-px bg-slate-800/80 -z-10" />

          {PHASES.map((phase, idx) => {
            const isActive = activePhaseIndex === idx;
            return (
              <button
                key={phase.id}
                onClick={() => scrollToPhase(phase.targetId)}
                aria-label={`Jump to ${phase.name}: ${phase.theme}`}
                className="group relative flex items-center justify-center p-1 focus:outline-none"
              >
                {/* Node Pill */}
                <div
                  className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                    isActive ? phase.activeColor + ' scale-125' : 'border-slate-700 bg-slate-950 hover:border-slate-500'
                  }`}
                />

                {/* Tooltip Label on Hover / Active */}
                <div
                  className={`absolute left-8 whitespace-nowrap rounded-xl border border-slate-800 bg-slate-950/95 px-3 py-1.5 font-sans text-xs shadow-xl backdrop-blur-md transition-all duration-200 pointer-events-none ${
                    isActive
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                  }`}
                >
                  <div className="font-semibold text-slate-200">{phase.name}</div>
                  <div className="font-mono text-[10px] text-slate-400">{phase.theme}</div>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile / Tablet Horizontal Emotional Ambient Ribbon Indicator */}
      <div className="fixed bottom-20 left-4 z-30 xl:hidden pointer-events-none no-print">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/90 bg-slate-950/90 px-3 py-1 backdrop-blur-md shadow-lg">
          <span className="h-2 w-2 rounded-full animate-pulse bg-sky-400" />
          <span className="font-mono text-[10px] text-slate-300">
            {activePhase.name}
          </span>
        </div>
      </div>
    </>
  );
};
