import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientApiService } from 'src/app/common/services/http-client-api.service';

@Injectable()
export class ComponentApiService {
  constructor(private apiService: HttpClientApiService) {}

  // GET method
  registerUser<T>(body: any, options?: object): Observable<T> {
    return this.apiService.post<T>('/auth/register', body, options);
  }

  // POST method
  loginUser<T>(body: any, options?: object): Observable<T> {
    return this.apiService.post<T>('/auth/login', body, options);
  }

  // POST method
  passwordResetOtp<T>(body: any, options?: object): Observable<T> {
    return this.apiService.post<T>('/auth/forget-password-otp', body, options);
  }

  // PUT method
  verifyOtp<T>(body: any, options?: object): Observable<T> {
    return this.apiService.post<T>('/auth/verify-otp', body, options);
  }
  // DELETE method
  resendOtp<T>(body: any, options?: object): Observable<T> {
    return this.apiService.post<T>('/auth/resend-otp', body, options);
  }
}
