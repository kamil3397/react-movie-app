import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../style/Navbar.css"; // czemu nie trzymasz stylu gdzies blizej komponentu skoro jest uzywany tylko tutaj?

//uzywanie ikon z klawiatury to sredni pomysl, nie kazda przegladarka to wspiera
//literowka w nazwie folderu i pliku
export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = search.trim(); // to jest string, a nie optional string po co if ponizej?
    if (term) {
      navigate(`/?query=${encodeURIComponent(term)}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <h1 className="navbar-logo">🎬 MovieApp</h1>
        <div className="navbar-links">
          {/* mozna to rozwiazac reuzywalnym komponentem */}
          <Link
            to="/"
            className={
              location.pathname === "/" && !location.search ? "active" : ""
            }
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className={location.pathname === "/favorites" ? "active" : ""}
          >
            Favorites
          </Link>
        </div>
        <form className="navbar-search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>
      </div>
    </nav>
  );
};
