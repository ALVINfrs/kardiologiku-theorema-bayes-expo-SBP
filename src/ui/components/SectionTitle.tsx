import { Text, View } from 'react-native';

export function SectionTitle({ judul }: { judul: string }) {
  return (
    <View className="border-b-[1.5px] border-line pb-2">
      <Text className="font-sans-bold text-[17px] leading-[24px] text-ink">
        {judul}
      </Text>
    </View>
  );
}
