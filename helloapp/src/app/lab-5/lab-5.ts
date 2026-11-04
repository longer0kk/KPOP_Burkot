import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { SwapiService } from './swapi_service';
import { Favorites } from './favorites';

Chart.register(...registerables);

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
  chart: any = null;

  constructor(
    private swapi: SwapiService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
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
    const canvas = document.getElementById('genderChart5') as HTMLCanvasElement;
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