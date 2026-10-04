'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Send, Sparkles, MessageSquareQuote, ShieldCheck, User } from 'lucide-react';

interface Note {
  id: string;
  author: string;
  message: string;
  timestamp: string;
  likes: number;
}

const DEFAULT_NOTES: Note[] = [
  {
    id: 'note-1',
    author: 'Anonymous • B.Tech 2023',
    message: 'I spent 9 months in a tiny flat in Bangalore crying over automated rejections. I made it out, and you will too.',
    timestamp: 'Yesterday',
    likes: 42,
  },
  {
    id: 'note-2',
    author: 'S. • Data Analyst, Hyderabad',
    message: 'To the boy in that rented room: your worth was never in an offer letter. Keep breathing.',
    timestamp: '2 days ago',
    likes: 78,
  },
  {
    id: 'note-3',
    author: 'Final Year Student • Warangal',
    message: 'Reading this at 3:30 AM while waiting for test suites to run. Thank you for making me feel less alone.',
    timestamp: '3 days ago',
    likes: 56,
  },
  {
    id: 'note-4',
    author: 'Ankit • Pune',
    message: 'The silence of the rented room is the loudest sound in the world. I am standing with you tonight.',
    timestamp: '4 days ago',
    likes: 64,
  },
  {
    id: 'note-5',
    author: 'Priya • Hyderabad',
    message: 'My parents never understood why I couldn’t just ‘get placed’. This story gave words to 3 years of hidden grief.',
    timestamp: '5 days ago',
    likes: 91,
  },
  {
    id: 'note-6',
    author: 'A Fellow Survivor • Delhi',
    message: 'You are not behind. You are just fighting on an unpaved road. Refuse to disappear.',
    timestamp: 'Just now',
    likes: 110,
  },
];

