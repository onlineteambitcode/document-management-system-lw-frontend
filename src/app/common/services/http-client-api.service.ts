import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpClientApiService {
  private readonly baseUrl = environment.apiBaseUrl; // Use the base URL from environment
  constructor(private http: HttpClient) {}

  // GET method
  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const url = `/auth/${this.baseUrl}${endpoint}`; // Combine base URL with endpoint
    return this.http.get<T>(url, { params });
  }

  // POST method
  post<T>(endpoint: string, body: any, options?: object): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`; // Combine base URL with endpoint
    return this.http.post<T>(url, body, options);
  }

  // PUT method
  put<T>(endpoint: string, body: any, options?: object): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`; // Combine base URL with endpoint
    return this.http.put<T>(url, body, options);
  }

  // DELETE method
  delete<T>(endpoint: string, options?: object): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`; // Combine base URL with endpoint
    return this.http.delete<T>(url, options);
  }
}
