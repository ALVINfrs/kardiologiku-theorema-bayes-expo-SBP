# DESIGN.md — Kardiologiku

Versi 1.1 · 24 Nov 2026 · Pasangan dari `PRD.md`. Semua nilai di sini adalah **sumber kebenaran visual**; implementasi lewat `src/ui/theme.ts`.

## 1. Konsep: "Kertas EKG"
Identitas visual diambil dari kertas grafik EKG asli: **kertas rose pucat berkisi**, **tinta navy** untuk teks, dan **jejak merah** (trace) sebagai aksen utama. Ini bukan tema generik: grid kertas muncul sebagai tekstur halus di latar layar utama, bar probabilitas digambar seperti "strip", dan angka penting (BPM, persen, interval) memakai font mono seperti pembacaan monitor.
Satu elemen paling berani: **strip EKG hidup** (di Beranda dan Simulasi) yang menjadi tanda tangan aplikasi. Elemen lain dibuat tenang agar strip itu menonjol. Kontras tipografi menjadi elemen kedua: judul **serif editorial (Fraunces)** berpasangan dengan angka **mono (JetBrains Mono)** dan teks UI **Instrument Sans**.

## 2. Prinsip
1. **Jelas sebelum cantik:** layar kesehatan, teks mudah dibaca, tidak menakut-nakuti.
2. **Angka sebagai pahlawan:** persentase dan interval besar, mono, kontras tinggi.
3. **Transparan:** setiap hasil punya jalan ke "Kenapa hasilnya begini?".
4. **Tenang di luar simulasi:** gerak hanya bermakna (EKG, impuls, bar yang berubah).
5. **Makna tidak bergantung warna:** keparahan = warna + ikon + label.

## 3. Warna (token)
### 3.1 Light (default)
| Token | Hex | Pemakaian |
|---|---|---|
| `paper` | `#FBF1EE` | latar layar |
| `gridSmall` | `#F0D5CF` | garis kisi kecil (1 mm) |
| `gridBold` | `#E4B7AE` | garis kisi besar (5 mm) |
| `surface` | `#FFFFFF` | kartu, input |
| `line` | `#EBCFC9` | border 1.5dp |
| `ink` | `#1D2A3A` | teks utama |
| `inkMuted` | `#5B6676` | teks sekunder (kontras ≥ 4.5:1 di `paper`) |
| `trace` | `#B3122F` | aksi utama, jejak EKG, tab aktif |
| `traceSoft` | `#FBE3E3` | latar chip/aksen lembut |
| `ok` / `okBg` | `#0F766E` / `#DDF3EF` | keparahan rendah |
| `warn` / `warnBg` | `#8A5A00` / `#FDF2D0` | keparahan sedang, waspada |
| `high` / `highBg` | `#B45309` / `#FDE7D6` | keparahan tinggi, segera |
| `danger` / `dangerBg` | `#9B1C1C` / `#FDE8E8` | darurat |
| `info` / `infoBg` | `#1D4E89` / `#E3EEFB` | banner informasi, tautan |

### 3.2 Dark
`paper #141A22`, `surface #1E2530`, `line #2C3644`, `ink #E8EDF4`, `inkMuted #9AA6B8`, `trace #FF6B81`, `gridSmall #1B232D`, `gridBold #232D3A`, `ok #34D399`, `warn #FBBF24`, `high #FB923C`, `danger #F87171`, `info #7FB2F0` (latar `*Bg` = warna terkait di opasitas 16% di atas `surface`).
Aturan: mengikuti tema sistem, bisa dipaksa di Pengaturan.

### 3.3 Warna simulasi
| Token | Hex | Untuk |
|---|---|---|
| `heartRest` | `#C96A6A` | otot jantung istirahat |
| `heartActive` | `#FFD7B0` | otot terdepolarisasi |
| `impulse` | `#FFE08A` | partikel impuls (emissive) |
| `nodeGlow` | `#FFC857` | node SA/AV saat aktif |
| `accessory` | `#7DD3FC` | jalur tambahan WPW / loop re-entry |
| `ectopic` | `#C4B5FD` | fokus ektopik (PVC/VT) |

### 3.4 Keparahan (selalu warna + ikon + label)
| Keparahan | Warna | Ikon (Lucide) | Label |
|---|---|---|---|
| rendah | `ok` | `CircleCheck` | Risiko rendah |
| sedang | `warn` | `CircleAlert` | Perlu perhatian |
| tinggi | `high` | `TriangleAlert` | Perlu diperiksa |
| darurat | `danger` | `Siren` | Darurat |

