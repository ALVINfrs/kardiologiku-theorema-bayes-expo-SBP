import type {
  BasisPengetahuan,
  Bukti,
  HasilInferensi,
  LangkahBukti,
  NilaiBukti,
  Pendorong,
  Variabel,
} from './types';

const EPS = 1e-6;

export function normalisasi(xs: number[]): number[] {
  const total = xs.reduce((a, b) => a + b, 0);
  return xs.map((x) => x / total);
}

/** Ambil P(bukti | tiap hipotesis). Mengembalikan null kalau nilai tidak valid untuk variabel itu. */
export function kemungkinanBukti(
  v: Variabel,
  nilai: NilaiBukti,
): { p: number[]; label: string } | null {
  if (v.tipe === 'biner') {
    if (typeof nilai !== 'boolean') return null;
    return { p: v.pYa.map((py) => (nilai ? py : 1 - py)), label: nilai ? 'Ya' : 'Tidak' };
  }
  if (typeof nilai !== 'string') return null;
  const idx = v.nilai.findIndex((n) => n.id === nilai);
  if (idx < 0) return null;
  return { p: v.p.map((baris) => baris[idx]), label: v.nilai[idx].label };
}

/**
 * Naive Bayes multi-bukti:
 * P(H|E1..En) = P(H) * prod P(Ej|H) / sum_k [P(Hk) * prod P(Ej|Hk)]
 * Bukti yang tidak diisi dilewati (bukan dianggap "tidak").
 * Dihitung di ruang log supaya tidak underflow.
 */
export function infer(kb: BasisPengetahuan, bukti: Bukti): HasilInferensi {
  const prior = normalisasi(kb.hipotesis.map((h) => h.prior));
  const logSkor = prior.map((p) => Math.log(p));
  const langkah: LangkahBukti[] = [];

  for (const v of kb.variabel) {
    const nilai = bukti[v.id];
    if (nilai === undefined) continue;
    const k = kemungkinanBukti(v, nilai);
    if (!k) continue;
    k.p.forEach((p, i) => {
      logSkor[i] += Math.log(Math.max(p, EPS));
    });
    langkah.push({
      variabelId: v.id,
      pertanyaan: v.pertanyaan,
      nilaiLabel: k.label,
      kemungkinan: k.p,
    });
  }

  const maks = Math.max(...logSkor);
  const relatif = logSkor.map((l) => Math.exp(l - maks));
  const totalRelatif = relatif.reduce((a, b) => a + b, 0);
  const skor = logSkor.map((l) => Math.exp(l));
  const penyebut = skor.reduce((a, b) => a + b, 0);

  const daftar = kb.hipotesis
    .map((h, i) => ({
      id: h.id,
      nama: h.nama,
      prior: prior[i],
      skor: skor[i],
      posterior: relatif[i] / totalRelatif,
    }))
    .sort((a, b) => b.posterior - a.posterior);

  return { daftar, langkah, penyebut };
}

/** Bukti mana yang paling menguatkan hipotesis `topId` dibanding `lawanId` (rasio likelihood). */
export function pendorong(
  hasil: HasilInferensi,
  kb: BasisPengetahuan,
  topId: string,
  lawanId: string,
): Pendorong[] {
  const iTop = kb.hipotesis.findIndex((h) => h.id === topId);
  const iLawan = kb.hipotesis.findIndex((h) => h.id === lawanId);
  return hasil.langkah
    .map((l) => {
      const pTop = l.kemungkinan[iTop];
      const pLawan = l.kemungkinan[iLawan];
      return {
        variabelId: l.variabelId,
        pertanyaan: l.pertanyaan,
        nilaiLabel: l.nilaiLabel,
        pTop,
        pLawan,
        rasio: Math.max(pTop, EPS) / Math.max(pLawan, EPS),
      };
    })
    .sort((a, b) => Math.log(b.rasio) - Math.log(a.rasio));
}

/** Cek konsistensi basis pengetahuan. Mengembalikan daftar galat (kosong = valid). */
export function validasiBasisPengetahuan(kb: BasisPengetahuan): string[] {
  const galat: string[] = [];
  const n = kb.hipotesis.length;
  const TOL = 1e-9;

  const jumlahPrior = kb.hipotesis.reduce((a, h) => a + h.prior, 0);
  if (Math.abs(jumlahPrior - 1) > TOL) galat.push(`Jumlah prior = ${jumlahPrior}, harus 1`);

  const idH = new Set<string>();
  for (const h of kb.hipotesis) {
    if (idH.has(h.id)) galat.push(`ID hipotesis ganda: ${h.id}`);
    idH.add(h.id);
    if (!(h.prior > 0 && h.prior < 1)) galat.push(`Prior ${h.id} di luar (0,1)`);
    for (const a of h.acuan) {
      if (!(a in kb.acuan)) galat.push(`Acuan "${a}" pada ${h.id} tidak ada di daftar acuan`);
    }
  }

  const idV = new Set<string>();
  for (const v of kb.variabel) {
    if (idV.has(v.id)) galat.push(`ID variabel ganda: ${v.id}`);
    idV.add(v.id);
    if (v.tipe === 'biner') {
      if (v.pYa.length !== n) galat.push(`${v.id}: panjang pYa ${v.pYa.length} != ${n}`);
      v.pYa.forEach((p, i) => {
        if (!(p > 0 && p < 1)) galat.push(`${v.id}[${i}] di luar (0,1)`);
      });
    } else {
      if (v.p.length !== n) galat.push(`${v.id}: jumlah baris ${v.p.length} != ${n}`);
      v.p.forEach((baris, i) => {
        if (baris.length !== v.nilai.length) galat.push(`${v.id}[${i}]: panjang baris salah`);
        const jml = baris.reduce((a, b) => a + b, 0);
        if (Math.abs(jml - 1) > TOL) galat.push(`${v.id}[${i}]: jumlah baris = ${jml}, harus 1`);
        baris.forEach((p) => {
          if (!(p > 0 && p < 1)) galat.push(`${v.id}[${i}]: nilai ${p} di luar (0,1)`);
        });
      });
    }
  }
  return galat;
}
