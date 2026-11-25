// Format tampilan (DESIGN §12): persen `81,9%` (koma desimal),
// tanggal `12 Nov 2026`, ms `120 ms`, BPM `110 bpm`.

export function formatPersenAngka(persen: number): string {
  return persen.toLocaleString('id-ID', { maximumFractionDigits: 1 });
}

export function formatPersen(persen: number): string {
  return `${formatPersenAngka(persen)}%`;
}

const NAMA_BULAN = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
] as const;

export function formatTanggal(tanggal: Date): string {
  return `${tanggal.getDate()} ${NAMA_BULAN[tanggal.getMonth()]} ${tanggal.getFullYear()}`;
}

export function formatMs(ms: number): string {
  return `${Math.round(ms)} ms`;
}

export function formatBpm(bpm: number): string {
  return `${bpm} bpm`;
}
