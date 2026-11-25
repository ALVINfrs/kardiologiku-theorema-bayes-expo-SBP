import { Pressable, Text } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTema } from '../useTema';

interface ChipProps {
  label: string;
  aktif?: boolean;
  onPress: () => void;
  accessibilityLabel?: string;
}

export function Chip({ label, aktif, onPress, accessibilityLabel }: ChipProps) {
  const warna = useTema();
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityState={{ selected: aktif }}
      className={`h-10 flex-row items-center gap-1 rounded-chip border-[1.5px] px-4 ${
        aktif ? 'border-trace bg-trace-soft' : 'border-line bg-surface'
      }`}
    >
      {aktif ? <Check size={16} color={warna.trace} /> : null}
      <Text
        className={`font-sans-medium text-[15px] leading-[22px] ${
          aktif ? 'text-trace' : 'text-ink'
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
