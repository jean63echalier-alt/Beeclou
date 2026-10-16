export type Plan = {
  duration: number;
  image: string;
  prompt: string;
  overlay: string;
  tone: 'cream' | 'ink';
  /** Recadrage optionnel : point focal (en %) et zoom de base. */
  crop?: {x: number; y: number; zoom: number};
};

export type ReelData = {
  n: number;
  hook: string;
  duree: number;
  disclaimer: string | null;
  plans: Plan[];
};

export type ReelProps = {
  reel: ReelData;
  /** Images réellement présentes, par index de plan (le reste = placeholder). */
  present: boolean[];
  /** Chemin du logo dans assets/ (ex. brand/logo.png), ou null. */
  logo: string | null;
  /** Chemin de la musique dans assets/ (ex. music/piste.mp3), ou null. */
  music: string | null;
};
