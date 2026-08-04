import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LOADING_MESSAGES } from '../data/storyData';
import { CheckCircle2, Cpu, ArrowRight } from 'lucide-react';
import { lofiSynth } from '../utils/webAudioSynth';

interface Props {
  onContinue: () => void;
}

export const LoadingScreen: React.FC<Props> = ({ onContinue }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Progress counter
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) {
          clearInterval(progressInterval);
          return 99.9;
        }
        return prev + 2.5;
      });
    }, 100);

    // Message rotation interval
    const msgInterval = setInterval(() => {
      setMsgIndex((prev) => {
        if (prev < LOADING_MESSAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(msgInterval);
          setTimeout(() => {
            setIsDone(true);
            lofiSynth.playPopSound();
          }, 800);
          return prev;
        }
      });
    }, 850);

    return () => {
      clearInterval(progressInterval);
      clearInterval(msgInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[68vh] text-center px-4">
      {/* Central Visual Scanner Box */}
      <div className="w-full max-w-sm p-8 rounded-[32px] glass-card flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center w-24 h-24">
          {/* Animated Circular Ring */}
          <svg className="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="6"
              className="text-white/10"
              fill="transparent"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="6"
              className="text-[#1DB954]"
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * progress) / 100}
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center text-[#1DB954] font-mono font-bold text-lg">
            {isDone ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <CheckCircle2 className="w-10 h-10 text-[#1DB954] fill-[#1DB954]/20" />
              </motion.div>
            ) : (
              <span>{Math.floor(progress)}%</span>
            )}
          </div>
        </div>

        {/* Text change box */}
        <div className="h-16 flex items-center justify-center w-full px-2">
          <AnimatePresence mode="wait">
            {!isDone ? (
              <motion.div
                key={msgIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 text-white/90 font-medium text-sm md:text-base justify-center"
              >
                <Cpu className="w-4 h-4 text-[#1DB954] animate-spin" />
                <span>{LOADING_MESSAGES[msgIndex]}</span>
              </motion.div>
            ) : (
              <motion.div
                key="done-text"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-1"
              >
                <span className="text-[#1DB954] font-bold text-lg md:text-xl drop-shadow-[0_0_10px_rgba(29,185,84,0.5)]">
                  99.9% Good Vibes Detected ✅
                </span>
                <span className="text-xs text-white/50">Analysis 100% verified by music physics</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Equalizer frequency bars when scanning */}
        {!isDone && (
          <div className="flex items-center justify-center gap-1.5 h-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: ['15%', '100%', '30%', '85%'],
                }}
                transition={{
                  duration: 0.4 + (i % 3) * 0.1,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: i * 0.05,
                }}
                className="w-1.5 bg-[#1DB954] rounded-full"
              />
            ))}
          </div>
        )}

        {/* Button appears when done */}
        {isDone && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              lofiSynth.playPopSound();
              onContinue();
            }}
            className="w-full mt-2 py-4 px-6 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-base flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(29,185,84,0.4)] transition-all cursor-pointer"
          >
            <span>Nice 😂</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </div>
  );
};
