import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Heart, Sparkles, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  herName: string;
  onSaveName: (name: string) => void;
}

export const CustomizeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  herName,
  onSaveName,
}) => {
  const [name, setName] = useState(herName);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveName(name);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-sm p-8 rounded-[32px] glass-card text-left flex flex-col gap-5 shadow-2xl relative"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white glass-pill cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-[#1DB954]">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-lg font-extrabold text-white">Customize Person</h3>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-white/80 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#1DB954]" />
                  <span>Her Name (Optional)</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah"
                  className="w-full px-4 py-3 rounded-full bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-[#1DB954] transition-colors"
                />
                <span className="text-[11px] text-white/40">
                  This will customize greetings across the story!
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save Personalization</span>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
