import { Component } from '@angular/core';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { SearchBoxComponent } from './gifs/components/search-box/search-box.component';
import { CardListComponent } from './gifs/components/card-list/card-list.component';
import { GifsEditor } from './gifs/components/gifs-editor/gifs-editor';
import { GifsService } from './gifs/services/gifs.service';
import { EditorService } from './gifs/services/editor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SidebarComponent,
    SearchBoxComponent,
    CardListComponent,
    GifsEditor
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.scss'
})
export class AppComponent {

  constructor(
    public gifsService: GifsService,
    private editorService: EditorService
  ) { }

  openEditor(): void {
    this.playCyberSound();
    this.editorService.showEditor();
  }

  private playCyberSound(): void {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'square'; // Sonido digital/metálico
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // Nota La
    oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
  }
}