export const EncouragementWall: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(DEFAULT_NOTES);
  const [standCount, setStandCount] = useState<number>(1842);
  const [hasStood, setHasStood] = useState<boolean>(false);
  const [messageInput, setMessageInput] = useState<string>('');
  const [authorInput, setAuthorInput] = useState<string>('');
  const [likedNoteIds, setLikedNoteIds] = useState<Set<string>>(new Set());
  const [submittedFeedback, setSubmittedFeedback] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedCount = localStorage.getItem('still_standing_solidarity_count');
        const savedStood = localStorage.getItem('still_standing_has_voted');
        const savedCustomNotes = localStorage.getItem('still_standing_user_notes');

        if (savedCount) {
          const parsed = parseInt(savedCount, 10);
          if (!isNaN(parsed)) setStandCount(parsed);
        }
        if (savedStood === 'true') {
          setHasStood(true);
        }
        if (savedCustomNotes) {
          try {
            const parsedNotes: Note[] = JSON.parse(savedCustomNotes);
            if (Array.isArray(parsedNotes) && parsedNotes.length > 0) {
              setNotes([...parsedNotes, ...DEFAULT_NOTES]);
            }
          } catch {}
        }
      }
    } catch {}
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
      } catch {}
    }
  };

  const handleToggleLike = (id: string) => {
    setLikedNoteIds((prev) => {
      const next = new Set(prev);
      const isLiked = next.has(id);
      if (isLiked) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

    setNotes((prevNotes) =>
      prevNotes.map((n) => {
        if (n.id === id) {
          const isLiked = likedNoteIds.has(id);
          return {
            ...n,
            likes: isLiked ? Math.max(0, n.likes - 1) : n.likes + 1,
          };
        }
        return n;
      })
    );
  };

  const handleSubmitNote = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = messageInput.trim();
    if (!trimmedMessage) return;

    const newNote: Note = {
      id: `custom-${Date.now()}`,
      author: authorInput.trim() || 'Anonymous Reader',
      message: trimmedMessage,
      timestamp: 'Just now',
      likes: 1,
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    setMessageInput('');
    setAuthorInput('');
    setSubmittedFeedback(true);
    setTimeout(() => setSubmittedFeedback(false), 3000);

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const customOnly = updatedNotes.filter((n) => n.id.startsWith('custom-'));
        localStorage.setItem('still_standing_user_notes', JSON.stringify(customOnly));
      }
    } catch {}
  };

  return (
    <section
      id="encouragement-wall"
      aria-label="Reader’s Encouragement Wall"
      className="my-24 mx-auto max-w-5xl px-4 sm:px-6"
    >
      <div className="relative overflow-hidden rounded-3xl border border-sky-500/20 bg-gradient-to-b from-slate-900/90 via-slate-950 to-black p-6 sm:p-12 shadow-2xl backdrop-blur-xl">
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 font-mono text-xs font-medium text-sky-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>The Light Board</span>
          </div>

          <h3 className="mt-4 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            Leave a Silent Note of Encouragement
          </h3>

          <p className="mt-3 text-sm sm:text-base text-slate-400 font-sans leading-relaxed">
            Thousands of young graduates, students, and engineers are fighting through the exact same cold silence.
            Let them know that somebody out here sees their struggle.
          </p>

          {/* Stand in Solidarity Counter */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              onClick={handleStandWith}
              disabled={hasStood}
              aria-label={hasStood ? 'You are standing with us' : 'I am also standing'}
              className={`group inline-flex items-center gap-3 rounded-full px-8 py-4 font-sans text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                hasStood
                  ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 cursor-default'
                  : 'bg-gradient-to-r from-sky-500 via-amber-400 to-amber-500 text-slate-950 hover:scale-105 shadow-xl shadow-sky-500/20'
              }`}
            >
              <Heart
                className={`h-4 w-4 ${
                  hasStood ? 'fill-rose-400 text-rose-400' : 'group-hover:scale-125 transition-transform'
                }`}
              />
              <span>
                {hasStood ? 'You are standing with us' : 'I am also standing'}
              </span>
            </button>

            <span className="font-mono text-xs text-slate-400">
              <strong className="text-sky-300 font-bold">{standCount.toLocaleString()}</strong> people have stood in solidarity
            </span>
          </div>
        </div>

        {/* Note Submission Form */}
        <div className="relative z-10 mt-12 max-w-xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mb-3">
            <MessageSquareQuote className="h-4 w-4 text-amber-400" />
            <span>Send your anonymous words of strength</span>
          </div>

          <form onSubmit={handleSubmitNote} className="space-y-3">
            <div>
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                maxLength={240}
                required
                rows={3}
                placeholder="Leave one line of support: &quot;You are not alone,&quot; or &quot;Keep holding on...&quot;"
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 p-3 text-sm text-slate-200 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-1/2">
                <input
                  type="text"
                  value={authorInput}
                  onChange={(e) => setAuthorInput(e.target.value)}
                  maxLength={36}
                  placeholder="Your Name / City (Optional)"
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                />
              </div>

              <div className="flex items-center justify-between w-full sm:w-1/2 sm:justify-end gap-3">
                <span className="font-mono text-[10px] text-slate-500">
                  {messageInput.length}/240
                </span>
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 font-sans text-xs font-semibold text-slate-950 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Post Note</span>
                </button>
              </div>
            </div>

            {submittedFeedback && (
              <p className="font-mono text-xs text-emerald-400 text-center animate-fade-in flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Your words are pinned to the light board. Thank you for caring.</span>
              </p>
            )}
          </form>
        </div>

        {/* Notes Grid */}
        <div className="relative z-10 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {notes.map((note) => {
            const isLiked = likedNoteIds.has(note.id);

            return (
              <div
                key={note.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 transition-all duration-300 hover:border-sky-500/40 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-sky-950/20"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium">
                      <User className="h-3 w-3 text-sky-400" />
                      {note.author}
                    </span>
                    <span className="text-slate-400">{note.timestamp}</span>
                  </div>

                  <p className="font-serif text-sm leading-relaxed text-slate-200">
                    &ldquo;{note.message}&rdquo;
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-400">Silent Solidarity</span>

                  <button
                    onClick={() => handleToggleLike(note.id)}
                    aria-label={`Like note by ${note.author}`}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-xs transition-colors ${
                      isLiked
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'text-slate-400 hover:text-rose-400 hover:bg-slate-800/60'
                    }`}
                  >
                    <Heart className={`h-3 w-3 ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                    <span>{note.likes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
