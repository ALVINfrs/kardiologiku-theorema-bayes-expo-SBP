import { vars } from 'nativewind';
import { tema, type TemaMode, type TokenWarna } from './theme';

function hexKeRgb(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

const KUNCI_VAR: [keyof TokenWarna, string][] = [
  ['paper', '--c-paper'],
  ['gridSmall', '--c-grid-small'],
  ['gridBold', '--c-grid-bold'],
  ['surface', '--c-surface'],
  ['line', '--c-line'],
  ['ink', '--c-ink'],
  ['inkMuted', '--c-ink-muted'],
  ['trace', '--c-trace'],
  ['traceSoft', '--c-trace-soft'],
  ['ok', '--c-ok'],
  ['okBg', '--c-ok-bg'],
  ['warn', '--c-warn'],
  ['warnBg', '--c-warn-bg'],
  ['high', '--c-high'],
  ['highBg', '--c-high-bg'],
  ['danger', '--c-danger'],
  ['dangerBg', '--c-danger-bg'],
  ['info', '--c-info'],
  ['infoBg', '--c-info-bg'],
];

/** Variabel RGB untuk NativeWind, dari `theme.ts` (DESIGN §15.1). */
export function varsTema(mode: TemaMode) {
  const t = tema[mode];
  const keluar: Record<string, string> = {};
  for (const [kunci, nama] of KUNCI_VAR) {
    keluar[nama] = hexKeRgb(t[kunci]);
  }
  return vars(keluar);
}
