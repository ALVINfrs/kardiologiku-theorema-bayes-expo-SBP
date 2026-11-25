import { Text, View } from 'react-native';

interface StepperProps {
  langkah: number;
  total: number;
  /** Teks kanonik dipindah ke strings.ts di T-004; prop ini hanya fallback. */
  label?: string;
}

export function Stepper({ langkah, total, label }: StepperProps) {
  return (
    <View accessibilityLabel={label ?? `Langkah ${langkah} dari ${total}`}>
      <View className="flex-row items-center gap-2">
        {Array.from({ length: total }, (_, i) => (
          <View
            key={i}
            className={`h-2 flex-1 rounded-bar ${i < langkah ? 'bg-trace' : 'bg-grid-small'}`}
          />
        ))}
      </View>
      <Text className="mt-2 font-sans-medium text-[13px] leading-[18px] text-ink-muted">
        {label ?? `Langkah ${langkah} dari ${total}`}
      </Text>
    </View>
  );
}
