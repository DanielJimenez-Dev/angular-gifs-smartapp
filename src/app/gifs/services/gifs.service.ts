import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private apiKey: string = 'd7c40D3tREFZWFlwcQOl0oiLf746yObz'; //
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private _tagsHistory: string[] = [];
  public gifList: any[] = [];
  private _myCreations: string[] = [];

  constructor(private http: HttpClient) { this.loadLocalStorage(); }

  get tagsHistory() { return [...this._tagsHistory]; }
  get myCreations() { return [...this._myCreations]; }

  public addCreation(gifUrl: string) {
    this._myCreations.unshift(gifUrl);
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    const params = new HttpParams().set('api_key', this.apiKey).set('limit', '12').set('q', tag);
    this.http.get(`${this.serviceUrl}/search`, { params }).subscribe((resp: any) => {
      this.gifList = resp.data;
    });
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

  public downloadGif(url: string, title: string) {
    const link = document.createElement('a');
    link.href = url; link.download = `${title || 'gif'}.gif`; link.click();
  }
}