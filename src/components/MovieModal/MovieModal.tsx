import { useEffect } from 'react';
import { useMovieContext } from '../../context/MovieContext';
import '../../style/MovieModal.css';

export const MovieModal = () => {
  const { selectedMovie, closeModal, toggleFavorite, favorites } = useMovieContext();

  useEffect(() => {
    if (!selectedMovie) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [selectedMovie]);

  if (!selectedMovie) return null;
  const isFavorite = favorites.some(fav => fav.id === selectedMovie.id);

  return (
    <div
      className="modal-backdrop"
      onClick={closeModal}
    >
      <div
        className="modal-content"
        onClick={e => e.preventDefault()}
      >
        <button
          className="close-button"
          onClick={closeModal}
        >
          ✕
        </button>

        <div className="modal-grid">
          {selectedMovie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="modal-poster"
            />
          ) : (
            <div className="modal-poster placeholder">No Image</div>
          )}

          <div className="modal-info">
            <h2 id="modal-title">{selectedMovie.title}</h2>
            <p><strong>Tytuł org.:</strong> {selectedMovie.original_title}</p>
            <p><strong>Język:</strong> {selectedMovie.original_language?.toUpperCase()}</p>
            <p><strong>Data premiery:</strong> {selectedMovie.release_date}</p>
            <p><strong>Ocena:</strong> {selectedMovie.vote_average} / 10</p>
            <p className="overview">{selectedMovie.overview}</p>

            <div className="modal-actions">
              <button
                className={`fav-button ${isFavorite ? 'remove' : 'add'}`}
                onClick={() => toggleFavorite(selectedMovie)}
              >
                {isFavorite ? 'Delete from favorites' : 'Add to favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
