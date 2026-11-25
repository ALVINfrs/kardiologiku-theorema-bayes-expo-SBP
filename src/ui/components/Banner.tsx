import { Text, View } from 'react-native';
import { Info, Siren, TriangleAlert } from 'lucide-react-native';
import { useTema } from '../useTema';
import { Button } from './Button';

export type VarianBanner = 'info' | 'warning' | 'danger' | 'dataEstimasi';

interface BannerProps {
  varian: VarianBanner;
  judul: string;
  isi: string;
  labelAksi?: string;
  onAksi?: () => void;
}

const GAYA: Record<
  VarianBanner,
  { wadah: string; ikon: 'info' | 'warning' | 'danger'; teks: string }
> = {
  info: { wadah: 'border-info bg-info-bg', ikon: 'info', teks: 'text-info' },
  warning: {
    wadah: 'border-warn bg-warn-bg',
    ikon: 'warning',
    teks: 'text-warn',
  },
  danger: {
    wadah: 'border-danger bg-danger-bg',
    ikon: 'danger',
    teks: 'text-danger',
  },
  dataEstimasi: {
    wadah: 'border-info bg-info-bg',
    ikon: 'info',
    teks: 'text-info',
  },
};

export function Banner({ varian, judul, isi, labelAksi, onAksi }: BannerProps) {
  const warna = useTema();
  const gaya = GAYA[varian];
  const Ikon =
    gaya.ikon === 'info'
      ? Info
      : gaya.ikon === 'warning'
        ? TriangleAlert
        : Siren;
  const warnaIkon =
    gaya.ikon === 'info'
      ? warna.info
      : gaya.ikon === 'warning'
        ? warna.warn
        : warna.danger;
  return (
    <View
      accessibilityRole="alert"
      className={`rounded-banner border-[1.5px] p-4 ${gaya.wadah}`}
    >
      <View className="flex-row items-start gap-3">
        <Ikon size={20} color={warnaIkon} />
        <View className="flex-1">
          <Text
            className={`font-sans-bold text-[15px] leading-[22px] ${gaya.teks}`}
          >
            {judul}
          </Text>
          <Text className="mt-1 font-sans-medium text-[13px] leading-[18px] text-ink">
            {isi}
          </Text>
          {labelAksi && onAksi ? (
            <View className="mt-3">
              <Button label={labelAksi} onPress={onAksi} varian="danger" />
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
