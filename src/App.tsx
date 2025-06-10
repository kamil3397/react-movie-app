import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navabar/Navabar";
import { MovieModal } from "./components/MovieModal/MovieModal";

const Home = lazy(() => import("./pages/Home/Home")); // => HomePage / naming convention consistency
const FavoritesPage = lazy(() => import("./pages/FavoritesPage/FavoritesPage"));
//czemu nie arrow function?
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <Routes>
        {/* czemu nie za pomoca createBrowserRouter? */}
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <MovieModal />
    </Suspense>
  );
}

export default App;

// gdzie tu sa uzyte preprocesory css lub css-in-js?
// minus za generyczne readme, nawet nie ma w nim informacji o tym, ze to jest aplikacja do wyszukiwania filmow, brak jakiejkolwiek dokumentacji
// minus za brak dokumentacji, nie ma nawet readme

//wizualne:
// czemu search bar sie rozciaga?
// na stronie z ulubionymi oraz w home brak odstepu miedzy elementami
// placehodler "no image" jest mniejszy niz img kiedy jest, zle to wyglada
// elementy sa roznej wielkosci w zaleznosci od danych, ktore przyjmuja, powinny byc takie same
