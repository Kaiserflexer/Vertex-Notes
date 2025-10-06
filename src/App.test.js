import { render, screen } from '@testing-library/react';
import App from './App';

test('отображает пустое состояние и список папок', () => {
  render(<App />);

  expect(screen.getByText('Папки')).toBeInTheDocument();
  expect(screen.getByText('Все заметки')).toBeInTheDocument();
  expect(screen.getByText('Заметок пока нет.')).toBeInTheDocument();
});
