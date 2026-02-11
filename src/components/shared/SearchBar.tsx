'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useAtom } from 'jotai';
import { searchQueryAtom } from '@/store/pokemonStore';
import { useEffect, useState } from 'react';

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [localValue, setLocalValue] = useState(searchQuery);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, setSearchQuery]);

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder="Search Pokémon..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}