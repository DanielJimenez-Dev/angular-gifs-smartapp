import { Component } from '@angular/core';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { SearchBoxComponent } from './gifs/components/search-box/search-box.component';
import { CardListComponent } from './gifs/components/card-list/card-list.component';
import { GifCreatorComponent } from './gifs/components/gif-creator/gif-creator.component';
import { GifsService } from './gifs/services/gifs.service';
import { CreationsListComponent } from './gifs/components/creations-list/creation-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SidebarComponent,
    SearchBoxComponent,
    CardListComponent,
    GifCreatorComponent,
    CreationsListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  constructor(public gifsService: GifsService) { }
}