import { Injectable } from '@angular/core'; // CORREGIDO: era @angular/core
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private apiKey: string = 'd7c40D3tREFZWFlwcQOl0oiLf746yObz';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  private _tagsHistory: string[] = [];
  private _myCreations: string[] = []; // RESTAURADO

  public gifList: any[] = [];

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() { return [...this._tagsHistory]; }
  get myCreations() { return [...this._myCreations]; } // RESTAURADO para CreationListComponent

  public addCreation(gifUrl: string) { // RESTAURADO para GifCreatorComponent
    this._myCreations.unshift(gifUrl);
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    const params = new HttpParams().set('api_key', this.apiKey).set('limit', '25').set('q', tag);
    this.http.get(`${this.serviceUrl}/search`, { params }).subscribe((resp: any) => {
      this.gifList = resp.data;
    });
  }

  // DESCARGA LOCAL SEGURA (Evita redirección a Giphy)
  public async downloadGif(url: string, title: string) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${title || 'gif'}.gif`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      window.open(url, '_blank');
    }
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage() { localStorage.setItem('history', JSON.stringify(this._tagsHistory)); }
  private loadLocalStorage() {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if (this._tagsHistory.length > 0) this.searchTag(this._tagsHistory[0]);
  }
}