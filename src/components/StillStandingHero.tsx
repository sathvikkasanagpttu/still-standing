'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronDown, BookOpen, Sparkles } from 'lucide-react';
import { STORY_METADATA } from '../data/storyData';

interface StillStandingHeroProps {
  onBeginReading: () => void;
}

export const StillStandingHero: React.FC<StillStandingHeroProps> = ({ onBeginReading }) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-slate-950 text-slate-100">
      {/* Background Hero Image with atmospheric overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_window.jpg"
          alt="Rain-streaked window in Hyderabad looking at city night lights"
          fill
          priority
          className="object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/50 to-slate-950" />
      </div>

      {/* Subtle Rain / Particle Simulation Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_bottom,transparent_0%,rgba(15,23,42,0.3)_100%)] opacity-80" />

      {/* Top Navbar / Brand Space */}
      <div className="relative z-20 flex items-center justify-between px-6 sm:px-12 pt-8">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <span className="font-mono text-xs tracking-widest text-slate-400 uppercase">
            Hyderabad • 3:00 AM
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <span className="rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 font-mono text-[11px] text-slate-400 backdrop-blur-md">
            Unabridged Autobiographical Novella
          </span>
        </div>
      </div>

      {/* Main Hero Typography & Callout */}
      <div className="relative z-20 mx-auto max-w-4xl px-6 sm:px-8 py-16 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-sky-400" />
          <span className="font-mono text-xs font-medium tracking-wider text-sky-300 uppercase">
            A Story of Raw Survival
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-slate-50 drop-shadow-2xl">
          STILL STANDING
        </h1>

        {/* Subtitle */}
        <p className="mt-4 font-sans text-lg sm:text-2xl font-light text-slate-300 tracking-wide max-w-2xl leading-snug">
          A Story of Rejection, Loneliness, and Refusing to Disappear
        </p>

        {/* Divider accent */}
        <div className="my-8 flex items-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>

        {/* Pull-Quote Dedication Card */}
        <div className="relative max-w-2xl rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="font-serif italic text-base sm:text-lg leading-relaxed text-slate-200">
            “{STORY_METADATA.dedication[0]}
            <br />
            <span className="mt-2 block text-slate-300">
              {STORY_METADATA.dedication[1]}”
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onBeginReading}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-amber-400 px-8 py-4 font-sans text-sm font-semibold text-slate-950 shadow-xl shadow-sky-500/20 transition-all duration-300 hover:scale-105 hover:shadow-sky-500/30"
          >
            <BookOpen className="h-4 w-4" />
            <span>Begin Reading</span>
            <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-20 pb-8 text-center">
        <button
          onClick={onBeginReading}
          className="inline-flex flex-col items-center gap-2 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors"
        >
          <span>Scroll down to enter</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-slate-400" />
        </button>
      </div>
    </section>
  );
};
