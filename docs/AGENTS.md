# AGENTS.md — Panduan untuk AI Coding Agent (Kardiologiku)

> Dokumen ini wajib dibaca **paling awal** setiap sesi. Tujuannya satu: agent tidak keluar dari konteks. Semua dokumen ada di folder `docs/` (rujuk dengan `@/docs/...`).
> Kalau kamu merasa "lupa" atau bingung di tengah pekerjaan, baca ulang §10 (Context Pack) lalu buka PRD.

## 1. Urutan baca (wajib)
1. `AGENTS.md` (ini): aturan main dan proses kerja.
2. `docs/PRD.md`: **apa** yang dibangun, perilaku, data, algoritma, fase, task, dan Definition of Done (DoD).
3. `docs/DESIGN.md`: **tampilan** (token, komponen, wireframe, motion, copy).
4. `docs/kb-seed.v0.1.json`: data awal basis pengetahuan (prior, likelihood, teks hipotesis).
5. `docs/PROGRESS.md`: status task terakhir. `docs/DECISIONS.md`: keputusan yang dicatat selama pengerjaan.
6. `docs/reference/`: implementasi acuan engine (types, Bayes, red flag + tes; lulus 12 kasus emas). Titik awal T-004/T-104/T-105, **bukan** pengganti DoD.

**Hierarki kalau dokumen bertentangan:** perilaku/data/algoritma → `PRD.md` menang. Visual/copy → `DESIGN.md` menang. Proses kerja → `AGENTS.md` menang. Konflik yang tidak bisa diselesaikan: **berhenti dan tanya** (lihat §9).

## 2. Ringkasan proyek (5 baris)
- **Kardiologiku**: aplikasi **Expo (React Native) mobile saja, TypeScript**, untuk deteksi dini dan edukasi **12 jenis irama jantung** memakai **Teorema Bayes** (Naive Bayes multi-bukti dari basis pengetahuan, **bukan machine learning**).
- Mata kuliah **Sistem Berbasis Pengetahuan (SBP)**; pengetahuan dari **literatur (guideline/jurnal)**, status data awal `estimasi`.
- Fitur unggulan: **jantung 3D + impuls listrik** dan **EKG sintetis sinkron**, plus "Kenapa hasilnya begini?".
- Data **lokal di SQLite** (offline-first). Login dan role **lokal**.
- Ini aplikasi **edukasi dan skrining awal**, **bukan alat diagnosis medis**.

## 3. Keputusan terkunci (jangan diubah tanpa izin tertulis dari pemilik)
| ID | Keputusan |
|---|---|
| DEC-01 | Platform: Expo mobile (Android/iOS). **Tidak ada target web.** |
| DEC-02 | Bahasa kode: TypeScript `strict`. UI: **Bahasa Indonesia**. |
| DEC-03 | Metode inti: **Teorema Bayes** (Naive Bayes). **Tanpa LLM** di mana pun. |
| DEC-04 | Database: **SQLite lokal (`expo-sqlite`)** lewat lapisan Repository (supaya bisa diganti server nanti). **Tanpa Supabase/Firebase** kecuali task T-605. |
| DEC-05 | Auth dan role **lokal** (user/pakar/admin + mode tamu). Role = pembatas tampilan, **bukan** keamanan server. |
| DEC-06 | Basis pengetahuan = dari `kb-seed.v0.1.json`, status `estimasi`. **Dilarang mengubah/mengarang angka klinis.** |
| DEC-07 | 12 hipotesis dan 24 variabel seperti di seed. Menambah/menghapus butuh persetujuan. |
| DEC-08 | Tanda bahaya (red flag) = aturan IF-THEN deterministik, **terpisah** dari Bayes. |
| DEC-09 | Simulasi = data sintetis dari rumus, selalu berlabel "simulasi edukasi, bukan EKG pasien". |
| DEC-10 | Semua layar mengikuti `DESIGN.md` (konsep "Kertas EKG"). |
| DEC-17 | Jantung 3D **prosedural dari primitif**, tanpa GLB/aset eksternal (PRD Lampiran E). DEC-11 s.d. DEC-16 ada di PRD §3. |
| DEC-18 | Styling: **NativeWind v4.2.x (Tailwind v3)**, palet bawaan Tailwind dilarang. **Bukan v5**, bukan gluestack. |
| DEC-19 | Gerak: Reanimated 4; strip EKG dan glow: Skia. |
| DEC-20 | Font: Fraunces + Instrument Sans + JetBrains Mono. Ikon: Lucide. |
| DEC-21 | Belajar: penguasaan topik = **BKT** (Bayes), soal adaptif = information gain, rekomendasi = posterior deteksi × (1 − pL). |
| DEC-22 | Gambar: ilustrasi kode + maks 12 gambar **CC0/PD/CC BY** beratribusi; lisensi tak jelas = jangan pakai. |
| DEC-23 | Logo: jantung realistis berlisensi + jejak EKG animasi; tanda vektor untuk ukuran kecil/ikon. Dilarang mengambil logo/stok bermerek. |
| DEC-24 | Gamifikasi lembut; tanpa leaderboard, nyawa, notifikasi dorong. |

