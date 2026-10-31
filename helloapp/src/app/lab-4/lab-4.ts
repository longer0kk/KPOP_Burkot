import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lab-4',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lab-4.html',
})

export class Lab4 {
  @Input() numbers: number[] = [];

  get min(): number | null {
    return this.numbers.length ? Math.min(...this.numbers) : null;
  }

  get max(): number | null {
    return this.numbers.length ? Math.max(...this.numbers) : null;
  }

  get result(): number[] {
    if (this.numbers.length < 3) return [];
    
    const i1 = this.numbers.indexOf(this.min!);
    const i2 = this.numbers.indexOf(this.max!);
    
    return this.numbers.slice(Math.min(i1, i2) + 1, Math.max(i1, i2));
  }
}