## 4. Tipografi
- **Judul:** *Fraunces* (serif; 500/600) via `@expo-google-fonts/fraunces`. **UI:** *Instrument Sans* (400/500/700) via `@expo-google-fonts/instrument-sans`. Di React Native tiap bobot = satu nama font (mis. `Fraunces_600SemiBold`, `InstrumentSans_500Medium`).
- **Angka/data:** *JetBrains Mono* (500/700) via `@expo-google-fonts/jetbrains-mono`. Dipakai untuk BPM, persentase, interval (ms), skor, NPM.
- Fallback: font sistem. Muat font di layar splash; jangan blokir lebih dari 1.5 detik.

| Gaya | Ukuran/Line | Bobot | Font |
|---|---|---|---|
| `display` | 32/38 | 600 | Fraunces |
| `h1` | 24/30 | 600 | Fraunces |
| `h2` | 20/26 | 600 | Fraunces |
| `h3` | 17/24 | 700 | Instrument Sans |
| `body` | 15/22 | 400 | Instrument Sans |
| `bodyStrong` | 15/22 | 700 | Instrument Sans |
| `small` | 13/18 | 500 | Instrument Sans |
| `caption` | 12/16 | 500 | Instrument Sans |
| `numHero` | 40/44 | 700 | Mono |
| `num` | 20/24 | 700 | Mono |
| `numSmall` | 13/16 | 500 | Mono |

Hormati skala font sistem sampai 1.3x; layout harus tetap utuh (teks wrap, jangan dipotong).

## 5. Spasi, bentuk, elevasi
- Skala spasi (dp): `4, 8, 12, 16, 20, 24, 32, 48`. Padding layar 16. Jarak antar seksi 14-16.
- Radius: kartu 14, tombol 12, input 10, chip 999, bar 6, banner 12. (Sengaja bervariasi; jangan seragamkan.)
- Border: 1.5dp `line`. Elevasi minimal (maks `elevation 2`); pemisahan lewat border, bukan bayangan tebal.
- Target sentuh ≥ 48×48dp. Jarak antar target ≥ 8dp.
- Latar `paper` di layar tab utama memakai **kisi** (SVG pattern atau gambar tile ringan): garis kecil tiap 8dp, garis besar tiap 40dp, opasitas rendah. Kartu `surface` menutup kisi supaya teks tetap bersih.

## 6. Komponen (state wajib: default, pressed, disabled, loading, error bila relevan)
| Komponen | Spesifikasi |
|---|---|
| **Button** | Varian `primary` (isi `trace`, teks putih), `secondary` (border `trace`, teks `trace`), `ghost` (teks `ink`), `danger` (isi `danger`). Tinggi 48, label `bodyStrong`, ikon opsional kiri. `loading` = spinner + teks tetap. |
| **Chip** | Pilihan kategori. Default: border `line`, teks `ink`. Aktif: isi `traceSoft`, border `trace`, teks `trace`, ikon centang. Tinggi 40. |
| **TriToggle** | 3 segmen: **Ya / Tidak / Tidak tahu**. Default aktif = Tidak tahu. Aktif Ya = `trace`; Tidak = `ink` muted; Tidak tahu = abu. Lebar penuh, tinggi 44. |
| **ProbBar** | Label kiri (nama), angka mono kanan. Bar tinggi 12, radius 6, isi warna keparahan hipotesis, trek `gridSmall`. Animasi lebar 250ms ease-out. `accessibilityLabel`: "{nama}, {persen} persen". |
| **Card** | `surface`, border `line`, radius 14, padding 16. |
| **Banner** | Varian `info`, `warning`, `danger`, `dataEstimasi`. Ikon + judul `bodyStrong` + isi `small`. `danger` berisi tombol aksi (Hubungi 119/112). |
| **SeverityBadge** | Pil kecil: ikon + label keparahan (§3.4). |
| **StatTile** | Angka `numHero` + label `caption`. Dipakai di hasil dan riwayat. |
| **Stepper** | Titik progres wizard + teks "Langkah 2 dari 3". |
| **SectionTitle** | `h3` + garis tipis `line` di bawah. |
| **EmptyState** | Ilustrasi garis EKG datar + judul + 1 kalimat + tombol. |
| **Dialog** | Konfirmasi aksi merusak (hapus data). Tombol destruktif `danger`. |
| **Toast** | 3 detik, di atas tab bar. |
| **TabBar** | `surface`, border atas `line`; aktif `trace` (ikon + label); label selalu tampil. |
| **EkgStrip** | Lihat §10. |
| **HeartView** | Lihat §9. |

