import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Lab3 } from './lab-3/lab-3';
import { Lab4 } from './lab-4/lab-4';
import { Lab5 } from './lab-5/lab-5'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, Lab3, Lab4, Lab5],
  templateUrl: './app.html'
})

export class App {
  selectedLab: number = 3;

  inputText: string = '';

  get parsedNumbers(): number[] {
    return parseNumbers(this.inputText);
  }
}

function parseNumbers(text: string): number[] {
  if (!text.trim()) {
    return [];
  }
  return text.split(',').map(item => Number(item.trim())).filter(item => !isNaN(item));
}