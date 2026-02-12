import { SearchBar } from '@/components/shared/SearchBar';
import { PokemonList } from '@/components/pokemon/pokemonList';

export default function Home() {
  return (
    <main className="min-h-screen pokeball-bg">
      <div className="container mx-auto px-8 md:px-16 lg:px-32 xl:px-48 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
            Pokédex
          </h1>
          <p className="text-slate-400 text-lg">
            Search and discover your favorite Pokémon
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <SearchBar />
        </div>

        {/* Pokemon List */}
        <PokemonList />
      </div>
    </main>
  );
}