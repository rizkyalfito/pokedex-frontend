'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Pokemon } from '@/types/pokemon';

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
  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <Card className="group relative overflow-hidden bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer hover:shadow-xl hover:shadow-blue-500/20">
        
        {/* Glowing effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
        
        {/* Pokemon Image Section - REDUCED HEIGHT */}
        <div className="relative h-48 bg-gradient-to-br from-slate-700/30 to-slate-800/30 flex items-center justify-center p-3">
          {/* Decorative circle background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-600/30 to-slate-700/30 blur-2xl" />
          </div>
          
          {/* Pokemon Image */}
          <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={130}
              height={130}
              className="object-contain drop-shadow-2xl"
              priority={priority}
              loading={priority ? undefined : 'lazy'}
            />
          </div>
        </div>

        {/* Info Section - COMPACT */}
        <div className="relative px-4 py-3 bg-slate-900/90 backdrop-blur-sm">
          {/* Pokemon Number */}
          <div className="text-slate-400 text-xs font-bold mb-1">
            #{String(pokemon.id).padStart(4, '0')}
          </div>

          {/* Pokemon Name */}
          <h3 className="font-bold text-lg capitalize mb-3 text-white group-hover:text-blue-400 transition-colors truncate">
            {pokemon.name}
          </h3>
          
          {/* Types - BIGGER AND MORE VISIBLE */}
          <div className="flex gap-2 flex-wrap">
            {pokemon.types?.map((typeObj: any, index: number) => {
              const typeName = typeObj?.type?.name || typeObj?.name;
              if (!typeName) return null;
              
              const typeKey = typeName.toLowerCase();
              
              return (
                <Badge
                  key={index}
                  className={`${typeColors[typeKey] || 'bg-gray-400'} text-white capitalize text-sm font-bold px-4 py-1.5 shadow-lg border border-white/20 rounded-full`}
                >
                  {typeName}
                </Badge>
              );
            })}
          </div>
        </div>
      </Card>
    </Link>
  );
}