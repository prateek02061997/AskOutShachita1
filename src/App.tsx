/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { BackgroundElements } from './components/BackgroundElements';
import { ProgressBar } from './components/ProgressBar';
import { AudioPlayer } from './components/AudioPlayer';
import { SpotifyMiniPlayer } from './components/SpotifyMiniPlayer';
import { StoryPage } from './components/StoryPage';
import { LoadingScreen } from './components/LoadingScreen';
import { MiniQuiz } from './components/MiniQuiz';
import { FinalPage } from './components/FinalPage';
import { CustomizeModal } from './components/CustomizeModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [herName, setHerName] = useState<string>('');
  const [quizAnswer, setQuizAnswer] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const totalPages = 11; // 1-10 story pages + 11 final page

  const handleContinue = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b100d] text-zinc-100 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-zinc-950 relative overflow-x-hidden">
      {/* Background Ambient FX & Floating Music Notes */}
      <BackgroundElements pageId={currentPage} />

      {/* Top Controls: Audio Music Synth Toggle */}
      <AudioPlayer />

      {/* Top Story Chapter Progress Bar */}
      <ProgressBar
        currentPage={currentPage}
        totalPages={totalPages}
        onBack={handleBack}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center pt-16 pb-20 relative z-10">
        <AnimatePresence mode="wait">
          {currentPage === 6 ? (
            <LoadingScreen key="loading-screen" onContinue={handleContinue} />
          ) : currentPage === 8 ? (
            <MiniQuiz
              key="mini-quiz"
              onContinue={handleContinue}
              onSelectQuizAnswer={(ans) => setQuizAnswer(ans)}
            />
          ) : currentPage === 11 ? (
            <FinalPage
              key="final-page"
              herName={herName}
              quizAnswer={quizAnswer}
              onReset={handleReset}
            />
          ) : (
            <StoryPage
              key={`story-${currentPage}`}
              pageId={currentPage}
              herName={herName}
              onContinue={handleContinue}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Floating Mini Spotify Player */}
      <SpotifyMiniPlayer currentPage={currentPage} />

      {/* Customization Modal */}
      <CustomizeModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        herName={herName}
        onSaveName={(name) => setHerName(name)}
      />
    </div>
  );
}
