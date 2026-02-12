'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useAtom } from 'jotai';
import { searchQueryAtom } from '@/store/pokemonStore';
import { useEffect, useState } from 'react';

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [localValue, setLocalValue] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, setSearchQuery]);

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white z-10" />
      <Input
        type="text"
        placeholder="Search Pokémon..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="pl-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 focus:border-blue-500 h-12 rounded-full backdrop-blur-sm"
      />
    </div>
  );
}