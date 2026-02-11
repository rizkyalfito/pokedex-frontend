import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const pokemonApi = {
  getList: (page: number, search?: string) => 
    api.get('/pokemon', { params: { page, search } }),
  
  getDetail: (id: string | number) => 
    api.get(`/pokemon/${id}`),
};