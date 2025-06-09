import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navabar/Navabar';
import { MovieModal } from './components/MovieModal/MovieModal';

const Home = lazy(() => import('./pages/Home/Home'));
const FavoritesPage = lazy(()=> import('./pages/FavoritesPage/FavoritesPage'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/favorites' element={<FavoritesPage/>}/>
      </Routes>
      <MovieModal/>
    </Suspense>
  );
}

export default App;
