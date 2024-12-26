import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    
    // Define the endpoints to exclude from token attachment
    const excludedEndpoints = ['/register', '/login','/verify-otp','/resend-otp']; 

    // Check if the request URL matches any of the excluded endpoints
    const isExcluded = excludedEndpoints.some(endpoint => req.url.includes(endpoint));

    if (!isExcluded && token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
        },
      });
      return next.handle(clonedRequest); // Pass the modified request to the next handler
    }

    // Pass the original request for excluded endpoints or if no token
    return next.handle(req);
  }
}
