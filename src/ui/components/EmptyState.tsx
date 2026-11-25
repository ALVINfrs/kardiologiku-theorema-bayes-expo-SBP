import { Text, View } from 'react-native';
import { Button } from './Button';

interface EmptyStateProps {
  judul: string;
  isi: string;
  labelTombol?: string;
  onTombol?: () => void;
}

export function EmptyState({
  judul,
  isi,
  labelTombol,
  onTombol,
}: EmptyStateProps) {
  return (
    <View className="items-center px-6 py-8">
      {/* Garis EKG datar — ilustrasi sederhana; EkgStrip (§10) menyusul. */}
      <View className="h-[2px] w-24 bg-line" />
      <Text className="mt-4 text-center font-sans-bold text-[17px] leading-[24px] text-ink">
        {judul}
      </Text>
      <Text className="mt-1 text-center font-sans text-[15px] leading-[22px] text-ink-muted">
        {isi}
      </Text>
      {labelTombol && onTombol ? (
        <View className="mt-4">
          <Button label={labelTombol} onPress={onTombol} varian="secondary" />
        </View>
      ) : null}
    </View>
  );
}
