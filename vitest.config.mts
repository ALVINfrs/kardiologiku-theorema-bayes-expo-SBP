import { defineConfig } from 'vitest/config';

// Vitest hanya untuk logika murni (engine/sim/data/lib/dll.) yang tidak
// mengimpor react-native. Tes komponen (src/ui) memakai Jest + jest-expo
// (DEC-32): react-native dikirim dengan sintaks Flow dan transform SSR
// Vitest merusak hasil babel-nya, sementara jest-expo adalah jalur
// dokumentasi Expo untuk RNTL.
export default defineConfig({
  test: {
    globals: true,
    include: [
      'src/engine/**/*.test.ts',
      'src/sim/**/*.test.ts',
      'src/data/**/*.test.ts',
      'src/services/**/*.test.ts',
      'src/store/**/*.test.ts',
      'src/content/**/*.test.ts',
      'src/lib/**/*.test.ts',
    ],
  },
});