## 4. Cara kerja: satu task, satu siklus
1. Buka `docs/PROGRESS.md`, ambil **task berikutnya yang dependensinya sudah selesai** (urut ID di PRD §16). **Jangan loncat fase.**
2. Baca blok task di PRD (Dep, Output, Isi, DoD). Baca bagian PRD yang dirujuk.
3. Kerjakan **hanya** yang ada di task itu. Fitur tambahan = tulis di `docs/DECISIONS.md` sebagai saran, jangan dikerjakan.
4. Jalankan semua DoD. Perintah wajib hijau: `npm run typecheck`, `npm run lint`, `npm test`.
5. Centang task di `PROGRESS.md` (tanggal + catatan 1-2 baris + daftar file yang dibuat/diubah).
6. Commit: `T-104: implement bayes engine (golden tests pass)`. Satu task = satu commit (boleh beberapa kalau besar, semuanya diawali ID task).
7. Laporkan memakai template di §8, lalu lanjut ke task berikutnya **di fase yang sama**. Setelah task terakhir fase: jalankan **gerbang fase** (§4a) lalu **berhenti** menunggu persetujuan pemilik.

## 4a. Git dan gerbang fase
**Git**
- Satu branch per fase, dari `main`: `fase-0-setup`, `fase-1-deteksi-inti`, `fase-2-auth-role`, `fase-3-deteksi-pintar`, `fase-4-simulasi`, `fase-5-edukasi-kuis-pakar`, `fase-6-pengujian`.
- Satu commit per task, pesan `T-xxx: ringkasan`. Tidak ada commit tanpa ID task. Jangan `--force`, jangan menulis ulang riwayat yang sudah di-push, jangan commit rahasia (`.env`, kunci).
- Merge ke `main` hanya setelah gerbang fase lolos **dan** pemilik menyetujui. Setelah merge beri tag `fase-N-selesai`.

**Gerbang fase** (wajib di akhir tiap fase; detail dan template laporan di PRD §17.1)
1. **Cek commit:** `git log --oneline main..HEAD` ⇒ satu commit per task fase ini, berawalan ID task. Laporkan task tanpa commit atau commit tanpa ID.
2. **Perintah:** `npm run typecheck`, `npm run lint`, `npm run cek:kelas` (sejak T-002), `npm test`. Semua hijau.
3. **E2E:** jalankan checklist E2E fase ini (PRD §17.1) di Expo Go/emulator; laporkan lulus/gagal **per butir dengan bukti**. Dilarang menulis "lulus" untuk butir yang tidak dijalankan.
4. **Matriks DoD:** task × butir DoD (✓/✗) untuk semua task fase, termasuk DoD global (PRD §16.0).
5. Perbarui `PROGRESS.md` dan `DECISIONS.md`, tulis laporan gerbang, lalu **berhenti**.

