import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Se a imagem do pokemon possui o src de o alt correto', () => {
  renderWithRouter(<App />);
  const imgUrl = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
  const imgAlt = 'Pikachu sprite';
  expect(screen.getByRole('img', { name: /Pikachu sprite/i })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /Pikachu sprite/i })).toHaveAttribute('src', imgUrl);
  expect(screen.getByRole('img', { name: /Pikachu sprite/i })).toHaveAttribute('alt', imgAlt);
});
test('Se é exubido na tela um texto com o tipo do pokemon', () => {
  renderWithRouter(<App />);
  expect(screen.getByTestId('pokemon-type')).toHaveTextContent(/Electric/);
});
test('Aparece na tela um link com o hreft correto', () => {
  renderWithRouter(<App />);
  expect(screen.getByRole('link', { name: /more details/i })).toHaveAttribute('href', '/pokemon/25');
});
test('Aparece na tela o peso do pokemon', () => {
  renderWithRouter(<App />);
  expect(screen.getByText(/average weight: 6\.0 kg/i)).toBeInTheDocument();
});
test('Aparece se a imagem dos favoritos tem o src e o alt corretos e se a estrela aparece', async () => {
  renderWithRouter(<App />);
  const details = screen.getByRole('link', { name: /more details/i });
  await userEvent.click(details);
  expect(screen.getByRole('heading', { name: /Pikachu Details/i })).toBeInTheDocument();
  const btn = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  await userEvent.click(btn);
  const link = screen.getByRole('link', { name: /Favorite Pokémon/i });
  await userEvent.click(link);
  expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  const imgUrl = '/star-icon.svg';
  const imageAlt = 'Pikachu is marked as favorite';
  expect(screen.getByRole('img', { name: /Pikachu is marked as favorite/i })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /Pikachu is marked as favorite/i })).toHaveAttribute('src', imgUrl);
  expect(screen.getByRole('img', { name: /Pikachu is marked as favorite/i })).toHaveAttribute('alt', imageAlt);
});
