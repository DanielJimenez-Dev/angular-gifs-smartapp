import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {

  // Inyectamos el servicio para acceder a los resultados de Giphy
  constructor(private gifsService: GifsService) { }

  // Getter que obtiene la lista actualizada automáticamente
  get gifs(): any[] {
    return this.gifsService.gifList;
  }

  public onDownloadGif(url: string, title: string): void {
    if (!url) return;
    this.gifsService.downloadGif(url, title); // Usa la lógica centralizada
  }
}