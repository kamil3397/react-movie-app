import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Movie } from '../types/types';

interface MovieContextProps {
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie) => void;
  closeModal: () => void;
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
}

export const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const closeModal = () => setSelectedMovie(null);

  const toggleFavorite = (movie: Movie) => {
    setFavorites(prev =>
      prev.some(fav => fav.id === movie.id)
        ? prev.filter(fav => fav.id !== movie.id)
        : [...prev, movie]
    );
  };

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        console.warn('Failed to parse favorites from localStorage.');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <MovieContext.Provider
      value={{
        selectedMovie,
        setSelectedMovie,
        closeModal,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within MovieProvider');
  }
  return context;
};
