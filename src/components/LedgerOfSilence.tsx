'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Clock, Moon, PhoneOff, AlertCircle, RefreshCw, Terminal, CheckCircle2 } from 'lucide-react';

export const LedgerOfSilence: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [appsCount, setAppsCount] = useState(0);
  const [hoursCount, setHoursCount] = useState(0);
  const [daysCount, setDaysCount] = useState(0);

  // Void Portal State
  const [portalState, setPortalState] = useState<'idle' | 'checking' | 'void'>('idle');
  const [portalAttempts, setPortalAttempts] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Tick up counters when visible
  useEffect(() => {
    if (!isVisible) return;

    // Tick apps up to 500
    const appInterval = setInterval(() => {
      setAppsCount((prev) => {
        if (prev >= 500) {
          clearInterval(appInterval);
          return 500;
        }
        return prev + 25;
      });
    }, 40);

    // Tick hours up to 17
    const hourInterval = setInterval(() => {
      setHoursCount((prev) => {
        if (prev >= 17) {
          clearInterval(hourInterval);
          return 17;
        }
        return prev + 1;
      });
    }, 60);

    // Tick days up to 180
    const dayInterval = setInterval(() => {
      setDaysCount((prev) => {
        if (prev >= 180) {
          clearInterval(dayInterval);
          return 180;
        }
        return prev + 10;
      });
    }, 50);

    return () => {
      clearInterval(appInterval);
      clearInterval(hourInterval);
      clearInterval(dayInterval);
    };
  }, [isVisible]);

  const handleCheckStatus = () => {
    setPortalState('checking');
    setTimeout(() => {
      setPortalState('void');
      setPortalAttempts((prev) => prev + 1);
    }, 1200);
  };

  return (
    <section
      ref={containerRef}
      id="ledger-of-silence"
      aria-label="The Ledger of Silence"
      className="my-20 mx-auto max-w-4xl px-4 sm:px-6"
    >
      <div className="relative overflow-hidden rounded-3xl border border-sky-500/20 bg-gradient-to-b from-slate-900/90 via-slate-950 to-black p-6 sm:p-12 shadow-2xl backdrop-blur-xl">
        {/* Ambient Void Glow */}
        <div className="absolute top-0 right-1/4 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-rose-500/5 blur-3xl pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-cyan-300 uppercase tracking-wider">
            <Terminal className="h-3.5 w-3.5" />
            <span>The Ledger of Silence</span>
          </div>

          <h3 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-slate-100">
            The Arithmetic of Exhaustion
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
            In the quiet chasm between desperate effort and automated algorithms, hope was quantified into cold numbers.
          </p>
        </div>

        {/* 4 Animated Live Metric Cards */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Metric 1 */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 text-center backdrop-blur-md transition-all hover:border-slate-700">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10 text-sky-400">
              <Send className="h-5 w-5" />
            </div>
            <div className="mt-3 font-mono text-3xl sm:text-4xl font-black text-slate-100">
              {appsCount}+
            </div>
            <div className="mt-1 font-sans text-xs font-semibold text-slate-300">
              Resumes Dispatched
            </div>
            <div className="mt-0.5 text-[10px] text-slate-500 font-mono">
              ATS algorithmic black hole
            </div>
          </div>

          {/* Metric 2 */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 text-center backdrop-blur-md transition-all hover:border-slate-700">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
              <Clock className="h-5 w-5" />
            </div>
            <div className="mt-3 font-mono text-3xl sm:text-4xl font-black text-slate-100">
              {hoursCount}h
            </div>
            <div className="mt-1 font-sans text-xs font-semibold text-slate-300">
              Daily Screen Glare
            </div>
            <div className="mt-0.5 text-[10px] text-slate-500 font-mono">
              Throbbing migraine pressure
            </div>
          </div>

          {/* Metric 3 */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 text-center backdrop-blur-md transition-all hover:border-slate-700">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400">
              <Moon className="h-5 w-5" />
            </div>
            <div className="mt-3 font-mono text-3xl sm:text-4xl font-black text-slate-100">
              {daysCount}+
            </div>
            <div className="mt-1 font-sans text-xs font-semibold text-slate-300">
              Days of Insomnia
            </div>
            <div className="mt-0.5 text-[10px] text-slate-500 font-mono">
              Racing heart in rented room
            </div>
          </div>

          {/* Metric 4 */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 text-center backdrop-blur-md transition-all hover:border-slate-700">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <PhoneOff className="h-5 w-5" />
            </div>
            <div className="mt-3 font-mono text-3xl sm:text-4xl font-black text-slate-100">
              0
            </div>
            <div className="mt-1 font-sans text-xs font-semibold text-slate-300">
              Calls Returned
            </div>
            <div className="mt-0.5 text-[10px] text-emerald-400/80 font-mono">
              Yet still refusing to vanish
            </div>
          </div>
        </div>

        {/* The "Void" Portal Mockup */}
        <div className="mt-12 rounded-2xl border border-slate-800 bg-[#090d18] p-5 sm:p-7 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-mono text-xs font-semibold text-slate-200">
                  Global Talent Portal • Ref: HYD-2024-8891
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Candidate: Anonymous Graduate • Role: Associate Data Analyst
              </p>
            </div>

            <div className="font-mono text-[11px] text-slate-500">
              Status: <span className="text-amber-400">Under Review (Day 184)</span>
            </div>
          </div>

          <div className="my-6 min-h-[110px] flex flex-col items-center justify-center text-center p-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/60">
            {portalState === 'idle' && (
              <div className="space-y-1">
                <p className="font-sans text-xs text-slate-400">
                  Application submitted to automated parsing engine.
                </p>
                <p className="text-[11px] font-mono text-slate-500">
                  Click below to request candidate status update.
                </p>
              </div>
            )}

            {portalState === 'checking' && (
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="h-5 w-5 animate-spin text-cyan-400" />
                <p className="font-mono text-xs text-cyan-300">
                  Querying automated applicant tracking pipeline...
                </p>
              </div>
            )}

            {portalState === 'void' && (
              <div className="space-y-2 animate-fade-in">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 px-3 py-1 font-mono text-xs text-rose-400">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>No updates available. 0 human replies.</span>
                </div>
                <p className="font-serif italic text-xs text-slate-400 max-w-md">
                  &ldquo;Over five hundred times, hope was submitted into an online form, and over five hundred times, it dissolved into nothingness.&rdquo;
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-[11px] font-mono text-slate-500">
              Attempts: {portalAttempts} inquiry sent
            </span>

            <button
              onClick={handleCheckStatus}
              disabled={portalState === 'checking'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-5 py-2.5 font-sans text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${portalState === 'checking' ? 'animate-spin' : ''}`} />
              <span>{portalState === 'void' ? 'Check Status Again' : 'Check Status'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
