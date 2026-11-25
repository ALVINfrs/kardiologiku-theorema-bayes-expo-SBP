# GERBANG FASE 0: Setup — 2026-11-25

Template PRD §17.1. Cabang: `fase-0-setup`. Setelah laporan ini, **BERHENTI**
dan menunggu persetujuan pemilik (merge ke `main` + tag `fase-0-selesai`
hanya setelah disetujui).

## Commit

`git log --oneline main..HEAD` — **7 commit: 6 task (T-001 s.d. T-006) +
1 revisi T-006**, semua berawalan `T-xxx:`, tidak ada masalah:

- `e782e84` T-001: inisialisasi proyek Expo + config + docs
- `786723a` T-002: tema NativeWind + UI kit + cek-kelas
- `67c69b5` T-003: skeleton navigasi + tab 5
- `0bac630` T-004: tipe + rng + format + rbac + strings
- `6558397` T-005: motion kit Reanimated 4 + reduceMotion
- `6d91159` T-006: logo hero AI + jejak Skia, splash, ikon aplikasi
- `T-006 revisi` (belum di-commit saat laporan ini diperbarui): logo hero
  satu gambar statis (jantung + EKG nyatu), JejakEkgSkia dihapus (DEC-37)

## Perintah

Semua hijau, dijalankan ulang untuk gerbang ini (25 Nov 2026):

- typecheck ✓ (`tsc --noEmit`)
- lint ✓ (`expo lint`, 0 error, 0 warning)
- cek:kelas ✓ (tidak ada kelas terlarang)
- test ✓ — **39 tes lulus** (vitest 12: smoke + format + rng + rbac +
  strings; jest 27: theme + cek-kelas + ProbBar + motion + Logo)
- `expo export --platform android` ✓ (bundle sukses)

## E2E (butir khusus Fase 0, PRD §17.1)

Server Expo Go (tunnel ngrok, masih jalan saat laporan ditulis):

- Link Expo Go: `exp://tldwk5s-anonymous-8081.exp.direct:80`
- Bukti tunnel hidup: `https://tldwk5s-anonymous-8081.exp.direct/status`
  mengembalikan `packager-status:running` (dicek 25 Nov, lewat tunnel).
- Cara buka: instal Expo Go di HP → scan QR / buka link di atas
  (atau ketuk link lalu pilih Expo Go). Tunnel bisa lambat; bila link mati,
  beri tahu agar server di-restart (tunnel anonim ngrok, server jalan di
  VPS Muse; mati bila VM di-restart).
- Yang dicek di HP: (1) app terbuka, splash ≤ 1,6 dtk lalu masuk tab
  Beranda; (2) 5 tab tampil (Beranda, Simulasi, Deteksi, Edukasi, Profil);
  (3) buka `/dev/galeri`: semua komponen tampil, saklar Sistem/Terang/Gelap
  mengubah tema; (4) logo hero tampil — satu gambar statis (jantung +
  EKG nyatu) + denyut; (5) tiap rute placeholder terbuka tanpa crash.

| Butir                        | Hasil            | Bukti                                                      |
| ---------------------------- | ---------------- | ---------------------------------------------------------- |
| App terbuka di Expo Go       | TIDAK DIJALANKAN | Menunggu cek HP pemilik (link di atas)                     |
| Galeri komponen terang/gelap | TIDAK DIJALANKAN | Menunggu cek HP pemilik                                    |
| Logo + splash tampil         | TIDAK DIJALANKAN | Menunggu cek HP pemilik                                    |
| Perintah hijau               | LULUS            | typecheck/lint/cek:kelas/test hijau, 39 tes, export sukses |

## Matriks DoD

DoD per task (PRD §16) + DoD global (§16.0). "Sebagian" berarti bukti lokal
hijau, verifikasi visual di HP masuk E2E di atas.

