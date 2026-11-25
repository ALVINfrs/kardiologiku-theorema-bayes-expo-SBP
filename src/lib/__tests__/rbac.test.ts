import { can } from '../rbac';

describe('rbac.can (PRD UC01/UC08/UC10/UC12)', () => {
  it('tamu hanya bisa deteksi', () => {
    expect(can('tamu', 'deteksi')).toBe(true);
    expect(can('tamu', 'simpanRiwayat')).toBe(false);
    expect(can('tamu', 'eksporPdf')).toBe(false);
    expect(can('tamu', 'ubahKb')).toBe(false);
    expect(can('tamu', 'kelolaPengguna')).toBe(false);
  });

  it('user bisa simpan riwayat dan ekspor PDF', () => {
    expect(can('user', 'deteksi')).toBe(true);
    expect(can('user', 'simpanRiwayat')).toBe(true);
    expect(can('user', 'eksporPdf')).toBe(true);
    expect(can('user', 'ubahKb')).toBe(false);
    expect(can('user', 'kelolaPengguna')).toBe(false);
  });

  it('pakar bisa ubah KB dan validasi konten, bukan kelola pengguna', () => {
    expect(can('pakar', 'ubahKb')).toBe(true);
    expect(can('pakar', 'validasiKonten')).toBe(true);
    expect(can('pakar', 'lihatModePakar')).toBe(true);
    expect(can('pakar', 'kelolaPengguna')).toBe(false);
  });

  it('admin bisa semuanya', () => {
    for (const k of [
      'deteksi',
      'simpanRiwayat',
      'eksporPdf',
      'lihatModePakar',
      'ubahKb',
      'validasiKonten',
      'kelolaPengguna',
    ] as const) {
      expect(can('admin', k)).toBe(true);
    }
  });
});