## 7. Wireframe layar (lebar 360dp; `[ ]` = tombol, `( )` = chip, `~~~` = strip EKG)
**Splash**
```
        (kisi halus)
          ~~~/\~~~
        KARDIOLOGIKU
   Deteksi dini & edukasi aritmia
```
**Onboarding (3 slide) + persetujuan**
```
 [~~~ ilustrasi strip ~~~]
 Kenali irama jantungmu
 Jawab pertanyaan, lihat peluang
 tiap jenis aritmia.
 o o o
 [x] Saya paham ini bukan alat
     diagnosis medis.
 [ Lanjut ]
```
**Login / Daftar**
```
 Masuk
 Email      [______________]
 Kata sandi [______________]
 [ Masuk ]
 Belum punya akun? Daftar
 ---- atau ----
 [ Masuk sebagai Tamu ]
```
**Beranda**
```
 Halo, {nama}           (gear)
 ~~~/\~~~/\~~~ (EKG hidup) ~~~
 +---------------------------+
 | Mulai Deteksi         ->  |
 | 3 menit, tanpa daftar     |
 +---------------------------+
 [Simulasi 3D] [Kuis] [Tap Nadi]
 Hasil terakhir: Fib. Atrium 82%
 [ Darurat: hubungi 119/112 ]
 (i) Bukan alat diagnosis medis
```
**Deteksi: wizard**
```
 Deteksi        (Awam|Lanjutan)
 Langkah 2 dari 3  ooo
 +---------------------------+
 | Merasa jantung berdebar?  |
 | [Ya][Tidak][Tidak tahu]   |
 +---------------------------+
 +---------------------------+
 | Pusing atau kepala ringan?|
 | [Ya][Tidak][Tidak tahu]   |
 +---------------------------+
 Peluang sementara (live)
 Fib. Atrium  ====....  42%
 SVT          ==......  18%
 [ Kembali ]   [ Lanjut ]
```
**Hasil**
```
 [!] Banner tanda bahaya (jika ada)
 Kemungkinan terbesar
 FIBRILASI ATRIUM      81,9%
 [Perlu diperiksa]
 Fib. Atrium  =========  81,9%
 PVC          ==         6,1%
 SVT          =          3,2%
 [Lihat semua 12]
 Saran: Segera periksakan ...
 [ Kenapa hasilnya begini? ]
 [ Bagaimana kalau? ] [ Simulasi ]
 [ Ekspor PDF ]  [ Ulangi ]
 (!) Data masih estimasi
 (i) Bukan alat diagnosis medis
```
**Kenapa hasilnya begini?**
```
 1 Rumus  P(H|E) ~ P(H) x P(E|H)
 2 Peluang awal (prior)  [tabel]
 3 Bukti -> kecocokan   [kartu/bukti]
 4 Kali, lalu normalisasi [hitungan]
 5 Pendorong utama  (+) (-)
```
**Simulasi (detail irama)**
```
 Irama: [Fibrilasi Atrium v]
 +---------------------------+
 |      [ jantung 3D ]       |
 |  impuls ->  SA > AV > His |
 +---------------------------+
 ~~~ strip EKG + label P QRS T ~~~
 [>] [0.25x 0.5x 1x] [label] [caliper]
 BPM 110  PR --  QRS 90ms
 Apa yang terjadi? (teks singkat)
 (i) Simulasi edukasi, bukan EKG pasien
```
**Edukasi**
```
 (Artikel)(Jurnal)(Berita)(Mitos)(Glosarium)
 [cari........]  (filter aritmia v)
 +-- kartu artikel -----------+
 | Fibrilasi Atrium     [badge]|
 | ringkasan 2 baris           |
 +-----------------------------+
 Jurnal: judul / penulis / tahun / [Buka PubMed]
```
**Profil / Riwayat**
```
 {nama}  [role]         [Keluar]
 Riwayat  (grafik tren top-1)
  12 Nov  AF 82%   >
 Pengaturan | Tentang & Sumber
 Mode Pakar (khusus pakar/admin)
 Kelola Pengguna (khusus admin)
```
**Kuis Pasien Virtual**
```
 Kasus 3 dari 10      Skor 20
 Bukti: BPM >100, tidak teratur,
        berdebar, usia >=65
 Tebakan lu?  (A)(B)(C)(D)
 [ Cek ]
 -> Bayes: Fib. Atrium 79%
```
**Editor Pakar**
```
 Hipotesis: Fib. Atrium  [estimasi v]
 Prior   [0.14]   Sumber [+]
 Variabel  P(ya | H)
 berdebar [0.80]  ...
 Alasan perubahan [________]
 [ Simpan ]  Riwayat perubahan >
```

## 8. Motion
- Durasi: 120ms (feedback tekan), 250ms (bar, transisi), 400ms (pergantian layar). Easing: `ease-out`; pegas lembut untuk bar.
- **Detak jantung:** skala 1.00 → 1.04 → 1.00 sinkron `VENT_START`.
- **Strip EKG:** bergulir kiri; kecepatan kertas 25 mm/s dengan `MM = 3.5dp` ⇒ **87.5dp/s** (1 kotak kecil = 3.5dp = 0.04 s; kotak besar = 17.5dp = 0.2 s). Garis penulis (cursor) di kanan.
- **Impuls:** partikel menyusur jalur dengan kecepatan sesuai `BeatSchedule`; node yang dilewati menyala 150ms lalu memudar 300ms.
- Mode **slow motion** 0.25x, 0.5x, 1x. Tombol jeda dan "langkah per detak".
- `reduceMotion` aktif ⇒ matikan auto-scroll EKG (tampilkan 1 strip statis dengan tombol "Putar"), matikan partikel (ganti sorotan statis), hentikan haptic otomatis.
- Katalog gerak lengkap: §16.

