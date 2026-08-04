import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Sparkles, Settings } from 'lucide-react';

interface Props {
  currentPage: number;
  totalPages: number;
  onBack: () => void;
  onOpenSettings?: () => void;
}

export const ProgressBar: React.FC<Props> = ({
  currentPage,
  totalPages,
  onBack,
  onOpenSettings,
}) => {
  const percentage = Math.min(100, Math.round((currentPage / totalPages) * 100));

  return (
    <div className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 pb-2 bg-gradient-to-b from-[#050505]/90 to-transparent backdrop-blur-md">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
        {/* Back Button */}
        {currentPage > 1 ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="w-9 h-9 rounded-full glass-pill text-white/70 hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
            title="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
        ) : (
          <div className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-[#1DB954]">
            <Sparkles className="w-4 h-4" />
          </div>
        )}

        {/* Progress Track */}
        <div className="flex-1 flex items-center gap-3 glass-pill px-4 py-2 rounded-full">
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#1DB954] to-[#1ed760] rounded-full shadow-[0_0_12px_rgba(29,185,84,0.6)]"
            />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold whitespace-nowrap">
            {currentPage <= 10 ? `Step ${currentPage} of 10` : 'Final Step'}
          </span>
        </div>

        {/* Settings button */}
        {onOpenSettings && (
          <motion.button
            whileHover={{ scale: 1.05, rotate: 45 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenSettings}
            className="w-9 h-9 rounded-full glass-pill text-white/60 hover:text-[#1DB954] flex items-center justify-center transition-colors shadow-lg cursor-pointer"
            title="Customize Name"
          >
            <Settings className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
};
