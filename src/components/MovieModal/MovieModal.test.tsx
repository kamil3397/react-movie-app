import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { MovieModal } from './MovieModal';
import { useMovieContext } from '../../context/MovieContext';

vi.mock('../../context/MovieContext', () => ({
  useMovieContext: vi.fn(),
}));

const sampleMovie = {
  id: 1,
  title: 'Inception',
  original_title: 'Inception',
  original_language: 'en',
  release_date: '2010-07-16',
  vote_average: 8.8,
  overview: 'Dream within a dream.',
  poster_path: '/inception.jpg',
};

const mockClose = vi.fn();
const mockToggle = vi.fn();

beforeEach(() => {
  vi.mocked(useMovieContext).mockReturnValue({
    selectedMovie: sampleMovie,
    favorites: [],
    closeModal: mockClose,
    toggleFavorite: mockToggle,
    setSelectedMovie: () => { },
  });
});

describe('MovieModal', () => {
  test('renders modal content', async () => {
    render(<MovieModal />);
    expect(await screen.findByRole('heading', { name: 'Inception' })).toBeInTheDocument();
    expect(screen.getByText(/Dream within/i)).toBeInTheDocument();
  });

  test('calls closeModal on ✕ click', async () => {
    render(<MovieModal />);
    fireEvent.click(await screen.findByText('✕'));
    expect(mockClose).toHaveBeenCalled();
  });
});
