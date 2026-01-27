import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsService } from '../../services/gifs.service';
import GIF from 'gif.js';

@Component({
  selector: 'app-gif-creator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gif-creator.html',
  styleUrl: './gif-creator.scss'
})
export class GifCreatorComponent {
  public imagePreviews: string[] = [];
  public isGenerating: boolean = false;
  public progress: number = 0;

  // Inyectamos el detector de cambios para que la barra de progreso se actualice en pantalla
  constructor(private cdr: ChangeDetectorRef, private gifsService: GifsService) { }

  onFilesSelected(event: any): void {
    const files: FileList = event.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result as string);
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    });
  }

  // Función para limpiar la selección y resetear estados
  clearPreview(): void {
    this.imagePreviews = [];
    this.progress = 0;
    this.isGenerating = false;
    this.cdr.detectChanges();
  }

  generateGif(): void {
    if (this.imagePreviews.length === 0) return;
    this.isGenerating = true;
    this.progress = 0;
    this.cdr.detectChanges();

    const renderSize = 500; // Tamaño estándar para evitar distorsión

    const gif = new GIF({
      workers: 2,
      quality: 10,
      width: renderSize,
      height: renderSize,
      workerScript: 'gif.worker.js'
    });

    const firstImg = new Image();
    firstImg.src = this.imagePreviews[0];

    firstImg.onload = () => {
      // EFECTO DE ZOOM: Si solo hay una imagen, creamos la animación de movimiento
      if (this.imagePreviews.length === 1) {
        const totalFrames = 15;
        for (let i = 0; i < totalFrames; i++) {
          const canvas = document.createElement('canvas');
          canvas.width = renderSize;
          canvas.height = renderSize;
          const ctx = canvas.getContext('2d');

          if (ctx) {
            const scale = 1 + (i * 0.02); // Incremento de escala para el zoom
            const x = (renderSize - renderSize * scale) / 2;
            const y = (renderSize - renderSize * scale) / 2;

            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, renderSize, renderSize);
            ctx.drawImage(firstImg, x, y, renderSize * scale, renderSize * scale);
            gif.addFrame(ctx, { delay: 70, copy: true });
          }
        }
      } else {
        // LÓGICA MULTI-IMAGEN: Si hay varias, las procesamos una a una
        this.imagePreviews.forEach((imgUrl) => {
          const canvas = document.createElement('canvas');
          canvas.width = renderSize;
          canvas.height = renderSize;
          const ctx = canvas.getContext('2d');

          if (ctx) {
            const img = new Image();
            img.src = imgUrl;
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, renderSize, renderSize);
            ctx.drawImage(img, 0, 0, renderSize, renderSize);
            gif.addFrame(ctx, { delay: 600, copy: true });
          }
        });
      }

      // Escuchador del progreso para mover la barra azul
      gif.on('progress', (p: number) => {
        this.progress = Math.round(p * 100);
        this.cdr.detectChanges();
      });

      // Cuando el GIF está listo: Descarga y guarda en la lista
      gif.on('finished', (blob: Blob) => {
        const url = URL.createObjectURL(blob);

        // Añade el GIF a la sección de "Mis Creaciones"
        this.gifsService.addCreation(url);

        // Forzar la descarga en el navegador
        const link = document.createElement('a');
        link.href = url;
        link.download = `creacion-daniel-${Date.now()}.gif`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Resetear la interfaz
        this.isGenerating = false;
        this.imagePreviews = [];
        this.progress = 0;
        this.cdr.detectChanges();
      });

      gif.render();
    };
  }
}