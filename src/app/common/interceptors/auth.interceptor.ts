import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SweetAlertService } from '../services/sweetAlert2.service';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // Inject the Router service
  const authService = inject(AuthService); // Inject the Router service
  const alertService = inject(SweetAlertService); // Inject the SweetAlertService service
  const token = authService.getToken();

  // Define the endpoints to exclude from token attachment
  const excludedEndpoints = ['/register', '/login', '/verify-otp', '/resend-otp'];

  // Check if the request URL matches any of the excluded endpoints
  const isExcluded = excludedEndpoints.some(endpoint => req.url.includes(endpoint));

 // Clone the request to add the token if it's not excluded
 const modifiedRequest = !isExcluded && token
 ? req.clone({
     setHeaders: {
       Authorization: `Bearer ${token}`, // Attach token
     },
   })
 : req;

 return next(modifiedRequest).pipe(
  catchError((error) => {
    // Check if the error is due to token expiration
    if (error?.error?.errorCode === 'TOKEN_EXPIRED') {
      // Clear token and navigate to login page
      alertService.errorToaster('top',"Your session has expired. Please sign in again to access your account.");
      authService.logout();

      router.navigate(['/authentication/login']);
      return throwError(() => new Error('Session expired'));
    }
    // Pass the error to the next handler
    return throwError(() => error);
  })
);
};
