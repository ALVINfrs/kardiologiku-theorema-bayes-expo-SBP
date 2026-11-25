import { Pressable, Text, View } from 'react-native';

export type NilaiTriToggle = 'ya' | 'tidak' | 'tidak-tahu';

interface TriToggleProps {
  nilai: NilaiTriToggle;
  onUbah: (nilai: NilaiTriToggle) => void;
  accessibilityLabel?: string;
}

const SEGMEN: { nilai: NilaiTriToggle; label: string }[] = [
  { nilai: 'ya', label: 'Ya' },
  { nilai: 'tidak', label: 'Tidak' },
  { nilai: 'tidak-tahu', label: 'Tidak tahu' },
];

const KELAS_AKTIF: Record<NilaiTriToggle, string> = {
  ya: 'bg-trace',
  tidak: 'bg-ink-muted',
  'tidak-tahu': 'bg-line',
};

export function TriToggle({
  nilai,
  onUbah,
  accessibilityLabel,
}: TriToggleProps) {
  return (
    <View
      accessibilityLabel={accessibilityLabel ?? 'Pilihan jawaban'}
      accessibilityRole="radiogroup"
      className="h-11 w-full flex-row rounded-button border-[1.5px] border-line bg-surface p-0.5"
    >
      {SEGMEN.map((segmen) => {
        const aktif = nilai === segmen.nilai;
        return (
          <Pressable
            key={segmen.nilai}
            onPress={() => onUbah(segmen.nilai)}
            accessibilityRole="radio"
            accessibilityState={{ selected: aktif }}
            accessibilityLabel={segmen.label}
            className={`flex-1 items-center justify-center rounded-[10px] ${
              aktif ? KELAS_AKTIF[segmen.nilai] : ''
            }`}
          >
            <Text
              className={`font-sans-bold text-[15px] leading-[22px] ${
                aktif ? 'text-surface' : 'text-ink-muted'
              }`}
            >
              {segmen.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
