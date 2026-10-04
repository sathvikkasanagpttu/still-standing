'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, X, Copy, Check } from 'lucide-react';
import { CHAPTERS, STORY_METADATA } from '../data/storyData';

export const TerminalReaderModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const handleCopyLogs = () => {
    const text = CHAPTERS.map(
      (c) => `[${c.number}] ${c.title.toUpperCase()}\n${c.paragraphs.join('\n\n')}`
    ).join('\n\n--- // ---\n\n');

    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {});
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <div className="fixed bottom-20 right-6 z-40 hidden sm:block">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs font-mono text-slate-400 shadow-xl backdrop-blur-md hover:border-sky-500/40 hover:text-sky-300 transition-all focus:outline-none focus:ring-2 focus:ring-sky-400"
          title="Open in Terminal / IDE Log view"
          aria-label="Open Terminal View"
        >
          <Terminal className="h-3.5 w-3.5 text-sky-400" />
          <span>Terminal View</span>
        </button>
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="terminal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative flex flex-col h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-800 bg-[#080d1a] shadow-2xl font-mono text-xs text-slate-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Window title bar */}
            <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/90 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                <span id="terminal-title" className="ml-2 text-slate-400 text-[11px]">
                  hyderabad_3am_session.sh — bash 80x24
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLogs}
                  aria-label="Copy terminal text"
                  className="rounded px-2 py-1 text-[11px] text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors flex items-center gap-1 focus:outline-none"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close terminal view"
                  className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors focus:outline-none"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 leading-relaxed selection:bg-sky-500 selection:text-slate-950">
              <div className="text-emerald-400">
                $ cat /dev/heart/still_standing.log
              </div>

              <div className="text-slate-500">
                {`// TITLE: STILL STANDING`}
                <br />
                {`// LOCATION: Hyderabad, Telangana, India`}
                <br />
                {`// SYSTEM CLOCK: 03:00:00 IST`}
                <br />
                {`// STATUS: STILL_BREATHING | STILL_STANDING`}
              </div>

              <div className="text-amber-300/90 italic">
                &ldquo;{STORY_METADATA.dedication.join(' ')}&rdquo;
              </div>

              <div className="h-px bg-slate-800/80 my-4" />

              {CHAPTERS.map((ch) => (
                <div key={ch.id} className="space-y-3">
                  <div className="flex items-center gap-2 text-sky-400 font-bold">
                    <span>&gt;&gt; [{ch.number}]</span>
                    <span>{ch.title.toUpperCase()}</span>
                  </div>
                  <div className="text-slate-400 italic">
                    {`// ${ch.subtitle}`}
                  </div>
                  {ch.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-slate-300 leading-normal pl-4 border-l border-slate-800">
                      {p}
                    </p>
                  ))}
                  <div className="text-slate-600 text-[10px] pl-4">
                    [EOF: {ch.id}]
                  </div>
                </div>
              ))}

              <div className="text-emerald-400 pt-4">
                {'$ echo "STILL STANDING"'}
                <br />
                <span className="text-slate-100 font-bold">&gt;&gt; STILL STANDING</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
