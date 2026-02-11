'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pokemon } from '@/types/pokemon';
import Link from 'next/link';
import Image from 'next/image';

interface PokemonCardProps {
  pokemon: Pokemon;
  priority?: boolean;
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

export function PokemonCard({ pokemon, priority = false }: PokemonCardProps) {
  const imageUrl = pokemon.sprites?.front_default || '/placeholder.png';
  
  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border-2 hover:border-gray-300">
        {/* Pokemon Number Badge */}
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
            #{String(pokemon.id).padStart(3, '0')}
          </div>
        </div>

        {/* Image Section with gradient background */}
        <div className="relative aspect-square bg-linear-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gray-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gray-100 rounded-full opacity-50"></div>
          </div>
          
          <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
            <Image
              src={imageUrl}
              alt={pokemon.name}
              width={180}
              height={180}
              className="object-contain drop-shadow-lg"
              priority={priority}
              loading={priority ? undefined : 'lazy'}
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="p-4 bg-white">
          <h3 className="font-bold text-xl capitalize mb-3 text-gray-800 truncate group-hover:text-blue-600 transition-colors">
            {pokemon.name}
          </h3>
          
          {/* Types */}
          <div className="flex gap-2 flex-wrap">
            {pokemon.types
              ?.filter((typeObj) => typeObj?.type?.name)
              .map((typeObj) => {
                const typeName = typeObj.type.name;
                const typeKey = typeName.toLowerCase();
                
                return (
                  <Badge
                    key={typeName}
                    className={`${typeColors[typeKey] || 'bg-gray-400'} text-white capitalize text-xs font-semibold px-3 py-1 shadow-sm`}
                  >
                    {typeName}
                  </Badge>
                );
              })}
          </div>

          {/* Stats Preview */}
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <span className="font-semibold">Height:</span>
              <span>{(pokemon.height / 10).toFixed(1)}m</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Weight:</span>
              <span>{(pokemon.weight / 10).toFixed(1)}kg</span>
            </div>
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-blue-500/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </Card>
    </Link>
  );
}