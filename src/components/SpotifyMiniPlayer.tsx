import React from 'react';
import { motion } from 'motion/react';
import { Disc, Heart } from 'lucide-react';

interface Props {
  currentPage: number;
}

export const SpotifyMiniPlayer: React.FC<Props> = ({ currentPage }) => {
  if (currentPage > 10) return null; // Hide on final screen to leave room for final choice buttons

  const getSubtext = () => {
    switch (currentPage) {
      case 1:
        return 'Chapter 1: The Intro';
      case 2:
        return 'Chapter 2: The Discovery';
      case 3:
        return 'Chapter 3: The Music Test';
      case 4:
        return 'Chapter 4: The Checklist';
      case 5:
        return 'Chapter 5: Playlists Collide';
      case 6:
        return 'Chapter 6: Compatibility Scan';
      case 7:
        return 'Chapter 7: Daydreaming';
      case 8:
        return 'Chapter 8: The Music Quiz';
      case 9:
        return 'Chapter 9: The Confession';
      case 10:
        return 'Chapter 10: One Small Question';
      default:
        return 'Spotify • Good Vibes Only';
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-md"
    >
      <div className="glass-card rounded-2xl p-3 px-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#1DB954] to-teal-800 flex items-center justify-center shrink-0 shadow-md overflow-hidden">
            <Disc className="w-6 h-6 text-white animate-spin [animation-duration:8s]" />
            <div className="absolute inset-0 bg-white/10 rounded-xl" />
          </div>
          <div className="min-w-0 flex flex-col">
            <span className="text-xs font-bold text-white truncate flex items-center gap-1.5">
              <span>Maybe Spotify Knew</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse" />
            </span>
            <span className="text-[11px] text-[#1DB954] font-medium truncate">
              {getSubtext()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-[#1DB954] fill-[#1DB954]" />
        </div>
      </div>
    </motion.div>
  );
};
