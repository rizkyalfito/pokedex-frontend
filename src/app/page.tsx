'use client';

import { useEffect, useState } from 'react';
import { pokemonApi } from '@/lib/api';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await pokemonApi.getList(1);
        console.log('API Response:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8">Pokédex - Test API</h1>
      
      {loading && <p>Loading...</p>}
      
      {data && (
        <div className="space-y-4">
          <p className="text-lg">
            <strong>Total Pokemon:</strong> {data.totalPokemon}
          </p>
          <p className="text-lg">
            <strong>Current Page:</strong> {data.currentPage} / {data.totalPages}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            {data.pokemon?.map((p: any) => (
              <div key={p.id} className="bg-white p-4 rounded shadow">
                <img src={p.imageUrl} alt={p.name} className="w-32 h-32 mx-auto" />
                <h3 className="font-bold capitalize text-center">{p.name}</h3>
                <p className="text-sm text-gray-500 text-center">
                  {p.types.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}