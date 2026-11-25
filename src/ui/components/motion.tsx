// Komponen gerak (DESIGN §16): TraceDraw, CountUp, PressScale, Stagger.
// Semua menghormati reduceMotion (fade ≤ 120 ms / tampil langsung).

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Pressable, Text, type TextProps, type ViewProps } from 'react-native';
import Animated, {
  Easing,
  FadeInUp,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import Svg, { Path } from 'react-native-svg';
import {
  DURASI,
  MAKS_ITEM_STAGGER,
  durasiEfektif,
  nilaiHitungNaik,
} from '../motion';
import { useTema } from '../useTema';
import { useReduceMotion } from '../useReduceMotion';

const TeksAnimasi = Animated.createAnimatedComponent(Text);
const JalurAnimasi = Animated.createAnimatedComponent(Path);

/**
 * Panjang jejak EKG (jumlah ruas garis lurus): 20 + 6 + √160 + √612 +
 * √360 + √72 + 72 ≈ 162,85 → dibulatkan 163. Dipakai sebagai
 * strokeDasharray agar jejak bisa "tergambar" dari kiri.
 */
const PANJANG_JEJAK = 163;

/** Jejak EKG tergambar dari kiri (tinta), 600–900 ms; statis bila reduceMotion. */
export function TraceDraw({ testID = 'jejak-ekg' }: { testID?: string }) {
  const tema = useTema();
  const reduceMotion = useReduceMotion();
  const progres = useSharedValue(reduceMotion ? 0 : PANJANG_JEJAK);

  useEffect(() => {
    if (!reduceMotion) {
      progres.value = withTiming(0, {
        duration: durasiEfektif('jejak', false),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  const propsAnimasi = useAnimatedProps(() => ({
    strokeDashoffset: progres.value,
  }));

  return (
    <Svg testID={testID} width="100%" height={40} viewBox="0 0 120 40">
      <JalurAnimasi
        d="M0 20 L20 20 L26 20 L30 8 L36 32 L42 14 L48 20 L120 20"
        fill="none"
        stroke={tema.trace}
        strokeWidth={2}
        strokeDasharray={PANJANG_JEJAK}
        animatedProps={propsAnimasi}
      />
    </Svg>
  );
}

interface CountUpProps extends Omit<TextProps, 'children'> {
  nilai: number;
  format: (nilai: number) => string;
}

/** Persentase mono 0 → nilai, 700 ms ease-out; langsung tampil bila reduceMotion. */
export function CountUp({ nilai, format, ...sisa }: CountUpProps) {
  const reduceMotion = useReduceMotion();
  const progres = useSharedValue(reduceMotion ? 1 : 0);

  useEffect(() => {
    if (!reduceMotion) {
      progres.value = withTiming(1, {
        duration: durasiEfektif('hitungNaik', false),
        easing: Easing.out(Easing.cubic),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  const propsAnimasi = useAnimatedProps(() => ({
    // `text` adalah animated prop runtime untuk Text di Reanimated
    // (pola dari dokumentasi Reanimated) — tidak ada di tipe TextProps.
    text: format(nilaiHitungNaik(0, nilai, progres.value)),
  }));

  return (
    <TeksAnimasi animatedProps={propsAnimasi as never} {...sisa}>
      {format(nilai)}
    </TeksAnimasi>
  );
}

interface PressScaleProps extends ViewProps {
  children: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
}

/** Tekan: skala 0,98 (120 ms) + haptic ringan; tanpa haptic bila reduceMotion. */
export function PressScale({ children, onPress, ...sisa }: PressScaleProps) {
  const reduceMotion = useReduceMotion();
  const skala = useSharedValue(1);

  const gaya = useAnimatedStyle(() => ({
    transform: [{ scale: skala.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        // eslint-disable-next-line react-hooks/immutability -- shared value Reanimated memang dimutasi
        skala.value = withTiming(0.98, { duration: DURASI.tekan });
        if (!reduceMotion) {
          Haptics.selectionAsync().catch(() => undefined);
        }
      }}
      onPressOut={() => {
        // eslint-disable-next-line react-hooks/immutability -- shared value Reanimated memang dimutasi
        skala.value = withTiming(1, { duration: DURASI.tekan });
      }}
      accessibilityRole="button"
    >
      <Animated.View style={gaya} {...sisa}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

/** Masuk berurutan: fade + naik 8dp, jeda 40 ms antar item, maks 6 item. */
export function Stagger({ children }: { children: ReactNode }) {
  const reduceMotion = useReduceMotion();
  const daftar = Array.isArray(children) ? children : [children];
  const tampil = daftar.slice(0, MAKS_ITEM_STAGGER);

  return (
    <>
      {tampil.map((anak, i) =>
        reduceMotion ? (
          <Animated.View key={i}>{anak}</Animated.View>
        ) : (
          <Animated.View
            key={i}
            entering={FadeInUp.delay(i * DURASI.jedaMasukItem).duration(200)}
          >
            {anak}
          </Animated.View>
        ),
      )}
    </>
  );
}
