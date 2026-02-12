'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PokemonMove } from '@/types/pokemon';

interface PokemonMovesProps {
  moves: PokemonMove[];
  maxDisplay?: number;
}

export function PokemonMoves({ moves, maxDisplay = 10 }: PokemonMovesProps) {
  if (!moves || moves.length === 0) return null;

  return (
    <Card className="p-5 bg-slate-900/80 backdrop-blur-xl border border-blue-400/20">
      <h2 className="text-xl font-bold mb-4 text-white">Moves</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {moves.slice(0, maxDisplay).map((moveObj, index) => (
          <Badge 
            key={index} 
            variant="ghost" 
            className="capitalize py-2 text-center border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:border-blue-500/50 transition-all text-xs"
          >
            {moveObj.move.name.replace('-', ' ')}
          </Badge>
        ))}
      </div>
    </Card>
  );
}