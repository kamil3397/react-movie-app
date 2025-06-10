import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Movie } from "../types/types";

interface MovieContextProps {
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie) => void; // to jest niepoprawny typ, to jest funkcja setter z useState
  closeModal: () => void;
  favorites: Movie[]; //favourites
  toggleFavorite: (movie: Movie) => void; // toggleFavourite
}

export const MovieContext = createContext<MovieContextProps | undefined>(
  undefined
);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [favorites, setFavorites] = useState<Movie[]>([]); //literowka

  const closeModal = () => setSelectedMovie(null);

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === movie.id)
        ? prev.filter((fav) => fav.id !== movie.id)
        : [...prev, movie]
    );
  };

  useEffect(() => {
    const stored = localStorage.getItem("favorites"); // nie po to masz context, aby trzymac w localStorage JSONA, kiedy localStorage prazechowuje STRINGI
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        //ten blad jest niepoprawny, w catch trafisz jak funckja setter rzuci bledem(marne szane)
        // caly try catch jest zbedny, tak samo dzialanie tego useEffecta jest niepoprawne
        console.warn("Failed to parse favorites from localStorage.");
      }
    }
  }, []);

  useEffect(() => {
    // jeden useEffect przy inicjalnym renderze pobierze, a drugi ustawi te same dane, ciekawe (bledne)
    localStorage.setItem("favorites", JSON.stringify(favorites));
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
    throw new Error("useMovieContext must be used within MovieProvider");
  }
  return context;
};