## 5. Struktur folder dan konvensi
```
app/            # Expo Router (hanya routing + komposisi layar)
src/engine/     # Domain murni: Bayes, adaptif, what-if, red flag, tap nadi, kuis
src/sim/        # Simulasi murni: beatSchedule, ekgSynth, konduksi, rhythms
src/data/       # SQLite, migrasi, repository
src/services/   # auth, deteksi, export pdf, pubmed
src/store/      # Zustand
src/ui/         # theme + komponen
src/content/    # string kanonik, artikel, glosarium, mitos
src/lib/        # rng, format, rbac
docs/           # AGENTS, PRD, DESIGN, kb-seed, PROGRESS, DECISIONS, ATTRIBUTION, assets/logo, reference/
```
- **Istilah domain pakai Bahasa Indonesia** (`hipotesis`, `bukti`, `likelihood`, `riwayat`, `keparahan`), istilah teknis pakai Inggris (`repository`, `store`, `schema`). Ikuti nama di PRD §9-§10 persis.
- File: `camelCase.ts`, komponen `PascalCase.tsx`. Ekspor bernama (named export), hindari `default` kecuali halaman Expo Router.
- `src/engine/` dan `src/sim/` **dilarang** meng-import `react`, `react-native`, `expo-*`. Mereka fungsi murni, deterministik, bisa dites di Node.
- Angka acak harus lewat `src/lib/rng.ts` (RNG ber-seed) agar tes stabil.
- Semua teks yang tampil ke pengguna ada di `src/content/strings.ts` (string kanonik dari DESIGN.md §12 tidak boleh diubah kata-katanya).

## 6. Perintah
```bash
npx create-expo-app@latest kardiologiku   # sekali saja, lalu bersihkan template
npx expo install <paket>                   # SELALU pakai ini agar versi cocok dengan SDK
npm run typecheck   # tsc --noEmit
npm run lint
npm test            # vitest/jest untuk engine, sim, data
npx expo start      # jalankan di Expo Go / dev build
```
Jangan mem-pin versi manual yang menabrak SDK Expo (Reanimated/worklets/Gesture Handler ikut bundel SDK). NativeWind pakai **4.2.x + Tailwind v3**, bukan v5. Jangan menambah library di luar daftar PRD §6.3 tanpa catatan di `DECISIONS.md` (alasan + alternatif).

## 7. Aturan keras (melanggar = task dianggap gagal)
**Medis dan keselamatan**
- Jangan pernah menulis kata "diagnosis pasti" di UI. Pakai "deteksi dini", "kemungkinan", "estimasi".
- Disclaimer wajib muncul di: onboarding, layar Hasil, ekspor PDF, layar Simulasi, Profil > Tentang. Teks kanonik: DESIGN.md §12.
- Banner "Data estimasi" wajib tampil selama `kb.status !== 'tervalidasi'`.
- Aturan red flag (PRD §11.2) tidak boleh dilemahkan, dimatikan, atau dipindah ke dalam Bayes.
- Jangan membuat klaim medis baru (artikel, soal kuis, mitos, saran) tanpa `sumber` terverifikasi di tabel `sumber`. Gambar berlisensi hanya CC0/Public Domain/CC BY dengan atribusi di `docs/ATTRIBUTION.md`; ragu lisensi ⇒ jangan pakai.

**Engine**
- Bukti yang tidak diisi **dilewati**, bukan dianggap "tidak".
- Hitung di ruang log (`log-sum-exp`), `EPS = 1e-6`, normalisasi prior di awal.
- 12 kasus emas (PRD Lampiran B) **harus selalu hijau**. Mengubah seed = update tabel emas dengan persetujuan.

**Data dan keamanan**
- SQL **selalu parameterized**. Skema berubah **hanya lewat migrasi** bernomor.
- Password: **tidak pernah plaintext**; salted slow hash (PRD §6.4). Sesi di `expo-secure-store`.
- Tidak ada analitik, tidak ada pelacakan, tidak ada jaringan selain PubMed (task T-503) dan feed berita opsional (T-504).
- Data kesehatan tidak keluar dari perangkat kecuali pengguna mengekspor PDF sendiri.

