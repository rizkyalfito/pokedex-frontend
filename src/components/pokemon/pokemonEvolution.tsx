'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import type { EvolutionChain } from '@/types/pokemon';

interface PokemonEvolutionChainProps {
  evolutions: EvolutionChain[];
}

export function PokemonEvolutionChain({ evolutions }: PokemonEvolutionChainProps) {
  if (!evolutions || evolutions.length === 0) return null;

  return (
    <Card className="p-5 bg-slate-900/80 backdrop-blur-xl border border-blue-400/20">
      <h2 className="text-xl font-bold mb-5 text-white">Evolution Chain</h2>
      {/* Desktop: Horizontal, Mobile: Vertical */}
      <div className="flex lg:flex-row flex-col lg:justify-center items-center gap-6">
        {evolutions.map((evo, index) => (
          <div key={evo.id} className="flex lg:flex-row flex-col items-center gap-4">
            <Link href={`/pokemon/${evo.name}`}>
              <div className="text-center hover:scale-105 transition-transform cursor-pointer group">
                <div className="bg-linear-to-br from-slate-700/50 to-slate-800/50 rounded-2xl p-4 mb-2 border-2 border-slate-600/50 group-hover:border-blue-500/50 transition-all">
                  <Image
                    src={evo.imageUrl || ''}
                    alt={evo.name}
                    width={100}
                    height={100}
                    className="drop-shadow-2xl"
                    unoptimized
                  />
                </div>
                <p className="font-bold capitalize text-white group-hover:text-blue-400 transition-colors">
                  {evo.name}
                </p>
              </div>
            </Link>
            {index < evolutions.length - 1 && (
              <div className="text-4xl text-blue-400/50 font-bold lg:rotate-0 rotate-90">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}