import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-gifs-search-box',
  standalone: true,
  template: `
    <div class="search-container">
      <h5 class="search-label">Explorar Gifs</h5>
      <input type="text"
        class="modern-input"
        placeholder="¿Qué quieres ver hoy?..."
        (keyup.enter)="searchTag()"
        #txtTagInput>
    </div>
  `
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}