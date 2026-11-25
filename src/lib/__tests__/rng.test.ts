import { mulberry32 } from '../rng';

describe('rng mulberry32 (AGENTS §5)', () => {
  it('seed sama menghasilkan urutan sama', () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    for (let i = 0; i < 10; i++) {
      expect(a()).toBe(b());
    }
  });

  it('seed berbeda menghasilkan urutan berbeda', () => {
    expect(mulberry32(1)()).not.toBe(mulberry32(2)());
  });

  it('nilai selalu di [0, 1)', () => {
    const rng = mulberry32(7);
    for (let i = 0; i < 100; i++) {
      const nilai = rng();
      expect(nilai).toBeGreaterThanOrEqual(0);
      expect(nilai).toBeLessThan(1);
    }
  });
});
