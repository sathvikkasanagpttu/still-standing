'use client';

import React, { useState, useEffect } from 'react';
import { CHAPTERS } from '../data/storyData';

export const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [currentChapter, setCurrentChapter] = useState<string>('Prologue');

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const currentScroll = window.scrollY;
      const scrollPercent = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setProgress(scrollPercent);

      // Detect active chapter based on scroll position
      const chapterElements = CHAPTERS.map((ch) => ({
        id: ch.id,
        title: `${ch.number}: ${ch.title}`,
        el: document.getElementById(ch.id),
      }));

      for (let i = chapterElements.length - 1; i >= 0; i--) {
        const item = chapterElements[i];
        if (item.el) {
          const rect = item.el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setCurrentChapter(item.title);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Dynamic progress fill bar */}
      <div className="h-1 w-full bg-slate-900/60 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-sky-500 via-amber-400 to-sky-400 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(56,189,248,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating mini status badge that appears once user starts scrolling past 3% */}
      <div
        className={`pointer-events-none flex items-center justify-between px-4 py-2 transition-opacity duration-300 ${
          progress > 3 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-950/80 px-3 py-1 shadow-lg backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="font-mono text-[11px] text-slate-300 truncate max-w-[200px] sm:max-w-xs">
            {currentChapter}
          </span>
        </div>
        <div className="rounded-full border border-slate-800/80 bg-slate-950/80 px-2.5 py-1 font-mono text-[11px] text-slate-400 shadow-lg backdrop-blur-md">
          {Math.round(progress)}% Read
        </div>
      </div>
    </header>
  );
};
