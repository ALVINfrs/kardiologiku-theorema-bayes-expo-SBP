// RBAC lokal (AGENTS §10: tamu < user < pakar < admin).
// Matriks diturunkan dari PRD (UC01/UC08/UC10/UC12, F-20) — lihat DEC-33.
// Role = pembatas tampilan, bukan keamanan server (PRD §6.4).

import type { Role } from '../engine/types';

export type Peran = Role | 'tamu';

export type Kemampuan =
  | 'deteksi'
  | 'simpanRiwayat'
  | 'eksporPdf'
  | 'lihatModePakar'
  | 'ubahKb'
  | 'validasiKonten'
  | 'kelolaPengguna';

const MATRIKS: Record<Peran, Kemampuan[]> = {
  tamu: ['deteksi'],
  user: ['deteksi', 'simpanRiwayat', 'eksporPdf'],
  pakar: [
    'deteksi',
    'simpanRiwayat',
    'eksporPdf',
    'lihatModePakar',
    'ubahKb',
    'validasiKonten',
  ],
  admin: [
    'deteksi',
    'simpanRiwayat',
    'eksporPdf',
    'lihatModePakar',
    'ubahKb',
    'validasiKonten',
    'kelolaPengguna',
  ],
};

export function can(peran: Peran, kemampuan: Kemampuan): boolean {
  return MATRIKS[peran].includes(kemampuan);
}
