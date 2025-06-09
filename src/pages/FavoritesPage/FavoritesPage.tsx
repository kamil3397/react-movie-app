import { useState } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import { useMovieContext } from '../../context/MovieContext';
import '../../style/Favorites.css';
import { MovieModal } from '../../components/MovieModal/MovieModal';

const FavoritesPage = () => {
  const { favorites, toggleFavorite, setSelectedMovie } = useMovieContext();

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(favorites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFavorites = favorites.slice(startIndex, startIndex + itemsPerPage);

  if (favorites.length === 0) {
    return <p className="no-favorites">No favorite movies.</p>;
  }

  return (
    <div className="favorites-container">
      <h2>⭐ Favorite Movies</h2>
      <div className="favorites-grid">
        {paginatedFavorites.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => setSelectedMovie(movie)}
            actionLabel="Delete from favorites"
            onAction={() => toggleFavorite(movie)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀ Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next ▶
          </button>
        </div>
      )}

      <MovieModal />
    </div>
  );
};

export default FavoritesPage;
