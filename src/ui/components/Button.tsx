import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { useTema } from '../useTema';

export type VarianButton = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps {
  label: string;
  onPress: () => void;
  varian?: VarianButton;
  ikon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
}

const KELAS_WADAH: Record<VarianButton, string> = {
  primary: 'bg-trace',
  secondary: 'border-[1.5px] border-trace bg-surface',
  ghost: 'bg-transparent',
  danger: 'bg-danger',
};

const KELAS_LABEL: Record<VarianButton, string> = {
  primary: 'text-surface',
  secondary: 'text-trace',
  ghost: 'text-ink',
  danger: 'text-surface',
};

export function Button({
  label,
  onPress,
  varian = 'primary',
  ikon,
  disabled,
  loading,
  accessibilityLabel,
}: ButtonProps) {
  const warna = useTema();
  const nonaktif = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={nonaktif}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityState={{ disabled: nonaktif, busy: loading }}
      className={`h-12 flex-row items-center justify-center gap-2 rounded-button px-5 active:opacity-90 ${KELAS_WADAH[varian]} ${nonaktif ? 'opacity-50' : ''}`}
    >
      {loading ? <ActivityIndicator color={warna.surface} /> : ikon}
      <Text
        className={`font-sans-bold text-[15px] leading-[22px] ${KELAS_LABEL[varian]}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
