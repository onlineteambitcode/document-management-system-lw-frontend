import JSZip from 'jszip'; // Correct default import
import { saveAs } from 'file-saver';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root',
  })
  export class FileDownloadService {
    constructor(private http: HttpClient) {}
  
    // Fetch file as Blob using HttpClient and ensure it is not undefined
    fetchFile(url: string): Promise<Blob> {
      return this.http.get(url, { responseType: 'blob' }).toPromise()
        .then((response: Blob | undefined) => {
          if (response) {
            return response; // Return the response if it's valid
          }
          throw new Error('Failed to fetch file as blob'); // Throw error if response is undefined
        });
    }
  
    // Create ZIP and trigger download
    async createAndDownloadZip(urls: string[], zipName: string): Promise<void> {
      const zip = new JSZip(); // Create an instance of JSZip
  
      // Loop through each URL to fetch files and add them to the ZIP
      for (const url of urls) {
        try {
          console.log(`Fetching file from: ${url}`);
          const blob = await this.fetchFile(url);
          const filename = url.split('/').pop() || `file-${Date.now()}`;
          console.log(`Adding file to ZIP: ${filename}, Size: ${blob.size}`);
  
          // Add file to the zip (JSZip's add function)
          zip.file(filename, blob);
        } catch (error) {
          console.error(`Error downloading file: ${url}`, error);
        }
      }
  
      // Generate the ZIP file as a Blob (without compression for simplicity)
      zip.generateAsync({ type: 'blob' }).then((content) => {
        console.log('ZIP file created, downloading...');
        this.downloadZip(content, zipName);
      });
    }
  
    // Trigger the download of the ZIP file
    private downloadZip(zipData: Blob, filename: string): void {
      saveAs(zipData, filename); // Use FileSaver to trigger download
    }
  }