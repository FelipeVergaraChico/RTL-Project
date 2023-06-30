import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Caso não tenha sido selecionado nenhum pokemon ao navegar para a pagina de favoritos ela esteja vazia', async () => {
  renderWithRouter(<App />);

  expect(screen.getByRole('heading', { name: /encountered pokémon/i })).toBeInTheDocument();
  const link = screen.getByRole('link', { name: /Favorite Pokémon/i });
  await userEvent.click(link);
  expect(screen.getByRole('heading', { name: /Favorite Pokémon/i })).toBeInTheDocument();
  expect(screen.getByText(/no favorite pokémon found/i)).toBeInTheDocument();
});

test('Caso tenha selecionado algum pokemon ao navegar para pagina de fav ela tenha o pokemon selecionado', async () => {
  renderWithRouter(<App />);
  expect(screen.getByRole('heading', { name: /encountered pokémon/i })).toBeInTheDocument();
  const details = screen.getByRole('link', { name: /more details/i });
  await userEvent.click(details);
  expect(screen.getByRole('heading', { name: /Pikachu Details/i })).toBeInTheDocument();
  const btn = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  await userEvent.click(btn);
  const favorite = screen.getByRole('link', { name: /Favorite Pokémon/i });
  await userEvent.click(favorite);
  expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
});
