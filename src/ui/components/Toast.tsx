import { Text, View } from 'react-native';

interface ToastProps {
  pesan: string;
  terlihat: boolean;
}

export function Toast({ pesan, terlihat }: ToastProps) {
  if (!terlihat) return null;
  return (
    <View
      accessibilityLiveRegion="polite"
      className="absolute bottom-20 left-4 right-4 items-center rounded-banner bg-ink px-4 py-3"
    >
      <Text className="text-center font-sans-medium text-[13px] leading-[18px] text-surface">
        {pesan}
      </Text>
    </View>
  );
}
