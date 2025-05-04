import Button from '../components/Button';

export default function GameHost() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-8">KidGamez</h1>
      <div className="flex flex-col gap-4">
        <Button to="/animal-quiz">Animal Quiz</Button>
        {/* Add more games here as you build them */}
      </div>
    </div>
  );
} 