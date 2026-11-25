// Pemindai kelas terlarang (DESIGN §15.4).
// Memindai app/** dan src/**; berkas __tests__ dan *.test.* dilewati karena
// fixture tes sengaja memuat contoh kelas terlarang sebagai data uji.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

export interface PelanggaranKelas {
  berkas?: string;
  baris: number;
  pola: string;
  cocok: string;
}

const ATURAN: Array<{ nama: string; sumber: string }> = [
  {
    nama: 'kelas warna bawaan Tailwind',
    sumber:
      '(bg|text|border|fill|stroke|ring|from|via|to)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\\d+',
  },
  { nama: 'gradient (bg-gradient-*)', sumber: 'bg-gradient-\\w+' },
  {
    nama: 'gradient (from-/via-/to-)',
    sumber: '\\b(from|via|to)-[a-z][\\w-]*',
  },
  { nama: 'blur', sumber: '\\b(backdrop-blur|blur)-[\\w-]*' },
  { nama: 'shadow besar', sumber: 'shadow-(md|lg|xl|2xl)\\b' },
  { nama: 'rounded terlarang', sumber: 'rounded-(2xl|3xl|full)\\b' },
  { nama: 'warna arbitrer -[#...]', sumber: '-\\[#[^\\]]+\\]' },
];

/** Periksa satu teks (isi berkas atau satu baris kelas) — dipakai tes. */
export function periksaKelas(teks: string): PelanggaranKelas[] {
  const keluar: PelanggaranKelas[] = [];
  const barisTeks = teks.split('\n');
  barisTeks.forEach((baris, indeks) => {
    for (const aturan of ATURAN) {
      const pola = new RegExp(aturan.sumber, 'g');
      let cocok: RegExpExecArray | null;
      while ((cocok = pola.exec(baris)) !== null) {
        keluar.push({ baris: indeks + 1, pola: aturan.nama, cocok: cocok[0] });
      }
    }
  });
  return keluar;
}

function semuaBerkas(dir: string, keluar: string[] = []): string[] {
  for (const nama of readdirSync(dir)) {
    const jalur = join(dir, nama);
    if (statSync(jalur).isDirectory()) {
      if (nama === 'node_modules' || nama === '.git') continue;
      semuaBerkas(jalur, keluar);
    } else if (/\.(ts|tsx)$/.test(nama) && !nama.includes('.test.')) {
      if (jalur.includes('__tests__')) continue;
      keluar.push(jalur);
    }
  }
  return keluar;
}

function utama(): number {
  const akar = join(fileURLToPath(import.meta.url), '..', '..');
  const berkas = semuaBerkas(join(akar, 'app')).concat(
    semuaBerkas(join(akar, 'src')),
  );
  let gagal = false;
  for (const jalur of berkas) {
    const isi = readFileSync(jalur, 'utf8');
    const pelanggaran = periksaKelas(isi);
    for (const p of pelanggaran) {
      gagal = true;
      console.error(`${jalur}:${p.baris}: ${p.pola} → ${p.cocok}`);
    }
  }
  if (gagal) {
    console.error(
      'cek-kelas: GAGAL — kelas terlarang ditemukan (DESIGN §15.4).',
    );
    return 1;
  }
  console.log('cek-kelas: OK — tidak ada kelas terlarang.');
  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  process.exit(utama());
}
