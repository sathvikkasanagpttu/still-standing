'use client';

import React, { useState, useEffect } from 'react';
import { X, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { CHAPTERS } from '../data/storyData';

export const ChapterNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('prologue');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const chapterElements = CHAPTERS.map((ch) => ({
        id: ch.id,
        el: document.getElementById(ch.id),
      }));

      for (let i = chapterElements.length - 1; i >= 0; i--) {
        const item = chapterElements[i];
        if (item.el) {
          const rect = item.el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const scrollTo = (id: string) => {
    setIsOpen(false);
    if (typeof document !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Floating TOC Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-5 left-5 z-40 flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/80 px-3.5 py-2 text-xs font-medium text-slate-300 shadow-xl backdrop-blur-md transition-all hover:border-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        aria-label="Table of Contents"
      >
        <BookOpen className="h-4 w-4 text-sky-400" />
        <span className="hidden sm:inline font-sans">Chapters</span>
      </button>

      {/* Slide-over Drawer Backdrop */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Table of Contents"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        >
          {/* Drawer Content */}
          <div
            className="absolute left-0 top-0 bottom-0 w-full max-w-md border-r border-slate-800 bg-slate-950/98 p-6 shadow-2xl overflow-y-auto flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-sky-400" />
                  <h3 className="font-serif text-lg font-semibold text-slate-100">
                    Chapters & Chronology
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-900 hover:text-slate-100 transition-colors focus:outline-none"
                  aria-label="Close chapter menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Dedication Mini Quote */}
              <div className="my-4 rounded-xl border border-slate-800/60 bg-slate-900/40 p-3 text-xs text-slate-400 font-serif italic">
                “For everyone who kept applying after the world stopped replying.”
              </div>

              {/* Chapter Links */}
              <div className="space-y-1.5 mt-2">
                {/* Author's Note Link */}
                <button
                  onClick={() => scrollTo('authors-note')}
                  className="w-full text-left rounded-xl px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors flex items-center justify-between"
                >
                  <span className="font-mono text-amber-400/90">Author’s Note</span>
                  <span className="text-[11px] text-slate-500">1 min</span>
                </button>

                {CHAPTERS.map((ch) => {
                  const isActive = activeId === ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => scrollTo(ch.id)}
                      className={`group w-full text-left rounded-xl p-3 transition-all flex items-start justify-between gap-3 ${
                        isActive
                          ? 'border border-sky-500/40 bg-sky-500/10 text-white'
                          : 'border border-transparent hover:border-slate-800/80 hover:bg-slate-900/60 text-slate-300'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-[11px] font-semibold tracking-wider uppercase ${
                              isActive ? 'text-sky-300' : 'text-slate-500 group-hover:text-slate-400'
                            }`}
                          >
                            {ch.number}
                          </span>
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                          )}
                        </div>
                        <div
                          className={`font-serif text-sm font-medium mt-0.5 truncate ${
                            isActive ? 'text-sky-100' : 'text-slate-200 group-hover:text-white'
                          }`}
                        >
                          {ch.title}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">
                          {ch.subtitle}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 font-mono text-[10px] text-slate-500 mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{ch.readTime.split(' ')[0]}m</span>
                        <ChevronRight className="h-3 w-3 text-slate-600 group-hover:text-slate-400 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80 mt-6 text-center">
              <span className="font-mono text-[11px] text-slate-500">
                STILL STANDING • 9 Chapters • Hyderabad
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
