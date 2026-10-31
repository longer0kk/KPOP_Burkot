import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiService } from './swapi_service';
import { Favorites } from './favorites';

@Component({
  selector: 'app-lab-5',
  standalone: true,
  imports: [CommonModule, Favorites],
  templateUrl: './lab-5.html'
})
export class Lab5 implements OnInit {
  characters: any[] = [];
  favoritesList: any[] = [];
  selectedCharacter: any = null;
  view: string = 'table';

  constructor(
    private swapi: SwapiService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.characters = await this.swapi.getCharacters();
    this.cdr.detectChanges();
  }

  addToFavorites(char: any, event: MouseEvent): void {
    event.stopPropagation();
    const alreadyExists = this.favoritesList.some(item => item.name === char.name);
    if (!alreadyExists) {
      this.favoritesList = [...this.favoritesList, char];
      this.cdr.detectChanges();
    }
  }

  removeFromFavorites(char: any): void {
    this.favoritesList = this.favoritesList.filter(item => item.name !== char.name);
    this.cdr.detectChanges();
  }
}