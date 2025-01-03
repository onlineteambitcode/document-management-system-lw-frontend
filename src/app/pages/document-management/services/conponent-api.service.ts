import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientApiService } from 'src/app/common/services/http-client-api.service';

@Injectable()
export class ComponentApiService {
  constructor(private apiService: HttpClientApiService) {}

  // GET method
  getOneCase<T>(caseId:string): Observable<T> {
    return this.apiService.get<T>(`/cases/find/${caseId}`);
  }

  // GET method
  getAllCases<T>(caseId:string): Observable<T> {
    return this.apiService.get<T>(`/cases`);
  }

    // GET method
  getAllCasesWithServerSidePagination<T>(page: number, limit: number, sortBy: string, order: string): Observable<T> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString())
    .set('sortBy', sortBy)
    .set('order', order);  
    return this.apiService.get<T>(`/cases`, params);
  }


  // POST method
  createNewCase<T>(body: any, options?: object): Observable<T> {
    return this.apiService.post<T>('/cases', body, options);
  }

  // POST method
  updateCase<T>(body: any,caseId: string, options?: object): Observable<T> {
    return this.apiService.put<T>(`/cases/${caseId}`, body, options);
  }

}
