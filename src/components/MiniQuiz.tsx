import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_OPTIONS } from '../data/storyData';
import { QuizOption } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';
import { lofiSynth } from '../utils/webAudioSynth';

interface Props {
  onContinue: () => void;
  onSelectQuizAnswer?: (answer: string) => void;
}

export const MiniQuiz: React.FC<Props> = ({ onContinue, onSelectQuizAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);

  const handleSelect = (option: QuizOption) => {
    lofiSynth.playPopSound();
    setSelectedOption(option);
    if (onSelectQuizAnswer) {
      onSelectQuizAnswer(option.label);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] text-center px-4 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[#1DB954] text-xs font-semibold self-center">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mini Quiz 🎧</span>
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            What&apos;s the best way to discover new songs?
          </h2>
          <p className="text-xs text-white/50">Choose carefully (there are no wrong answers... maybe)</p>
        </div>

        {/* Quiz Options */}
        <div className="grid grid-cols-1 gap-3 w-full">
          {QUIZ_OPTIONS.map((opt) => {
            const isSelected = selectedOption?.id === opt.id;
            return (
              <motion.button
                key={opt.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(opt)}
                className={`p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1DB954]/20 border-[#1DB954] text-white shadow-[0_0_20px_rgba(29,185,84,0.3)] ring-2 ring-[#1DB954]/50'
                    : 'glass-card glass-card-hover text-white/90'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="font-semibold text-sm md:text-base">{opt.label}</span>
                </div>
                {isSelected && (
                  <span className="text-xs bg-[#1DB954] text-black font-extrabold px-3 py-1 rounded-full">
                    Selected!
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Reaction Card & Continue Button */}
        <AnimatePresence>
          {selectedOption && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-5 rounded-2xl glass-card text-left flex flex-col gap-4 shadow-xl"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">💭</span>
                <p className="text-sm text-white/90 font-medium leading-relaxed italic">
                  &ldquo;{selectedOption.reaction}&rdquo;
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  lofiSynth.playPopSound();
                  onContinue();
                }}
                className="w-full py-4 px-6 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-sm md:text-base flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(29,185,84,0.4)] cursor-pointer"
              >
                <span>Continue →</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
