// Jejak EKG animasi dengan Skia (DESIGN §17.2, DEC-19).
// Jejak memakai ink (navy) dengan garis tepi paper 3dp agar terbaca di atas
// jantung merah; di bawah reduceMotion jejak tampil penuh dan statis.
// Skia v2: nilai animasi memakai SharedValue Reanimated (useClock +
// useDerivedValue); tidak ada lagi useComputedValue.

import { Canvas, Path, Skia, useClock } from '@shopify/react-native-skia';
import { useDerivedValue } from 'react-native-reanimated';
import { useTema } from '../useTema';
import { useReduceMotion } from '../useReduceMotion';

const JEJAK_D = 'M0 30 H90 L110 30 L120 12 L135 48 L150 22 L165 30 H360';

interface JejakEkgSkiaProps {
  lebar: number;
  tinggi: number;
}

/** Satu denyut ≈ 0,9 detik; jejak menulis dari kiri ke kanan lalu mengulang. */
export function JejakEkgSkia({ lebar, tinggi }: JejakEkgSkiaProps) {
  const tema = useTema();
  const reduceMotion = useReduceMotion();
  const jam = useClock();
  const akhir = useDerivedValue(
    () => (reduceMotion ? 1 : (jam.value % 900) / 900),
    [reduceMotion],
  );
  const jejak = Skia.Path.MakeFromSVGString(JEJAK_D);

  if (!jejak) return null;

  return (
    <Canvas style={{ width: lebar, height: tinggi }}>
      <Path
        path={jejak}
        start={0}
        end={akhir}
        style="stroke"
        strokeWidth={10}
        color={tema.ink}
        opacity={0.12}
      />
      <Path
        path={jejak}
        start={0}
        end={akhir}
        style="stroke"
        strokeWidth={8.5}
        color={tema.paper}
      />
      <Path
        path={jejak}
        start={0}
        end={akhir}
        style="stroke"
        strokeWidth={2.5}
        strokeCap="round"
        strokeJoin="round"
        color={tema.ink}
      />
    </Canvas>
  );
}
