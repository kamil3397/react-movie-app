import React, { type FC } from 'react';
import type { Movie } from '../../types/types';
import { useMovieContext } from '../../context/MovieContext';

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

const MovieCard: FC<MovieCardProps> = ({ movie, onClick, actionLabel, onAction }) => {
  const { favorites, toggleFavorite } = useMovieContext();
  const isFavorited = favorites.some(fav => fav.id === movie.id);

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
   (onAction ?? (() => toggleFavorite(movie)))();
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
      {movie.overview && <p className="movie-overview">{movie.overview.slice(0, 150)}...</p>}
      <button className="movie-card-button" onClick={handleAction}>
        {actionLabel ?? (isFavorited ? 'Delete from favoriets' : 'Add to favorites')}
      </button>
    </div>
  );
};

export default MovieCard;