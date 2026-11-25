import { describe, expect, it } from 'vitest';
import seed from '../../../kb-seed.v0.1.json';
import { infer } from '../bayes';
import { evaluasiRedFlag } from '../redflag';
import type { BasisPengetahuan, Bukti } from '../types';

const KB = seed as unknown as BasisPengetahuan;
const flags = (b: Bukti) => evaluasiRedFlag(KB, b, infer(KB, b));
const ada = (b: Bukti, tingkat: string, kata: string) =>
  flags(b).some((f) => f.tingkat === tingkat && f.judul.includes(kata));

describe('red flag', () => {
  it('R1 pingsan + nyeri dada', () => expect(ada({ pingsan: true, nyeri_dada: true }, 'darurat', 'Pingsan disertai')).toBe(true));
  it('R2 nyeri dada + sesak + pusing', () =>
    expect(ada({ nyeri_dada: true, sesak: true, pusing: true }, 'darurat', 'Nyeri dada, sesak')).toBe(true));
  it('R3 pingsan + bpm > 100', () => expect(ada({ pingsan: true, bpm: 'lebih_100' }, 'darurat', 'denyut sangat cepat')).toBe(true));
  it('R4 pola VT (G07)', () => expect(ada({ bpm: 'lebih_100', qrs: 'lebar', pingsan: true }, 'darurat', 'Pola menyerupai')).toBe(true));
  it('R5 pingsan + riwayat keluarga, bukan R6', () => {
    const f = flags({ pingsan: true, riwayat_keluarga: true });
    expect(f.some((x) => x.judul.includes('riwayat keluarga'))).toBe(true);
    expect(f.some((x) => x.judul === 'Pernah pingsan atau hampir pingsan')).toBe(false);
  });
  it('R6 pingsan saja', () => expect(ada({ pingsan: true }, 'segera', 'Pernah pingsan')).toBe(true));
  it('R7 AF >= 50% (G01)', () =>
    expect(ada({ bpm: 'lebih_100', ritme: 'tidak_teratur', berdebar: true }, 'waspada', 'Kemungkinan terbesar')).toBe(true));
  it('tanpa bukti = tanpa flag', () => expect(flags({})).toEqual([]));
  it('urutan: darurat sebelum segera sebelum waspada', () => {
    const urut = { darurat: 0, segera: 1, waspada: 2 } as const;
    const t = flags({ pingsan: true, nyeri_dada: true, bpm: 'lebih_100', qrs: 'lebar' }).map((f) => urut[f.tingkat]);
    expect([...t]).toEqual([...t].sort((a, b) => a - b));
  });
});
