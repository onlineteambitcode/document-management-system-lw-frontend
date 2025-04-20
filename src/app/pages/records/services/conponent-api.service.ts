import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientApiService } from 'src/app/common/services/http-client-api.service';

@Injectable()
export class ComponentApiService {
  constructor(private apiService: HttpClientApiService) {}

  // GET method
  getAllRecords<T>(caseId:string): Observable<T> {
    return this.apiService.get<T>(`/activity/all`);
  }

    // GET method
  getAllActivitiesWithServerSidePagination<T>(page: number, limit: number, sortBy: string, order: string): Observable<T> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString())
    .set('sortBy', sortBy)
    .set('order', order);  
    return this.apiService.get<T>(`/activity`, params);
  }
}
