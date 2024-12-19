import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FileUploadService } from '../../services/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MatLabel } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-file-upload-ui',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule , 
    MatDialogModule, 
    MatProgressBarModule,
     MatCheckboxModule,
    MatListModule,
  TablerIconsModule,
MatProgressBarModule,
MatLabel,
MatProgressSpinner],
  templateUrl: './file-upload-ui.component.html',
  styleUrl: './file-upload-ui.component.scss'
})
export class FileUploadUiComponent implements OnInit  {
  progressStarted: boolean = false;           // Stores the current progress
  intervalId: any;                // To hold the reference to the setInterval
  caseId: string = '4';
  files: File[] = [];

  progress: number = 0; // To track progress of each file upload

  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit(): void {

  }


  // Handle file drop event
  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      this.addFiles(files);
    }
  }

  // Handle file selection through file input
  onFileInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      this.addFiles(input.files);
    }
  }

  // Add files to the list
  addFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files[i]);
      
    }
  }

  // Start file upload simulation
  startUpload() {
 
  }


  uploadFiles(): void {
    if (this.files.length > 0) {
      this.fileUploadService.uploadFiles(this.caseId, Array.from(this.files))
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Response) {
              const response = event as HttpResponse<{ message: string }>;
              console.log('Upload successful:', response.body?.message); // Safely access the message
            }
          },
          error: (error) => {
            console.error('Upload failed:', error);
          },
          complete: ()=>{
            this.progressStarted = false;
          }
        });
    } else {
      console.error('No files selected');
    }
  }

  // Remove file from the list
  removeFile(index: number) {
    this.files.splice(index, 1);
  }

   // Function to start the progress simulation
   startProgressUpload(): void {
    this.progressStarted = true;
    this.uploadFiles();
  }
  // Function to check if any progress value is greater than 100
  getProgress(fileName:string){
    
  }
}
