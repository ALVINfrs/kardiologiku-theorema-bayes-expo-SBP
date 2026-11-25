// Logo Kardiologiku (DESIGN §17, DEC-23, DEC-37).
// Dua tingkat: tanda vektor (buatan sendiri, dari docs/assets/logo/*.svg)
// dan logo hero (satu gambar statis hasil AI: jantung + irama EKG nyatu).

import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { namaFont } from '../fonts';
import { WARNA_TANDA_GELAP } from '../theme';
import { useTema } from '../useTema';
import { useReduceMotion } from '../useReduceMotion';

const JANTUNG_D =
  'M40 62C14 44 10 24 24 16C32 12 38 17 40 23C42 17 48 12 56 16C70 24 66 44 40 62Z';
const JEJAK_D = 'M6 38H26L31 38L35 26L41 50L46 34H74';
const RASIO_TINGGI = 72 / 80;

export type VarianTanda = 'terang' | 'gelap' | 'mono';

interface LogoMarkProps {
  ukuran: number;
  varian?: VarianTanda;
  /** Warna untuk varian mono (default: ink tema aktif). */
  warna?: string;
}

/** Tanda vektor: kontur jantung trace + jejak EKG ink. Ukuran minimum 24dp. */
export function LogoMark({ ukuran, varian = 'terang', warna }: LogoMarkProps) {
  const tema = useTema();
  const warnaJantung =
    varian === 'gelap'
      ? WARNA_TANDA_GELAP.jantung
      : varian === 'mono'
        ? (warna ?? tema.ink)
        : tema.trace;
  const warnaJejak =
    varian === 'gelap'
      ? WARNA_TANDA_GELAP.jejak
      : varian === 'mono'
        ? (warna ?? tema.ink)
        : tema.ink;

  return (
    <Svg
      testID="logo-mark"
      width={ukuran}
      height={ukuran * RASIO_TINGGI}
      viewBox="0 0 80 72"
    >
      <Path
        d={JANTUNG_D}
        fill="none"
        stroke={warnaJantung}
        strokeWidth={2.6}
        strokeLinejoin="round"
      />
      <Path
        d={JEJAK_D}
        fill="none"
        stroke={warnaJejak}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

interface LogoHeroProps {
  /** Tinggi gambar jantung (160–220dp, default 200). */
  tinggi?: number;
  /** Bila false, gambar jantung disembunyikan (dipakai urutan splash §17.5). */
  tampilJantung?: boolean;
}

/**
 * Logo hero: satu gambar statis hasil AI — jantung realistis dengan irama
 * EKG menyatu di depannya (lihat ATTRIBUTION.md). Gambar berdenyut
 * 1,00 → 1,03 (≈ 1 denyut per 0,9 dtk); berhenti saat reduceMotion.
 */
export function LogoHero({
  tinggi = 200,
  tampilJantung = true,
}: LogoHeroProps) {
  const lebar = tinggi;
  const reduceMotion = useReduceMotion();
  const skala = useSharedValue(1);
  const tampil = useSharedValue(tampilJantung ? 1 : 0);

  useEffect(() => {
    if (reduceMotion) {
      skala.value = 1;
      return;
    }
    skala.value = withRepeat(
      withSequence(
        withDelay(200, withTiming(1.03, { duration: 120 })),
        withTiming(1, { duration: 180 }),
        withTiming(1, { duration: 400 }),
      ),
      -1,
    );
    return () => {
      cancelAnimation(skala);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  useEffect(() => {
    tampil.value = reduceMotion
      ? tampilJantung
        ? 1
        : 0
      : withTiming(tampilJantung ? 1 : 0, { duration: 500 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tampilJantung, reduceMotion]);

  const gayaDenyut = useAnimatedStyle(() => ({
    transform: [{ scale: skala.value }],
  }));
  const gayaTampil = useAnimatedStyle(() => ({
    opacity: tampil.value,
    transform: [{ scale: 0.96 + 0.04 * tampil.value }],
  }));

  return (
    <View
      testID="logo-hero"
      accessibilityLabel="Logo Kardiologiku"
      style={{ width: lebar, height: tinggi }}
    >
      <Animated.View
        style={[gayaDenyut, gayaTampil, { width: lebar, height: tinggi }]}
      >
        <Image
          testID="logo-hero-gambar"
          source={require('../../../assets/logo/jantung-hero.webp')}
          style={{ width: lebar, height: tinggi }}
          contentFit="contain"
          accessibilityLabel="Ilustrasi jantung"
        />
      </Animated.View>
    </View>
  );
}

interface LogoLockupProps {
  ukuran?: number;
  varian?: VarianTanda;
  warna?: string;
  vertikal?: boolean;
}

/** Lockup: tanda + wordmark "Kardiologiku" (Fraunces 600); jarak 0,4 × tinggi tanda. */
export function LogoLockup({
  ukuran = 28,
  varian = 'terang',
  warna,
  vertikal = false,
}: LogoLockupProps) {
  const tema = useTema();
  const jarak = ukuran * RASIO_TINGGI * 0.4;
  return (
    <View
      style={{
        flexDirection: vertikal ? 'column' : 'row',
        alignItems: 'center',
        gap: jarak,
      }}
    >
      <LogoMark ukuran={ukuran} varian={varian} warna={warna} />
      <Text
        style={{
          fontFamily: namaFont.display,
          fontSize: ukuran * 0.85,
          color: tema.ink,
        }}
      >
        Kardiologiku
      </Text>
    </View>
  );
}

interface SplashProps {
  onSelesai: () => void;
}

/**
 * Splash (DESIGN §17.5, ≤ 1,6 dtk): jantung muncul + denyut pertama
 * (400–900 ms) → wordmark (900–1300 ms) → transisi fade (1300–1600 ms).
 * reduceMotion: tampil statis 600 ms.
 */
export function Splash({ onSelesai }: SplashProps) {
  const reduceMotion = useReduceMotion();
  const [tahap, setTahap] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      const pengatur = setTimeout(onSelesai, 600);
      return () => clearTimeout(pengatur);
    }
    const pengatur = [
      setTimeout(() => setTahap(1), 400),
      setTimeout(() => setTahap(2), 900),
      setTimeout(() => setTahap(3), 1300),
      setTimeout(onSelesai, 1600),
    ];
    return () => pengatur.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  return (
    <View
      testID="splash"
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: tahap >= 3 ? 0 : 1,
      }}
    >
      <LogoHero tampilJantung={tahap >= 1 || reduceMotion} />
      {(tahap >= 2 || reduceMotion) && <LogoLockup ukuran={28} vertikal />}
    </View>
  );
}
