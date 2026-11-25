import type { ReactNode } from 'react';
import { View } from 'react-native';

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <View className="rounded-card border-[1.5px] border-line bg-surface p-4">
      {children}
    </View>
  );
}
