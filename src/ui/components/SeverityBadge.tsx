import { Text, View } from 'react-native';
import {
  CircleAlert,
  CircleCheck,
  Siren,
  TriangleAlert,
} from 'lucide-react-native';
import {
  petaKeparahan,
  type Keparahan,
  type NamaIkonKeparahan,
} from '../theme';
import { useTema } from '../useTema';

const IKON: Record<NamaIkonKeparahan, typeof CircleCheck> = {
  CircleCheck,
  CircleAlert,
  TriangleAlert,
  Siren,
};

const KELAS_WADAH: Record<Keparahan, string> = {
  rendah: 'bg-ok-bg',
  sedang: 'bg-warn-bg',
  tinggi: 'bg-high-bg',
  darurat: 'bg-danger-bg',
};

const KELAS_TEKS: Record<Keparahan, string> = {
  rendah: 'text-ok',
  sedang: 'text-warn',
  tinggi: 'text-high',
  darurat: 'text-danger',
};

export function SeverityBadge({ keparahan }: { keparahan: Keparahan }) {
  const warna = useTema();
  const info = petaKeparahan[keparahan];
  const Ikon = IKON[info.ikon];
  return (
    <View
      accessibilityLabel={info.label}
      className={`flex-row items-center gap-1 self-start rounded-chip px-3 py-1 ${KELAS_WADAH[keparahan]}`}
    >
      <Ikon size={14} color={warna[info.warna]} />
      <Text
        className={`font-sans-bold text-[12px] leading-[16px] ${KELAS_TEKS[keparahan]}`}
      >
        {info.label}
      </Text>
    </View>
  );
}
