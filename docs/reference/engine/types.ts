export type Keparahan = 'rendah' | 'sedang' | 'tinggi' | 'darurat';
export type StatusData = 'estimasi' | 'literatur' | 'tervalidasi';
export type Kelompok = 'denyut' | 'gejala' | 'risiko' | 'ekg';
export type Mode = 'awam' | 'lanjutan';
export type NilaiBukti = string | boolean;
export type Bukti = Record<string, NilaiBukti>;

export interface Hipotesis {
  id: string;
  urutan: number;
  nama: string;
  ringkas: string;
  deskripsi: string;
  saran: string;
  keparahan: Keparahan;
  prior: number;
  acuan: string[];
}

interface VariabelDasar {
  id: string;
  kelompok: Kelompok;
  pertanyaan: string;
  bantuan?: string | null;
}

/** Bukti ya/tidak. pYa[i] = P(ya | hipotesis ke-i). P(tidak) = 1 - pYa. */
export interface VariabelBiner extends VariabelDasar {
  tipe: 'biner';
  pYa: number[];
}

/** Bukti berkategori. p[i][j] = P(nilai ke-j | hipotesis ke-i). Tiap baris berjumlah 1. */
export interface VariabelKategori extends VariabelDasar {
  tipe: 'kategori';
  nilai: { id: string; label: string }[];
  p: number[][];
}

export type Variabel = VariabelBiner | VariabelKategori;

export interface BasisPengetahuan {
  versi: string;
  status: StatusData;
  catatan: string;
  acuan: Record<string, string>;
  hipotesis: Hipotesis[];
  variabel: Variabel[];
}

export interface LangkahBukti {
  variabelId: string;
  pertanyaan: string;
  nilaiLabel: string;
  /** P(bukti | hipotesis ke-i), urutan sama dengan kb.hipotesis */
  kemungkinan: number[];
}

export interface BarisHasil {
  id: string;
  nama: string;
  prior: number;
  /** prior x semua likelihood (belum dinormalisasi) */
  skor: number;
  posterior: number;
}

export interface HasilInferensi {
  daftar: BarisHasil[]; // urut dari posterior terbesar
  langkah: LangkahBukti[];
  penyebut: number; // jumlah skor semua hipotesis
}

export interface Pendorong {
  variabelId: string;
  pertanyaan: string;
  nilaiLabel: string;
  pTop: number;
  pLawan: number;
  rasio: number;
}

export interface RedFlag {
  tingkat: 'darurat' | 'segera' | 'waspada';
  judul: string;
  pesan: string;
}
