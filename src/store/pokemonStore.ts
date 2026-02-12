import { atom } from 'jotai';

// Search query state
export const searchQueryAtom = atom<string>('');

// Current page state (for tracking purposes)
export const currentPageAtom = atom<number>(1);

// Loading state for UI feedback
export const isLoadingMoreAtom = atom<boolean>(false);

// Filter state (for future enhancement)
export const selectedTypesAtom = atom<string[]>([]);

// Modal/Dialog state (for detail page if needed)
export const isDetailModalOpenAtom = atom<boolean>(false);
export const selectedPokemonIdAtom = atom<number | null>(null);