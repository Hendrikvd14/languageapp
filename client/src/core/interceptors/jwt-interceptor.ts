import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../services/account-service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  const user = accountService.currentUser();
  console.log(user?.token);
  if(user) {
    console.log("jwtInterceptor");
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    })
  }
  return next(req);
};
