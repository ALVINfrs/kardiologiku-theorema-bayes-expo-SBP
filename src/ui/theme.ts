// Satu-satunya sumber hex (DESIGN §3, §15.1).
// Komponen dilarang memakai hex langsung — pakai token ini lewat
// themeVars.ts (kelas Tailwind) atau useTema() (nilai JS, mis. ikon).

export type TemaMode = 'light' | 'dark';

// Warna tanda vektor gelap — dari docs/assets/logo/kardiologiku-mark-dark.svg
// (bukan token tema light/dark; dipakai saat varian="gelap").
export const WARNA_TANDA_GELAP = {
  jantung: '#FF6B81',
  jejak: '#E8EDF4',
} as const;

export interface TokenWarna {
  paper: string;
  gridSmall: string;
  gridBold: string;
  surface: string;
  line: string;
  ink: string;
  inkMuted: string;
  trace: string;
  traceSoft: string;
  ok: string;
  okBg: string;
  warn: string;
  warnBg: string;
  high: string;
  highBg: string;
  danger: string;
  dangerBg: string;
  info: string;
  infoBg: string;
}

export const tema: Record<TemaMode, TokenWarna> = {
  light: {
    paper: '#FBF1EE',
    gridSmall: '#F0D5CF',
    gridBold: '#E4B7AE',
    surface: '#FFFFFF',
    line: '#EBCFC9',
    ink: '#1D2A3A',
    inkMuted: '#5B6676',
    trace: '#B3122F',
    traceSoft: '#FBE3E3',
    ok: '#0F766E',
    okBg: '#DDF3EF',
    warn: '#8A5A00',
    warnBg: '#FDF2D0',
    high: '#B45309',
    highBg: '#FDE7D6',
    danger: '#9B1C1C',
    dangerBg: '#FDE8E8',
    info: '#1D4E89',
    infoBg: '#E3EEFB',
  },
  dark: {
    paper: '#141A22',
    gridSmall: '#1B232D',
    gridBold: '#232D3A',
    surface: '#1E2530',
    line: '#2C3644',
    ink: '#E8EDF4',
    inkMuted: '#9AA6B8',
    trace: '#FF6B81',
    // Latar *Bg dark = warna terkait pada opasitas 16% di atas surface
    // (DESIGN §3.2), dihitung sekali di sini agar nilainya tetap.
    traceSoft: '#42303D',
    ok: '#34D399',
    okBg: '#224141',
    warn: '#FBBF24',
    warnBg: '#413E2E',
    high: '#FB923C',
    highBg: '#413632',
    danger: '#F87171',
    dangerBg: '#41313A',
    info: '#7FB2F0',
    infoBg: '#2E3C4F',
  },
};

export interface WarnaSimulasi {
  heartRest: string;
  heartActive: string;
  impulse: string;
  nodeGlow: string;
  accessory: string;
  ectopic: string;
}

export const warnaSimulasi: WarnaSimulasi = {
  heartRest: '#C96A6A',
  heartActive: '#FFD7B0',
  impulse: '#FFE08A',
  nodeGlow: '#FFC857',
  accessory: '#7DD3FC',
  ectopic: '#C4B5FD',
};

export type Keparahan = 'rendah' | 'sedang' | 'tinggi' | 'darurat';

export type NamaIkonKeparahan =
  'CircleCheck' | 'CircleAlert' | 'TriangleAlert' | 'Siren';

export interface InfoKeparahan {
  warna: 'ok' | 'warn' | 'high' | 'danger';
  latar: 'okBg' | 'warnBg' | 'highBg' | 'dangerBg';
  ikon: NamaIkonKeparahan;
  label: string;
}

export const petaKeparahan: Record<Keparahan, InfoKeparahan> = {
  rendah: {
    warna: 'ok',
    latar: 'okBg',
    ikon: 'CircleCheck',
    label: 'Risiko rendah',
  },
  sedang: {
    warna: 'warn',
    latar: 'warnBg',
    ikon: 'CircleAlert',
    label: 'Perlu perhatian',
  },
  tinggi: {
    warna: 'high',
    latar: 'highBg',
    ikon: 'TriangleAlert',
    label: 'Perlu diperiksa',
  },
  darurat: {
    warna: 'danger',
    latar: 'dangerBg',
    ikon: 'Siren',
    label: 'Darurat',
  },
};
