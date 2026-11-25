import React from 'react';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { CountUp, PressScale, Stagger, TraceDraw } from '../components/motion';
import { formatPersen } from '../../lib/format';

describe('komponen motion (DESIGN §16)', () => {
  it('CountUp menampilkan nilai akhir', async () => {
    await render(<CountUp nilai={81.9} format={formatPersen} />);
    expect(screen.getByText('81,9%')).toBeTruthy();
  });

  it('TraceDraw menampilkan jejak', async () => {
    await render(<TraceDraw />);
    expect(screen.getByTestId('jejak-ekg')).toBeTruthy();
  });

  it('Stagger menampilkan semua anak', async () => {
    await render(
      <Stagger>
        <Text>Satu</Text>
        <Text>Dua</Text>
        <Text>Tiga</Text>
      </Stagger>,
    );
    expect(screen.getByText('Satu')).toBeTruthy();
    expect(screen.getByText('Dua')).toBeTruthy();
    expect(screen.getByText('Tiga')).toBeTruthy();
  });

  it('PressScale menampilkan anak', async () => {
    await render(
      <PressScale>
        <Text>Tekan aku</Text>
      </PressScale>,
    );
    expect(screen.getByText('Tekan aku')).toBeTruthy();
  });
});