## 9. Jantung 3D (HeartView)
- Gaya **stilisasi**, matte, bukan fotorealistik. Warna: `heartRest` → `heartActive` saat terdepolarisasi (lerp 120ms). Latar transparan.
- Bagian terpisah (nama mesh): `atrium_r`, `atrium_l`, `ventricle_r`, `ventricle_l`, `node_sa`, `node_av`, `bundle_his`, `bb_r`, `bb_l`, `purkinje_r`, `purkinje_l`, `accessory_kent`.
- Jalur impuls = `TubeGeometry` dari `CatmullRomCurve3`; partikel `impulse` emissive menyusur kurva.
- Kamera: perspektif, orbit terbatas (azimuth ±60°, polar 45-100°), tanpa auto-rotate. Cubit untuk zoom (0.6-1.6x). Tombol "Reset kamera".
- Label opsional (toggle) berupa leader line ke SA, AV, His, Purkinje, atrium, ventrikel.
- Pencahayaan: 1 key light + 1 fill + ambient lembut. Tanpa bayangan real-time.
- Anggaran performa: ≤ 30k segitiga, ≤ 1 draw call per bagian, target 60fps (min 30fps) di perangkat menengah. Di bawah 30fps selama 3 detik ⇒ tawarkan **mode 2D** (SVG) otomatis.
- Mode 2D (fallback): ilustrasi SVG skema jantung dengan jalur dan node yang sama, impuls bergerak sama.
- **Tanpa aset eksternal:** jantung dibuat prosedural dari primitif (PRD Lampiran E, DEC-17). Bila kelak memakai GLB, lisensi + atribusi wajib di `docs/ATTRIBUTION.md`.
- Token tambahan simulasi: `vesselArt #B85C5C`, `vesselVen #6C8EBF`, `conductionIdle #D9C7BF` (terang) / `#566275` (gelap).

## 10. EkgStrip
- Latar kisi: kotak kecil `gridSmall`, kotak besar `gridBold` (5 kotak). Jejak `trace`, tebal 2dp, ujung membulat.
- Skala: 10 mm/mV ⇒ 1 mV = 35dp. Tinggi strip 140dp (±2 mV).
- Label gelombang (toggle): P, Q, R, S, T, J-point sebagai teks `numSmall` dengan garis tipis. Interval PR dan QT sebagai **caliper** (garis bertanda dengan ms).
- Kalibrasi: tampilkan kotak kalibrasi 1 mV di kiri strip. Tulis "25 mm/s · 10 mm/mV".
- **Glow:** di bawah jejak, gambar jejak yang sama dengan `BlurMask` (radius 6) opasitas 0,35; digambar dengan Skia. Kisi digambar sekali (di-cache sebagai gambar), bukan per frame.
- Teks tetap di bawah strip: "Simulasi edukasi, bukan EKG pasien".

## 11. Ikon
**Lucide** (`lucide-react-native`), garis tipis `strokeWidth 1.75`, warna mengikuti token. Tab: `House` (Beranda), `Activity` (Simulasi), `HeartPulse` (Deteksi), `BookOpen` (Edukasi), `User` (Profil). Aksi: `Siren` (darurat), `Info`, `Share2`, `FileText` (PDF), `Hand` (Tap Nadi), `CircleHelp` (Kenapa), `ArrowLeftRight` (What-if), `Settings`, `Trash2`. Ukuran 22 (tab 24). Tanpa emoji sebagai ikon.

