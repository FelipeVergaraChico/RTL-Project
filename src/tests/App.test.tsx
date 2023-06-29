// oi
import { Screen, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Navega para a página home ao clicar no link "home"', async () => {
  const { user } = renderWithRouter(<App />);

  expect(screen.getByRole('heading', { name: /encountered pokémon/i })).toBeInTheDocument();

  const home = screen.getByRole('link', { name: /home/i });
  await user.click(home);
  expect(screen.getByRole('heading', { name: /encountered pokémon/i })).toBeInTheDocument();
});

test('Contém um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);
  const links = screen.getAllByRole('link');
  expect(links[0]).toHaveTextContent('Home');
  expect(links[1]).toHaveTextContent('About');
  expect(links[2]).toHaveTextContent('Favorite Pokémon');
});

test('Navega para a página About ao clicar no link "About"', async () => {
  renderWithRouter(<App />);
  expect(screen.getByRole('heading', { name: /encountered pokémon/i })).toBeInTheDocument();
  const about = screen.getByRole('link', { name: /about/i });
  await userEvent.click(about);
  expect(screen.getByRole('heading', { name: /About Pokédex/i })).toBeInTheDocument();
});

test('Navega para a pagina Favorites ao clicar no link "Favorite Pokémon"', async () => {
  renderWithRouter(<App />);
  expect(screen.getByRole('heading', { name: /encountered pokémon/i })).toBeInTheDocument();
  const favorite = screen.getByRole('link', { name: /Favorite Pokémon/i });
  await userEvent.click(favorite);
  expect(screen.getByRole('heading', { name: /Favorite Pokémon/i })).toBeInTheDocument();
});
