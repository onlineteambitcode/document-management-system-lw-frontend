import { HttpHeaders, HttpParams } from '@angular/common/http';
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
  getAllCases<T>(caseIdPartial:string): Observable<T> {
    return this.apiService.get<T>(`/cases/?case_id=${caseIdPartial}`);
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

  // GET method
  getAllowedUsersByDocId<T>(documentId:string): Observable<T> {
    return this.apiService.get<T>(`/documents/${documentId}/users`);
  }

  // GET method
  getAllUsers<T>(): Observable<T> {
    return this.apiService.get<T>(`/users`);
  }
  


  // POST method
  createNewCase<T>(body: any, options?: object): Observable<T> {
    return this.apiService.post<T>('/cases', body, options);
  }

  // POST method
  updateCase<T>(body: any,caseId: string, options?: object): Observable<T> {
    return this.apiService.put<T>(`/cases/${caseId}`, body, options);
  }

 // GET method
 removeCase<T>(caseId:string): Observable<T> {
  return this.apiService.delete<T>(`/cases/${caseId}`);
}

 // GET method
 removeDocumentCasecade<T>(documentId:string): Observable<T> {
  return this.apiService.delete<T>(`/documents/${documentId}`);
}

  fileBatchUpload<T>(caseId: string, formData: FormData): Observable<T> {
    const options = {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          }),
          reportProgress: true,
          observe: 'events'
        }
    return this.apiService.post<T>(`/documents/batch-upload/${caseId}`, formData, options);
  }

  fileBatchDownload<Blob>(caseId: string, fileList: string[]): Observable<Blob> {
    const options = {
          responseType: 'blob'  // Ensure we receive a binary response (ZIP file)
        };
    const requestBody = {
          case_id: caseId,
          fileKeys: fileList
        };
    return this.apiService.post<Blob>(`/documents/batch-download/`, requestBody, options);
  }



  singleFileDownload<Blob>(caseId: string, fileUrl: string): Observable<Blob> {
    const options = {
          responseType: 'blob'  // Ensure we receive a binary response (ZIP file)
        };
    const requestBody = {
          case_id: caseId,
          fileUrl
        };
    return this.apiService.post<Blob>(`/documents/single-download`, requestBody, options);
  }

   // POST method
   updateDocumentAccess<T>(userIds: string[],documentId: string, options?: object): Observable<T> {
    const requestBody = {
      documentId,
      userIds
    }
    return this.apiService.put<T>(`/documents/assign-access`, requestBody, options);
  }
}
