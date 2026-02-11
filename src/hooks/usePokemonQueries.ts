import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { pokemonApi } from '@/lib/api';
import { PokemonListResponse, PokemonDetail } from '@/types/pokemon';

export function usePokemonList(searchQuery: string) {
  return useInfiniteQuery({
    queryKey: ['pokemon', 'list', searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await pokemonApi.getList(pageParam, searchQuery || undefined);
      return response.data as PokemonListResponse;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, 
  });
}

export function usePokemonDetail(id: string) {
  return useQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: async () => {
      const response = await pokemonApi.getDetail(id);
      return response.data as PokemonDetail;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, 
  });
}