import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lab-3',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lab-3.html',
})

export class Lab3 {
  userText: string = '';

  get reversedText(): string {
    return this.userText.split('').reverse().join('');
  }
}