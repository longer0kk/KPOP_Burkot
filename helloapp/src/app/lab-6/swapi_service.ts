import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private static apiUrl = 'https://swapi.dev/api/people/';

  async getCharacters(): Promise<any[]> {
    try {
      const response = await axios.get(SwapiService.apiUrl);
      const people = response.data.results || [];

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