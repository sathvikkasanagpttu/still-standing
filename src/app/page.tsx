'use client';

import React, { useState } from 'react';
import { CHAPTERS } from '../data/storyData';
import { StillStandingHero } from '../components/StillStandingHero';
import { ReadingProgress } from '../components/ReadingProgress';
import { ChapterNav } from '../components/ChapterNav';
import { ReaderControls } from '../components/ReaderControls';
import { AmbientAudio } from '../components/AmbientAudio';
import { ChapterCard } from '../components/ChapterCard';
import { AuthorsNote } from '../components/AuthorsNote';
import { StatHighlights } from '../components/StatHighlights';
import { EmotionalTimeline } from '../components/EmotionalTimeline';
import { LedgerOfSilence } from '../components/LedgerOfSilence';
import { WallOfExpectations } from '../components/WallOfExpectations';
import { EncouragementWall } from '../components/EncouragementWall';
import { TerminalReaderModal } from '../components/TerminalReaderModal';
import { CrisisHelpModal } from '../components/CrisisHelpModal';
import { Footer } from '../components/Footer';

export default function HomePage() {
  const [fontStyle, setFontStyle] = useState<'serif' | 'sans' | 'mono'>('serif');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [focusMode, setFocusMode] = useState<boolean>(false);

  const handleBeginReading = () => {
    const el = document.getElementById('authors-note');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#030712] text-[#f3f4f6]">
      {/* Top Reading Progress Bar */}
      <ReadingProgress />

      {/* Floating Reader Controls (Top Right) */}
      <ReaderControls
        fontStyle={fontStyle}
        setFontStyle={setFontStyle}
        fontSize={fontSize}
        setFontSize={setFontSize}
        focusMode={focusMode}
        setFocusMode={setFocusMode}
      />

      {/* Floating Chapter Index (Top Left) */}
      <ChapterNav />

      {/* Interactive Emotional Journey Line (Fixed Left) */}
      <EmotionalTimeline />

      {/* Hero Landing Section */}
      <StillStandingHero onBeginReading={handleBeginReading} />

      {/* Interactive Stat Ledger / Survival Metrics */}
      <StatHighlights />

      {/* Author's Note */}
      <AuthorsNote fontStyle={fontStyle} fontSize={fontSize} />

      {/* Chapters in Chronological Order with Narrative Interludes */}
      <div className="relative z-10">
        {CHAPTERS.map((chapter) => (
          <React.Fragment key={chapter.id}>
            <ChapterCard
              chapter={chapter}
              fontStyle={fontStyle}
              fontSize={fontSize}
              focusMode={focusMode}
            />

            {/* Interactive "Ledger of Silence" right after Part IV (The 500+ Applications) */}
            {chapter.id === 'part-4' && (
              <LedgerOfSilence />
            )}

            {/* Interactive "Wall of Expectations" between Part V and Part VI */}
            {chapter.id === 'part-5' && (
              <WallOfExpectations />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Community Light Board & Encouragement Wall (After Part IX) */}
      <EncouragementWall />

      {/* Terminal Mode Reader Modal (Bottom Right Above Audio) */}
      <TerminalReaderModal />

      {/* Procedural Ambient Audio Synthesizer (Rain, Deep Drone, Mechanical Keys) */}
      <AmbientAudio />

      {/* 24/7 Crisis Helpline & Mental Health Support (Bottom Left) */}
      <CrisisHelpModal />

      {/* Footer */}
      <Footer />
    </main>
  );
}
