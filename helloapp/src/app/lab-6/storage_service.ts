import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  async init(): Promise<void> {
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
  }

  async getFavorites(): Promise<any[]> {
    await this.init();
    const data = await this._storage?.get('favorites');
    return data || [];
  }

  async saveFavorites(items: any[]): Promise<void> {
    await this.init();
    await this._storage?.set('favorites', items);
  }
}