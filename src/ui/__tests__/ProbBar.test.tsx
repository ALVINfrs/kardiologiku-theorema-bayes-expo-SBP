import { StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { ProbBar } from '../components/ProbBar';

describe('ProbBar (DESIGN §6)', () => {
  it('menampilkan nama, angka mono, dan label aksesibilitas', async () => {
    await render(
      <ProbBar nama="Fibrilasi Atrium" persen={81.9} keparahan="tinggi" />,
    );
    expect(screen.getByText('Fibrilasi Atrium')).toBeTruthy();
    expect(screen.getByText('81,9%')).toBeTruthy();
    expect(screen.getByLabelText('Fibrilasi Atrium, 81,9 persen')).toBeTruthy();
  });

  it('lebar isi sesuai nilai persen', async () => {
    await render(<ProbBar nama="SVT" persen={50} keparahan="sedang" />);
    const isi = screen.getByTestId('probbar-isi');
    expect(StyleSheet.flatten(isi.props.style)).toMatchObject({
      width: '50%',
    });
  });
});
