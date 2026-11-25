import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Banner } from '../../src/ui/components/Banner';
import { Button } from '../../src/ui/components/Button';
import { Card } from '../../src/ui/components/Card';
import { Chip } from '../../src/ui/components/Chip';
import { Dialog } from '../../src/ui/components/Dialog';
import { EmptyState } from '../../src/ui/components/EmptyState';
import { ProbBar } from '../../src/ui/components/ProbBar';
import { SectionTitle } from '../../src/ui/components/SectionTitle';
import { SeverityBadge } from '../../src/ui/components/SeverityBadge';
import { StatTile } from '../../src/ui/components/StatTile';
import { Stepper } from '../../src/ui/components/Stepper';
import { Toast } from '../../src/ui/components/Toast';
import {
  TriToggle,
  type NilaiTriToggle,
} from '../../src/ui/components/TriToggle';

function Seksi({
  judul,
  children,
}: {
  judul: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mt-4">
      <SectionTitle judul={judul} />
      <View className="mt-3 gap-2">{children}</View>
    </View>
  );
}

/** Galeri dev — hanya mode dev (T-002). Menampilkan semua komponen + state. */
export default function Galeri() {
  const { setColorScheme } = useColorScheme();
  const [tri, setTri] = useState<NilaiTriToggle>('tidak-tahu');
  const [chipAktif, setChipAktif] = useState(true);
  const [dialogTerlihat, setDialogTerlihat] = useState(false);
  const [toastTerlihat, setToastTerlihat] = useState(false);

  return (
    <ScrollView className="flex-1 bg-paper px-4 pb-8 pt-12">
      <Text className="font-display text-[24px] leading-[30px] text-ink">
        Galeri Komponen
      </Text>

      <Seksi judul="Tema">
        <View className="flex-row gap-2">
          <Button
            label="Sistem"
            onPress={() => setColorScheme('system')}
            varian="secondary"
          />
          <Button
            label="Terang"
            onPress={() => setColorScheme('light')}
            varian="secondary"
          />
          <Button
            label="Gelap"
            onPress={() => setColorScheme('dark')}
            varian="secondary"
          />
        </View>
      </Seksi>

      <Seksi judul="Button">
        <Button label="Utama" onPress={() => {}} />
        <Button label="Sekunder" onPress={() => {}} varian="secondary" />
        <Button label="Ghost" onPress={() => {}} varian="ghost" />
        <Button label="Bahaya" onPress={() => {}} varian="danger" />
        <Button label="Memuat…" onPress={() => {}} loading />
        <Button label="Nonaktif" onPress={() => {}} disabled />
      </Seksi>

      <Seksi judul="Chip">
        <View className="flex-row gap-2">
          <Chip
            label="Aktif"
            aktif={chipAktif}
            onPress={() => setChipAktif(!chipAktif)}
          />
          <Chip label="Tidak aktif" onPress={() => {}} />
        </View>
      </Seksi>

      <Seksi judul="TriToggle">
        <TriToggle nilai={tri} onUbah={setTri} />
      </Seksi>

      <Seksi judul="ProbBar">
        <ProbBar nama="Fibrilasi Atrium" persen={81.9} keparahan="tinggi" />
        <ProbBar nama="Sinus Takikardia" persen={65.4} keparahan="sedang" />
        <ProbBar nama="Normal" persen={30} keparahan="rendah" />
        <ProbBar nama="Blok AV" persen={99.6} keparahan="darurat" />
      </Seksi>

      <Seksi judul="Card">
        <Card>
          <Text className="font-sans text-[15px] leading-[22px] text-ink">
            Isi kartu contoh.
          </Text>
        </Card>
      </Seksi>

      <Seksi judul="Banner">
        <Banner varian="info" judul="Info" isi="Pesan informasi contoh." />
        <Banner
          varian="warning"
          judul="Perhatian"
          isi="Pesan peringatan contoh."
        />
        <Banner
          varian="danger"
          judul="Darurat"
          isi="Pesan darurat contoh."
          labelAksi="Hubungi 119"
          onAksi={() => {}}
        />
        <Banner
          varian="dataEstimasi"
          judul="Data estimasi"
          isi="Angka basis pengetahuan belum divalidasi pakar."
        />
      </Seksi>

      <Seksi judul="SeverityBadge">
        <View className="flex-row flex-wrap gap-2">
          <SeverityBadge keparahan="rendah" />
          <SeverityBadge keparahan="sedang" />
          <SeverityBadge keparahan="tinggi" />
          <SeverityBadge keparahan="darurat" />
        </View>
      </Seksi>

      <Seksi judul="StatTile">
        <StatTile angka="78" label="denyut / menit" />
      </Seksi>

      <Seksi judul="Stepper">
        <Stepper langkah={2} total={3} />
      </Seksi>

      <Seksi judul="EmptyState">
        <EmptyState
          judul="Belum ada data"
          isi="Coba deteksi dulu untuk melihat hasil di sini."
          labelTombol="Mulai deteksi"
          onTombol={() => {}}
        />
      </Seksi>

      <Seksi judul="Dialog & Toast">
        <Button label="Buka dialog" onPress={() => setDialogTerlihat(true)} />
        <Button
          label="Tampilkan toast"
          onPress={() => setToastTerlihat(true)}
          varian="secondary"
        />
      </Seksi>

      <Dialog
        terlihat={dialogTerlihat}
        judul="Hapus data?"
        isi="Tindakan ini tidak bisa dibatalkan."
        onBatal={() => setDialogTerlihat(false)}
        onKonfirmasi={() => setDialogTerlihat(false)}
      />
      <Toast pesan="Tersimpan." terlihat={toastTerlihat} />
    </ScrollView>
  );
}
