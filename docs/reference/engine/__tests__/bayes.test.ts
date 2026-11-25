import { describe, expect, it } from 'vitest';
import seed from '../../../kb-seed.v0.1.json';
import { infer, pendorong, validasiBasisPengetahuan } from '../bayes';
import type { BasisPengetahuan, Bukti } from '../types';

// Saat disalin ke src/, ganti impor seed ke modul KB proyek (src/knowledge/seed.ts).
const KB = seed as unknown as BasisPengetahuan;

const emas: { id: string; bukti: Bukti; top: string; pct: number }[] = [
  { id: 'G01', bukti: { bpm: 'lebih_100', ritme: 'tidak_teratur', berdebar: true }, top: 'fibrilasi_atrium', pct: 81.9 },
  { id: 'G02', bukti: { onset_mendadak: true, ritme: 'teratur', bpm: 'lebih_100' }, top: 'svt', pct: 79.5 },
  { id: 'G03', bukti: { ritme: 'loncat', berdebar: true, bpm: 'normal_60_100' }, top: 'pvc', pct: 83.3 },
  { id: 'G04', bukti: { bpm: 'lebih_100', ritme: 'teratur', kafein_stres: true }, top: 'sinus_takikardia', pct: 65.4 },
  { id: 'G05', bukti: { bpm: 'kurang_60', ritme: 'teratur', pusing: true }, top: 'sinus_bradikardia', pct: 71.8 },
  { id: 'G06', bukti: { gelombang_p: 'gergaji', bpm: 'lebih_100', ritme: 'teratur' }, top: 'atrial_flutter', pct: 78.4 },
  { id: 'G07', bukti: { bpm: 'lebih_100', qrs: 'lebar', pingsan: true }, top: 'vt', pct: 77.2 },
  { id: 'G08', bukti: { delta: true, pr: 'pendek', qrs: 'lebar' }, top: 'wpw', pct: 98.5 },
  { id: 'G09', bukti: { qtc: 'memanjang', pemicu_emosi_olahraga: true, pingsan: true }, top: 'long_qt', pct: 71.0 },
  { id: 'G10', bukti: { st_coved: true, pemicu_demam_tidur: true, riwayat_keluarga: true, pingsan: true }, top: 'brugada', pct: 97.4 },
  { id: 'G11', bukti: { bpm: 'kurang_60', pr: 'panjang', p_tanpa_qrs: true, pingsan: true }, top: 'blok_av', pct: 99.6 },
  { id: 'G12', bukti: {}, top: 'normal', pct: 30.0 },
];

describe('seed KB', () => {
  it('valid', () => expect(validasiBasisPengetahuan(KB)).toEqual([]));
  it('12 hipotesis dan 24 variabel', () => {
    expect(KB.hipotesis).toHaveLength(12);
    expect(KB.variabel).toHaveLength(24);
  });
  it('menolak data rusak', () => {
    const rusak = structuredClone(KB);
    rusak.hipotesis[0].prior = 0.5;
    expect(validasiBasisPengetahuan(rusak).length).toBeGreaterThan(0);
  });
});

describe('kasus emas', () => {
  for (const k of emas) {
    it(`${k.id}: ${k.top} ~ ${k.pct}%`, () => {
      const h = infer(KB, k.bukti);
      expect(h.daftar[0].id).toBe(k.top);
      expect(Math.abs(h.daftar[0].posterior * 100 - k.pct)).toBeLessThanOrEqual(0.1);
    });
  }
});

describe('sifat umum', () => {
  it('posterior berjumlah 1', () => {
    const h = infer(KB, emas[0].bukti);
    expect(Math.abs(h.daftar.reduce((a, b) => a + b.posterior, 0) - 1)).toBeLessThan(1e-12);
  });
  it('tanpa bukti = prior', () => {
    const h = infer(KB, {});
    for (const b of h.daftar) expect(b.posterior).toBeCloseTo(b.prior, 12);
  });
  it('bukti tak dikenal diabaikan', () => {
    const a = infer(KB, { bpm: 'lebih_100' });
    const b = infer(KB, { bpm: 'lebih_100', bpm_palsu: true, ritme: 'nilai_palsu' });
    expect(b.daftar.map((x) => x.posterior)).toEqual(a.daftar.map((x) => x.posterior));
  });
  it('pendorong terurut menurun', () => {
    const h = infer(KB, emas[0].bukti);
    const p = pendorong(h, KB, h.daftar[0].id, h.daftar[1].id);
    for (let i = 1; i < p.length; i++) {
      expect(Math.log(p[i - 1].rasio)).toBeGreaterThanOrEqual(Math.log(p[i].rasio));
    }
  });
  it('cepat (< 20 ms rata-rata)', () => {
    const semua: Bukti = { bpm: 'lebih_100', ritme: 'tidak_teratur', berdebar: true, pusing: true, sesak: false, pingsan: false };
    const t0 = performance.now();
    for (let i = 0; i < 200; i++) infer(KB, semua);
    expect((performance.now() - t0) / 200).toBeLessThan(20);
  });
});
