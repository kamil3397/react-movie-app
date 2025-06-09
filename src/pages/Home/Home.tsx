import { useEffect, useState } from 'react';
import type { Movie } from '../../types/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMovieContext } from '../../context/MovieContext';
import MovieCard from '../../components/MovieCard/MovieCard';
import '../../style/Home.css'

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Home = () => {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { setSelectedMovie } = useMovieContext();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchNowPlaying = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
      const data = await res.json();
      setResults(data.results || []);
      setTotalPages(data.total_pages);
    } catch {
      setError('Something went wrong');
    }
    setLoading(false);
  };

  const searchMovies = async (input: string, page = 1) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(input)}&page=${page}`
      );
      const data = await res.json();
      setResults(data.results || []);
      setTotalPages(data.total_pages);
    } catch {
      setError('Something went wrong');
    }
    setLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query')?.trim() || '';
    const pageParam = parseInt(params.get('page') || '1', 10);
    setCurrentPage(pageParam);

    if (query) {
      searchMovies(query, pageParam);
    } else {
      fetchNowPlaying(pageParam);
    }
  }, [location.search]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(location.search);
    params.set('page', newPage.toString());
    navigate({ search: params.toString() });
  };

  return (
    <div className="container">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {results.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => setSelectedMovie(movie)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ◀ Poprzednia
          </button>
          <span>Strona {currentPage} z {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Następna ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
