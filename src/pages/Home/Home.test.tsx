import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { MovieProvider } from '../../context/MovieContext';
import Home from './Home';

describe('Home', () => {
  test('shows loading initially', () => {
    render(
      <MemoryRouter>
        <MovieProvider>
          <Home />
        </MovieProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
