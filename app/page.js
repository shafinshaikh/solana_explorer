import Dashboard from '../components/Dashboard';
import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-10">
      <h1 className="text-4xl font-bold text-center mb-8">Solana Explorer</h1>
      <SearchBar />
      <Dashboard />
    </main>
  );
}