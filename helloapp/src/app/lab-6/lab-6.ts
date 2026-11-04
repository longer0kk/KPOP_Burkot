import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { SwapiService } from './swapi_service';
import { StorageService } from './storage_service';
import { Favorites6 } from './favorites';

// Реєструємо всі стандартні компоненти Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-lab-6',
  standalone: true,
  imports: [CommonModule, Favorites6],
  templateUrl: './lab-6.html'
})

export class Lab6 implements OnInit {
  characters: any[] = [];
  favoritesList: any[] = [];
  selectedCharacter: any = null;
  view: string = 'table';
  chart: any = null;

  constructor(
    private swapi: SwapiService,
    private storageService: StorageService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.favoritesList = await this.storageService.getFavorites();
    this.characters = await this.swapi.getCharacters();
    this.cdr.detectChanges();

    setTimeout(() => this.renderChart(), 0);
  }

  switchView(tab: string): void {
    this.view = tab;
    this.cdr.detectChanges();

    if (tab === 'table') {
      setTimeout(() => this.renderChart(), 0);
    }
  }

  renderChart(): void {
    const canvas = document.getElementById('genderChart') as HTMLCanvasElement;
    if (!canvas || this.characters.length === 0) return;

    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    const males = this.characters.filter(c => c.gender === 'male').length;
    const females = this.characters.filter(c => c.gender === 'female').length;
    const others = this.characters.length - males - females;

    this.chart = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Чоловіча стать', 'Жіноча стать', 'Не визначені / Інші'],
        datasets: [{
          data: [males, females, others],
          backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Розподіл персонажів за статтю'
          }
        }
      }
    });
  }

  async addToFavorites(char: any, event: MouseEvent): Promise<void> {
    event.stopPropagation();
    const alreadyExists = this.favoritesList.some(item => item.name === char.name);
    if (!alreadyExists) {
      this.favoritesList = [...this.favoritesList, char];
      await this.storageService.saveFavorites(this.favoritesList);
      this.cdr.detectChanges();
    }
  }

  async removeFromFavorites(char: any): Promise<void> {
    this.favoritesList = this.favoritesList.filter(item => item.name !== char.name);
    await this.storageService.saveFavorites(this.favoritesList);
    this.cdr.detectChanges();
  }
}