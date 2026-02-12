export interface PokemonSprite {
  front_default: string;
  back_default: string;
  front_shiny: string;
}

export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
  slot?: number;
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}

export interface EvolutionChain {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprite;
  types: PokemonType[];
  abilities?: PokemonAbility[];
  stats?: PokemonStat[];
  moves?: PokemonMove[];
  evolutionChain?: {
    chain: Record<string, unknown>;
  };
}