| Task         | DoD                                                                                                                                                                                 | Hasil                                                                                                                                                                                                                                                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T-001        | Layar "Kardiologiku" di Expo Go; 3 perintah hijau; PROGRESS berisi semua task                                                                                                       | Sebagian (export + tunnel hidup; render HP → E2E)                                                                                                                                                                                                                                                                               |
| T-002        | Galeri `/dev/galeri` semua komponen/state terang+gelap + Sistem/Terang/Gelap; tailwind.config tanpa palet bawaan; cek:kelas hijau + gagal pada kasus negatif; tes token/hex/ProbBar | Sebagian (galeri dibangun + tes hijau; cek visual HP → E2E)                                                                                                                                                                                                                                                                     |
| T-003        | Semua rute §6.2 placeholder; tab 5 + ikon DESIGN §11; tiap rute terbuka tanpa crash                                                                                                 | Sebagian (export + typecheck hijau; buka tiap rute di HP → E2E)                                                                                                                                                                                                                                                                 |
| T-004        | Tes format/rng/rbac; string kanonik identik DESIGN §12                                                                                                                              | ✓                                                                                                                                                                                                                                                                                                                               |
| T-005        | Galeri menampilkan tiap gerak; reduceMotion → fade ≤ 120 ms, angka langsung, jejak statis; tes motion; maks 2 animasi bersamaan                                                     | ✓ (batas 2 animasi sebagai konstanta desain; tidak ada penghitung runtime)                                                                                                                                                                                                                                                      |
| T-006        | Logo terang/gelap/mono 24/72/hero; ikon di app.json; ATTRIBUTION lengkap; tanpa gambar berlisensi tak terverifikasi                                                                 | ✓                                                                                                                                                                                                                                                                                                                               |
| Global §16.0 | typecheck/lint/test hijau; tanpa hex/magic number di komponen; teks UI dari strings.ts; disclaimer/banner; a11y + target ≥ 48dp; 12 kasus emas; PROGRESS + DECISIONS diperbarui     | Sebagian: hijau + 39 tes ✓; hex hanya di theme.ts ✓ (tes theme); string kanonik §12 terpusat di strings.ts, teks placeholder/dev masih inline (bukan copy pengguna); disclaimer/banner + 12 kasus emas belum berlaku (layar Hasil di Fase 1, engine di T-104); a11y label + target ≥ 48dp ✓ di komponen; PROGRESS + DECISIONS ✓ |

## Temuan/risiko

- **Repo GitHub belum ada** (TERBLOKIR, butuh pemilik): `create_repository`
  via integrasi GitHub ditolak 403 — pemilik harus buat repo kosong
  `kardiologiku-theorema-bayes-expo-SBP` (Public, tanpa README/gitignore/
  license) di github.com/new lalu pilih di instalasi Muse GitHub App.
  Push + merge menunggu itu.
- Tunnel Expo Go anonim (ngrok tanpa akun): bisa lambat/putus; bila link
  mati, minta restart server. Alternatif permanen: login akun Expo
  (`npx expo login`) untuk tunnel resmi — butuh akun/izin pemilik.
- Splash JS (≤ 1,6 dtk) berjalan setelah font dimuat; total waktu splash
  = font + ≤ 1,6 dtk. Bila font lambat, fallback 1,5 dtk tetap berlaku.
- Jejak EKG Skia hero dihapus (DEC-37) — komponen `JejakEkgSkia.tsx` sudah
  dihapus dari kode; masih bisa dipulihkan dari git (commit 6d91159) bila
  pemilik berubah pikiran lagi. Pelajaran API Skia v2 (useClock +
  useDerivedValue Reanimated, tidak ada useComputedValue) tetap berlaku
  untuk pemakaian Skia di Fase 4.

## Keputusan baru

- DEC-35 (25 Nov): logo hero final = gambar jantung realistis hasil AI
  (`assets/logo/jantung-hero.webp`) + jejak EKG animasi Skia di depannya;
  Blausen 0451 (DEC-28) batal. Pemilik mengubah 10:50 WIB, klarifikasi
  10:51 WIB. Gambar dilabeli "dibuat AI" di ATTRIBUTION.md.
- DEC-36 (25 Nov): pakai konektor **Context7** (`custom.context7`) untuk
  dokumentasi library terbaru, berlaku mulai **Fase 1** (Fase 0 tidak
  diganggu). Permintaan pemilik 25 Nov 10:11 WIB; sudah terbukti jalan di
  T-003 (dok expo-router SDK 58).
- DEC-37 (25 Nov 11:04 WIB): logo hero final = **satu gambar statis hasil
  AI** (jantung + EKG nyatu di dalam gambar); jejak Skia dicopot dari hero
  (DEC-35 batal). Pemilik memilih opsi "Satu gambar jadi, EKG nyatu".

Catatan: laporan gerbang ini + baris DEC-36 di `docs/DECISIONS.md` masih
berkas working-tree yang belum di-commit (bukan commit task — AGENTS §4a
melarang commit tanpa ID task); di-commit saat gerbang ditutup setelah
persetujuan pemilik.

- DEC-33: matriks RBAC diturunkan dari UC (PRD tidak menyebutkan daftar
  kemampuan eksplisit). DEC-34: kontrak tipe di `src/engine/types.ts`
  (PRD §9.4 menang atas rencana).

## Status

**MENUNGGU** — kode Fase 0 selesai dan hijau; E2E di HP pemilik belum
dijalankan; merge ke `main` + tag `fase-0-selesai` + push GitHub menunggu
persetujuan pemilik (dan repo GitHub dibuat dulu).
