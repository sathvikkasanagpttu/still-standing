'use client';

import React from 'react';
import { PenTool, ShieldCheck } from 'lucide-react';
import { STORY_METADATA } from '../data/storyData';

interface AuthorsNoteProps {
  fontStyle: 'serif' | 'sans' | 'mono';
  fontSize: 'normal' | 'large' | 'xlarge';
}

export const AuthorsNote: React.FC<AuthorsNoteProps> = ({ fontStyle, fontSize }) => {
  const getFontFamilyClass = () => {
    switch (fontStyle) {
      case 'serif':
        return 'font-serif';
      case 'mono':
        return 'font-mono text-[0.95em]';
      case 'sans':
      default:
        return 'font-sans';
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg leading-relaxed';
      case 'xlarge':
        return 'text-xl leading-loose';
      case 'normal':
      default:
        return 'text-base leading-relaxed';
    }
  };

  return (
    <section id="authors-note" className="mx-auto my-16 max-w-3xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-b from-slate-900/60 to-slate-950/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2 mb-4">
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2">
            <PenTool className="h-4 w-4 text-amber-400" />
          </div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-300">
            Author’s Note
          </span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">
          Before You Enter
        </h3>

        <div className={`mt-6 space-y-4 ${getFontFamilyClass()} ${getFontSizeClass()} text-slate-300`}>
          <p>
            This is not a manual on how to conquer an industry overnight, nor is it a polished collection of corporate success formulas. It is an account of what happens in the silent, suffocating chasm between desperate effort and an answer that never comes. It is about the dreams that were taken away before they could breathe, the hundreds of applications that disappear into automated algorithms, the humiliating phone calls home to ask for basic rent, the physical toll of insomnia, the relentless headaches, and the bewildering ache of watching friends leave you behind in the dust.
          </p>
          <p className="border-t border-slate-800/80 pt-4 text-slate-400">
            To preserve privacy and protect personal boundaries, names, identifying features, and specific locations have been altered. But the wounds, the tears shed onto keyboard keys in the middle of the night, and the stubborn refusal to stop breathing are entirely real.
          </p>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs font-mono text-slate-500">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Real testimony • Altered names for privacy</span>
        </div>
      </div>
    </section>
  );
};
