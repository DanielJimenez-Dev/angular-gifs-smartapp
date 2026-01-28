import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-card-list', // Sincronizado con app.component.html
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {

  constructor(private gifsService: GifsService) { }

  get gifs(): any[] {
    return this.gifsService.gifList;
  }

  public onDownloadGif(url: string, title: string): void {
    if (!url) return;
    this.gifsService.downloadGif(url, title);
  }
}