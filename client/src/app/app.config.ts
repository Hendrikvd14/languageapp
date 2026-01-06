import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { InitService } from '../core/services/init-service';
import { jwtInterceptor } from '../core/interceptors/jwt-interceptor';
import { errorInterceptor } from '../core/interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor])),
    provideAppInitializer(async () => {
      const initService = inject(InitService);
      console.log("appConfig")

      return new Promise<void>((resolve) => {
        setTimeout(async () => {
          try {
            await lastValueFrom(initService.init())
          } finally {
            const splash = document.getElementById('initial-splash');
            if (splash) {
              splash.remove();
            }
            resolve();
          }
        }, 500)
      })

    })
  ]
};
