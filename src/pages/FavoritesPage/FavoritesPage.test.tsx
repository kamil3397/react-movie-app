import { render, screen } from '@testing-library/react';
import { describe, afterEach, test, expect } from 'vitest';
import { MovieProvider } from '../../context/MovieContext';
import type { Movie } from '../../types/types';
import FavoritesPage from './FavoritesPage';


const renderWithFavorites = (movies: Movie[]) => {
  localStorage.setItem('favorites', JSON.stringify(movies));
  return render(
    <MovieProvider>
      <FavoritesPage />
    </MovieProvider>
  );
};

describe('FavoritesPage', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('shows empty state when no favorites', async () => {
    renderWithFavorites([]);
    expect( await screen.findByText(/No favorite movies/i)).toBeInTheDocument();
  });
});
