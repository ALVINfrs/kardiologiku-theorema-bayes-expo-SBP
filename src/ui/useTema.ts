import { useColorScheme } from 'nativewind';
import { tema, type TokenWarna } from './theme';

/** Token warna aktif sesuai tema sistem/pengaturan (light/dark). */
export function useTema(): TokenWarna {
  const { colorScheme } = useColorScheme();
  return tema[colorScheme === 'dark' ? 'dark' : 'light'];
}
