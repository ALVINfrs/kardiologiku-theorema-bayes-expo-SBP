// reduceMotion: gabungan pengaturan sistem (AccessibilityInfo) dan
// override manual dari Pengaturan. Override manual menang bila diisi
// (true/false); null berarti ikut sistem.

import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import { usePengaturanGerak } from '../store/pengaturan';

export function useReduceMotion(): boolean {
  const manual = usePengaturanGerak((s) => s.manual);
  const [sistem, setSistem] = useState(false);

  useEffect(() => {
    let hidup = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((nilai) => {
        if (hidup) setSistem(nilai);
      })
      .catch(() => undefined);
    const langganan = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setSistem,
    );
    return () => {
      hidup = false;
      langganan.remove();
    };
  }, []);

  return manual ?? sistem;
}
