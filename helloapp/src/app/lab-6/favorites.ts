import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites-6',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.html'
})
export class Favorites6 {
  @Input() items: any[] = [];
  @Output() remove = new EventEmitter<any>();

  selectedFav: any = null;

  onRemove(item: any, event: MouseEvent): void {
    event.stopPropagation();
    this.remove.emit(item);
  }
}