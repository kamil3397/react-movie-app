import { render, screen } from "@testing-library/react";
import { describe, afterEach, test, expect } from "vitest";
import { MovieProvider } from "../../context/MovieContext";
import type { Movie } from "../../types/types";
import FavoritesPage from "./FavoritesPage";

const renderWithFavorites = (movies: Movie[]) => {
  localStorage.setItem("favorites", JSON.stringify(movies)); //ustawianie localStorage w tescie? po co?
  //to w ogole nie powinno dzialac w Node, a odpalasz testy w Node, bo nie masz configu z wyszczegolnionym testEnvironment,
  // ktore pozwoliloby na obsluge localStorage

  // gdybys napisal test czy sa jakies filmy, a nie czy nie ma to dowiedzialbys sie, ze to nie dziala
  // ten test traktuje jakby bylo jego brak, bo nic on nie sprawdza, ani w zaden sposob nie spelnia zadania testu
  return render(
    <MovieProvider>
      <FavoritesPage />
    </MovieProvider>
  );
};

describe("FavoritesPage", () => {
  afterEach(() => {
    localStorage.clear();
  });

  test("shows empty state when no favorites", async () => {
    renderWithFavorites([]);
    expect(await screen.findByText(/No favorite movies/i)).toBeInTheDocument();
  });
});
