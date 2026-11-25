# docs/reference: implementasi acuan engine

Isi: `engine/types.ts`, `engine/bayes.ts`, `engine/redflag.ts` dan tesnya (12 kasus emas + 9 tes red flag), semuanya **lulus** terhadap `docs/kb-seed.v0.1.json`.

Pemakaian: titik awal untuk **T-004** (tipe), **T-104** (Bayes), **T-105** (red flag). Salin ke `src/engine/`, ganti impor seed pada tes ke modul KB proyek (`src/knowledge/seed.ts`), lalu tetap penuhi seluruh DoD task di `docs/PRD.md` §16. Bukan pengganti DoD; adaptif, what-if, Tap Nadi, dan kuis belum ada di sini.