## 12. Copy dan string kanonik (jangan diubah kata-katanya)
- **Nada:** Indonesia santai-sopan, kalimat pendek, tanpa menakut-nakuti. "Kamu" untuk menyapa. Istilah medis selalu didampingi penjelasan awam (tautkan ke glosarium).
- **Format:** persen `81,9%` (koma desimal), tanggal `12 Nov 2026`, ms `120 ms`, BPM `110 bpm`.
- `DISCLAIMER_SHORT`: "Aplikasi ini untuk edukasi dan deteksi dini, bukan alat diagnosis medis. Konsultasikan hasilnya dengan dokter."
- `DISCLAIMER_LONG`: "Kardiologiku memberikan perkiraan kemungkinan jenis aritmia berdasarkan jawaban yang kamu isi dan basis pengetahuan dari literatur. Hasilnya bukan diagnosis dan tidak menggantikan pemeriksaan dokter atau EKG. Jika kamu mengalami nyeri dada, sesak berat, atau pingsan, segera ke IGD atau hubungi 119/112."
- `BANNER_DATA_ESTIMASI`: "Data basis pengetahuan masih berstatus estimasi dan belum divalidasi pakar. Jangan dijadikan acuan medis."
- `SIMULASI_NOTE`: "Simulasi edukasi dari rumus, bukan EKG pasien."
- `EMERGENCY_BUTTON`: "Darurat: hubungi 119/112".
- `TAP_NADI_NOTE`: "Perkiraan dari ketukan jari, bukan alat ukur medis."
- `KUIS_NOTE`: "Kasus dibangkitkan dari basis pengetahuan (data sintetis), bukan pasien nyata."
- **Label hasil:** judul "Kemungkinan terbesar", bukan "Diagnosis".
- **String gamifikasi dan kuis:** lihat §19.5.

## 13. Aksesibilitas
- Kontras teks ≥ 4.5:1 (besar ≥ 3:1) di kedua tema.
- Semua kontrol punya `accessibilityLabel` + `accessibilityRole`; ProbBar dibaca "Fibrilasi Atrium, 81,9 persen". Grafik riwayat punya ringkasan teks.
- Urutan fokus mengikuti urutan visual. Wizard bisa diselesaikan hanya dengan pembaca layar.
- Haptic dan gerak bisa dimatikan (Pengaturan) dan mengikuti `reduceMotion` sistem.
- Skala font 1.3x tanpa pemotongan; target sentuh ≥ 48dp.

## 14. Do / Don't untuk agent
**Do:** pakai token; pakai komponen §6; tampilkan banner data estimasi dan disclaimer; beri ikon + label di keparahan; uji di tema light dan dark.
**Don't (ciri "AI slop" yang dilarang):** gradient ungu-biru; glassmorphism/blur latar; palet bawaan Tailwind (`indigo-500`, `slate-100`, dll.); kartu bertumpuk dengan radius yang sama di mana-mana (`rounded-2xl` seragam); ikon emoji; ilustrasi 3D abstrak generik; bayangan tebal; semua teks rata tengah; tombol gradient; badge pil di mana-mana; copy klise ("Unlock", "Seamless", "Supercharge"); hex hard-code; animasi dekoratif di luar EKG/simulasi; kata "diagnosis pasti"; menyembunyikan disclaimer di balik dua ketukan.
**Prinsip pengganti:** satu hero per layar; hierarki tegas (serif besar, angka mono besar, teks kecil tenang); garis hairline + tanda ukur (tick) alih-alih kotak berbayang; ruang kosong lega; satu aksen (`trace`), emas (`impulse`) hanya untuk impuls (≤ 2% layar).


## 15. Framework styling dan animasi
### 15.1 Keputusan
NativeWind **v4.2.x + Tailwind v3** (DEC-18), Reanimated 4 + Skia (DEC-19), font Fraunces/Instrument Sans/JetBrains Mono dan ikon Lucide (DEC-20). **Satu sumber token:** `src/ui/theme.ts` (hex terang/gelap). `src/ui/themeVars.ts` mengubahnya menjadi variabel RGB (`vars()` NativeWind). `tailwind.config.js` hanya merujuk variabel itu. Skia dan Three membaca `theme.ts` langsung.

