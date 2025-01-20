import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileDownloadService {
  constructor(private http: HttpClient) {}

  // Fetch file as Blob using HttpClient
  fetchFile(url: string): Promise<Blob> {
    return firstValueFrom(this.http.get(url, { responseType: 'blob' }));
  }

  // Trigger multiple file downloads in the background
  async downloadMultipleFiles(urls: string[]): Promise<void> {
    for (const url of urls) {
      try {
        // Fetch the file as Blob
        const blob = await this.fetchFile(url);
        const filename = url.split('/').pop() || `file-${Date.now()}`;
        
        // Create a temporary link element
        const a = document.createElement('a');
        const objectUrl = window.URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = filename; // Set the filename for the download
        
        // Programmatically click the link to trigger the download
        a.click();
        
        // Clean up the object URL
        window.URL.revokeObjectURL(objectUrl);
      } catch (error) {
        console.error(`Error downloading file: ${url}`, error);
      }
    }
  }
}
