// Resolver Jest: satu pengecualian — `./initializers` dari
// react-native-reanimated dipaksa ke file dasar (.ts), bukan varian .native.
// Varian .native memanggil setCSSEventHandler saat dimuat dan melempar di
// JSReanimated (Jest); file dasar aman untuk tes. File lain dibiarkan pada
// resolusi bawaan agar varian .native (mis. ReducedMotion.native yang memakai
// AccessibilityInfo, bukan window.matchMedia dari file dasar web) tetap terpakai.

/** @type {import('jest-resolve').SyncResolver} */
module.exports = (request, options) => {
  const { defaultResolver } = options;
  const mintaInitializers =
    options.basedir.includes('react-native-reanimated') &&
    /(^|\/)initializers$/.test(request);
  if (mintaInitializers) {
    const opsi = { ...options };
    opsi.extensions = options.extensions?.filter(
      (ext) => !ext.includes('native'),
    );
    options = opsi;
  }
  return defaultResolver(request, options);
};
