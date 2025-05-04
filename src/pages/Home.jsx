import Button from '../components/Button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-8">Welcome to KidGamez!</h1>
      <Button to="/">Go to Games</Button>
    </div>
  );
} 