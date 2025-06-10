import React, { type FC } from "react";
import type { Movie } from "../../types/types";
import { useMovieContext } from "../../context/MovieContext";
import "../../style/MovieCard.css";

interface MovieCardProps {
  //  czemu interface a nie type?
  movie: Movie;
  onClick?: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

const MovieCard: FC<MovieCardProps> = ({
  movie,
  onClick,
  actionLabel,
  onAction,
}) => {
  const { favorites, toggleFavorite } = useMovieContext();
  const isFavorited = favorites.some((fav) => fav.id === movie.id); //nie istnieje takie slowo jak isFavorited; uzywasz tego  w
  // wiecej niz jednym komponencie, moze warto byloby rozszerzyc obiekt movie o pole favourite?

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    (onAction ?? (() => toggleFavorite(movie)))(); // skad wziales ten kod i co on robi? szczegolowo krok po kroku, bo nie wierze, ze jest napisany samemu
  };

  return (
    <div className="movie-card" onClick={onClick}>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
        <div className="placeholder">No Image</div>
      )}
      <h3 className="movie-title">{movie.title}</h3>
      {movie.overview && (
        <p className="movie-overview">{movie.overview.slice(0, 150)}...</p>
      )}
      <button className="movie-card-button" onClick={handleAction}>
        {actionLabel ??
          (isFavorited ? "Delete from favoriets" : "Add to favorites")}
      </button>
    </div>
  );
};

export default MovieCard; // czemu export default?
