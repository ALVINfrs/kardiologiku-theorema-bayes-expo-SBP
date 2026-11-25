import { ScrollView, Text, View } from 'react-native';
import { SectionTitle } from './SectionTitle';

interface LayarPlaceholderProps {
  judul: string;
  keterangan?: string;
}

/** Placeholder rute (T-003). Teks judul dilewat sebagai prop; string kanonik
    dipusatkan di strings.ts pada T-004. */
export function LayarPlaceholder({ judul, keterangan }: LayarPlaceholderProps) {
  return (
    <ScrollView className="flex-1 bg-paper px-4 pt-12">
      <SectionTitle judul={judul} />
      <View className="mt-4">
        <Text className="font-sans text-[15px] leading-[22px] text-ink-muted">
          {keterangan ?? 'Layar ini masih berupa placeholder (T-003).'}
        </Text>
      </View>
    </ScrollView>
  );
}
