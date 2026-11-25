// Setup Jest untuk komponen UI (src/ui).
// Reanimated 4 + Worklets butuh mock JS agar tidak memuat modul native.
// Urutan penting: mock worklets dulu, karena mock reanimated mengimpor
// nilai dari index reanimated yang memuat worklets.
jest.mock('react-native-worklets', () =>
  require('react-native-worklets/src/mock'),
);
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
