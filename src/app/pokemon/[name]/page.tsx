import { PokemonDetail } from '@/components/pokemon/detailPokemon';

interface PokemonDetailPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const { name } = await params;
  
  return (
    <main className="min-h-screen pokeball-bg">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <PokemonDetail name={name} />
      </div>
    </main>
  );
}