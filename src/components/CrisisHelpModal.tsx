'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Phone, X, Shield, Check, Copy } from 'lucide-react';
import { CRISIS_HELPLINES } from '../data/storyData';

export const CrisisHelpModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleCopy = (num: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(num)
        .then(() => {
          setCopiedNumber(num);
          setTimeout(() => setCopiedNumber(null), 2500);
        })
        .catch(() => {});
    }
  };

  return (
    <>
      {/* Discreet Persistent Floating Pill / Bar */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 rounded-full border border-rose-500/30 bg-slate-950/90 px-3.5 py-2 text-xs shadow-xl backdrop-blur-md transition-all duration-300 hover:border-rose-400/60 hover:bg-slate-900/90 hover:shadow-rose-950/20 focus:outline-none focus:ring-2 focus:ring-rose-400"
          title="Struggling with job pressure or isolation? Free 24/7 helplines"
          aria-label="Open 24/7 mental health and emotional support resources"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
          </span>
          <Heart className="h-3.5 w-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
          <span className="font-sans text-[11px] font-medium text-slate-300 group-hover:text-rose-200">
            Need Support? <span className="hidden sm:inline text-slate-500">• 24/7 Free Helplines</span>
          </span>
        </button>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="crisis-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-start justify-between pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-2.5">
                  <Shield className="h-5 w-5 text-rose-400" />
                </div>
                <div>
                  <h3 id="crisis-dialog-title" className="font-serif text-lg font-semibold text-slate-100">
                    You Are Not Alone
                  </h3>
                  <p className="text-xs text-slate-400">
                    Free, confidential, 24/7 emotional & crisis support
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors focus:outline-none"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Empathetic message */}
            <div className="relative z-10 my-4 rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4 text-xs leading-relaxed text-slate-300">
              <p className="font-serif italic text-slate-300">
                “If you are reading this while staring at a silent inbox, fighting headaches, or carrying the crushing weight of family expectations: Your current unemployment is not your moral worth. Please reach out to someone who will listen without judgment.”
              </p>
            </div>

            {/* Helplines List */}
            <div className="relative z-10 space-y-3">
              {CRISIS_HELPLINES.map((line) => (
                <div
                  key={line.name}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 transition-all hover:border-slate-700"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-sm font-semibold text-slate-200">
                          {line.name}
                        </span>
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400 border border-emerald-500/20">
                          {line.available}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">
                        {line.description}
                      </p>
                      <div className="mt-2 font-mono text-sm font-bold text-sky-400">
                        {line.number}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleCopy(line.tel)}
                        className="rounded-xl border border-slate-800 bg-slate-800/60 p-2 text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-colors"
                        title="Copy phone number"
                        aria-label={`Copy phone number for ${line.name}`}
                      >
                        {copiedNumber === line.tel ? (
                          <Check className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                      <a
                        href={`tel:${line.tel}`}
                        aria-label={`Call ${line.name}`}
                        className="flex items-center gap-1.5 rounded-xl bg-sky-500/20 border border-sky-500/30 px-3 py-2 text-xs font-semibold text-sky-300 hover:bg-sky-500/30 transition-all"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="relative z-10 mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>All helplines are non-judgmental & confidential.</span>
              <button
                onClick={() => setIsOpen(false)}
                className="font-medium text-slate-400 hover:text-slate-200 underline underline-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
