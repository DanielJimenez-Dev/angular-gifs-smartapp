import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private _isVisible: boolean = false;

  get isVisible() {
    return this._isVisible;
  }

  showEditor() {
    this._isVisible = true;
  }

  hideEditor() {
    this._isVisible = false;
  }
}