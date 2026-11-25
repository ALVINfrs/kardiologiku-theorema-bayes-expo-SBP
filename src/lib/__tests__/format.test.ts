import {
  formatBpm,
  formatMs,
  formatPersen,
  formatPersenAngka,
  formatTanggal,
} from '../format';

describe('format (DESIGN §12)', () => {
  it('persen memakai koma desimal Indonesia', () => {
    expect(formatPersen(81.9)).toBe('81,9%');
    expect(formatPersen(100)).toBe('100%');
    expect(formatPersen(0)).toBe('0%');
    expect(formatPersenAngka(81.9)).toBe('81,9');
  });

  it('tanggal format 12 Nov 2026', () => {
    expect(formatTanggal(new Date(2026, 10, 12))).toBe('12 Nov 2026');
    expect(formatTanggal(new Date(2026, 0, 3))).toBe('3 Jan 2026');
  });

  it('ms dan bpm', () => {
    expect(formatMs(120)).toBe('120 ms');
    expect(formatMs(120.6)).toBe('121 ms');
    expect(formatBpm(110)).toBe('110 bpm');
  });
});
