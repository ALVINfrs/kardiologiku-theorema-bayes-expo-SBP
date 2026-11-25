import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { LogoHero, LogoLockup, LogoMark, Splash } from '../components/Logo';
import { usePengaturanGerak } from '../../store/pengaturan';

// Skia tidak dimuat di Jest — jejak EKG Skia diganti stub.
jest.mock('../components/JejakEkgSkia', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- require di dalam factory mock
  const { View } = require('react-native');
  return { JejakEkgSkia: () => <View testID="jejak-ekg-skia" /> };
});
jest.mock('expo-image', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- require di dalam factory mock
  const { View } = require('react-native');
  return {
    Image: (props: { testID?: string }) => <View testID={props.testID} />,
  };
});

describe('Logo (DESIGN §17)', () => {
  it('tanda vektor tampil di ukuran 24 dan 72', async () => {
    await render(
      <>
        <LogoMark ukuran={24} />
        <LogoMark ukuran={72} />
      </>,
    );
    const semua = screen.getAllByTestId('logo-mark');
    expect(semua).toHaveLength(2);
    expect(semua[0].props.width).toBe(24);
    expect(semua[0].props.height).toBeCloseTo(21.6, 1);
    expect(semua[1].props.width).toBe(72);
  });

  it('tanda vektor varian gelap dan mono tampil', async () => {
    await render(
      <>
        <LogoMark ukuran={48} varian="gelap" />
        <LogoMark ukuran={48} varian="mono" warna="#000000" />
      </>,
    );
    expect(screen.getAllByTestId('logo-mark')).toHaveLength(2);
  });

  it('logo hero tampil: gambar jantung + jejak EKG', async () => {
    await render(<LogoHero />);
    expect(screen.getByTestId('logo-hero-gambar')).toBeTruthy();
    expect(screen.getByTestId('jejak-ekg-skia')).toBeTruthy();
  });

  it('lockup menampilkan wordmark Kardiologiku', async () => {
    await render(<LogoLockup />);
    expect(screen.getByText('Kardiologiku')).toBeTruthy();
  });

  it('splash statis (reduceMotion) memanggil onSelesai setelah 600 ms', async () => {
    jest.useFakeTimers();
    usePengaturanGerak.getState().setManual(true);
    try {
      const onSelesai = jest.fn();
      await render(<Splash onSelesai={onSelesai} />);
      expect(screen.getByTestId('logo-hero-gambar')).toBeTruthy();
      expect(screen.getByText('Kardiologiku')).toBeTruthy();
      expect(onSelesai).not.toHaveBeenCalled();
      jest.advanceTimersByTime(600);
      expect(onSelesai).toHaveBeenCalledTimes(1);
    } finally {
      usePengaturanGerak.getState().setManual(null);
      jest.useRealTimers();
    }
  });
});
