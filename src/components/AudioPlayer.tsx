import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Music2 } from 'lucide-react';
import { lofiSynth } from '../utils/webAudioSynth';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    const active = lofiSynth.toggle();
    setIsPlaying(active);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleToggle}
        className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer shadow-xl ${
          isPlaying
            ? 'bg-[#1DB954]/20 border border-[#1DB954]/50 text-[#1DB954] shadow-[0_0_20px_rgba(29,185,84,0.3)]'
            : 'glass-pill text-white/70 hover:text-white'
        }`}
        title={isPlaying ? 'Pause Background Chill Beats' : 'Play Background Chill Beats'}
      >
        {isPlaying ? (
          <>
            {/* Animated Equalizer Bars */}
            <div className="flex items-end gap-[2px] h-3 w-3">
              <motion.span
                animate={{ height: ['20%', '100%', '40%', '80%'] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                className="w-1 bg-emerald-400 rounded-full"
              />
              <motion.span
                animate={{ height: ['60%', '30%', '90%', '20%'] }}
                transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse', delay: 0.1 }}
                className="w-1 bg-emerald-400 rounded-full"
              />
              <motion.span
                animate={{ height: ['40%', '80%', '20%', '100%'] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse', delay: 0.2 }}
                className="w-1 bg-emerald-400 rounded-full"
              />
            </div>
            <span className="hidden sm:inline">Music Playing</span>
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
          </>
        ) : (
          <>
            <Music2 className="w-3.5 h-3.5" />
            <span>Play Vibe 🎵</span>
            <VolumeX className="w-3.5 h-3.5 opacity-60" />
          </>
        )}
      </motion.button>
    </div>
  );
};
