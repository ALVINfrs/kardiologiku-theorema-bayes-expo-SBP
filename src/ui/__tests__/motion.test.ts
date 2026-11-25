import {
  DURASI,
  MAKS_ANIMASI_BERSAMAAN,
  MAKS_ITEM_STAGGER,
  PEGAS_BAR,
  durasiEfektif,
  nilaiHitungNaik,
} from '../motion';

describe('motion (DESIGN §16)', () => {
  it('durasi interaksi maksimal 400 ms', () => {
    expect(DURASI.tekan).toBeLessThanOrEqual(400);
    expect(DURASI.transisiLayar).toBeLessThanOrEqual(400);
    expect(DURASI.gantiTab).toBeLessThanOrEqual(400);
    expect(DURASI.jedaMasukItem).toBeLessThanOrEqual(400);
  });

  it('jejak 600-900 ms dan hitung-naik 700 ms sesuai tabel', () => {
    expect(DURASI.jejakMin).toBe(600);
    expect(DURASI.jejakMaks).toBe(900);
    expect(DURASI.hitungNaik).toBe(700);
  });

  it('pegas bar sesuai tabel (damping 18, stiffness 160)', () => {
    expect(PEGAS_BAR.damping).toBe(18);
    expect(PEGAS_BAR.stiffness).toBe(160);
  });

  it('maksimal 2 animasi bersamaan, stagger maksimal 6 item', () => {
    expect(MAKS_ANIMASI_BERSAMAAN).toBe(2);
    expect(MAKS_ITEM_STAGGER).toBe(6);
  });

  it('reduceMotion: semua gerak jadi fade <= 120 ms, angka langsung tampil', () => {
    for (const nama of [
      'tekan',
      'transisiLayar',
      'gantiTab',
      'jejak',
    ] as const) {
      expect(durasiEfektif(nama, true)).toBeLessThanOrEqual(120);
    }
    expect(durasiEfektif('hitungNaik', true)).toBe(0);
  });

  it('nilaiHitungNaik: ease-out dari 0 ke nilai', () => {
    expect(nilaiHitungNaik(0, 100, 0)).toBe(0);
    expect(nilaiHitungNaik(0, 100, 1)).toBe(100);
    // ease-out: di tengah jalan sudah melewati setengah
    expect(nilaiHitungNaik(0, 100, 0.5)).toBeGreaterThan(50);
    // monoton naik
    expect(nilaiHitungNaik(0, 100, 0.25)).toBeLessThan(
      nilaiHitungNaik(0, 100, 0.75),
    );
  });
});
