'use client';

import { usePokemonDetail } from '@/hooks/usePokemonQueries';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useMemo } from 'react';
import type { EvolutionChain } from '@/types/pokemon';
import { PokemonSprites } from './pokemonSprites';
import { PokemonTypesAndAbilities } from './pokemonTypesAndAbilities';
import { PokemonPhysical } from './pokemonPhysical';
import { PokemonBaseStats } from './pokemonBaseStats';
import { PokemonEvolutionChain } from './pokemonEvolution';
import { PokemonMoves } from './pokemonMoves';

interface PokemonDetailProps {
  name: string;
}

function parseEvolutionChain(chain: Record<string, unknown>): EvolutionChain[] {
  if (!chain) return [];
  
  const evolutions: EvolutionChain[] = [];
  
  const traverse = (node: Record<string, unknown>) => {
    if (node.species && typeof node.species === 'object') {
      const species = node.species as { name: string; url: string };
      const id = parseInt(species.url.split('/').slice(-2, -1)[0]);
      evolutions.push({
        name: species.name,
        id: id,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      });
    }
    
    if (node.evolves_to && Array.isArray(node.evolves_to) && node.evolves_to.length > 0) {
      node.evolves_to.forEach((evo: unknown) => traverse(evo as Record<string, unknown>));
    }
  };
  
  traverse(chain);
  return evolutions;
}

export function PokemonDetail({ name }: PokemonDetailProps) {
  const { data: pokemon, isLoading, isError } = usePokemonDetail(name);

  const evolutions = useMemo(() => {
    if (pokemon?.evolutionChain) {
      return parseEvolutionChain(pokemon.evolutionChain.chain as Record<string, unknown>);
    }
    return [];
  }, [pokemon]);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (isError || !pokemon) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 text-xl font-bold">Failed to load Pokémon details</p>
        <Link href="/">
          <Button className="mt-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to List
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="outline" className="gap-2 bg-slate-900/80 backdrop-blur-xl border-blue-400/20 hover:bg-slate-800/80 text-white">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="text-blue-300 text-xl font-medium tracking-widest">
          #{String(pokemon.id).padStart(4, '0')}
        </div>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold capitalize bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-center mb-6">
        {pokemon.name}
      </h1>

      {/* Main Pokedex Layout - Responsive Order */}
      <div className="grid lg:grid-cols-[1fr_1.5fr_1fr] gap-4 mb-6">
        {/* Mobile: Image First (order-first), Desktop: Left Info (order-none) */}
        <div className="order-2 lg:order-1">
          <PokemonTypesAndAbilities types={pokemon.types} abilities={pokemon.abilities} />
        </div>

        {/* Mobile & Desktop: Center Image */}
        <div className="order-1 lg:order-2">
          <PokemonSprites 
            name={pokemon.name}
            sprites={{
              front_default: pokemon.sprites.front_default,
              back_default: pokemon.sprites.back_default,
              front_shiny: pokemon.sprites.front_shiny,
            }}
          />
        </div>

        {/* Mobile: Last (order-3), Desktop: Right (order-3) */}
        <div className="order-3">
          <PokemonPhysical height={pokemon.height} weight={pokemon.weight} />
        </div>
      </div>

      {/* Stats - Full Width */}
      <PokemonBaseStats stats={pokemon.stats} />

      {/* Evolution Chain - Responsive */}
      <PokemonEvolutionChain evolutions={evolutions} />

      {/* Moves */}
      <PokemonMoves moves={pokemon.moves} maxDisplay={10} />
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-32 bg-slate-700/50" />
      <div className="text-center space-y-3">
        <Skeleton className="h-8 w-24 mx-auto bg-slate-700/50" />
        <Skeleton className="h-16 w-80 mx-auto bg-slate-700/50" />
      </div>
      <div className="grid lg:grid-cols-[1fr_1.5fr_1fr] gap-4">
        <Skeleton className="h-96 bg-slate-700/50 order-2 lg:order-1" />
        <Skeleton className="h-96 bg-slate-700/50 order-1 lg:order-2" />
        <Skeleton className="h-96 bg-slate-700/50 order-3" />
      </div>
      <Skeleton className="h-64 bg-slate-700/50" />
    </div>
  );
}