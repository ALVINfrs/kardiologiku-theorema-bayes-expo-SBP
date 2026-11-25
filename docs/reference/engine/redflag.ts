import type { BasisPengetahuan, Bukti, HasilInferensi, RedFlag } from './types';

/**
 * Aturan IF-THEN deterministik untuk tanda bahaya (PRD §11.2).
 * Dievaluasi terpisah dari Bayes: tanda bahaya tidak boleh menunggu probabilitas.
 */
export function evaluasiRedFlag(
  kb: BasisPengetahuan,
  bukti: Bukti,
  hasil: HasilInferensi,
): RedFlag[] {
  const flags: RedFlag[] = [];
  const ya = (id: string) => bukti[id] === true;
  const teratas = hasil.daftar[0];
  const hip = kb.hipotesis.find((h) => h.id === teratas.id);
  const adaBukti = hasil.langkah.length > 0;

  if (ya('pingsan') && (ya('nyeri_dada') || ya('sesak'))) {
    flags.push({
      tingkat: 'darurat',
      judul: 'Pingsan disertai nyeri dada atau sesak',
      pesan: 'Segera ke IGD atau hubungi 119/112. Jangan berkendara sendiri.',
    });
  }
  if (ya('nyeri_dada') && ya('sesak') && ya('pusing')) {
    flags.push({
      tingkat: 'darurat',
      judul: 'Nyeri dada, sesak, dan pusing bersamaan',
      pesan: 'Kombinasi ini perlu penanganan segera. Ke IGD atau hubungi 119/112.',
    });
  }
  if (ya('pingsan') && bukti['bpm'] === 'lebih_100') {
    flags.push({
      tingkat: 'darurat',
      judul: 'Pingsan dengan denyut sangat cepat',
      pesan: 'Segera cari pertolongan medis. Ke IGD atau hubungi 119/112.',
    });
  }
  if (adaBukti && hip?.keparahan === 'darurat' && teratas.posterior >= 0.2) {
    flags.push({
      tingkat: 'darurat',
      judul: `Pola menyerupai ${hip.nama}`,
      pesan: 'Irama ini berpotensi mengancam nyawa. Segera ke IGD, jangan menunggu.',
    });
  }
  if (ya('pingsan') && ya('riwayat_keluarga')) {
    flags.push({
      tingkat: 'segera',
      judul: 'Pingsan dengan riwayat keluarga meninggal mendadak',
      pesan: 'Periksakan ke dokter spesialis jantung sesegera mungkin.',
    });
  } else if (ya('pingsan')) {
    flags.push({
      tingkat: 'segera',
      judul: 'Pernah pingsan atau hampir pingsan',
      pesan: 'Periksakan ke dokter dalam waktu dekat untuk mencari penyebabnya.',
    });
  }
  if (adaBukti && hip?.keparahan === 'tinggi' && teratas.posterior >= 0.5) {
    flags.push({
      tingkat: 'waspada',
      judul: `Kemungkinan terbesar: ${hip.nama}`,
      pesan: 'Sebaiknya periksa ke dokter dan lakukan EKG dalam waktu dekat.',
    });
  }
  return flags;
}
