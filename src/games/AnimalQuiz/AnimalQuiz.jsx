// To use Unsplash, create a .env file in your project root with:
// VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
import { useState, useEffect } from "react";
import animals from "./animals";
import Button from "../../components/Button";

function shuffle(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function getRandomAnimalNames(animals, exclude, count) {
  const names = animals.map((a) => a.name).filter((n) => n !== exclude);
  return shuffle(names).slice(0, count);
}

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY; // Loaded from .env

// Zelda heart SVG (full and empty)
const FullHeart = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="red" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 29s-13-8.35-13-16.5S8.5 2 16 10.5 29 2 29 12.5 16 29 16 29z" stroke="black" strokeWidth="2"/>
  </svg>
);
const EmptyHeart = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 29s-13-8.35-13-16.5S8.5 2 16 10.5 29 2 29 12.5 16 29 16 29z" stroke="black" strokeWidth="2"/>
  </svg>
);

// Home and settings icons
const HomeIcon = () => (
  <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12L12 3l9 9"/><path d="M9 21V9h6v12"/></svg>
);
const SettingsIcon = () => (
  <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09A1.65 1.65 0 0 0 9 3.09V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);

// Checkmark and X icons
const Checkmark = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="58" fill="#22c55e" stroke="#16a34a" strokeWidth="4"/>
    <path d="M35 65l20 20 30-40" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const XMark = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="58" fill="#ef4444" stroke="#b91c1c" strokeWidth="4"/>
    <path d="M40 40l40 40M80 40l-40 40" stroke="white" strokeWidth="8" strokeLinecap="round"/>
  </svg>
);

export default function AnimalQuiz() {
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [current, setCurrent] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(null); // 'correct' | 'wrong' | null
  const [gameOver, setGameOver] = useState(false);

  const animal = animals[current % animals.length];
  const options = shuffle([
    animal.name,
    ...getRandomAnimalNames(animals, animal.name, 2),
  ]);

  useEffect(() => {
    async function fetchImage() {
      setLoading(true);
      setImageUrl("");
      try {
        const query = encodeURIComponent(animal.name);
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`
        );
        const data = await res.json();
        setImageUrl(data.results[0]?.urls?.regular || "");
      } catch (e) {
        setImageUrl("");
      } finally {
        setLoading(false);
      }
    }
    fetchImage();
  }, [animal]);

  useEffect(() => {
    if (hearts <= 0) {
      setGameOver(true);
    }
  }, [hearts]);

  function handleSelect(option) {
    if (gameOver) return;
    if (option === animal.name) {
      setScore(score + 1);
      setShowResult('correct');
      setTimeout(() => {
        setShowResult(null);
        setCurrent(current + 1);
      }, 1200);
    } else {
      setHearts(hearts - 1);
      setShowResult('wrong');
      setTimeout(() => {
        setShowResult(null);
        if (hearts - 1 <= 0) setGameOver(true);
      }, 1200);
    }
  }

  function handleRestart() {
    setScore(0);
    setHearts(5);
    setCurrent(0);
    setGameOver(false);
    setShowResult(null);
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center relative">
      <header className="flex justify-between w-full p-4 max-w-3xl mx-auto items-center">
        <Button to="/home" aria-label="Home" className="bg-transparent border-none p-2"><HomeIcon /></Button>
        <div className="flex gap-4 items-center">
          <div className="border-2 rounded-xl px-4 py-2">score: {score}</div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => i < hearts ? <FullHeart key={i} /> : <EmptyHeart key={i} />)}
          </div>
        </div>
        <Button to="/settings" aria-label="Settings" className="bg-transparent border-none p-2"><SettingsIcon /></Button>
      </header>
      <main className="flex flex-col items-center mt-8 w-full">
        <div className="border-2 rounded-xl p-8 mb-8 flex items-center justify-center w-64 h-64">
          {loading ? (
            <span>Loading...</span>
          ) : imageUrl ? (
            <img src={imageUrl} alt={animal.name} className="w-48 h-48 object-contain" />
          ) : (
            <span>No image found</span>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
          {options.map((opt) => (
            <Button key={opt} onClick={() => handleSelect(opt)} disabled={!!showResult || gameOver}>{opt}</Button>
          ))}
        </div>
      </main>
      {/* Overlay for result feedback */}
      {showResult === 'correct' && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          <Checkmark />
        </div>
      )}
      {showResult === 'wrong' && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          <XMark />
        </div>
      )}
      {/* Game Over Screen */}
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 z-50">
          <h1 className="text-4xl font-bold mb-6">Game Over</h1>
          <div className="mb-4">Final Score: <span className="font-bold">{score}</span></div>
          <Button onClick={handleRestart}>Restart</Button>
        </div>
      )}
    </div>
  );
} 