### 15.2 `tailwind.config.js` (kerangka wajib)
```js
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    colors: {                       // OVERRIDE PENUH: tanpa palet bawaan Tailwind
      transparent: 'transparent',
      paper: 'rgb(var(--c-paper) / <alpha-value>)',
      surface: 'rgb(var(--c-surface) / <alpha-value>)',
      line: 'rgb(var(--c-line) / <alpha-value>)',
      ink: 'rgb(var(--c-ink) / <alpha-value>)',
      'ink-muted': 'rgb(var(--c-ink-muted) / <alpha-value>)',
      trace: 'rgb(var(--c-trace) / <alpha-value>)',
      'trace-soft': 'rgb(var(--c-trace-soft) / <alpha-value>)',
      ok: 'rgb(var(--c-ok) / <alpha-value>)',       'ok-bg': 'rgb(var(--c-ok-bg) / <alpha-value>)',
      warn: 'rgb(var(--c-warn) / <alpha-value>)',    'warn-bg': 'rgb(var(--c-warn-bg) / <alpha-value>)',
      high: 'rgb(var(--c-high) / <alpha-value>)',    'high-bg': 'rgb(var(--c-high-bg) / <alpha-value>)',
      danger: 'rgb(var(--c-danger) / <alpha-value>)', 'danger-bg': 'rgb(var(--c-danger-bg) / <alpha-value>)',
      info: 'rgb(var(--c-info) / <alpha-value>)',    'info-bg': 'rgb(var(--c-info-bg) / <alpha-value>)',
      'grid-small': 'rgb(var(--c-grid-small) / <alpha-value>)',
      'grid-bold': 'rgb(var(--c-grid-bold) / <alpha-value>)',
    },
    fontFamily: {
      display: ['Fraunces_600SemiBold'],
      sans: ['InstrumentSans_400Regular'],
      'sans-medium': ['InstrumentSans_500Medium'],
      'sans-bold': ['InstrumentSans_700Bold'],
      mono: ['JetBrainsMono_500Medium'],
      'mono-bold': ['JetBrainsMono_700Bold'],
    },
    borderRadius: { none: '0', bar: '6px', input: '10px', button: '12px', banner: '12px', card: '14px', chip: '9999px' },
    extend: {},
  },
};
```
Aturan tema:
- `global.css` berisi `@tailwind base; @tailwind components; @tailwind utilities;`.
- Provider akar membungkus aplikasi dengan `<View style={vars(temaAktif)} className="flex-1 bg-paper">`.
- Pengaturan tema Sistem/Terang/Gelap memakai `useColorScheme` dari `nativewind` (`setColorScheme`).
- Babel: preset `nativewind/babel` dan `jsxImportSource: 'nativewind'`. Metro: `withNativeWind(config, { input: './global.css' })`. Ikuti dokumentasi NativeWind v4 untuk SDK terpasang, dan catat penyesuaian di `DECISIONS.md`.

### 15.3 Resep kelas (contoh, bukan tambahan token)
- Kartu: `bg-surface border-[1.5px] border-line rounded-card p-4`
- Tombol utama: `h-12 px-5 rounded-button bg-trace items-center justify-center active:opacity-90`, label `font-sans-bold text-surface`
- Chip aktif: `h-10 px-4 rounded-chip border-[1.5px] border-trace bg-trace-soft`, label `text-trace`
- Angka hero: `font-mono-bold text-[40px] leading-[44px] text-ink`
- Judul: `font-display text-[24px] leading-[30px] text-ink`

Kelas arbitrer `[...]` hanya untuk ukuran dari skala DESIGN §4-§5. **Warna tidak boleh arbitrer.**

### 15.4 Kelas terlarang (ditegakkan `scripts/cek-kelas.ts`)
Skrip memindai `app/**` dan `src/**` dan **gagal** bila menemukan:
- kelas warna bawaan Tailwind: `(bg|text|border|fill|stroke|ring|from|via|to)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+`;
- kelas gradient: `bg-gradient-*`, `from-*`, `via-*`, `to-*`;
- `backdrop-blur*`, `blur-*`;
- `shadow-(md|lg|xl|2xl)` (hanya `shadow-sm` dan `shadow-none` diizinkan);
- `rounded-(2xl|3xl|full)` (pakai `rounded-chip` untuk pil);
- warna arbitrer `-\[#`.

Skrip punya tes (contoh benar lolos, contoh salah gagal).

### 15.5 Pembagian tugas animasi
| Kebutuhan | Alat |
|---|---|
| Perubahan state sederhana (chip aktif, tekan, banner muncul) | Reanimated 4 **CSS transitions** (`transitionProperty`, `transitionDuration`) |
| Masuk/keluar elemen, reflow daftar | Reanimated **layout animations** (`FadeIn`, `FadeInDown`, dll.) |
| EKG, gestur, partikel, scroll-linked | shared value + worklet (UI thread) |
| Jejak EKG, glow, kisi | Skia |
| Jantung 3D | `useFrame` R3F (PRD Lampiran E) |

## 16. Katalog gerak (bahasa gerak aplikasi)
Prinsip: gerak **bermakna**, singkat, dan hanya satu "momen" per layar. Durasi interaksi ≤ 400 ms; maksimal 2 animasi bersamaan di luar simulasi.
| # | Gerak | Detail | Dipakai di |
|---|---|---|---|
| 1 | **Tulis-jejak (tinta)** | Jejak EKG tergambar dari kiri (stroke dash) 600-900 ms; di Hasil, garis jejak kecil menulis di bawah angka top-1 | Beranda (hero), Hasil |
| 2 | **Hitung-naik angka** | Persentase mono 0 → nilai, 700 ms `ease-out`, lebar angka tetap (tabular) | Hasil, Kenapa, StatTile |
| 3 | **Bar strip** | Lebar bar pegas (damping 18, stiffness 160) + tanda ukur kecil di trek | ProbBar, Peluang live |
| 4 | **Tekan** | Skala 0,98 (120 ms) + haptic ringan (selection) | TriToggle, Chip, Button |
| 5 | **Masuk berurutan** | Fade + naik 8dp, jeda 40 ms antar item, maks 6 item | Daftar pertanyaan, Kenapa |
| 6 | **Transisi layar** | Stack `fade_from_bottom` 300 ms; ganti tab fade 150 ms | Navigasi |
| 7 | **Denyut peringatan** | Banner darurat masuk dengan satu denyut (1 → 1,02 → 1) + haptic peringatan **sekali**; tidak berkedip terus | Hasil (red flag) |
| 8 | **Denyut jantung** | Skala 1,00 → 1,04 sinkron `VENT_START` | Simulasi, hero |
| 9 | **Kenapa: kali bukti** | Tiap langkah bukti muncul berurutan, bar peluang bergeser ke nilai baru | Kenapa |

