import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // Debe decir AppComponent

bootstrapApplication(AppComponent, appConfig) // Usamos AppComponent
  .catch((err) => console.error(err));