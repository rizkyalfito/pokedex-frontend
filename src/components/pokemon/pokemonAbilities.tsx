import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PokemonAbility } from '@/types/pokemon';

interface PokemonAbilitiesProps {
  abilities: PokemonAbility[];
}

export function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  if (!abilities || abilities.length === 0) return null;

  return (
    <Card className="p-6 bg-slate-900/80 backdrop-blur-xl border border-blue-400/20">
      <h2 className="text-2xl font-bold mb-6 text-white">Abilities</h2>
      <div className="flex flex-wrap gap-3">
        {abilities.map((abilityObj) => (
          <div key={abilityObj.slot} className="relative">
            <Badge 
              className="bg-linear-to-r from-blue-500 to-purple-600 text-white capitalize text-base px-5 py-2 shadow-lg border border-white/20"
            >
              {abilityObj.ability.name.replace('-', ' ')}
            </Badge>
            {abilityObj.is_hidden && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-xs px-2 py-0.5 rounded-full text-black font-bold shadow-lg">
                Hidden
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}