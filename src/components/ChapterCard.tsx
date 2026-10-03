'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Clock, Quote, Share2, Check, Bookmark, Sparkles } from 'lucide-react';
import { StoryChapter } from '../types/story';

interface ChapterCardProps {
  chapter: StoryChapter;
  fontStyle: 'serif' | 'sans' | 'mono';
  fontSize: 'normal' | 'large' | 'xlarge';
  focusMode: boolean;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  fontStyle,
  fontSize,
  focusMode,
}) => {
  const [copiedQuote, setCopiedQuote] = useState(false);

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
        return 'text-lg sm:text-xl leading-relaxed sm:leading-loose';
      case 'xlarge':
        return 'text-xl sm:text-2xl leading-loose';
      case 'normal':
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  const copyPullQuote = () => {
    if (chapter.pullQuote) {
      navigator.clipboard.writeText(`"${chapter.pullQuote}" — STILL STANDING`);
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 2000);
    }
  };

  return (
    <article
      id={chapter.id}
      className={`relative mx-auto my-16 sm:my-24 max-w-3xl px-4 sm:px-6 transition-all duration-300 ${
        focusMode ? 'opacity-95' : 'opacity-100'
      }`}
    >
      {/* Chapter Card Container */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/70 p-6 sm:p-12 shadow-2xl backdrop-blur-xl">
        {/* Subtle decorative chapter glow */}
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />

        {/* Chapter Header */}
        <header className="mb-8 border-b border-slate-800/80 pb-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-sky-500/10 border border-sky-500/20 px-3 py-1 font-mono text-xs font-semibold text-sky-400 uppercase tracking-wider">
                {chapter.number}
              </span>
              <span className="font-mono text-xs text-slate-500">•</span>
              <span className="inline-flex items-center gap-1 font-mono text-xs text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                {chapter.readTime}
              </span>
            </div>

            {chapter.pullQuote && (
              <button
                onClick={copyPullQuote}
                className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-[11px] font-mono text-slate-400 hover:text-sky-300 hover:border-slate-700 transition-colors"
                title="Copy pull quote"
              >
                {copiedQuote ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3 w-3" />
                    <span className="hidden sm:inline">Share Quote</span>
                  </>
                )}
              </button>
            )}
          </div>

          <h2 className="mt-4 font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-100">
            {chapter.title}
          </h2>

          <p className="mt-2 font-sans text-sm sm:text-base font-light text-slate-400">
            {chapter.subtitle}
          </p>
        </header>

        {/* Cinematic Illustration Slot (if available) */}
        {chapter.image && (
          <div className="my-8 overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 shadow-xl group">
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={chapter.image.src}
                alt={chapter.image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-w-768px) 100vw, 768px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            </div>
            {chapter.image.caption && (
              <div className="p-3 text-center font-sans text-xs italic text-slate-400 border-t border-slate-800/60 bg-slate-950/80">
                {chapter.image.caption}
              </div>
            )}
          </div>
        )}

        {/* Featured Pull Quote Block */}
        {chapter.pullQuote && (
          <blockquote className="my-8 rounded-2xl border-l-4 border-amber-400/80 bg-amber-500/5 p-5 sm:p-6 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <Quote className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
              <p className="font-serif italic text-base sm:text-lg text-amber-200/90 leading-relaxed">
                {chapter.pullQuote}
              </p>
            </div>
          </blockquote>
        )}

        {/* Chapter Story Paragraphs */}
        <div className={`space-y-6 ${getFontFamilyClass()} ${getFontSizeClass()} text-slate-300 font-normal`}>
          {chapter.paragraphs.map((p, idx) => {
            // First paragraph styling with drop cap
            const isFirst = idx === 0;
            return (
              <p
                key={idx}
                className={`transition-colors duration-200 ${
                  isFirst
                    ? 'first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-sky-400 first-letter:mr-2 first-letter:float-left first-letter:leading-none'
                    : ''
                }`}
              >
                {p}
              </p>
            );
          })}
        </div>

        {/* Chapter End Flourish */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-slate-800" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
          <span className="h-px w-10 bg-slate-800" />
        </div>
      </div>
    </article>
  );
};
