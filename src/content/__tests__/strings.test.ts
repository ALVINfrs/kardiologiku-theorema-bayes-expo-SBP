import {
  BANNER_DATA_ESTIMASI,
  DISCLAIMER_LONG,
  DISCLAIMER_SHORT,
  EMERGENCY_BUTTON,
  KUIS_NOTE,
  LABEL_HASIL_UTAMA,
  SIMULASI_NOTE,
  TAP_NADI_NOTE,
} from '../strings';

describe('strings kanonik (DESIGN §12)', () => {
  it('kata-kata sama persis dengan DESIGN §12', () => {
    expect(DISCLAIMER_SHORT).toBe(
      'Aplikasi ini untuk edukasi dan deteksi dini, bukan alat diagnosis medis. Konsultasikan hasilnya dengan dokter.',
    );
    expect(DISCLAIMER_LONG).toBe(
      'Kardiologiku memberikan perkiraan kemungkinan jenis aritmia berdasarkan jawaban yang kamu isi dan basis pengetahuan dari literatur. Hasilnya bukan diagnosis dan tidak menggantikan pemeriksaan dokter atau EKG. Jika kamu mengalami nyeri dada, sesak berat, atau pingsan, segera ke IGD atau hubungi 119/112.',
    );
    expect(BANNER_DATA_ESTIMASI).toBe(
      'Data basis pengetahuan masih berstatus estimasi dan belum divalidasi pakar. Jangan dijadikan acuan medis.',
    );
    expect(SIMULASI_NOTE).toBe(
      'Simulasi edukasi dari rumus, bukan EKG pasien.',
    );
    expect(EMERGENCY_BUTTON).toBe('Darurat: hubungi 119/112');
    expect(TAP_NADI_NOTE).toBe(
      'Perkiraan dari ketukan jari, bukan alat ukur medis.',
    );
    expect(KUIS_NOTE).toBe(
      'Kasus dibangkitkan dari basis pengetahuan (data sintetis), bukan pasien nyata.',
    );
    expect(LABEL_HASIL_UTAMA).toBe('Kemungkinan terbesar');
  });
});
