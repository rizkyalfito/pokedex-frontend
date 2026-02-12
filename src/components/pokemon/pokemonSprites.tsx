'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface PokemonSpritesProps {
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
  };
}

type SpriteType = 'front' | 'back' | 'shiny';

export function PokemonSprites({ name, sprites }: PokemonSpritesProps) {
  const [selectedSprite, setSelectedSprite] = useState<SpriteType>('front');

  const getCurrentSprite = () => {
    switch (selectedSprite) {
      case 'back':
        return sprites.back_default;
      case 'shiny':
        return sprites.front_shiny;
      default:
        return sprites.front_default;
    }
  };

  return (
    <Card className="p-8 bg-slate-900/80 backdrop-blur-xl border border-blue-400/20 flex items-center justify-center relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      <div className="absolute inset-0 bg-[radial-linear(circle_at_center,_var(--tw-linear-stops))] from-blue-400/20 via-transparent to-transparent" />
      
      <div className="relative z-10">
        <div className="relative">
          {/* Circle background */}
          <div className="absolute inset-0 bg-linear-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl" />
          <Image
            src={getCurrentSprite()}
            alt={name}
            width={300}
            height={300}
            className="relative z-10 drop-shadow-2xl transition-all duration-300"
            unoptimized
          />
        </div>
      </div>

      {/* Clickable sprite previews */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-20">
        <button
          type="button"
          onClick={() => setSelectedSprite('back')}
          className={`bg-slate-800/80 backdrop-blur-sm rounded-lg p-2 border transition-all cursor-pointer ${
            selectedSprite === 'back'
              ? 'border-blue-500 scale-110 ring-2 ring-blue-400/50'
              : 'border-slate-600/50 opacity-70 hover:opacity-100 hover:scale-105'
          }`}
        >
          <Image
            src={sprites.back_default}
            alt="back"
            width={50}
            height={50}
            unoptimized
          />
        </button>
        
        <button
          type="button"
          onClick={() => setSelectedSprite('front')}
          className={`bg-slate-800/80 backdrop-blur-sm rounded-lg p-2 border transition-all cursor-pointer ${
            selectedSprite === 'front'
              ? 'border-blue-500 scale-110 ring-2 ring-blue-400/50'
              : 'border-slate-600/50 opacity-70 hover:opacity-100 hover:scale-105'
          }`}
        >
          <Image
            src={sprites.front_default}
            alt="front"
            width={50}
            height={50}
            unoptimized
          />
        </button>
        
        <button
          type="button"
          onClick={() => setSelectedSprite('shiny')}
          className={`backdrop-blur-sm rounded-lg p-2 border transition-all cursor-pointer ${
            selectedSprite === 'shiny'
              ? 'bg-linear-to-br from-yellow-500/30 to-pink-500/30 border-yellow-500 scale-110 ring-2 ring-yellow-400/50'
              : 'bg-linear-to-br from-yellow-500/20 to-pink-500/20 border-yellow-500/30 opacity-70 hover:opacity-100 hover:scale-105'
          }`}
        >
          <Image
            src={sprites.front_shiny}
            alt="shiny"
            width={50}
            height={50}
            unoptimized
          />
        </button>
      </div>
    </Card>
  );
}