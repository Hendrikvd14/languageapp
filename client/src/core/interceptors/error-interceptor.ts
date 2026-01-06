import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { ToastService } from '../services/toast-service';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        toast.error('Geen verbinding met de server');
        return throwError(() => error);
      }

      if (error.status === 400 && error.error?.errors) {
        const errors = Object.values(error.error.errors).flat();
        return throwError(() => errors);
      }

      switch (error.status) {
        case 401:
          toast.error('Unauthorized');
          break;
        case 404:
          router.navigateByUrl('/not-found');
          break;
        case 500:
          router.navigateByUrl('/server-error', {
            state: { error: error.error }
          });
          break;
      }

      return throwError(() => error);
    })
  )

};
