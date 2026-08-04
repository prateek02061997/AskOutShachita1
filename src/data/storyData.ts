import { MusicCard, QuizOption } from '../types';

export const MUSIC_CARDS: MusicCard[] = [
  {
    id: '1',
    title: 'Indie Late Night',
    artist: 'Shared Taste Vol. 1',
    genre: 'Chill Vibes',
    color: 'from-emerald-600/30 to-teal-900/40',
    icon: '🎧',
  },
  {
    id: '2',
    title: 'Workplace Surviving Hits',
    artist: 'Coffee & Laughter',
    genre: 'Colleague Favorites',
    color: 'from-green-500/30 to-emerald-950/50',
    icon: '☕',
  },
  {
    id: '3',
    title: 'AUX Cord Battles',
    artist: 'Random Recommendations',
    genre: 'Underrated Gems',
    color: 'from-cyan-600/30 to-blue-900/40',
    icon: '🚗',
  },
  {
    id: '4',
    title: '99.9% Good Vibes',
    artist: 'Spotify Algorithm',
    genre: 'Daily Mix 1',
    color: 'from-emerald-400/30 to-green-900/40',
    icon: '✨',
  },
];

export const OBSERVATION_CARDS = [
  { text: 'Easy conversations', icon: '✔', emoji: '💬' },
  { text: 'Random laughs', icon: '✔', emoji: '😂' },
  { text: 'Comfortable silence', icon: '✔', emoji: '🧘' },
  { text: 'Good vibes', icon: '✔', emoji: '✨' },
  { text: 'No forced conversations', icon: '✔', emoji: '🍃' },
];

export const LOADING_MESSAGES = [
  'Calculating compatibility...',
  'Checking playlist similarity...',
  'Comparing sense of humour...',
  'Verifying random conversations...',
  'Finding shared brain cells...',
  'Analyzing coffee to music ratio...',
  'Detecting AUX cord readiness...',
];

export const QUIZ_OPTIONS: QuizOption[] = [
  {
    id: 'spotify',
    label: 'Spotify Algorithm',
    emoji: '🟢',
    reaction: 'Classic! Though sometimes AI gets weirdly specific...',
  },
  {
    id: 'friends',
    label: 'Friends',
    emoji: '👯‍♀️',
    reaction: 'Always a solid way to find unexpected jams!',
  },
  {
    id: 'reels',
    label: 'Random Instagram Reel',
    emoji: '📱',
    reaction: 'Guilty as charged! That 15-second loop gets stuck forever.',
  },
  {
    id: 'good_taste',
    label: 'Someone with good taste 😉',
    emoji: '✨',
    reaction: 'Ding ding ding! Correct answer! (Self-promotional, but accurate 😉)',
  },
];
