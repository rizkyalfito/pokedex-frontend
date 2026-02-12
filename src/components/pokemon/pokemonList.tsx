'use client';

import { useAtom } from 'jotai';
import { searchQueryAtom, currentPageAtom } from '@/store/pokemonStore';
import { usePokemonList } from '@/hooks/usePokemonQueries';
import { useInfiniteScroll } from '@/hooks/useInfinityScroll';
import { PokemonCard } from './pokemonCard';
import { SkeletonGrid, SkeletonCard } from '@/components/shared/SkeletonCard';
import { useEffect } from 'react';

export function PokemonList() {
  const [searchQuery] = useAtom(searchQueryAtom);
  const [, setCurrentPage] = useAtom(currentPageAtom);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePokemonList(searchQuery);

  const observerRef = useInfiniteScroll({
    onLoadMore: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    hasMore: hasNextPage ?? false,
    isLoading: isFetchingNextPage,
    threshold: 200,
  });

  useEffect(() => {
    if (data?.pages) {
      const lastPage = data.pages[data.pages.length - 1];
      setCurrentPage(lastPage.pagination.page);
    }
  }, [data?.pages, setCurrentPage]);

  if (isLoading) {
    return <SkeletonGrid />;
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">😢</div>
        <p className="text-red-400 text-xl font-bold">Failed to load Pokémon data</p>
        <p className="text-slate-400 mt-2">Please try again later</p>
      </div>
    );
  }

  const allPokemon = data?.pages.flatMap((page) => page.data) ?? [];
  
  if (!isLoading && !isFetchingNextPage && allPokemon.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-slate-200 text-xl font-bold">No Pokémon found</p>
        <p className="text-slate-400 mt-2">Try a different search term</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Results count */}
        <div className="text-sm text-slate-400 font-medium">
          Showing {allPokemon.length} of {data?.pages[0]?.pagination.total || 0} Pokémon
        </div>

      {/* Pokemon Grid - 2 columns as per requirements */}
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        {allPokemon.map((pokemon, index) => (
          <PokemonCard 
            key={pokemon.id} 
            pokemon={pokemon} 
            priority={index < 4}
          />
        ))}
      </div>

      {/* Loading more indicator */}
      {isFetchingNextPage && (
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={`loading-${i}`} />
          ))}
        </div>
      )}

      {/* Infinite scroll observer */}
      <div ref={observerRef} className="h-10" />
    </div>
  );
}