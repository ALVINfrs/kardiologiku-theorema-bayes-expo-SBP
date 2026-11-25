# DECISIONS.md

Catat setiap keputusan yang diambil selama pengerjaan. Keputusan terkunci awal (DEC-01 s.d. DEC-24) ada di `AGENTS.md` §3 dan `PRD.md` §3. Keputusan baru mulai dari DEC-25.
Perubahan terhadap keputusan terkunci **hanya dengan persetujuan pemilik**.

| ID | Tanggal | Konteks (1 kalimat) | Keputusan | Opsi lain yang dipertimbangkan | Dampak |
|---|---|---|---|---|---|
| DEC-25 | 2026-11-25 | Jantung 3D aplikasi nyata | Pakai mockup yang sudah ada (GLB HuBMAP HRA heart-female v1.3 + blood vasculature, CC BY 4.0); unduh ulang dari manifest resmi HuBMAP ke `assets/heart3d/`; porting ke R3F native + expo-gl, tanpa DOM/OrbitControls; spike T-400 tetap jalan (≥ 30 fps); fallback 2D tetap wajib | Prosedural Lampiran E (DEC-17) | DEC-17 dikecualikan untuk aset 3D saja; PRD tidak diubah |
| DEC-26 | 2026-11-25 | SDK Expo | `create-expo-app@latest` memasang SDK 58 (expo 58.0.26), bukan SDK 57 seperti snapshot PRD §6.3 | Pin SDK 57 manual | Dipakai SDK terbaru sesuai AGENTS §6; jangan pin manual menabrak bundel SDK |
| DEC-27 | 2026-11-25 | Arah redesign UI | "Kertas EKG" dipertahankan sebagai fondasi (DEC-10 tetap); dielevasi: merah jantung warna utama, animasi Reanimated 4 + Skia, elegan modern, anti AI-slop (tanpa gradien ungu-biru generik, tanpa kartu kaca, tanpa emoji sebagai ikon) | Redesign total ke arah visual baru | Pemilik menyetujui elevasi; DEC-10 tidak diubah |
| DEC-28 | 2026-11-25 | Logo hero | Blausen 0451 Heart Anterior (CC BY); verifikasi lisensi di halaman berkas saat unduh (T-006) | Lynch (CC BY 2.5) / NIAID (PD) | Rekomendasi agent, disetujui pemilik |
| DEC-29 | 2026-11-25 | Gambar kuis/artikel | Generate gambar (ilustrasi konsisten, tanpa risiko lisensi); tetap patuh DEC-22 (maks 12 gambar berlisensi) | Foto asli CC Wikimedia/Openverse | Pemilik memilih opsi A |
| DEC-30 | 2026-11-25 | Repo + workspace + eksekusi | Repo `kardiologiku-theorema-bayes-expo-SBP` (publik, dibuat manual oleh pemilik — integrasi GitHub 403 saat membuat repo); workspace `~/workspace/kardiologiku/`; eksekusi inline tanpa subagent review; plan + DoD per fase di `docs/superpowers/` sebagai memori | — | — |
| DEC-31 | 2026-11-25 | Lingkungan build: /tmp penuh | `/tmp` adalah tmpfs 512 MB (penuh saat scaffold + Metro cache → ENOSPC). Jangan scaffold/build di /tmp; jalankan perintah Expo/Metro dengan `TMPDIR=/home/hatch/workspace/.tmp` | Bersihkan /tmp tiap kali | Aturan lingkungan server, bukan PRD |

## Saran fitur/perbaikan (belum dikerjakan)
- (kosong)

## Pertanyaan terbuka dan jawabannya
- (lihat PRD §19; tulis jawaban di sini)
