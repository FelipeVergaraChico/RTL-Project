import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('A pagina contém as informações sobre a Pokédex', () => {
  renderWithRouter(<About />);
  expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  const imagem = screen.getByAltText('Pokédex') as HTMLImageElement;
  expect(imagem.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
