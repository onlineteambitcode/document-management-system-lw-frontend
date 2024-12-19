import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private uploadProgressSubject = new BehaviorSubject<number>(0); // Observable for upload progress
  public uploadProgress$ = this.uploadProgressSubject.asObservable(); // Observable exposed to components

  constructor(private http: HttpClient) {
  }


  // Method to upload files
  uploadFiles(caseId: string, files: File[]) {
    const formData: FormData = new FormData();
    files.forEach((file) => {
      formData.append('files', file, file.name); // Append each file to the formData
    });

    // Send the file upload request using HttpClient
    return this.http.post<any>(` http://localhost:3000/api/documents/batch-upload/${caseId}`, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(error => {
        console.error('Error during file upload:', error);
        throw error;
      })
    );
  }

}
