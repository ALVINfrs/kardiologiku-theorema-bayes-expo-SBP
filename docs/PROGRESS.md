# PROGRESS.md

Centang saat task **selesai dan DoD terpenuhi**. Format catatan: `YYYY-MM-DD, 1-2 baris, file utama`.

## FASE 0: Setup dan fondasi

- [x] **T-001** Inisialisasi proyek — 2026-11-25, scaffold Expo SDK 58 + TS strict + eslint/prettier/vitest, typecheck/lint/test hijau, bundle Android sukses (2.8 MB). File: package.json, app.json, app/, src/lib/**tests**/smoke.test.ts, vitest.config.mts, eslint.config.js. (Cek tampil di HP pemilik menyusul di gerbang Fase 0.)
- [x] **T-002** Tema, NativeWind, dan UI kit — 2026-11-25, NativeWind 4.2.7 + Tailwind 3.4.19, 13 komponen DESIGN §6 + galeri dev, typecheck/lint/test hijau (12 tes), cek:kelas hijau + tes negatif lolos, bundle Android 6.6 MB. File: src/ui/theme.ts, themeVars.ts, fonts.ts, components/, app/dev/galeri.tsx, tailwind.config.js, scripts/cek-kelas.ts. (Tes komponen di Jest+jest-expo, DEC-32; tes logika murni tetap Vitest.)
- [x] **T-003** Skeleton navigasi — 2026-11-25, semua rute §6.2 sebagai placeholder + tab 5 (ikon DESIGN §11), gerbang stub redirect ke tabs, typecheck/lint/test hijau, bundle Android sukses. File: app/(tabs)/_layout.tsx, app/index.tsx, app/**/… (31 berkas rute), src/ui/components/LayarPlaceholder.tsx. (Cek tiap rute terbuka tanpa crash menyusul di gerbang Fase 0 via Expo Go.)
- [x] **T-004** Tipe dan utilitas — 2026-11-25, kontrak §9.4 di `src/engine/types.ts`, rng mulberry32, format id-ID, rbac.can + matriks (DEC-33), strings kanonik §12; 24 tes hijau total. File: src/engine/types.ts, src/lib/{rng,format,rbac}.ts, src/content/strings.ts.
- [x] **T-005** Motion kit — 2026-11-25, preset DESIGN §16 (durasi ≤400 ms, jejak 600–900, hitung-naik 700, pegas bar 18/160), TraceDraw/CountUp/PressScale/Stagger + useReduceMotion (sistem + override manual); galeri menampilkan tiap gerak + saklar reduceMotion; 34 tes hijau total. File: src/ui/motion.ts, src/ui/useReduceMotion.ts, src/ui/components/motion.tsx, jest.setup.js, jest.resolver.js.
- [x] **T-006** Logo, splash, dan ikon aplikasi — 2026-11-25, LogoMark (terang/gelap/mono, 24/72), LogoHero (satu gambar AI statis: jantung + EKG nyatu, + denyut), LogoLockup, Splash §17.5 (≤1,6 dtk / 600 ms statis), ikon app + adaptive + monochrome di app.json; ATTRIBUTION.md lengkap (gambar dilabeli AI); 39 tes hijau total. Revisi 11:04 WIB (DEC-37): gambar hero diganti ke satu gambar jadi ber-EKG, JejakEkgSkia dihapus. File: src/ui/components/Logo.tsx, assets/logo/jantung-hero.webp, assets/icon-*.png, app.json, app/_layout.tsx.

## FASE 1: Deteksi inti

- [ ] **T-101** Modul seed KB + validator
- [ ] **T-102** SQLite, migrasi, seeding
- [ ] **T-103** Repository
- [ ] **T-104** Mesin inferensi Bayes
- [ ] **T-105** Evaluator red flag
- [ ] **T-106** Store deteksi + DeteksiService
- [ ] **T-107** Wizard Deteksi
- [ ] **T-108** Panel probabilitas live
- [ ] **T-109** Layar Hasil
- [ ] **T-110** Layar "Kenapa hasilnya begini?"
- [ ] **T-111** Onboarding, Beranda, Pengaturan dasar, Tentang

## FASE 2: Auth dan role (lokal)

- [ ] **T-201** Setup Admin dan gerbang sesi
- [ ] **T-202** AuthService + UserRepository + hashing
- [ ] **T-203** UI Login/Daftar/Tamu/Logout
- [ ] **T-204** RBAC
- [ ] **T-205** Riwayat
- [ ] **T-206** Profil
- [ ] **T-207** Kelola pengguna (admin)

## FASE 3: Deteksi pintar

- [ ] **T-301** Pertanyaan adaptif
- [ ] **T-302** Bagaimana kalau?
- [ ] **T-303** Tap Nadi
- [ ] **T-304** Tren riwayat
- [ ] **T-305** Ekspor PDF

## FASE 4: Simulasi jantung 3D + EKG

- [ ] **T-400** Spike 3D (go/no-go)
- [ ] **T-401** Irama, BeatScheduler
- [ ] **T-402** EkgSynth + EkgStrip
- [ ] **T-403** Geometri jantung + KonduksiModel
- [ ] **T-404** HeartView 2D (fallback permanen)
- [ ] **T-405** HeartView 3D
- [ ] **T-406** Layar Simulasi
- [ ] **T-407** Mode khusus
- [ ] **T-408** Haptic, reduceMotion, pengaturan 3D/2D
- [ ] **T-409** Validasi morfologi dan performa

## FASE 5: Edukasi, kuis, gamifikasi, mode pakar

- [ ] **T-501** Konten seed
- [ ] **T-502** UI Edukasi (hub dan Referensi)
- [ ] **T-503** Klien PubMed
- [ ] **T-504** Berita
- [ ] **T-505** Kasus pasien virtual (mesin)
- [ ] **T-506** Mode Pakar
- [ ] **T-507** Ekspor/impor KB JSON
- [ ] **T-508** Migrasi #2 dan repository belajar
- [ ] **T-509** Model blok artikel + pembaca interaktif
- [ ] **T-510** Ilustrasi kode + gambar berlisensi
- [ ] **T-511** Artikel seed + bank soal seed
- [ ] **T-512** Mesin BKT, pemilih soal, rekomendasi
- [ ] **T-513** UI Kuis + rekomendasi di Hasil Deteksi
- [ ] **T-514** Gamifikasi dan Peta Belajar

## FASE 6: Pengujian dan finalisasi

- [ ] **T-601** Evaluasi akurasi vs kasus rujukan
- [ ] **T-602** Uji usability (SUS)
- [ ] **T-603** QA aksesibilitas dan performa
- [ ] **T-604** Build dan dokumentasi
- [ ] **T-605** (Opsional) Adapter server

## Catatan sesi

- (kosong)
