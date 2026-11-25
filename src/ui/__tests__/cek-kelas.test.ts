import { periksaKelas } from '../../../scripts/cek-kelas';

// String contoh dirakit dinamis agar berkas tes ini sendiri tidak memicu
// pemindaian cek-kelas (pemindai melewati __tests__, lihat cek-kelas.ts).
const dilarang = (bagian: string) => `flex ${bagian} p-4`;
const benar = 'bg-surface border-line text-ink rounded-card p-4';

describe('cek-kelas (DESIGN §15.4)', () => {
  it('meloloskan kelas bertoken', () => {
    expect(periksaKelas(benar)).toEqual([]);
    expect(periksaKelas('bg-trace text-surface rounded-button h-12')).toEqual(
      [],
    );
    expect(periksaKelas('shadow-sm shadow-none')).toEqual([]);
  });

  it('menggagalkan kelas warna bawaan Tailwind', () => {
    for (const k of ['bg-red-500', 'text-blue-600', 'border-gray-300']) {
      expect(periksaKelas(dilarang(k)).length).toBeGreaterThan(0);
    }
  });

  it('menggagalkan gradient, blur, shadow besar, dan rounded terlarang', () => {
    expect(periksaKelas(dilarang('bg-gradient-to-r'))).not.toEqual([]);
    expect(periksaKelas(dilarang('from-red-500'))).not.toEqual([]);
    expect(periksaKelas(dilarang('backdrop-blur-md'))).not.toEqual([]);
    expect(periksaKelas(dilarang('shadow-lg'))).not.toEqual([]);
    expect(periksaKelas(dilarang('rounded-2xl'))).not.toEqual([]);
    expect(periksaKelas(dilarang('rounded-full'))).not.toEqual([]);
  });

  it('menggagalkan warna arbitrer -[#...]', () => {
    expect(periksaKelas(dilarang('bg-[#B3122F]'))).not.toEqual([]);
    expect(periksaKelas(dilarang('text-[#1D2A3A]'))).not.toEqual([]);
  });

  it('melaporkan pola dan baris yang melanggar', () => {
    const hasil = periksaKelas('bg-surface\ntext-red-500 p-4');
    expect(hasil).toHaveLength(1);
    expect(hasil[0].baris).toBe(2);
    expect(hasil[0].pola).toMatch(/warna bawaan/);
  });
});
