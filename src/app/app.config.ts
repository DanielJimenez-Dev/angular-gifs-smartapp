import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // <--- Agrega esto

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]),
    provideHttpClient() // <--- Agrega esto para poder hacer peticiones a la API
  ]
};