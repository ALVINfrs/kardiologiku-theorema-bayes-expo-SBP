# Design — Kardiologiku Expo (2026-11-25)

> Spec: `docs/PRD.md` v1.1 + `docs/DESIGN.md` v1.1 (24 Nov 2026). Dokumen ini
> HANYA mencatat keputusan hasil brainstorming 25 Nov 2026; semua perilaku,
> data, dan task mengikuti PRD. Jangan ubah `docs/PRD.md`.

**Intent (why):** bangun aplikasi mobile Kardiologiku (SBP Kelompok 4, R7L)
sesuai PRD — deteksi dini + edukasi aritmia 12 irama via Teorema Bayes,
simulasi jantung 3D + EKG sinkron — karena mockup web sudah membuktikan
konsepnya dan sekarang butuh aplikasi Expo sungguhan yang bisa diuji dosen.

**Goals:** 7 fase PRD §16 selesai berurutan, tiap task hijau
(typecheck + lint + test) lalu commit `T-xxx: ringkasan`; tiap fase
ditutup gerbang fase §17.1 dan menunggu persetujuan pemilik.
**Non-goals:** tanpa LLM, tanpa Supabase/Firebase, tanpa target web,
tanpa mengubah seed/skema/keputusan terkunci tanpa izin pemilik.
**Anti-goal:** aplikasi yang "kelihatan jadi" tapi angka Bayes-nya tidak
sama dengan engine acuan, atau gambar tanpa lisensi terverifikasi.

## Keputusan pemilik (25 Nov 2026)

1. **Repo:** `kardiologiku-theorema-bayes-expo-SBP`, publik.
   Workspace: `~/workspace/kardiologiku/` (Expo project root, `docs/` di dalam).
2. **Aset 3D:** pakai mockup web yang sudah ada
   (`kardiologiku-mockup-ui-mobile-jantung-3d`): GLB HuBMAP HRA heart-female
   v1.3 + blood vasculature female v1.3 (CC BY 4.0). Karena aset itu tidak ada
   di repo manapun, jalur penyalinannya: unduh ulang kedua GLB dari manifest
   resmi HuBMAP ke `assets/heart3d/`, dicatat sebagai **DEC-25**.
   Porting web → `@react-three/fiber/native` + `expo-gl`, tanpa DOM, tanpa
   OrbitControls drei (pakai PanResponder, Lampiran E.6). Spike T-400 tetap
   jalan pakai aset ini (≥ 30 fps); bila gagal, berhenti dan laporkan.
3. **Redesign UI:** arah "Kertas EKG" dipertahankan sebagai fondasi
   (DEC-10 tetap), tapi dielevasi: merah jantung tetap warna utama,
   animasi keren (Reanimated 4 + Skia), desain elegan modern, anti AI-slop
   (tanpa gradien ungu-biru generik, tanpa kartu kaca berlebihan, tanpa
   emoji sebagai ikon). Detail visual dicatat di `docs/DECISIONS.md`.
4. **Logo hero:** rekomendasi agent dipakai — **Blausen 0451, Heart Anterior**
   (Blausen Medical Communications, CC BY, Wikimedia Commons). Verifikasi
   lisensi di halaman berkas pada hari unduh; versi tanpa label, latar
   transparan; simpan WebP ≤ 150 KB di `assets/logo/jantung-realistis.webp`.
   Bila tidak bisa diunduh/diverifikasi: berhenti di bagian itu, pakai
   varian `mark` (vektor, sudah ada di `docs/assets/logo/`) sebagai logo
   utama, dan laporkan ke pemilik.
   **DIUBAH pemilik 25 Nov 10:50 WIB, diklarifikasi 10:51 WIB (DEC-35):**
   final = satu gambar jantung realistis **hasil AI**
   (`assets/logo/jantung-hero.webp`, 660×660, 41 KB, tanpa garis EKG di
   dalam gambar) + **jejak EKG animasi Skia di depannya**. Blausen tidak
   dipakai; file hasil olahannya sudah dihapus.
   **DIUBAH LAGI pemilik 25 Nov 11:04 WIB (DEC-37, final):** satu gambar
   jadi — jantung realistis hasil AI **dengan garis irama EKG menyatu di
   dalam gambar** (660×660, 47 KB); jejak Skia dicopot dari hero.
5. **Gambar kuis/artikel:** **generate** (ilustrasi konsisten, tanpa risiko
   lisensi). Tetap patuh DEC-22: maks 12 gambar berlisensi + ilustrasi kode.

## Approaches (yang dipertimbangkan)

- **Eksekusi inline (native) — DIPILIH.** Agent mengerjakan sendiri
  fase per fase di sesi ini, TDD per task, tanpa subagent review
  (pemilik: "jangan dispatch subagent buat review"). Alasan: fase harus
  berurutan, konteks PRD sudah di tangan, dan pemilik mau progres yang
  bisa diikuti langsung. Kelemahan: tidak ada reviewer segar per task —
  diganti dengan gerbang fase + tes hijau + E2E per fase.
- Subagent-driven (satu subagent per task + reviewer per task) — ditolak
  pemilik untuk review; tidak dipakai.
- Spike dulu sebelum Fase 0 — tidak perlu: T-400 adalah spike resmi di
  Fase 4; Fase 0-1 tidak bergantung 3D.

## Yang diserahkan ke builder

- Urutan task, file, signature, dan nilai exact ada di
  `docs/superpowers/plans/YYYY-MM-DD-fase-N-*.md` (satu plan per fase).
- Ledger progres: `.superpowers/sdd/<plan>/progress.md` — bila konteks
  habis, lanjut dari ledger + `git log`, jangan ulang task yang sudah
  `complete`.
- Ragu / dokumen bertentangan / DoD tidak bisa dipenuhi: BERHENTI dan tanya
  pemilik (AGENTS.md). Jangan menebak.
