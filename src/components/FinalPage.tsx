import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { FinalChoice } from '../types';
import {
  Coffee,
  Sparkles,
  Check,
  Copy,
  MessageCircle,
  RotateCcw,
  Smile,
  Zap,
  Calendar,
  Clock,
  Compass,
  FileText,
  Download,
  Loader2,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';
import { lofiSynth } from '../utils/webAudioSynth';

interface Props {
  herName: string;
  quizAnswer: string;
  onReset: () => void;
}

export interface ActivityOption {
  id: string;
  title: string;
  emoji: string;
  description: string;
}

const DATE_ACTIVITIES: ActivityOption[] = [
  {
    id: 'bucklands',
    title: 'Bucklands Beach Walk',
    emoji: '🌊',
    description: 'Walk by the beach, listen to music, talk, and enjoy the view.',
  },
  {
    id: 'piha',
    title: 'Piha Beach',
    emoji: '🏖️',
    description: 'Explore Piha, enjoy nature, and have a relaxed adventure.',
  },
  {
    id: 'raglan',
    title: 'Long Drive to Raglan',
    emoji: '🚗',
    description: 'A scenic road trip with good conversations and exploring new places.',
  },
  {
    id: 'dinner-movie',
    title: 'Dinner + Movie',
    emoji: '🍽️',
    description: 'Good food, a movie, and a relaxed evening.',
  },
];

export const FinalPage: React.FC<Props> = ({ herName, quizAnswer, onReset }) => {
  // Navigation sub-steps within FinalPage:
  // 'choice' -> 'activity' -> 'datetime' -> 'confirm' -> 'done'
  const [step, setStep] = useState<'choice' | 'activity' | 'datetime' | 'confirm' | 'done'>('choice');
  const [choice, setChoice] = useState<FinalChoice>(null);

  // Selection states
  const [selectedActivity, setSelectedActivity] = useState<ActivityOption>(DATE_ACTIVITIES[0]);
  const [selectedDay, setSelectedDay] = useState<string>('Friday');
  const [selectedTime, setSelectedTime] = useState<string>('Evening');
  const [additionalMessage, setAdditionalMessage] = useState<string>('');

  // Nudge states for options 2 & 3
  const [nudgeMessage, setNudgeMessage] = useState<string | null>(null);
  const [shakeYes, setShakeYes] = useState<boolean>(false);

  // Submission & Action states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedId, setSubmittedId] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const fireConfetti = () => {
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#1DB954', '#34d399', '#f59e0b', '#ffffff'],
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#1DB954', '#34d399', '#f59e0b', '#ffffff'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleChoice = (selected: FinalChoice) => {
    lofiSynth.playPopSound();

    if (selected === 'yes') {
      setChoice('yes');
      setStep('activity');
    } else if (selected === 'maybe') {
      setNudgeMessage("Are you sure? Think about it over a beach walk & coffee! ☕😉 Option 1 is way better!");
      setShakeYes(true);
      setTimeout(() => setShakeYes(false), 800);
    } else if (selected === 'website') {
      setNudgeMessage("Haha glad you liked the site! But Option 1 comes with free coffee & great vibes! ☕✨ Go for Option 1!");
      setShakeYes(true);
      setTimeout(() => setShakeYes(false), 800);
    }
  };

  const handleConfirmSubmit = async () => {
    lofiSynth.playPopSound();
    setIsSubmitting(true);

    const payload = {
      selectedActivity: selectedActivity ? selectedActivity.title : 'Not specified',
      selectedDay: selectedDay || 'Not specified',
      selectedTime: selectedTime || 'Not specified',
    };

    try {
      window.Telegram?.WebApp?.sendData(JSON.stringify(payload));
    } catch (err) {
      console.error('Error submitting response:', err);
    } finally {
      setIsSubmitting(false);
      setStep('done');
      fireConfetti();
      lofiSynth.start(); // Auto-play celebration music
    }
  };

  const getWhatsAppMessage = () => {
    if (choice === 'yes') {
      return `Hey! I went through your website. Mission successful! Let's do ${selectedActivity.title} on ${selectedDay} (${selectedTime})! ☕🎶`;
    } else if (choice === 'maybe') {
      return `Hey! Loved the website! Let me think about it for a bit, but no pressure at all! 😊`;
    } else {
      return `Haha, 10/10 for website creativity! Thanks for making it till the end! 😂❤️`;
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(getWhatsAppMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(getWhatsAppMessage());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 max-w-xl mx-auto py-8">
      <AnimatePresence mode="wait">
        {/* ==================== STEP 1: INITIAL CHOICE ==================== */}
        {step === 'choice' && (
          <motion.div
            key="step-choice"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full p-8 md:p-10 rounded-[32px] glass-card flex flex-col items-center gap-6"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="p-3 rounded-full glass-pill text-[#1DB954]">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Choose your adventure 😊
              </h2>
              <p className="text-xs md:text-sm text-white/60">
                Pick whichever option feels right. Low pressure guaranteed!
              </p>
            </div>

            <div className="flex flex-col gap-3.5 w-full mt-2">
              <AnimatePresence>
                {nudgeMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full p-3.5 rounded-2xl bg-[#1DB954]/15 border border-[#1DB954]/40 text-[#1DB954] text-xs md:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(29,185,84,0.2)] text-center leading-relaxed"
                  >
                    <Sparkles className="w-4 h-4 shrink-0 animate-spin text-[#1DB954]" />
                    <span>{nudgeMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Option 1: YES */}
              <motion.button
                animate={
                  shakeYes
                    ? { scale: [1, 1.05, 0.98, 1.04, 1], rotate: [0, -2, 2, -1, 0] }
                    : {}
                }
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice('yes')}
                className={`w-full p-4 md:p-5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-base md:text-lg flex items-center justify-between transition-all cursor-pointer ${
                  shakeYes
                    ? 'shadow-[0_0_35px_rgba(29,185,84,0.8)] ring-4 ring-[#1DB954]/60'
                    : 'shadow-[0_0_25px_rgba(29,185,84,0.4)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Coffee className="w-6 h-6" />
                  <span>☕ Yes! Let&apos;s do it</span>
                </div>
                <Zap className="w-5 h-5 fill-black" />
              </motion.button>

              {/* Option 2: MAYBE */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice('maybe')}
                className="w-full p-4 md:p-5 rounded-full glass-card glass-card-hover text-white font-bold text-base flex items-center justify-between transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🤔</span>
                  <span>Let me think</span>
                </div>
                <span className="text-xs text-white/50 font-normal">Take your time</span>
              </motion.button>

              {/* Option 3: WEBSITE */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice('website')}
                className="w-full p-4 md:p-5 rounded-full glass-card glass-card-hover text-white/80 font-bold text-base flex items-center justify-between transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">😂</span>
                  <span>I came for the website</span>
                </div>
                <Smile className="w-5 h-5 text-white/50" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ==================== STEP 2: ACTIVITY SELECTION ==================== */}
        {step === 'activity' && (
          <motion.div
            key="step-activity"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full p-6 md:p-8 rounded-[32px] glass-card flex flex-col items-center gap-6"
          >
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => setStep('choice')}
                className="p-2 rounded-full glass-pill text-white/70 hover:text-white flex items-center gap-1 text-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <span className="text-xs font-bold text-[#1DB954] uppercase tracking-widest flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Step 1 of 3</span>
              </span>
            </div>

            <div className="flex flex-col gap-1 text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                What sounds fun?
              </h2>
              <p className="text-xs md:text-sm text-white/60">
                Choose the vibe that suits you best!
              </p>
            </div>

            {/* 4 Interactive Activity Cards */}
            <div className="grid grid-cols-1 gap-3.5 w-full text-left">
              {DATE_ACTIVITIES.map((act) => {
                const isSelected = selectedActivity.id === act.id;
                return (
                  <motion.button
                    key={act.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      lofiSynth.playPopSound();
                      setSelectedActivity(act);
                    }}
                    className={`p-4 md:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? 'bg-[#1DB954]/20 border-[#1DB954] shadow-[0_0_20px_rgba(29,185,84,0.3)] ring-2 ring-[#1DB954]/50'
                        : 'glass-card glass-card-hover text-white'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shrink-0">
                      {act.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-base md:text-lg text-white">
                          {act.title}
                        </h3>
                        {isSelected && (
                          <span className="text-[10px] uppercase font-black bg-[#1DB954] text-black px-2.5 py-0.5 rounded-full shrink-0">
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-xs md:text-sm text-white/70 mt-1 leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                lofiSynth.playPopSound();
                setStep('datetime');
              }}
              className="w-full mt-2 py-4 px-6 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(29,185,84,0.4)] cursor-pointer"
            >
              <span>Next: Choose Day & Time →</span>
            </motion.button>
          </motion.div>
        )}

        {/* ==================== STEP 3: DAY & TIME SELECTION ==================== */}
        {step === 'datetime' && (
          <motion.div
            key="step-datetime"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full p-6 md:p-8 rounded-[32px] glass-card flex flex-col items-center gap-6"
          >
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => setStep(choice === 'yes' ? 'activity' : 'choice')}
                className="p-2 rounded-full glass-pill text-white/70 hover:text-white flex items-center gap-1 text-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <span className="text-xs font-bold text-[#1DB954] uppercase tracking-widest flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Step 2 of 3</span>
              </span>
            </div>

            <div className="flex flex-col gap-1 text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                When works best?
              </h2>
              <p className="text-xs md:text-sm text-white/60">
                Select your preferred day and timing
              </p>
            </div>

            {/* Day Selector */}
            <div className="w-full text-left space-y-2">
              <label className="text-xs font-bold text-white/80 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#1DB954]" />
                <span>Select Day:</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Thursday', 'Friday'].map((day) => {
                  const isSelected = selectedDay === day;
                  return (
                    <button
                      key={day}
                      onClick={() => {
                        lofiSynth.playPopSound();
                        setSelectedDay(day);
                      }}
                      className={`py-3.5 px-4 rounded-2xl font-bold text-sm border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1DB954] text-black border-[#1DB954] shadow-[0_0_15px_rgba(29,185,84,0.4)]'
                          : 'glass-card glass-card-hover text-white'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Selector */}
            <div className="w-full text-left space-y-2">
              <label className="text-xs font-bold text-white/80 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#1DB954]" />
                <span>Select Time:</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Afternoon', 'Evening'].map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => {
                        lofiSynth.playPopSound();
                        setSelectedTime(time);
                      }}
                      className={`py-3.5 px-4 rounded-2xl font-bold text-sm border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1DB954] text-black border-[#1DB954] shadow-[0_0_15px_rgba(29,185,84,0.4)]'
                          : 'glass-card glass-card-hover text-white'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Suggestion Textbox */}
            <div className="w-full text-left space-y-2">
              <label className="text-xs font-bold text-white/80 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#1DB954]" />
                <span>Anything else you want to suggest?</span>
              </label>
              <textarea
                value={additionalMessage}
                onChange={(e) => setAdditionalMessage(e.target.value)}
                placeholder="Suggest a specific place, song, or note..."
                rows={3}
                className="w-full p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#1DB954] transition-colors resize-none placeholder:text-white/30"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                lofiSynth.playPopSound();
                setStep('confirm');
              }}
              className="w-full mt-2 py-4 px-6 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(29,185,84,0.4)] cursor-pointer"
            >
              <span>Review Confirmation →</span>
            </motion.button>
          </motion.div>
        )}

        {/* ==================== STEP 4: FINAL CONFIRMATION SUMMARY ==================== */}
        {step === 'confirm' && (
          <motion.div
            key="step-confirm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full p-6 md:p-8 rounded-[32px] glass-card flex flex-col items-center gap-6"
          >
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => setStep('datetime')}
                className="p-2 rounded-full glass-pill text-white/70 hover:text-white flex items-center gap-1 text-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <span className="text-xs font-bold text-[#1DB954] uppercase tracking-widest flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Final Step</span>
              </span>
            </div>

            <div className="flex flex-col gap-1 text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                Summary
              </h2>
              <p className="text-xs md:text-sm text-white/60">
                Please review your selection before submitting
              </p>
            </div>

            {/* Summary Details Box */}
            <div className="w-full p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-left space-y-3.5">
              <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                <span className="text-xs font-bold text-white/60 uppercase">Activity:</span>
                <span className="text-sm font-extrabold text-[#1DB954]">
                  {selectedActivity.emoji} {selectedActivity.title}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                <span className="text-xs font-bold text-white/60 uppercase">Day:</span>
                <span className="text-sm font-bold text-white">{selectedDay}</span>
              </div>

              <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                <span className="text-xs font-bold text-white/60 uppercase">Time:</span>
                <span className="text-sm font-bold text-white">{selectedTime}</span>
              </div>

              {additionalMessage.trim() && (
                <div className="flex flex-col gap-1 border-b border-white/10 pb-2.5">
                  <span className="text-xs font-bold text-white/60 uppercase">Suggestions / Note:</span>
                  <p className="text-xs text-white/90 italic bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                    &ldquo;{additionalMessage}&rdquo;
                  </p>
                </div>
              )}

              <div className="pt-1 text-center">
                <p className="text-sm font-extrabold text-[#1DB954]">
                  Looking forward to it 😊
                </p>
              </div>
            </div>

            {/* Confirm Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              onClick={handleConfirmSubmit}
              className="w-full py-4 px-6 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-black text-lg flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(29,185,84,0.4)] transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Please wait...</span>
                </>
              ) : (
                <>
                  <span>Confirm</span>
                  <CheckCircle2 className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* ==================== STEP 5: COMPLETED / CONFIRMED SCREEN ==================== */}
        {step === 'done' && (
          <motion.div
            key="step-done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full p-8 md:p-10 rounded-[36px] glass-card flex flex-col items-center gap-6 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#1DB954]/20 border border-[#1DB954]/50 flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(29,185,84,0.5)]">
              ✨
            </div>

            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-3xl md:text-4xl font-black text-[#1DB954]">
                Okay, see you then! 😊
              </h2>
              <p className="text-lg font-bold text-white">
                Be ready, I&apos;ll pick you up!
              </p>
            </div>

            {/* Selection summary card */}
            <div className="w-full p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-left text-sm space-y-2.5">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-white/60 uppercase">Activity:</span>
                <span className="font-extrabold text-[#1DB954]">
                  {selectedActivity.emoji} {selectedActivity.title}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-white/60 uppercase">Day & Time:</span>
                <span className="font-bold text-white">
                  {selectedDay} ({selectedTime})
                </span>
              </div>
              {additionalMessage.trim() && (
                <div className="pt-1">
                  <span className="text-xs font-bold text-white/60 uppercase block mb-1">Note:</span>
                  <p className="text-xs text-white/80 italic">
                    &ldquo;{additionalMessage}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset / Replay Story Button */}
      <div className="mt-8">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-[#1DB954] transition-colors py-2 px-4 rounded-full glass-pill cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay Story</span>
        </button>
      </div>
    </div>
  );
};
