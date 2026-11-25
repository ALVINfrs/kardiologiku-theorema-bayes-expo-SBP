# docs: paket dokumen Kardiologiku

Aplikasi mobile (Expo + TypeScript) deteksi dini dan edukasi aritmia jantung berbasis **Teorema Bayes**, untuk mata kuliah Sistem Berbasis Pengetahuan.

| Berkas | Fungsi |
|---|---|
| `AGENTS.md` | Aturan kerja agent, keputusan terkunci (DEC-01 s.d. DEC-24), Git, gerbang fase, Context Pack |
| `PRD.md` | Sumber kebenaran: fitur, arsitektur, diagram, data (SQLite), algoritma, simulasi, modul Belajar (artikel, kuis, BKT, gamifikasi), 58 task + DoD, pengujian, lampiran |
| `DESIGN.md` | Desain visual "Kertas EKG": token, tipografi, komponen, wireframe, NativeWind, katalog gerak, logo, layar interaktif, gamifikasi |
| `kb-seed.v0.1.json` | Basis pengetahuan awal (12 hipotesis x 24 variabel). Status `estimasi` |
| `PROGRESS.md` | Daftar task, dicentang agent |
| `DECISIONS.md` | Log keputusan, saran, pertanyaan terbuka |
| `ATTRIBUTION.md` | Lisensi aset pihak ketiga (kandidat jantung realistis untuk logo) |
| `assets/logo/` | Tanda vektor (terang, gelap, mono) dan ikon aplikasi 1024 |
| `reference/` | Implementasi acuan engine (types, Bayes, red flag) + 29 tes yang lulus |

## Mulai
1. Buat repo kosong, taruh folder ini sebagai `docs/` di root.
2. (Opsional) Bila agent membaca `AGENTS.md` dari root otomatis, buat file `AGENTS.md` di root berisi satu baris: `Baca @/docs/AGENTS.md`.
3. Prompt untuk agent diberikan terpisah lewat pesan chat (bukan berkas di folder ini). Mulai dari prompt pembuka, lalu satu fase per sesi sampai Fase 6.

## Catatan penting
- Seluruh angka klinis di seed (dan parameter BKT) masih **estimasi**. App menampilkan banner untuk itu.
- Detail sitasi pada daftar acuan wajib dicek ulang sebelum masuk laporan.
- Aplikasi ini edukasi dan skrining awal, **bukan alat diagnosis medis**.
