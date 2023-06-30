import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('A pagia contem um heading com o texto page requested not found', () => {
  renderWithRouter(<NotFound />);
  expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  const imagem = screen.getByAltText('Pikachu crying because the page requested was not found') as HTMLImageElement;
  expect(imagem.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
