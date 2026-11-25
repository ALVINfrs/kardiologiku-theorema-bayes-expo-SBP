import { useLocalSearchParams } from 'expo-router';
import { LayarPlaceholder } from '../../src/ui/components/LayarPlaceholder';

export default function Layar() {
  const { irama } = useLocalSearchParams<{ irama: string }>();
  return <LayarPlaceholder judul={`Simulasi: ${irama ?? ''}`} />;
}
