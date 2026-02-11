import { SearchBar } from '@/components/shared/SearchBar';
import { PokemonList } from '@/components/pokemon/pokemonList';

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Pokédex
          </h1>
          <p className="text-gray-600 text-lg">
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