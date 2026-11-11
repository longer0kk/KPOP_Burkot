import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private static apiUrl = 'https://swapi.dev/api/people/';
  private static pagesToFetch = [1, 2, 3, 4];

  async getCharacters(): Promise<any[]> {
    try {
      const pageResponses = await Promise.all(
        SwapiService.pagesToFetch.map(page =>
          axios.get(`${SwapiService.apiUrl}?page=${page}`)
        )
      );

      const people = pageResponses.flatMap(res => res?.data?.results || []);

      const enrichedPeople = await Promise.all(
        people.map(async (char: any) => {
          if (char.species && char.species.length > 0) {
            try {
              const speciesRes = await axios.get(char.species[0]);
              return { ...char, speciesName: speciesRes.data.name };
            } catch {
              return { ...char, speciesName: 'Unknown' };
            }
          }
          return { ...char, speciesName: 'Human' };
        })
      );

      return enrichedPeople;
    } catch (e) {
      console.error('Помилка завантаження SWAPI:', e);
      return [];
    }
  }
}