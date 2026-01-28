import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  // Getter para obtener el historial del servicio
  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  // Método para disparar una búsqueda desde el historial
  searchTag(tag: string): void {
    this.gifsService.searchTag(tag);
  }
}