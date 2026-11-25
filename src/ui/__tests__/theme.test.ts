import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { tema, warnaSimulasi } from '../theme';

const KUNCI_TOKEN = [
  'paper',
  'gridSmall',
  'gridBold',
  'surface',
  'line',
  'ink',
  'inkMuted',
  'trace',
  'traceSoft',
  'ok',
  'okBg',
  'warn',
  'warnBg',
  'high',
  'highBg',
  'danger',
  'dangerBg',
  'info',
  'infoBg',
] as const;

const HEX = /^#[0-9a-fA-F]{6}$/;

function semuaBerkas(dir: string, keluar: string[] = []): string[] {
  for (const nama of readdirSync(dir)) {
    const jalur = join(dir, nama);
    if (statSync(jalur).isDirectory()) {
      if (nama === 'node_modules' || nama === '.git') continue;
      semuaBerkas(jalur, keluar);
    } else if (/\.(ts|tsx)$/.test(nama)) {
      keluar.push(jalur);
    }
  }
  return keluar;
}

describe('theme.ts — satu-satunya sumber hex (DESIGN §3, §15.1)', () => {
  it('setiap token ada di light dan dark', () => {
    for (const kunci of KUNCI_TOKEN) {
      expect(tema.light[kunci]).toMatch(HEX);
      expect(tema.dark[kunci]).toMatch(HEX);
    }
  });

  it('nilai token light sama dengan DESIGN §3.1', () => {
    expect(tema.light.paper).toBe('#FBF1EE');
    expect(tema.light.ink).toBe('#1D2A3A');
    expect(tema.light.trace).toBe('#B3122F');
    expect(tema.light.surface).toBe('#FFFFFF');
  });

  it('nilai token dark sama dengan DESIGN §3.2', () => {
    expect(tema.dark.paper).toBe('#141A22');
    expect(tema.dark.surface).toBe('#1E2530');
    expect(tema.dark.trace).toBe('#FF6B81');
    expect(tema.dark.ink).toBe('#E8EDF4');
  });

  it('warna simulasi (§3.3) lengkap dan hex valid', () => {
    for (const nilai of Object.values(warnaSimulasi)) {
      expect(nilai).toMatch(HEX);
    }
    expect(warnaSimulasi.impulse).toBe('#FFE08A');
    expect(warnaSimulasi.nodeGlow).toBe('#FFC857');
  });

  it('tidak ada hex di luar theme.ts (src/ dan app/)', () => {
    const akar = join(__dirname, '..', '..', '..');
    const berkas = semuaBerkas(join(akar, 'src')).concat(
      semuaBerkas(join(akar, 'app')),
    );
    const pelanggar: string[] = [];
    for (const jalur of berkas) {
      if (jalur.endsWith('src/ui/theme.ts')) continue;
      if (jalur.includes('__tests__')) continue;
      const isi = readFileSync(jalur, 'utf8');
      const cocok = isi.match(/#[0-9a-fA-F]{6}\b/g);
      if (cocok) pelanggar.push(`${jalur}: ${cocok.join(', ')}`);
    }
    expect(pelanggar).toEqual([]);
  });
});
