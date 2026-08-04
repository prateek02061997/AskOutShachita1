import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface Props {
  pageId: number;
}

const NOTES = ['♪', '♫', '♬', '♩', '🎶', '🎧', '✨'];

export const BackgroundElements: React.FC<Props> = ({ pageId }) => {
  // Generate random positions for floating notes
  const floatingNotes = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      note: NOTES[i % NOTES.length],
      left: `${(i * 7 + 5) % 90 + 5}%`,
      delay: (i * 0.4) % 3,
      duration: 6 + (i % 5) * 2,
      scale: 0.8 + (i % 4) * 0.3,
    }));
  }, []);

  const isNightCityTheme = pageId >= 10;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#050505] text-emerald-100">
      {/* Mesh Gradient Mesh Overlay */}
      <div className="mesh-bg" />

      {/* Floating Animated Radial Color Blobs */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.25, 0.85, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-32 w-96 h-96 md:w-[36rem] md:h-[36rem] rounded-full bg-[#1DB954]/15 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 -right-32 w-96 h-96 md:w-[32rem] md:h-[32rem] rounded-full bg-emerald-500/10 blur-[130px]"
      />

      <motion.div
        animate={{
          x: [0, 20, -30, 0],
          y: [0, 40, -10, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-green-600/10 blur-[120px]"
      />

      {/* Night City Bokeh Lights on Pages 10 & 11 */}
      {isNightCityTheme && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-emerald-900/20 to-black/80 transition-opacity duration-1000">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={`city-light-${i}`}
              initial={{ opacity: 0.2 }}
              animate={{
                opacity: [0.2, 0.7, 0.2],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                delay: i * 0.3,
              }}
              style={{
                top: `${20 + (i * 12) % 65}%`,
                left: `${10 + (i * 17) % 80}%`,
              }}
              className="absolute w-3 h-3 md:w-5 md:h-5 rounded-full bg-amber-200/40 blur-[4px] shadow-[0_0_12px_rgba(251,191,36,0.5)]"
            />
          ))}
        </div>
      )}

      {/* Floating Music Notes */}
      {floatingNotes.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: '110vh', opacity: 0, scale: item.scale }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.6, 0.8, 0],
            x: [0, (item.id % 2 === 0 ? 30 : -30), 0],
            rotate: [0, item.id % 2 === 0 ? 25 : -25, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'linear',
          }}
          style={{ left: item.left }}
          className="absolute text-emerald-400/30 text-xl md:text-3xl font-bold select-none drop-shadow-[0_0_8px_rgba(29,185,84,0.4)]"
        >
          {item.note}
        </motion.div>
      ))}

      {/* Subtle Vinyl Record / Grid Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1db954_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />
    </div>
  );
};
