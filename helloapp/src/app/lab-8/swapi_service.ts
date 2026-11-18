import { Injectable } from '@angular/core';
import axios from 'axios';

// ПАТЕРН 1: Adapter (перетворює сирі дані SWAPI у зручний формат)
export class CharacterAdapter {
  static adapt(raw: any, speciesName: string) {
    return {
      name: raw.name,
      gender: raw.gender,
      speciesName,
      birth_year: raw.birth_year,
      height: raw.height,
      mass: raw.mass,
      eye_color: raw.eye_color,
      skin_color: raw.skin_color
    };
  }
}

// ПАТЕРН 2: Proxy (кешує запити, щоб не вантажити API повторно)
@Injectable({ providedIn: 'root' })
export class SwapiService8 {
  private apiUrl = 'https://swapi.dev/api/people/';
  private cache: any[] | null = null;
  private speciesCache = new Map<string, string>();

  async getCharacters(): Promise<any[]> {
    if (this.cache) return this.cache; // Повертаємо з кешу (Proxy)

    try {
      const responses = await Promise.all([1, 2, 3, 4].map(p => axios.get(`${this.apiUrl}?page=${p}`)));
      const people = responses.flatMap(r => r?.data?.results || []);

      this.cache = await Promise.all(
        people.map(async (char: any) => {
          let speciesName = 'Human';
          if (char.species?.length > 0) {
            const url = char.species[0];
            if (this.speciesCache.has(url)) {
              speciesName = this.speciesCache.get(url)!;
            } else {
              try {
                const res = await axios.get(url);
                speciesName = res.data.name;
                this.speciesCache.set(url, speciesName);
              } catch { speciesName = 'Unknown'; }
            }
          }
          return CharacterAdapter.adapt(char, speciesName);
        })
      );
      return this.cache;
    } catch (e) {
      console.error('Помилка SWAPI:', e);
      return [];
    }
  }
}