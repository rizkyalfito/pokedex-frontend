'use client';

import { Card } from '@/components/ui/card';
import type { PokemonAbility, PokemonType } from '@/types/pokemon';

interface PokemonTypesAndAbilitiesProps {
  types: PokemonType[];
  abilities: PokemonAbility[];
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

export function PokemonTypesAndAbilities({ types, abilities }: PokemonTypesAndAbilitiesProps) {
  return (
    <Card className="p-5 bg-slate-900/80 backdrop-blur-xl border border-blue-400/20 space-y-5">
      {/* Types */}
      {types?.some((t) => t?.type?.name) && (
        <div>
          <h3 className="text-lg font-bold mb-3 text-white">Type</h3>
          <div className="space-y-2">
            {types
              ?.filter((typeObj) => typeObj?.type?.name)
              .map((typeObj, index) => {
                const typeName = typeObj.type.name;
                return (
                  <div
                    key={index}
                    className={`px-6 py-3 rounded-full text-white capitalize font-bold shadow-lg border border-white/20 bg-linear-to-r ${
                      typeColors[typeName.toLowerCase()] || 'from-gray-400 to-gray-500'
                    } text-center`}
                  >
                    {typeName}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Abilities */}
      {abilities && abilities.length > 0 && (
        <div className="pt-4 border-t border-slate-700/50">
          <h3 className="text-lg font-bold mb-3 text-white">Abilities</h3>
          <div className="space-y-2">
            {abilities.map((abilityObj) => (
              <div key={abilityObj.slot} className="relative">
                <div className="bg-linear-to-r from-blue-500/20 to-purple-600/20 px-4 py-2.5 rounded-lg border border-blue-400/30 text-white capitalize font-medium text-sm">
                  {abilityObj.ability.name.replace('-', ' ')}
                  {abilityObj.is_hidden && (
                    <span className="ml-2 bg-yellow-500 text-[10px] px-2 py-0.5 rounded-full text-black font-bold">
                      Hidden
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}