/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Pokemon } from '@/types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  priority?: boolean;
}

const typeColors: Record<string, string> = {
  normal: 'from-gray-400 to-gray-500',
  fire: 'from-orange-500 to-red-600',
  water: 'from-blue-400 to-blue-600',
  electric: 'from-yellow-400 to-yellow-500',
  grass: 'from-green-400 to-green-600',
  ice: 'from-cyan-400 to-blue-400',
  fighting: 'from-orange-700 to-red-700',
  poison: 'from-purple-500 to-fuchsia-600',
  ground: 'from-yellow-600 to-amber-700',
  flying: 'from-indigo-400 to-sky-400',
  psychic: 'from-pink-500 to-rose-500',
  bug: 'from-lime-500 to-green-500',
  rock: 'from-yellow-800 to-stone-700',
  ghost: 'from-purple-700 to-indigo-800',
  dragon: 'from-indigo-700 to-purple-700',
  dark: 'from-gray-700 to-gray-900',
  steel: 'from-gray-400 to-gray-600',
  fairy: 'from-pink-300 to-pink-500',
};

export function PokemonCard({ pokemon, priority = false }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <div className="group relative overflow-hidden rounded-3xl border border-blue-400/20 bg-slate-900/80 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer">

        {/* Top Image Section */}
        <div className="relative flex items-center justify-center pt-6 pb-4 sm:pt-10 sm:pb-6">

          {/* Big background circle */}
          <div className="absolute w-56 h-56 rounded-full bg-linear-to-br from-slate-600/40 to-slate-800/40 blur-2xl" />

          {/* Pokemon Image */}
          <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={220}
              height={220}
              className="object-contain w-32 h-24 sm:w-40 sm:h-40 drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
              priority={priority}
              loading={priority ? undefined : 'lazy'}
            />
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className="text-center pb-8 px-6">

          {/* ID */}
          <div className="text-blue-300 text-lg font-medium tracking-widest mb-1">
            {String(pokemon.id).padStart(4, '0')}
          </div>

          {/* Name */}
          <h3 className="text-2xl font-bold text-white capitalize leading-tight mb-5">
            {pokemon.name}
          </h3>

          {/* Types */}
          <div className="flex justify-center gap-3 flex-nowrap">
            {pokemon.types?.map((typeObj: any, index: number) => {
              const typeName = typeObj?.type?.name || typeObj?.name;
              if (!typeName) return null;

              const typeKey = typeName.toLowerCase();

              return (
                <div
                  key={index}
                  className={`px-3 py-1 sm:px-5 sm:py-2 rounded-full text-white text-xs sm:text-sm font-semibold bg-linear-to-r ${
                    typeColors[typeKey] || 'from-gray-400 to-gray-500'
                  } shadow-lg shadow-black/40`}
                >
                  {typeName}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}
