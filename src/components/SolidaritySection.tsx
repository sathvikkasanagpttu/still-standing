'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Copy, Check } from 'lucide-react';

export const SolidaritySection: React.FC = () => {
  const [standCount, setStandCount] = useState<number>(1428);
  const [hasStood, setHasStood] = useState<boolean>(false);
  const [copiedQuote, setCopiedQuote] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('still_standing_solidarity_count');
        const voted = localStorage.getItem('still_standing_has_voted');
        if (saved) {
          const parsed = parseInt(saved, 10);
          if (!isNaN(parsed)) setStandCount(parsed);
        }
        if (voted === 'true') {
          setHasStood(true);
        }
      }
    } catch {
      // In private browsing or storage disabled modes, continue gracefully
    }
  }, []);

  const handleStandWith = () => {
    if (!hasStood) {
      const newCount = standCount + 1;
      setStandCount(newCount);
      setHasStood(true);
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('still_standing_solidarity_count', newCount.toString());
          localStorage.setItem('still_standing_has_voted', 'true');
        }
      } catch {
        // Storage disabled fallback
      }
    }
  };

  const copyCoreMessage = () => {
    const text = `“The world may choose to judge you by a missing corporate badge, but the world does not see the war you fought simply to survive the night. You are still breathing. You are still standing.” — STILL STANDING`;
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopiedQuote(true);
          setTimeout(() => setCopiedQuote(false), 2000);
        })
        .catch(() => {});
    }
  };

  return (
    <section className="mx-auto my-20 max-w-3xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-sky-500/20 bg-gradient-to-b from-slate-900/90 to-slate-950 p-8 sm:p-12 text-center shadow-2xl backdrop-blur-xl">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 font-mono text-xs font-medium text-sky-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Circle of Solidarity</span>
          </div>

          <h3 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-slate-100">
            For Those Fighting in the Dark
          </h3>

          <p className="mt-3 text-sm sm:text-base text-slate-400 font-sans max-w-lg mx-auto leading-relaxed">
            If you are going through this right now—the silent inboxes, the shame of asking for rent, the headaches, the unreciprocated effort—you do not have to disappear.
          </p>

          {/* Interactive Solidarity Button */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              onClick={handleStandWith}
              disabled={hasStood}
              aria-label={hasStood ? 'You are standing in solidarity' : 'Stand in solidarity'}
              className={`group inline-flex items-center gap-3 rounded-full px-8 py-4 font-sans text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                hasStood
                  ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 cursor-default'
                  : 'bg-gradient-to-r from-sky-500 to-amber-500 text-slate-950 hover:scale-105 shadow-xl shadow-sky-500/20'
              }`}
            >
              <Heart
                className={`h-4 w-4 ${
                  hasStood ? 'fill-rose-400 text-rose-400' : 'group-hover:scale-125 transition-transform'
                }`}
              />
              <span>
                {hasStood ? 'You are standing with us' : 'I am still standing too'}
              </span>
            </button>

            <span className="font-mono text-xs text-slate-400">
              <strong className="text-sky-300">{standCount.toLocaleString()}</strong> people have stood in solidarity
            </span>
          </div>

          {/* Shareable quote snippet */}
          <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-serif italic text-xs sm:text-sm text-slate-400 text-left">
              “Despite everything that tried to break him, he is still breathing. He is still standing.”
            </p>

            <button
              onClick={copyCoreMessage}
              aria-label="Copy quote to clipboard"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs font-mono text-slate-300 hover:border-slate-700 hover:text-white transition-colors shrink-0"
            >
              {copiedQuote ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Message</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
