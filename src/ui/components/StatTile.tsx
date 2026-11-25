import { Text, View } from 'react-native';

interface StatTileProps {
  angka: string;
  label: string;
}

export function StatTile({ angka, label }: StatTileProps) {
  return (
    <View className="items-center">
      <Text className="font-mono-bold text-[40px] leading-[44px] text-ink">
        {angka}
      </Text>
      <Text className="mt-1 font-sans-medium text-[12px] leading-[16px] text-ink-muted">
        {label}
      </Text>
    </View>
  );
}
