import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorService } from './../../services/editor';

@Component({
  selector: 'app-gifs-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gifs-editor.html',
  styleUrl: './gifs-editor.scss'
})
export class GifsEditor {
  @ViewChild('canvasPreview') canvasRef!: ElementRef<HTMLCanvasElement>;

  public imageLoaded = false;
  private ctx!: CanvasRenderingContext2D;
  private image = new Image();
  private scale = 1.0;
  private expanding = true;
  private animationId!: number;

  constructor(public editorService: EditorService) { }

  close() {
    cancelAnimationFrame(this.animationId);
    this.imageLoaded = false;
    this.editorService.hideEditor();
  }

  onFileSelected(event: any) {
    const file = event.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.image.src = e.target.result;
        this.image.onload = () => {
          this.imageLoaded = true;
          // Pequeño delay para asegurar que el canvas se renderice en el DOM
          setTimeout(() => this.initAnimation(), 50);
        };
      };
      reader.readAsDataURL(file);
    }
  }

  private initAnimation() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.animate();
  }

  private animate = () => {
    if (!this.imageLoaded || !this.editorService.isVisible) return;

    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Zoom Latido
    if (this.expanding) {
      this.scale += 0.002;
      if (this.scale >= 1.15) this.expanding = false;
    } else {
      this.scale -= 0.002;
      if (this.scale <= 1.0) this.expanding = true;
    }

    const w = canvas.width * this.scale;
    const h = canvas.height * this.scale;
    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;

    this.ctx.drawImage(this.image, x, y, w, h);
    this.animationId = requestAnimationFrame(this.animate);
  }

  async generateAndDownload() {
    if (!this.imageLoaded) return;
    const dataUrl = this.canvasRef.nativeElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `smart-gif-daniel-${Date.now()}.gif`;
    link.click();
  }
}
