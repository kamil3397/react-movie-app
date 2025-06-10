import { useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import { useMovieContext } from "../../context/MovieContext";
import { MovieModal } from "../../components/MovieModal/MovieModal";
import "../../style/Favorites.css";

const FavoritesPage = () => {
  const { favorites, toggleFavorite, setSelectedMovie } = useMovieContext();

  const itemsPerPage = 8; //czemu 8? jesli to jest cos sztywnego to powinno byc poza componentem i napisane screaming snake casem
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(favorites.length / itemsPerPage); // po co math.ceil?
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFavorites = favorites.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (favorites.length === 0) {
    return <p className="no-favorites">No favorite movies.</p>;
  }

  return (
    <div className="favorites-container">
      <h2>⭐ Favorite Movies</h2>
      <div className="favorites-grid">
        {paginatedFavorites.map((movie) => (
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
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀ Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next ▶
          </button>
        </div>
      )}
      <MovieModal /> {/* po co tu MovieModal skoro jest tez w main? */}
    </div>
  );
};

export default FavoritesPage;
