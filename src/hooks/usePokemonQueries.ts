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
      if (lastPage.pagination.hasMore) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePokemonDetail(nameOrId: string) {
  return useQuery({
    queryKey: ['pokemon', 'detail', nameOrId],
    queryFn: async () => {
      const response = await pokemonApi.getDetail(nameOrId);
      return response.data.data as PokemonDetail;
    },
    enabled: !!nameOrId,
    staleTime: 10 * 60 * 1000,
  });
}