**UI**
- Warna/spasi/font **hanya dari token** (`src/ui/theme.ts` → `themeVars.ts` → kelas Tailwind bertoken). Dilarang hard-code hex di komponen, dilarang kelas warna bawaan Tailwind, gradient, blur, dan `rounded-2xl`. `npm run cek:kelas` harus hijau (DESIGN §15.4).
- Ikuti katalog gerak DESIGN §16; hormati `reduceMotion`.
- Jangan hanya mengandalkan warna untuk makna (tambah ikon + label). Target sentuh ≥ 48dp.
- Hormati `reduceMotion` dan pengaturan haptic.

**Larangan umum**
- Tidak menambah LLM, Supabase/Firebase, target web, atau analitik.
- Tidak mengubah keputusan §3, tidak menghapus tes, tidak menonaktifkan lint/tipe agar "hijau".
- Tidak menulis data klinis palsu/dummy baru. Data demo hanya dari seed.

## 8. Template laporan selesai task
```
Task: T-xxx <judul>
Status: SELESAI | SEBAGIAN | TERBLOKIR
File dibuat/diubah: ...
DoD: [x] butir 1  [x] butir 2  [ ] butir 3 (alasan)
Tes: typecheck OK | lint OK | test N lulus
Catatan/keputusan: ...
Pertanyaan terbuka: ...
```

## 9. Kapan berhenti dan bertanya
Berhenti dan tanya pemilik (jangan menebak) jika: dokumen saling bertentangan; DoD tidak mungkin dipenuhi; butuh library baru; butuh mengubah seed/schema/keputusan terkunci; spike 3D gagal (T-400); ada hal medis yang meragukan. Format pertanyaan: konteks 1 kalimat, 2-3 opsi bertanda rekomendasi, dampak tiap opsi. Catat jawaban di `docs/DECISIONS.md` (ID `DEC-xx`, tanggal, alasan).

## 10. Context Pack (baca ulang kalau tersesat)
- **12 hipotesis (urutan tetap):** `normal, sinus_takikardia, sinus_bradikardia, fibrilasi_atrium, atrial_flutter, svt, pvc, vt, wpw, long_qt, brugada, blok_av`.
- **Kelompok variabel:** `denyut` (bpm, ritme, onset_mendadak), `gejala` (6), `risiko` (7), `ekg` (8, hanya mode Lanjutan). Total 24.
- **Mode:** `awam` (tanpa ekg) | `lanjutan` (semua).
- **Nilai jawaban:** biner = `true | false | undefined (tidak tahu)`. Kategori = id nilai | `undefined`.
- **Role:** `tamu` (tanpa akun) < `user` < `pakar` < `admin`.
- **Status data:** `estimasi` → `literatur` → `tervalidasi`.
- **Keparahan:** `rendah | sedang | tinggi | darurat`. **Red flag:** `darurat | segera | waspada`.
- **Rumus:** `P(H|E) ∝ P(H) · ∏ P(Eⱼ|H)`, dinormalisasi. Hasil = urut posterior terbesar, tampil top 3.
- **Tab:** Beranda, Simulasi, Deteksi, Edukasi, Profil.
- **Fase:** 0 Setup · 1 Deteksi inti · 2 Auth dan role · 3 Deteksi pintar · 4 Simulasi 3D+EKG · 5 Edukasi, kuis, mode pakar · 6 Pengujian dan finalisasi.
- **Belajar (tab Edukasi):** segmen Belajar/Artikel/Kuis/Referensi; 14 topik; penguasaan `pL` (BKT); kuis adaptif (information gain); rekomendasi dari posterior deteksi; gamifikasi lembut (XP, level, streak, 12 lencana).
- **Konsep visual:** "Kertas EKG" (kertas rose pucat `#FBF1EE`, tinta navy `#1D2A3A`, jejak merah `#B3122F`, emas `#FFC857` hanya untuk impuls). Font Fraunces/Instrument Sans/JetBrains Mono. NativeWind v4 + Reanimated 4 + Skia.
- **Mantra:** *Satu task. Ikuti PRD. Jangan mengarang angka medis. Tes hijau. Catat.*
