import React from 'react';
import { motion } from 'motion/react';
import { MUSIC_CARDS, OBSERVATION_CARDS } from '../data/storyData';
import { ArrowRight, Disc, Music, Heart, Coffee, Sparkles, Radio } from 'lucide-react';
import { lofiSynth } from '../utils/webAudioSynth';

interface Props {
  pageId: number;
  herName: string;
  onContinue: () => void;
}

export const StoryPage: React.FC<Props> = ({ pageId, herName, onContinue }) => {
  const handleNext = () => {
    lofiSynth.playPopSound();
    onContinue();
  };

  const nameGreeting = herName ? `${herName}, ` : '';

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 max-w-lg mx-auto py-6">
      <motion.div
        key={`page-${pageId}`}
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -25, scale: 0.96 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="w-full flex flex-col items-center"
      >
        {/* ==================== PAGE 1 ==================== */}
        {pageId === 1 && (
          <div className="w-full p-8 md:p-10 rounded-[32px] glass-card flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#1DB954]/20 border border-[#1DB954]/40 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(29,185,84,0.3)]">
              🎵
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {nameGreeting}Before you close this...
              </h1>
              <div className="text-base md:text-lg text-white/80 font-medium leading-relaxed space-y-1.5 pt-2">
                <p>Give me just 2 minutes.</p>
                <p className="text-[#1DB954] font-semibold">No presentations.</p>
                <p>No awkward speeches.</p>
                <p className="text-white">Just a tiny story.</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNext}
              className="w-full mt-2 py-4 px-6 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-base md:text-lg flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(29,185,84,0.4)] transition-all cursor-pointer"
            >
              <span>Continue →</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}

        {/* ==================== PAGE 2 ==================== */}
        {pageId === 2 && (
          <div className="w-full p-8 md:p-10 rounded-[32px] glass-card flex flex-col items-center gap-6 relative overflow-hidden">
            {/* Background Floating Spotify Music Cards */}
            <div className="grid grid-cols-2 gap-3 w-full my-1">
              {MUSIC_CARDS.map((card, i) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 }}
                  className={`p-3.5 rounded-2xl bg-gradient-to-br ${card.color} border border-white/10 backdrop-blur-md flex items-center gap-2.5 text-left`}
                >
                  <span className="text-xl">{card.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{card.title}</p>
                    <p className="text-[10px] text-[#1DB954] truncate">{card.genre}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-3 text-center pt-2">
              <span className="text-xs font-bold text-[#1DB954] uppercase tracking-widest flex items-center justify-center gap-1">
                <span>First Observation 👀</span>
              </span>
              <p className="text-2xl md:text-3xl font-bold text-white">
                You know what surprised me?
              </p>
              <div className="text-sm md:text-base text-white/80 space-y-2 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/10">
                <p className="text-[#1DB954] font-bold text-base">Your playlist.</p>
                <p>Every time we talked about songs, I kept thinking...</p>
                <p className="italic text-emerald-200 font-semibold text-base">
                  &ldquo;Wait... You actually listen to THAT too?&rdquo;
                </p>
                <p className="text-white/50 text-xs pt-1">I wasn&apos;t expecting that.</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNext}
              className="w-full py-4 px-6 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-base md:text-lg flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(29,185,84,0.4)] transition-all cursor-pointer"
            >
              <span>Interesting...</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}

        {/* ==================== PAGE 3 ==================== */}
        {pageId === 3 && (
          <div className="w-full p-8 md:p-10 rounded-[32px] glass-card flex flex-col items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#1DB954]/20 border border-[#1DB954]/30 flex items-center justify-center text-[#1DB954] text-2xl shadow-[0_0_15px_rgba(29,185,84,0.3)]">
              🎶
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Music Test 🎶
            </h2>

            <div className="w-full flex flex-col gap-3 py-2 text-left">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3"
              >
                <Disc className="w-5 h-5 text-[#1DB954] animate-spin [animation-duration:10s]" />
                <span className="text-sm font-semibold text-emerald-200">Same songs...</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3"
              >
                <Music className="w-5 h-5 text-[#1DB954]" />
                <span className="text-sm font-semibold text-emerald-200">Same vibes...</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3"
              >
                <Radio className="w-5 h-5 text-[#1DB954]" />
                <span className="text-sm font-semibold text-emerald-200">
                  Same random recommendations...
                </span>
              </motion.div>
            </div>

            <div className="text-sm md:text-base text-white/80 leading-relaxed bg-[#1DB954]/10 p-4 rounded-2xl border border-[#1DB954]/30 w-full text-center">
              <p className="text-xs text-white/50 uppercase tracking-widest font-bold pb-1">
                Hypothesis:
              </p>
              <p className="text-white font-bold text-base">Either...</p>
              <p className="text-[#1DB954] font-bold py-1">You have incredible taste.</p>
              <p className="text-white font-bold">Or...</p>
              <p className="text-teal-300 font-bold pt-1">
                Spotify is secretly planning something.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNext}
              className="w-full py-4 px-6 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-base md:text-lg flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(29,185,84,0.4)] transition-all cursor-pointer"
            >
              <span>Probably both 😂</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}

        {/* ==================== PAGE 4 ==================== */}
        {pageId === 4 && (
          <div className="w-full p-8 md:p-10 rounded-[32px] glass-card flex flex-col items-center gap-6">
            <div className="flex flex-col gap-1 text-center">
              <span className="text-xs font-bold text-[#1DB954] uppercase tracking-widest">
                Beyond the music...
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                Then I noticed something...
              </h2>
            </div>

            {/* Staggered Checklist Cards */}
            <div className="w-full flex flex-col gap-2.5">
              {OBSERVATION_CARDS.map((card, index) => (
                <motion.div
                  key={card.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="p-4 px-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-left shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#1DB954]/20 border border-[#1DB954]/50 text-[#1DB954] text-xs font-bold flex items-center justify-center shrink-0">
                      {card.icon}
                    </span>
                    <span className="text-sm md:text-base font-bold text-white">
                      {card.text}
                    </span>
                  </div>
                  <span className="text-lg">{card.emoji}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-base font-semibold text-[#1DB954] italic pt-1">
              That&apos;s actually pretty rare.
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNext}
              className="w-full py-4 px-6 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-base md:text-lg flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(29,185,84,0.4)] transition-all cursor-pointer"
            >
              <span>True...</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}

        {/* ==================== PAGE 5 ==================== */}
        {pageId === 5 && (
          <div className="w-full p-8 md:p-10 rounded-[32px] glass-card flex flex-col items-center gap-6">
            {/* Split Visual Section */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Graphic of overlapping playlists */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1DB954]/15 to-transparent border border-white/10 flex flex-col items-center gap-3 relative overflow-hidden">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-14 h-14 rounded-xl bg-[#1DB954]/20 border border-[#1DB954]/40 flex flex-col items-center justify-center p-1 text-center shadow-lg">
                    <Music className="w-5 h-5 text-[#1DB954]" />
                    <span className="text-[9px] font-bold text-white mt-1">Playlist A</span>
                  </div>
                  <span className="text-xl font-bold text-[#1DB954]">🤝</span>
                  <div className="w-14 h-14 rounded-xl bg-teal-500/20 border border-teal-400/40 flex flex-col items-center justify-center p-1 text-center shadow-lg">
                    <Disc className="w-5 h-5 text-teal-300" />
                    <span className="text-[9px] font-bold text-white mt-1">Playlist B</span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#1DB954]">
                  Shared Harmony Detected 🎶
                </span>
              </div>

              {/* Story text */}
              <div className="text-xs md:text-sm text-white/80 space-y-2 text-left leading-relaxed">
                <p>Some people become friends because of school.</p>
                <p>Some because of work.</p>
                <p>Some because life randomly throws them together.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 w-full text-center">
              <p className="text-base md:text-lg font-extrabold text-[#1DB954]">
                Maybe... <br />
                <span className="text-white">Music deserves a little credit too.</span>
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNext}
              className="w-full py-4 px-6 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-base md:text-lg flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(29,185,84,0.4)] transition-all cursor-pointer"
            >
              <span>Continue →</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}

        {/* ==================== PAGE 7 ==================== */}
        {pageId === 7 && (
          <div className="w-full p-8 md:p-10 rounded-[32px] glass-card flex flex-col items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#1DB954]/20 border border-[#1DB954]/30 flex items-center justify-center text-[#1DB954] text-2xl">
              ✨
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Imagine this...
            </h2>

            <p className="text-xs md:text-sm text-white/50 -mt-3">
              Instead of recommending songs through chat...
            </p>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 w-full text-left space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1DB954] block pb-1">
                Imagine listening to them together:
              </span>
              <div className="flex items-center gap-3 text-sm md:text-base font-semibold text-white/90">
                <span className="text-xl">🚗</span>
                <span>Maybe while driving.</span>
              </div>
              <div className="flex items-center gap-3 text-sm md:text-base font-semibold text-white/90">
                <span className="text-xl">☕</span>
                <span>Maybe over coffee.</span>
              </div>
              <div className="flex items-center gap-3 text-sm md:text-base font-semibold text-white/90">
                <span className="text-xl">🚶‍♀️</span>
                <span>Maybe during a long walk.</span>
              </div>
              <div className="flex items-center gap-3 text-sm md:text-base font-semibold text-[#1DB954]">
                <span className="text-xl">📻</span>
                <span>Maybe while arguing over who gets the AUX.</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNext}
              className="w-full py-4 px-6 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-base md:text-lg flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(29,185,84,0.4)] transition-all cursor-pointer"
            >
              <span>Sounds fun...</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}

        {/* ==================== PAGE 9 ==================== */}
        {pageId === 9 && (
          <div className="w-full p-8 md:p-10 rounded-[32px] glass-card flex flex-col items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 text-2xl">
              💡
            </div>

            <div className="flex flex-col gap-3 text-center">
              <p className="text-sm md:text-base text-white/80 font-medium">
                I could have simply texted:
              </p>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#1DB954]/40 text-[#1DB954] font-bold text-lg">
                &ldquo;Want to grab coffee?&rdquo;
              </div>

              <div className="space-y-2 text-sm md:text-base text-white/80 pt-2">
                <p className="text-white/50 italic">But... Where&apos;s the creativity in that?</p>
                <p className="font-semibold text-white">So yes...</p>
                <p className="text-[#1DB954] font-black text-base md:text-lg">
                  I made an entire website.
                </p>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-xs md:text-sm text-white/80 mt-2 space-y-1">
                  <p>Which is probably either...</p>
                  <p className="text-[#1DB954] font-bold">Really sweet...</p>
                  <p className="text-amber-300 font-bold">Or slightly concerning 😂</p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNext}
              className="w-full py-4 px-6 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-base md:text-lg flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(29,185,84,0.4)] transition-all cursor-pointer"
            >
              <span>I&apos;ll allow it 😂</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}

        {/* ==================== PAGE 10 ==================== */}
        {pageId === 10 && (
          <div className="w-full p-8 md:p-10 rounded-[40px] glass-card flex flex-col items-center gap-6 relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 text-3xl shadow-[0_0_20px_rgba(251,191,36,0.3)]">
              ☕
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                Night City Lights 🌃
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                One Small Question ☕
              </h2>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 w-full text-center space-y-2">
              <p className="text-lg md:text-xl font-bold text-white">
                Would you like to go out with me sometime?
              </p>
              <div className="text-xs md:text-sm text-white/80 pt-2 space-y-1.5 leading-relaxed">
                <p>Nothing complicated.</p>
                <p className="text-[#1DB954] font-semibold">Just good food.</p>
                <p className="text-teal-300 font-semibold">Good conversations.</p>
                <p className="text-amber-300 font-semibold">Maybe some music.</p>
                <p className="text-white font-bold pt-1">And hopefully... More laughs.</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNext}
              className="w-full py-5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-black text-lg flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(29,185,84,0.4)] transition-all cursor-pointer"
            >
              <span>Let&apos;s see... →</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
