'use client';

import React, { useState } from 'react';
import { Type, Sliders, Eye, EyeOff } from 'lucide-react';

interface ReaderControlsProps {
  fontStyle: 'serif' | 'sans' | 'mono';
  setFontStyle: (font: 'serif' | 'sans' | 'mono') => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  focusMode: boolean;
  setFocusMode: (mode: boolean) => void;
}

export const ReaderControls: React.FC<ReaderControlsProps> = ({
  fontStyle,
  setFontStyle,
  fontSize,
  setFontSize,
  focusMode,
  setFocusMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-5 right-5 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs font-medium text-slate-300 shadow-xl backdrop-blur-md transition-all hover:border-slate-700 hover:text-white"
        aria-label="Typography and display settings"
      >
        <Sliders className="h-4 w-4 text-sky-400" />
        <span className="hidden sm:inline font-sans">Reading Settings</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-800 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between border-b border-slate-800/80 pb-2">
            <span className="font-mono text-xs text-slate-300 font-semibold uppercase tracking-wider">
              Reading Controls
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-slate-500 hover:text-slate-300"
            >
              ✕
            </button>
          </div>

          {/* Font Family */}
          <div className="mb-4">
            <label className="mb-1.5 block text-[11px] font-medium text-slate-400">
              Typography Style
            </label>
            <div className="grid grid-cols-3 gap-1 rounded-lg bg-slate-900/80 p-1">
              <button
                onClick={() => setFontStyle('serif')}
                className={`rounded py-1 font-serif text-xs transition-all ${
                  fontStyle === 'serif'
                    ? 'bg-sky-500/20 text-sky-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Serif
              </button>
              <button
                onClick={() => setFontStyle('sans')}
                className={`rounded py-1 font-sans text-xs transition-all ${
                  fontStyle === 'sans'
                    ? 'bg-sky-500/20 text-sky-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sans
              </button>
              <button
                onClick={() => setFontStyle('mono')}
                className={`rounded py-1 font-mono text-xs transition-all ${
                  fontStyle === 'mono'
                    ? 'bg-sky-500/20 text-sky-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Terminal
              </button>
            </div>
          </div>

          {/* Text Size */}
          <div className="mb-4">
            <label className="mb-1.5 block text-[11px] font-medium text-slate-400">
              Font Scale
            </label>
            <div className="grid grid-cols-3 gap-1 rounded-lg bg-slate-900/80 p-1">
              <button
                onClick={() => setFontSize('normal')}
                className={`rounded py-1 text-xs transition-all ${
                  fontSize === 'normal'
                    ? 'bg-sky-500/20 text-sky-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Regular
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`rounded py-1 text-xs transition-all ${
                  fontSize === 'large'
                    ? 'bg-sky-500/20 text-sky-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Large
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`rounded py-1 text-xs transition-all ${
                  fontSize === 'xlarge'
                    ? 'bg-sky-500/20 text-sky-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Comfort
              </button>
            </div>
          </div>

          {/* Focus Mode */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              {focusMode ? <EyeOff className="h-3.5 w-3.5 text-amber-400" /> : <Eye className="h-3.5 w-3.5 text-slate-400" />}
              <span>Distraction-Free Mode</span>
            </div>
            <button
              onClick={() => setFocusMode(!focusMode)}
              className={`h-5 w-9 rounded-full p-0.5 transition-colors ${
                focusMode ? 'bg-amber-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`h-4 w-4 rounded-full bg-white transition-transform ${
                  focusMode ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
