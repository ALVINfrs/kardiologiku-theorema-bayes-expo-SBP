// Katalog gerak (DESIGN §16). Durasi interaksi ≤ 400 ms; maksimal 2 animasi
// bersamaan di luar simulasi. Di bawah reduceMotion semua gerak diganti
// fade ≤ 120 ms, angka langsung tampil, jejak statis, tanpa haptic otomatis.

export const DURASI = {
  /** Tekan (skala 0,98 + haptic ringan). */
  tekan: 120,
  /** Jeda antar item pada masuk berurutan. */
  jedaMasukItem: 40,
  /** Transisi layar stack (fade_from_bottom). */
  transisiLayar: 300,
  /** Ganti tab (fade). */
  gantiTab: 150,
  /** Hitung-naik angka (ease-out). */
  hitungNaik: 700,
  /** Tulis-jejak (tinta) — rentang 600–900 ms. */
  jejakMin: 600,
  jejakMaks: 900,
  /** Fade pengganti di bawah reduceMotion. */
  fadeReduceMotion: 120,
} as const;

export const PEGAS_BAR = { damping: 18, stiffness: 160 } as const;

export const MAKS_ANIMASI_BERSAMAAN = 2;
export const MAKS_ITEM_STAGGER = 6;

export type NamaGerak =
  'tekan' | 'transisiLayar' | 'gantiTab' | 'hitungNaik' | 'jejak';

/** Durasi efektif untuk satu gerak. reduceMotion → fade ≤ 120 ms;
 * hitung-naik dan jejak langsung tampil (0 ms). */
export function durasiEfektif(nama: NamaGerak, reduceMotion: boolean): number {
  if (!reduceMotion) {
    switch (nama) {
      case 'tekan':
        return DURASI.tekan;
      case 'transisiLayar':
        return DURASI.transisiLayar;
      case 'gantiTab':
        return DURASI.gantiTab;
      case 'hitungNaik':
        return DURASI.hitungNaik;
      case 'jejak':
        return (DURASI.jejakMin + DURASI.jejakMaks) / 2;
    }
  }
  if (nama === 'hitungNaik' || nama === 'jejak') return 0;
  return DURASI.fadeReduceMotion;
}

/** Ease-out kubik: 1 - (1 - p)^3. */
export function easeOutCubic(progres: number): number {
  const p = Math.min(1, Math.max(0, progres));
  return 1 - Math.pow(1 - p, 3);
}

/** Nilai hitung-naik pada satu titik progres (0..1). */
export function nilaiHitungNaik(
  dari: number,
  ke: number,
  progres: number,
): number {
  return dari + (ke - dari) * easeOutCubic(progres);
}
