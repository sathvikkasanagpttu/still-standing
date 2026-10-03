'use client';

import React, { useState } from 'react';
import { Send, Clock, Moon, PhoneOff, ChevronRight, Sparkles } from 'lucide-react';

interface StatItem {
  id: string;
  number: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  detail: string;
  themeColor: 'sky' | 'amber' | 'rose' | 'emerald';
  targetChapterId: string;
}

export const StatHighlights: React.FC = () => {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const stats: StatItem[] = [
    {
      id: 'applications',
      number: '500+',
      label: 'Applications Submitted',
      sublabel: 'Vanished into ATS algorithms',
      icon: <Send className="h-5 w-5 text-sky-400" />,
      detail:
        'Over five hundred times, a fragment of hope was submitted into an online form, and over five hundred times, it dissolved into automated silence without a single human response.',
      themeColor: 'sky',
      targetChapterId: 'part-4',
    },
    {
      id: 'screen_time',
      number: '17h',
      label: 'Daily Screen Time',
      sublabel: 'Motionless before the glass',
      icon: <Clock className="h-5 w-5 text-amber-400" />,
      detail:
        'Seventeen hours every single day: refreshing inboxes, debugging code, studying frameworks, and spiraling through overanalyzed interviews until the temples throbbed with blinding migraines.',
      themeColor: 'amber',
      targetChapterId: 'part-7',
    },
    {
      id: 'insomnia',
      number: '6 Mos',
      label: 'Chronic Insomnia',
      sublabel: 'Racing heart & weeping in the dark',
      icon: <Moon className="h-5 w-5 text-rose-400" />,
      detail:
        'Six continuous months where sleep turned into an ordeal. By 2 or 3 in the morning, silent tears pressed into a thin pillow so nobody beyond the wall would ever know how broken he felt.',
      themeColor: 'rose',
      targetChapterId: 'part-4',
    },
    {
      id: 'calls',
      number: '0 Calls',
      label: 'Still Enduring',
      sublabel: 'The laptop never stayed closed',
      icon: <PhoneOff className="h-5 w-5 text-emerald-400" />,
      detail:
        'Zero calls received, yet the terminal stayed open. He wiped his tears, took a breath, and faced the code once more. Refusing to disappear.',
      themeColor: 'emerald',
      targetChapterId: 'part-9',
    },
  ];

  const scrollToChapter = (chapterId: string) => {
    const el = document.getElementById(chapterId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="my-16 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>The Ledger of Survival</span>
            </div>
            <h3 className="mt-1 font-serif text-xl sm:text-2xl text-slate-100 font-medium">
              Numbers that words can barely contain
            </h3>
          </div>
          <p className="hidden sm:block text-xs text-slate-500 font-mono">
            Click cards to explore context
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const isExpanded = selectedStat === stat.id;
            return (
              <div
                key={stat.id}
                onClick={() => setSelectedStat(isExpanded ? null : stat.id)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-5 backdrop-blur-xl transition-all duration-300 ${
                  isExpanded
                    ? 'border-sky-500/50 shadow-lg shadow-sky-500/10 -translate-y-1'
                    : 'border-slate-800/80 hover:border-slate-700 hover:-translate-y-0.5'
                }`}
              >
                {/* Glow accent */}
                <div
                  className={`absolute -top-12 -right-12 h-24 w-24 rounded-full blur-2xl transition-opacity duration-300 ${
                    stat.themeColor === 'sky'
                      ? 'bg-sky-500/20 group-hover:bg-sky-500/30'
                      : stat.themeColor === 'amber'
                      ? 'bg-amber-500/20 group-hover:bg-amber-500/30'
                      : stat.themeColor === 'rose'
                      ? 'bg-rose-500/20 group-hover:bg-rose-500/30'
                      : 'bg-emerald-500/20 group-hover:bg-emerald-500/30'
                  }`}
                />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-2.5">
                        {stat.icon}
                      </div>
                      <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                        {isExpanded ? 'Active' : 'Tap for note'}
                      </span>
                    </div>

                    <div className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
                      {stat.number}
                    </div>
                    <div className="mt-1 font-sans text-sm font-semibold text-slate-200">
                      {stat.label}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {stat.sublabel}
                    </div>
                  </div>

                  {/* Expanded Detail */}
                  <div
                    className={`mt-4 pt-3 border-t border-slate-800/80 text-xs leading-relaxed text-slate-300 transition-all duration-300 ${
                      isExpanded ? 'block opacity-100' : 'hidden opacity-0'
                    }`}
                  >
                    <p className="italic text-slate-300 font-serif">
                      "{stat.detail}"
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToChapter(stat.targetChapterId);
                      }}
                      className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] text-sky-400 hover:text-sky-300 font-medium"
                    >
                      Read in chapter <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
