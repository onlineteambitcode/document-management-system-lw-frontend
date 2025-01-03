import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientApiService } from 'src/app/common/services/http-client-api.service';

@Injectable()
export class ComponentApiService {
  constructor(private apiService: HttpClientApiService) {}

  // GET method
  getOneUser<T>(userId:string): Observable<T> {
    return this.apiService.get<T>(`/users/${userId}`);
  }

  // GET method
  getAllUsers<T>(userId:string): Observable<T> {
    return this.apiService.get<T>(`/users`);
  }

    // GET method
  getAllUsersWithServerSidePagination<T>(page: number, limit: number, sortBy: string, order: string): Observable<T> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString())
    .set('sortBy', sortBy)
    .set('order', order);  
    return this.apiService.get<T>(`/users`, params);
  }

  // POST method
  loginUser<T>(body: any, options?: object): Observable<T> {
    return this.apiService.post<T>('/auth/login', body, options);
  }

  // POST method
  passwordResetOtp<T>(body: any, options?: object): Observable<T> {
    return this.apiService.post<T>('/auth/forget-password-otp', body, options);
  }

  // POST method
  passwordReset<T>(body: any, options?: object): Observable<T> {
    return this.apiService.post<T>('/auth/password-reset', body, options);
  }

  // PUT method
  verifyOtp<T>(body: any, options?: object): Observable<T> {
    return this.apiService.post<T>('/auth/verify-otp', body, options);
  }
  // DELETE method
  resendOtp<T>(body: any, options?: object): Observable<T> {
    return this.apiService.post<T>('/auth/resend-otp', body, options);
  }
  
  // POST method
  createNewUser<T>(body: any, options?: object): Observable<T> {
    return this.apiService.post<T>('/auth/direct-user-register', body, options);
  }

  // POST method
  updateUser<T>(body: any,userId: string, options?: object): Observable<T> {
    return this.apiService.put<T>(`/users/${userId}`, body, options);
  }

}
