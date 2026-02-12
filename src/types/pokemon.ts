/* eslint-disable @typescript-eslint/no-explicit-any */
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
  types: any[];
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
  types: Array<{
    type: {
      name: string;
      url: string;
    };
  }>;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
  }>;
  evolutionChain: {
    chain: any;
  } | null;
}

export interface EvolutionChain {
  name: string;
  id: number;
  imageUrl?: string;
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