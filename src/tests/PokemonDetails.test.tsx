import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('As informações do pokemon selecionado serao mostradas na tela', async () => {
  renderWithRouter(<App />);
  const detail = screen.getByRole('link', { name: /more details/i });
  await userEvent.click(detail);
  expect(screen.getByRole('heading', { name: /pikachu details/i })).toBeInTheDocument();
  expect(detail).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
  const resume = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
  expect(resume).toBeInTheDocument();
});

test('Existe na pagina uma seção com os mapas contendo as localizações do pokemon', async () => {
  renderWithRouter(<App />);
  const detail = screen.getByRole('link', { name: /more details/i });
  await userEvent.click(detail);
  expect(screen.getByRole('heading', { name: /game locations of pikachu/i })).toBeInTheDocument();
  const map = screen.getAllByRole('img', { name: /pikachu location/i });
  expect(map[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
  expect(map[0]).toHaveAttribute('alt', 'Pikachu location');
  expect(map[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(map[1]).toHaveAttribute('alt', 'Pikachu location');
});

test('O usuario pode favoritar um pokemon por meio da pagina de detalhes', async () => {
  renderWithRouter(<App />);
  const detail = screen.getByRole('link', { name: /more details/i });
  await userEvent.click(detail);
  const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  expect(screen.getByRole('heading', { name: /pikachu details/i })).toBeInTheDocument();
  expect(checkbox).toBeInTheDocument();
  await userEvent.click(checkbox);
  const icon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(icon).toBeInTheDocument();
  await userEvent.click(checkbox);
  expect(icon).not.toBeInTheDocument();
  expect(checkbox.parentElement).toHaveTextContent(/Pokémon favoritado?/);
});
