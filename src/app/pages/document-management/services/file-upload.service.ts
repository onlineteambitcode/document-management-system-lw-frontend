import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SweetAlertService } from 'src/app/common/services/sweetAlert2.service';
import { ComponentApiService } from './conponent-api.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { FullPageLoaderService } from 'src/app/common/services/full-page-loader.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private uploadProgressSubject = new BehaviorSubject<number>(0); // Observable for upload progress
  public uploadProgress$ = this.uploadProgressSubject.asObservable(); // Observable exposed to components
  constructor() {
  }


  // Method to upload files
  uploadFiles(caseId: string, files: File[], apiService: ComponentApiService) {
    const formData: FormData = new FormData();
    files.forEach((file) => {
      formData.append('files', file, file.name); // Append each file to the formData
    });

    // Send the file upload request using HttpClient
    return apiService.fileBatchUpload<any>(caseId, formData).pipe(
      catchError(error => {
        console.error('Error during file upload:', error);
        throw error;
      })
    );
  }

}
