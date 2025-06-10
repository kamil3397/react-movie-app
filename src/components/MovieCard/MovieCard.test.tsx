import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import MovieCard from "./MovieCard";
import type { Movie } from "../../types/types";

vi.mock("../../context/MovieContext", () => ({
  useMovieContext: () => ({
    favorites: [],
    toggleFavorite: () => {},
  }),
}));

const movie: Movie = {
  id: 1,
  title: "Interstellar",
  overview: "A sci-fi movie about space travel.",
  poster_path: "/interstellar.jpg",
};

describe("MovieCard", () => {
  test("renders movie title", async () => {
    render(<MovieCard movie={movie} />);
    expect(await screen.findByText("Interstellar")).toBeInTheDocument();
  });

  test('renders "No Image" if no poster', async () => {
    render(<MovieCard movie={{ ...movie, poster_path: "" }} />);
    expect(await screen.findByText("No Image")).toBeInTheDocument();
  });
});

//za malo testow, brakuje sprawdzenie conditions, wywolywania funkcji
