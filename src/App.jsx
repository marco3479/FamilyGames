import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameHost from './pages/GameHost';
import AnimalQuiz from './games/AnimalQuiz/AnimalQuiz';
import Settings from './pages/Settings';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameHost />} />
        <Route path="/animal-quiz" element={<AnimalQuiz />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
} 