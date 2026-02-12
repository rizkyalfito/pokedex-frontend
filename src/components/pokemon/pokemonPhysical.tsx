'use client';

import { Card } from '@/components/ui/card';
import { Ruler, Weight } from 'lucide-react';

interface PokemonPhysicalProps {
  height: number;
  weight: number;
}

export function PokemonPhysical({ height, weight }: PokemonPhysicalProps) {
  return (
    <Card className="p-5 bg-slate-900/80 backdrop-blur-xl border border-blue-400/20 space-y-5">
      {/* Physical Traits */}
      <div>
        <h3 className="text-lg font-bold mb-4 text-white">Physical</h3>
        <div className="space-y-4">
          <div>
            <p className="text-slate-400 text-xs mb-1">Height</p>
            <div className="flex items-center gap-2">
              <Ruler className="h-5 w-5 text-blue-400" />
              <p className="text-2xl font-bold text-white">{(height / 10).toFixed(1)} m</p>
            </div>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1">Weight</p>
            <div className="flex items-center gap-2">
              <Weight className="h-5 w-5 text-purple-400" />
              <p className="text-2xl font-bold text-white">{(weight / 10).toFixed(1)} kg</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category */}
      <div className="pt-4 border-t border-slate-700/50">
        <h3 className="text-lg font-bold mb-3 text-white">Category</h3>
        <p className="text-slate-300">Pokémon</p>
      </div>
    </Card>
  );
}