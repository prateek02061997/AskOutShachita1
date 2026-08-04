export type PageId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface MusicCard {
  id: string;
  title: string;
  artist: string;
  genre: string;
  color: string;
  icon: string;
}

export interface QuizOption {
  id: string;
  label: string;
  emoji: string;
  reaction: string;
}

export type FinalChoice = 'yes' | 'maybe' | 'website' | null;

export interface AppConfig {
  herName: string;
  customNote: string;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        sendData: (data: string) => void;
      };
    };
  }
}
