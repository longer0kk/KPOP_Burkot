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

    this.chart?.destroy();
    this.chart = null;

    const counts: Record<string, number> = {};
    this.characters.forEach(c => {
      const sp = c.speciesName || 'Unknown';
      counts[sp] = (counts[sp] || 0) + 1;
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, 4);
    const other = sorted.slice(4).reduce((sum, [, v]) => sum + v, 0);

    const labels = [...top.map(([k]) => k), ...(other > 0 ? ['Інше'] : [])];
    const data = [...top.map(([, v]) => v), ...(other > 0 ? [other] : [])];
    const palette = ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'];

    if (typeof canvas.getContext === 'function') {
      try {
        this.chart = new Chart(canvas, {
          type: 'pie',
          data: {
            labels,
            datasets: [{ data, backgroundColor: palette.slice(0, labels.length) }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: true, position: 'top' },
              title: { display: true, text: 'Розподіл персонажів за расою' }
            }
          }
        });
      } catch {}
    }
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