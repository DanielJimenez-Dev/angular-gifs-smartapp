import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsService } from '../../services/gifs.service';

@Component({
    selector: 'gifs-creations-list',
    standalone: true,
    imports: [CommonModule],
    // 1. Unificamos a singular para que coincida con tus archivos físicos
    templateUrl: './creation-list.component.html',
    // 2. Corregimos el error de la doble 'c' (ccreation) que tenías en la imagen
    styleUrl: './creation-list.component.scss'
})
export class CreationsListComponent {
    constructor(private gifsService: GifsService) { }

    // Obtenemos las URLs de los GIFs que tú mismo generas
    get creations() {
        return this.gifsService.myCreations;
    }
}