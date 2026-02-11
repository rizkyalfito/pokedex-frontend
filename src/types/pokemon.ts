export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
  };
  types: PokemonType[];
  height: number;
  weight: number;
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
  };
  height: number;
  weight: number;
  types: PokemonType[];
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
  }>;
  evolutionChain: EvolutionChain[] | null;
}

export interface EvolutionChain {
  name: string;
  imageUrl: string;
  id: number;
}

export interface PokemonListResponse {
  success: boolean;
  data: Pokemon[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}