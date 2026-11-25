import { Text, View } from 'react-native';
import { petaKeparahan, type Keparahan } from '../theme';

export function formatPersenAngka(persen: number): string {
  return persen.toLocaleString('id-ID', { maximumFractionDigits: 1 });
}

export function formatPersen(persen: number): string {
  return `${formatPersenAngka(persen)}%`;
}

interface ProbBarProps {
  nama: string;
  persen: number;
  keparahan: Keparahan;
}

const KELAS_ISI: Record<Keparahan, string> = {
  rendah: 'bg-ok',
  sedang: 'bg-warn',
  tinggi: 'bg-high',
  darurat: 'bg-danger',
};

export function ProbBar({ nama, persen, keparahan }: ProbBarProps) {
  const labelPersen = formatPersen(persen);
  return (
    <View
      accessibilityLabel={`${nama}, ${formatPersenAngka(persen)} persen`}
      accessibilityRole="progressbar"
      accessibilityValue={{ now: persen, min: 0, max: 100 }}
    >
      <View className="flex-row items-baseline justify-between">
        <Text className="font-sans text-[15px] leading-[22px] text-ink">
          {nama}
        </Text>
        <Text className="font-mono-bold text-[13px] leading-[16px] text-ink">
          {labelPersen}
        </Text>
      </View>
      <View className="mt-1 h-3 overflow-hidden rounded-bar bg-grid-small">
        <View
          testID="probbar-isi"
          style={{ width: `${persen}%` }}
          className={`h-full rounded-bar ${KELAS_ISI[keparahan]}`}
        />
      </View>
      <Text className="mt-1 font-sans text-[12px] leading-[16px] text-ink-muted">
        {petaKeparahan[keparahan].label}
      </Text>
    </View>
  );
}
