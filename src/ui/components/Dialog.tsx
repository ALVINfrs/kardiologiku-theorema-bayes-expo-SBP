import { Modal, Text, View } from 'react-native';
import { Button } from './Button';

interface DialogProps {
  terlihat: boolean;
  judul: string;
  isi: string;
  labelBatal?: string;
  labelKonfirmasi?: string;
  onBatal: () => void;
  onKonfirmasi: () => void;
}

export function Dialog({
  terlihat,
  judul,
  isi,
  labelBatal = 'Batal',
  labelKonfirmasi = 'Ya, lanjutkan',
  onBatal,
  onKonfirmasi,
}: DialogProps) {
  return (
    <Modal
      visible={terlihat}
      transparent
      animationType="fade"
      onRequestClose={onBatal}
    >
      <View className="flex-1 items-center justify-center bg-ink/50 px-6">
        <View className="w-full rounded-card border-[1.5px] border-line bg-surface p-4">
          <Text className="font-sans-bold text-[17px] leading-[24px] text-ink">
            {judul}
          </Text>
          <Text className="mt-2 font-sans text-[15px] leading-[22px] text-ink-muted">
            {isi}
          </Text>
          <View className="mt-4 flex-row justify-end gap-2">
            <Button label={labelBatal} onPress={onBatal} varian="ghost" />
            <Button
              label={labelKonfirmasi}
              onPress={onKonfirmasi}
              varian="danger"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
