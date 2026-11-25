import { Fraunces_600SemiBold } from '@expo-google-fonts/fraunces';
import {
  InstrumentSans_400Regular,
  InstrumentSans_500Medium,
  InstrumentSans_700Bold,
} from '@expo-google-fonts/instrument-sans';
import {
  JetBrainsMono_500Medium,
  JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';

/** Peta font untuk `useFonts` (DESIGN §4). */
export const petaFont = {
  Fraunces_600SemiBold,
  InstrumentSans_400Regular,
  InstrumentSans_500Medium,
  InstrumentSans_700Bold,
  JetBrainsMono_500Medium,
  JetBrainsMono_700Bold,
};

/** Nama keluarga font seperti dipakai di `tailwind.config.js`. */
export const namaFont = {
  display: 'Fraunces_600SemiBold',
  sans: 'InstrumentSans_400Regular',
  sansMedium: 'InstrumentSans_500Medium',
  sansBold: 'InstrumentSans_700Bold',
  mono: 'JetBrainsMono_500Medium',
  monoBold: 'JetBrainsMono_700Bold',
} as const;
