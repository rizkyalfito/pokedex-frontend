import { Card } from '@/components/ui/card';
import type { PokemonStat } from '@/types/pokemon';

interface PokemonStatsProps {
  stats: PokemonStat[];
}

const statConfig: Record<string, { label: string; color: string; gradient: string }> = {
  hp: { 
    label: 'HP', 
    color: 'bg-green-500',
    gradient: 'from-green-500 to-emerald-600'
  },
  attack: { 
    label: 'Attack', 
    color: 'bg-red-500',
    gradient: 'from-red-500 to-rose-600'
  },
  defense: { 
    label: 'Defense', 
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-blue-600'
  },
  'special-attack': { 
    label: 'Sp. Atk', 
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-fuchsia-600'
  },
  'special-defense': { 
    label: 'Sp. Def', 
    color: 'bg-cyan-500',
    gradient: 'from-cyan-500 to-sky-600'
  },
  speed: { 
    label: 'Speed', 
    color: 'bg-yellow-500',
    gradient: 'from-yellow-500 to-amber-600'
  },
};

export function PokemonStats({ stats }: PokemonStatsProps) {
  if (!stats || stats.length === 0) return null;

  const maxStat = 255;

  return (
    <Card className="p-6 bg-slate-900/80 backdrop-blur-xl border border-blue-400/20">
      <h2 className="text-2xl font-bold mb-6 text-white">Base Stats</h2>
      <div className="space-y-4">
        {stats.map((stat) => {
          const config = statConfig[stat.stat.name];
          if (!config) return null;

          const percentage = (stat.base_stat / maxStat) * 100;

          return (
            <div key={stat.stat.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium text-sm w-20">
                  {config.label}
                </span>
                <span className="text-white font-bold text-lg w-12 text-right">
                  {stat.base_stat}
                </span>
              </div>
              <div className="h-3 bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/50">
                <div
                  className={`h-full bg-linear-to-r ${config.gradient} transition-all duration-500 ease-out rounded-full shadow-lg`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-700/50">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Total</span>
          <span className="text-white font-bold">
            {stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
          </span>
        </div>
      </div>
    </Card>
  );
}