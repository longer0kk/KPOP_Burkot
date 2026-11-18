import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { SwapiService8 } from './swapi_service';
import { Favorites8 } from './favorites';

Chart.register(...registerables);

// ПАТЕРН 3: Singleton (єдине сховище обраних персонажів)
class FavoritesSingleton {
  private static instance: FavoritesSingleton;
  public items: any[] = [];
  private constructor() {}

  static getInstance(): FavoritesSingleton {
    if (!this.instance) this.instance = new FavoritesSingleton();
    return this.instance;
  }
}

// ПАТЕРН 4: Command (команди додавання/видалення з можливістю Undo)
interface Command { execute(): void; undo(): void; }

class ToggleFavoriteCommand implements Command {
  private store = FavoritesSingleton.getInstance();
  constructor(private char: any, private isAdding: boolean) {}

  execute(): void {
    if (this.isAdding && !this.store.items.some(i => i.name === this.char.name)) {
      this.store.items = [...this.store.items, this.char];
    } else if (!this.isAdding) {
      this.store.items = this.store.items.filter(i => i.name !== this.char.name);
    }
  }

  undo(): void {
    if (this.isAdding) {
      this.store.items = this.store.items.filter(i => i.name !== this.char.name);
    } else {
      this.store.items = [...this.store.items, this.char];
    }
  }
}

@Component({
  selector: 'app-lab-8',
  standalone: true,
  imports: [CommonModule, Favorites8],
  templateUrl: './lab-8.html'
})
export class Lab8 implements OnInit {
  characters: any[] = [];
  selectedCharacter: any = null;
  view: string = 'table';
  chart: any = null;
  
  store = FavoritesSingleton.getInstance();
  history: Command[] = [];

  get favoritesList() { return this.store.items; }

  constructor(private swapi: SwapiService8, private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    this.characters = await this.swapi.getCharacters();
    this.cdr.detectChanges();
    setTimeout(() => this.renderChart(), 0);
  }

  switchView(tab: string): void {
    this.view = tab;
    this.cdr.detectChanges();
    if (tab === 'table') setTimeout(() => this.renderChart(), 0);
  }

  addToFavorites(char: any, event: MouseEvent): void {
    event.stopPropagation();
    const cmd = new ToggleFavoriteCommand(char, true);
    cmd.execute();
    this.history.push(cmd);
    this.cdr.detectChanges();
  }

  removeFromFavorites(char: any): void {
    const cmd = new ToggleFavoriteCommand(char, false);
    cmd.execute();
    this.history.push(cmd);
    this.cdr.detectChanges();
  }

  undo(): void {
    const cmd = this.history.pop();
    if (cmd) {
      cmd.undo();
      this.cdr.detectChanges();
    }
  }

  renderChart(): void {
    const canvas = document.getElementById('genderChart8') as HTMLCanvasElement;
    if (!canvas || this.characters.length === 0) return;

    this.chart?.destroy();
    const counts: Record<string, number> = {};
    this.characters.forEach(c => counts[c.speciesName] = (counts[c.speciesName] || 0) + 1);

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, 4);
    const other = sorted.slice(4).reduce((sum, [, v]) => sum + v, 0);

    const labels = [...top.map(([k]) => k), ...(other > 0 ? ['Інше'] : [])];
    const data = [...top.map(([, v]) => v), ...(other > 0 ? [other] : [])];

    this.chart = new Chart(canvas, {
      type: 'pie',
      data: { labels, datasets: [{ data, backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'] }] },
      options: { responsive: true, plugins: { title: { display: true, text: 'Розподіл персонажів за расою' } } }
    });
  }
}