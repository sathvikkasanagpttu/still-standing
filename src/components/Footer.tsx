'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative mt-24 border-t border-slate-900 bg-slate-950 px-6 py-16 text-slate-400">
      <div className="mx-auto max-w-4xl flex flex-col items-center text-center">
        {/* Title reflection */}
        <div className="flex items-center gap-2 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          <span className="font-serif text-lg font-bold tracking-tight text-slate-100">
            STILL STANDING
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        </div>

        <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-md">
          A Story of Rejection, Loneliness, and Refusing to Disappear.
        </p>

        {/* Closing Epitaph */}
        <div className="my-8 max-w-xl rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md">
          <p className="font-serif italic text-sm text-slate-300">
            “The world may choose to judge him by a missing corporate badge, but the world does not see the war he fought simply to survive the night.”
          </p>
          <span className="mt-3 block font-mono text-[11px] text-sky-400 font-semibold uppercase tracking-wider">
            Still Breathing • Still Standing
          </span>
        </div>

        {/* Mental Health Helpline Quick Links */}
        <div className="mb-8 flex flex-wrap justify-center gap-4 text-xs font-mono">
          <a
            href="tel:14416"
            className="rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-slate-300 hover:border-slate-700 hover:text-sky-300 transition-colors"
          >
            Tele-MANAS: 14416
          </a>
          <a
            href="tel:+919999666555"
            className="rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-slate-300 hover:border-slate-700 hover:text-sky-300 transition-colors"
          >
            Vandrevala: +91 9999 666 555
          </a>
          <a
            href="tel:18005990019"
            className="rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-slate-300 hover:border-slate-700 hover:text-sky-300 transition-colors"
          >
            KIRAN: 1800-599-0019
          </a>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 font-mono text-xs text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          <ArrowUp className="h-3.5 w-3.5" />
          <span>Back to Top</span>
        </button>

        {/* Privacy Note */}
        <div className="mt-8 text-[11px] text-slate-400 font-mono">
          Names and specific locations altered for privacy. Real experience • Written with resilience.
        </div>
      </div>
    </footer>
  );
};
