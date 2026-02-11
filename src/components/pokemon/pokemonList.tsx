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
        <p className="text-red-500 text-xl font-bold">Failed to load Pokémon data</p>
        <p className="text-gray-500 mt-2">Please try again later</p>
      </div>
    );
  }

  const allPokemon = data?.pages.flatMap((page) => page.data) ?? [];
  
  if (allPokemon.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-gray-700 text-xl font-bold">No Pokémon found</p>
        <p className="text-gray-400 mt-2">Try a different search term</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Results count */}
      <div className="text-sm text-gray-500 font-medium">
        Showing {allPokemon.length} Pokémon
      </div>

      {/* Pokemon Grid - ALWAYS 2 columns as per requirements */}
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

      {/* End of list */}
      {!hasNextPage && allPokemon.length > 0 && (
        <div className="text-center py-12 border-t border-gray-200">
          <div className="text-4xl mb-3">🎉</div>
          <p className="text-gray-500 font-medium">You&apos;ve caught them all!</p>
          <p className="text-gray-400 text-sm mt-1">End of Pokédex</p>
        </div>
      )}
    </div>
  );
}