Aturan `reduceMotion`: semua gerak diganti fade ≤ 120 ms; angka langsung tampil; jejak statis; tanpa haptic otomatis.


## 17. Logo dan identitas
### 17.1 Dua tingkat logo (DEC-23)
| Tingkat | Dipakai di | Bentuk |
|---|---|---|
| **Logo hero** | Splash, Onboarding slide 1, Login, Tentang, header PDF | **Jantung realistis berotot merah** (ilustrasi anatomi berlisensi CC0/Public Domain/CC BY) + **jejak EKG animasi** (Skia) yang melintasi jantung |
| **Tanda vektor** | Header Beranda (28dp), ikon aplikasi, ikon monokrom, ukuran < 64dp | Buatan sendiri: kontur jantung `trace` + jejak EKG `ink` (`docs/assets/logo/*.svg`) |
Alasan: ilustrasi realistis tidak terbaca di ukuran kecil dan tidak bisa dimonokromkan; tanda vektor menjaga identitas tetap konsisten dan aman dari sisi lisensi.

### 17.2 Logo hero
- **Gambar jantung:** satu kandidat dari `docs/ATTRIBUTION.md` (mis. Blausen 0451 CC BY, Patrick J. Lynch CC BY 2.5, atau NIAID BioArt Public Domain yang diwarnai ulang merah), **tanpa label**, latar transparan, dipotong rapat, tinggi 160-220dp. Lisensi diverifikasi di halaman berkas pada hari unduh.
- **Overlay EKG:** jejak digambar Skia (dengan glow) melintasi jantung dari tepi kiri ke kanan. Agar tidak merah-di-atas-merah, jejak memakai `ink` (navy) dengan garis tepi `paper` 3dp.
- **Denyut:** jantung berdenyut skala 1,00 → 1,03 sinkron dengan lonjakan R jejak (≈ 1 denyut per 0,9 dtk); berhenti saat `reduceMotion`.
- **Atribusi:** tampil kecil di Tentang & Sumber ("Ilustrasi jantung: {pencipta}, {lisensi}").
- **Larangan:** mengambil logo atau gambar stok bermerek; mengubah ilustrasi hingga menyesatkan secara anatomi; memakai foto autopsi/bedah.
- Bila gambar belum tersedia, **jangan** menyimulasikan dengan gambar sembarang: pakai tanda vektor sebagai logo utama sampai berkas diletakkan.

### 17.3 Tanda vektor
Berkas: `kardiologiku-mark.svg` (terang), `kardiologiku-mark-dark.svg`, `kardiologiku-mark-mono.svg` (`currentColor`). Area bebas = tinggi puncak R (± 20% lebar). Ukuran minimum 24dp. Dilarang: warna di luar token, memutar, gradient, bayangan.

### 17.4 Lockup
Tanda + wordmark "Kardiologiku" (Fraunces 600), jarak tanda-teks = 0,4 × tinggi tanda; versi vertikal untuk splash.

### 17.5 Splash (≤ 1,6 s)
1. 0-500 ms: jejak EKG menulis dari kiri. 2. 400-900 ms: jantung (hero) muncul (fade + skala 0,96 → 1,0) dengan denyut pertama. 3. 900-1300 ms: wordmark fade + naik 8dp. 4. 1300-1600 ms: transisi fade ke layar berikut. Bila inisialisasi (font/DB) lebih lama: loop denyut halus. `reduceMotion`: tampil statis 600 ms.

### 17.6 Ikon aplikasi
`icon-1024.png` (latar `paper`), `icon-foreground-1024.png` (adaptive, zona aman 66%), warna latar adaptive `#FBF1EE`, ikon monokrom Android 13 dari `kardiologiku-mark-mono.svg`.

## 18. Layar interaktif: onboarding, masuk, menu, Edukasi
### 18.1 Onboarding interaktif (3 slide, geser)
- Slide 1: logo hero menulis diri. Slide 2: **"Ketuk jantungnya"**, ketukan memicu satu detak + EKG menulis + haptic ringan. Slide 3: persetujuan disclaimer dengan kotak centang yang "menulis" centang; tombol Lanjut aktif setelah dicentang.
- Titik progres memanjang ke slide aktif. "Lewati" hanya di slide 1-2; persetujuan tidak bisa dilewati.

