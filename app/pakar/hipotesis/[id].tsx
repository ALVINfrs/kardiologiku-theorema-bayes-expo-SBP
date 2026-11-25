import { useLocalSearchParams } from 'expo-router';
import { LayarPlaceholder } from '../../../src/ui/components/LayarPlaceholder';

export default function Layar() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <LayarPlaceholder judul={`Hipotesis: ${id ?? ''}`} />;
}
