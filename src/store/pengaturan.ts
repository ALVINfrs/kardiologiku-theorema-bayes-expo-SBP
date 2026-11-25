// Store pengaturan (AGENTS §5: Zustand tinggal di src/store/).
// Override manual reduceMotion: null = ikut sistem; true/false = paksa.

import { create } from 'zustand';

interface PengaturanGerak {
  /** null = ikut sistem; true/false = paksa. */
  manual: boolean | null;
  setManual: (nilai: boolean | null) => void;
}

export const usePengaturanGerak = create<PengaturanGerak>()((set) => ({
  manual: null,
  setManual: (manual) => set({ manual }),
}));
