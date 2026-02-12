'use client';

import { usePokemonDetail } from '@/hooks/usePokemonQueries';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Ruler, Weight } from 'lucide-react';
import { useMemo } from 'react';
import type { EvolutionChain } from '@/types/pokemon';

interface PokemonDetailProps {
  name: string;
}

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-400',
  fighting: 'bg-orange-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-700',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

// Parse evolution chain from API response
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

  // Use useMemo instead of useEffect + useState
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
          <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to List
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/">
        <Button variant="outline" className="gap-2 bg-slate-800/50 border-slate-700 hover:bg-slate-700 text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to List
        </Button>
      </Link>

      {/* Pokemon Header */}
      <div className="text-center">
        <div className="text-slate-400 text-sm mb-2">#{String(pokemon.id).padStart(4, '0')}</div>
        <h1 className="text-5xl font-bold capitalize bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          {pokemon.name}
        </h1>
      </div>

      {/* Sprites */}
      <Card className="p-6 bg-slate-800/50 border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-white">Sprites</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-slate-400 mb-3 font-semibold">Front Default</p>
            <div className="bg-linear-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-6 border-2 border-slate-600/50">
              <Image
                src={pokemon.sprites.front_default}
                alt={`${pokemon.name} front`}
                width={150}
                height={150}
                className="mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-400 mb-3 font-semibold">Back Default</p>
            <div className="bg-linear-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-6 border-2 border-slate-600/50">
              <Image
                src={pokemon.sprites.back_default}
                alt={`${pokemon.name} back`}
                width={150}
                height={150}
                className="mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-400 mb-3 font-semibold">Shiny</p>
            <div className="bg-linear-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-6 border-2 border-slate-600/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-yellow-500/10 to-pink-500/10" />
              <Image
                src={pokemon.sprites.front_shiny}
                alt={`${pokemon.name} shiny`}
                width={150}
                height={150}
                className="mx-auto drop-shadow-2xl relative z-10"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Basic Info & Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <h2 className="text-2xl font-bold mb-6 text-white">Basic Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Ruler className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Height</p>
                <p className="text-2xl font-bold text-white">{(pokemon.height / 10).toFixed(1)} m</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Weight className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Weight</p>
                <p className="text-2xl font-bold text-white">{(pokemon.weight / 10).toFixed(1)} kg</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Types */}
        {/* Types */}
          {pokemon.types?.some((t) => t?.type?.name) && (
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h2 className="text-2xl font-bold mb-6 text-white">Types</h2>
              <div className="flex gap-3 flex-wrap">
                {pokemon.types
                  ?.filter((typeObj) => typeObj?.type?.name)
                  .map((typeObj, index) => {
                    const typeName = typeObj.type.name;
                    return (
                      <Badge
                        key={index}
                        className={`${typeColors[typeName.toLowerCase()] || 'bg-gray-400'} text-white capitalize text-lg font-bold px-6 py-3 shadow-xl border-2 border-white/20 rounded-full`}
                      >
                        {typeName}
                      </Badge>
                    );
                  })}
              </div>
            </Card>
          )}
      </div>

      {/* Evolution Chain */}
      {evolutions.length > 0 && (
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <h2 className="text-2xl font-bold mb-6 text-white">Evolution Chain</h2>
          <div className="flex flex-wrap gap-6 justify-center items-center">
            {evolutions.map((evo, index) => (
              <div key={evo.id} className="flex items-center gap-4">
                <Link href={`/pokemon/${evo.name}`}>
                  <div className="text-center hover:scale-110 transition-transform cursor-pointer group">
                    <div className="bg-linear-to-br from-slate-700/50 to-slate-800/50 rounded-2xl p-6 mb-3 border-2 border-slate-600/50 group-hover:border-blue-500/50 transition-all">
                      <Image
                        src={evo.imageUrl || ''}
                        alt={evo.name}
                        width={120}
                        height={120}
                        className="drop-shadow-2xl"
                      />
                    </div>
                    <p className="font-bold capitalize text-white group-hover:text-blue-400 transition-colors text-lg">
                      {evo.name}
                    </p>
                  </div>
                </Link>
                {index < evolutions.length - 1 && (
                  <div className="text-4xl text-slate-600 font-bold">→</div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Moves */}
      <Card className="p-6 bg-slate-800/50 border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-white">Moves (Top 10)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {pokemon.moves?.slice(0, 10).map((moveObj, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="capitalize py-2 text-center border-slate-600 text-slate-300 hover:bg-slate-700/50 transition-colors"
            >
              {moveObj.move.name.replace('-', ' ')}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-32 bg-slate-700/50" />
      <div className="text-center space-y-3">
        <Skeleton className="h-8 w-24 mx-auto bg-slate-700/50" />
        <Skeleton className="h-14 w-64 mx-auto bg-slate-700/50" />
      </div>
      <Card className="p-6 bg-slate-800/50 border-slate-700">
        <Skeleton className="h-8 w-32 mb-6 bg-slate-700/50" />
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 bg-slate-700/50" />
          ))}
        </div>
      </Card>
    </div>
  );
}