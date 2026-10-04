'use client';

import React, { useState } from 'react';
import { VolumeX, ShieldAlert, CheckCircle, RefreshCcw, Sparkles } from 'lucide-react';

interface WhisperItem {
  id: string;
  quote: string;
  source: string;
  context: string;
}

const WHISPERS: WhisperItem[] = [
  {
    id: 'w1',
    quote: '“You’re 22 now. Still sitting in that room?”',
    source: 'Distant Relative on an unannounced Sunday call',
    context: 'Hyderabad rented room • 3:15 PM',
  },
  {
    id: 'w2',
    quote: '“Both your parents are teachers... everyone else from your college batch already got placed.”',
    source: 'Family Acquaintance at the front door',
    context: 'Hometown audit • Holiday visit',
  },
  {
    id: 'w3',
    quote: '“Your cousin just cleared an MNC package of 12 LPA. Why don’t you ask him for a referral?”',
    source: 'Uncle during festival dinner',
    context: 'Dining table interrogation',
  },
  {
    id: 'w4',
    quote: '“Play won’t build your future. Games won’t feed you. Study. Just study.”',
    source: 'Childhood reprimand echoing through the silence',
    context: 'Memory of the buried cricket bat',
  },
  {
    id: 'w5',
    quote: '“Why are you still asking for rent money every month? When will this finally end?”',
    source: 'The dreaded 1st-of-the-month phone call',
    context: 'Phone trembling outside an ATM',
  },
  {
    id: 'w6',
    quote: '“Did you do something wrong in college? How can someone with high school marks be sitting idle?”',
    source: 'Neighbor inquiring outside the gate',
    context: 'Passing small-talk turned scrutiny',
  },
  {
    id: 'w7',
    quote: '“He was such a promising boy in tenth class... we wonder what happened to him.”',
    source: 'Muffled conversations in the living room',
    context: 'The quiet stigma of delay',
  },
];

export const WallOfExpectations: React.FC = () => {
  const [silencedIds, setSilencedIds] = useState<Set<string>>(new Set());

  const toggleSilence = (id: string) => {
    setSilencedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const silenceAll = () => {
    setSilencedIds(new Set(WHISPERS.map((w) => w.id)));
  };

  const resetAll = () => {
    setSilencedIds(new Set());
  };

  const silencedCount = silencedIds.size;
  const allSilenced = silencedCount === WHISPERS.length;

  return (
    <section
      id="wall-of-expectations"
      aria-label="The Wall of Expectations"
      className="my-24 mx-auto max-w-5xl px-4 sm:px-6"
    >
      <div className="relative overflow-hidden rounded-3xl border border-rose-500/20 bg-gradient-to-b from-slate-950 via-[#060814] to-black p-6 sm:p-12 shadow-2xl backdrop-blur-xl">
        {/* Ambient Dark Threat Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-rose-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 font-mono text-xs font-medium text-rose-300">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Interactive Mental Armor</span>
          </div>

          <h3 className="mt-4 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            The Wall of Expectations
          </h3>

          <p className="mt-3 text-sm sm:text-base text-slate-400 font-sans leading-relaxed">
            The casual inquiries tossed across dining tables, the unsparing comparisons, and the heavy phone calls home.
            In that rented room, surviving meant learning how to shatter these voices into static.
          </p>

          <p className="mt-2 font-mono text-xs text-rose-400/80">
            Hover or tap any whisper below to tune it out.
          </p>

          {/* Action Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={allSilenced ? resetAll : silenceAll}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-all ${
                allSilenced
                  ? 'border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800'
                  : 'border border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 shadow-lg shadow-rose-950/40'
              }`}
            >
              {allSilenced ? (
                <>
                  <RefreshCcw className="h-3.5 w-3.5" />
                  <span>Restore Whispers</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-3.5 w-3.5" />
                  <span>Tune Out All ({WHISPERS.length}) Whispers</span>
                </>
              )}
            </button>

            <span className="font-mono text-xs text-slate-400">
              <strong className="text-rose-300">{silencedCount}</strong> of {WHISPERS.length} silenced
            </span>
          </div>
        </div>

        {/* Whispers Grid */}
        <div className="relative z-10 mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {WHISPERS.map((item) => {
            const isSilenced = silencedIds.has(item.id);

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSilenced}
                onClick={() => toggleSilence(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSilence(item.id);
                  }
                }}
                className={`group relative overflow-hidden rounded-2xl border p-6 text-left transition-all duration-500 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-rose-400 ${
                  isSilenced
                    ? 'border-emerald-500/30 bg-emerald-950/10 shadow-inner'
                    : 'border-slate-800/80 bg-slate-900/60 hover:border-rose-500/40 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-rose-950/20'
                }`}
              >
                {/* Visual state transition overlay */}
                {isSilenced ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>[TUNED OUT FOR SANITY]</span>
                      </span>
                      <span className="text-slate-400 hover:text-slate-300">Tap to hear again</span>
                    </div>

                    <p className="font-serif italic text-sm sm:text-base text-slate-400/50 blur-[1px] line-through select-none">
                      {item.quote}
                    </p>

                    <div className="pt-2 text-xs font-mono text-slate-400 flex items-center justify-between">
                      <span>Dissolved into static</span>
                      <span className="text-emerald-400/80">Sanity Protected</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="text-rose-400/80">{item.context}</span>
                      <span className="group-hover:text-rose-300 inline-flex items-center gap-1 transition-colors">
                        <VolumeX className="h-3 w-3" />
                        <span>Click to silence</span>
                      </span>
                    </div>

                    <p className="font-serif text-base sm:text-lg font-medium text-slate-200 group-hover:text-white transition-colors leading-relaxed">
                      {item.quote}
                    </p>

                    <p className="font-mono text-xs text-slate-400 italic">
                      — {item.source}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Closing Affirmation when all are silenced */}
        {allSilenced && (
          <div className="relative z-10 mt-10 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 text-center animate-fade-in">
            <Sparkles className="h-6 w-6 text-emerald-400 mx-auto" />
            <h4 className="mt-2 font-serif text-lg font-semibold text-emerald-200">
              The noise is gone. The silence is finally yours.
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              No examination score, no delayed timeline, and no corporate vacancy can define your right to exist.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
