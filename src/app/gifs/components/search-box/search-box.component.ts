import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  standalone: true,
  template: `
    <div class="search-top-wrapper">
      <h5>Explorar Gifs:</h5>
      <input type="text"
        class="custom-search-input"
        placeholder="Escribe aquí para buscar..."
        (keyup.enter)="searchTag()"
        #txtTagInput>
    </div>
  `
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput') public tagInput!: ElementRef<HTMLInputElement>;
  constructor(private gifsService: GifsService) { }
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}