### 18.2 Login dan Daftar interaktif
- Judul: "Masuk ke Kardiologiku" (bukan "Welcome back").
- **Jejak yang bereaksi:** fokus input ⇒ jejak mengalir pelan; input valid ⇒ satu denyut; galat ⇒ jejak mendatar sebentar (300 ms) + haptic galat ringan + pesan inline.
- Validasi inline (format email; sandi ≥ 8 dengan meter 3 segmen), tombol tampil/sembunyi sandi, keyboard-avoiding, fokus bercincin `trace`. "Masuk sebagai Tamu" = tombol ghost.
```
 [logo hero kecil, jejak mengalir]
 Masuk ke Kardiologiku
 Email       [_______________]
 Kata sandi  [___________ (mata)]
             kekuatan: [##-]
 [ Masuk ]
 [ Masuk sebagai Tamu ]
 Belum punya akun? Daftar
```

### 18.3 Tab bar interaktif
Indikator aktif = garis jejak pendek di bawah ikon yang bergeser dengan pegas; ikon aktif naik 2dp; ketuk tab aktif sekali lagi ⇒ gulir ke atas.

### 18.4 Edukasi: hub, pembaca, kuis
```
 Edukasi   (Belajar|Artikel|Kuis|Referensi)
 Lv 3 · 240 XP [=====-----]   Rangkaian 5 hari
 Rekomendasi untukmu
 [Fibrilasi atrium     Mulai 0,31  >]
 [Tanda bahaya         Mulai 0,20  >]
 Lanjutkan membaca
 [Sistem konduksi  60% [======---]]
 Kuis hari ini   [ Mulai 5 soal ]
 Peta Belajar (14 simpul, 2 kolom)
```
```
 [=====-----] progres baca        3 menit
 Fibrilasi atrium            (judul serif)
 paragraf ... istilah (ketuk = definisi)
 [ ilustrasi: strip EKG fibrilasi atrium ]
 Keterangan gambar · atribusi bila ada
 [ widget: slider BPM + strip EKG hidup ]
 Cek paham: soal inline
 Sumber
 [ Tandai selesai +20 XP ] [ Kuis topik ]
```
```
 Soal 3 dari 10                Topik: WPW
 Penguasaan [====------] 0,42
 Dua temuan EKG yang khas pada WPW?
 ( ) A   ( ) B   ( ) C   ( ) D
 [ Cek ]
```
```
 Tepat.                         +10 XP
 Penguasaan naik dari 0,42 ke 0,61
 Penjelasan ... Sumber: ESC 2019
 [ Baca artikel terkait ]   [ Lanjut ]
```
Ringkasan sesi: skor, XP, lencana baru, perubahan penguasaan per topik (hitung-naik), rekomendasi bacaan.

## 19. Gamifikasi (UI)
### 19.1 Elemen
`XpBar` (garis tipis dengan tanda ukur tiap 10 XP), level (angka mono besar + kata "Level" serif), `StreakChip`, `LencanaBadge` (lingkaran hairline navy + glyph jejak `trace`; terkunci = outline abu), `MasteryRing` (cincin progres), `PetaBelajar` (grid 2 kolom simpul), `UmpanBalikSoal`.
### 19.2 Status penguasaan (selalu warna + ikon + label)
| Status | Warna | Ikon (Lucide) |
|---|---|---|
| Belum mulai | `line` (outline) | `Circle` |
| Mulai / Belajar | `info` | `BookOpen` |
| Hampir | `trace` | `CircleDot` |
| Dikuasai | `ok` | `CircleCheck` |
Emas (`impulse`) **tidak** dipakai untuk gamifikasi. Ikon tambahan: `Flame` (streak), `Zap` (XP), `Award` (lencana).
### 19.3 Umpan balik soal
Benar: ikon `CircleCheck`, bar penguasaan naik dengan hitung-naik. Salah: ikon `CircleAlert` + penjelasan, **bukan** merah menyala. Haptic ringan; tanpa suara.
### 19.4 Larangan
Leaderboard, nyawa/penalti, timer yang menekan, notifikasi dorong, animasi perayaan berlebihan.
### 19.5 String kanonik gamifikasi (tambahkan ke `strings.ts`, jangan ubah kata-katanya)
- `KUIS_BENAR`: "Tepat."
- `KUIS_SALAH`: "Belum tepat. Yuk lihat penjelasannya."
- `MASTERY_NAIK`: "Penguasaan naik dari {a} ke {b}."
- `XP_TAMBAH`: "+{n} XP"
- `STREAK`: "Rangkaian {n} hari"
- `BELUM_DIKUASAI`: "Belum dikuasai, ayo coba lagi."
