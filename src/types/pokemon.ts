export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
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
  types: string[];
  moves: string[];
  evolutionChain: EvolutionChain[];
}

export interface EvolutionChain {
  name: string;
  imageUrl: string;
  id: number;
}

export interface PokemonListResponse {
  pokemon: Pokemon[];
  currentPage: number;
  totalPages: number;
  totalPokemon: number;
}