import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { zipSync, strToU8 } from 'fflate';

@Injectable({
  providedIn: 'root',
})
export class FileDownloadService {
  constructor(private http: HttpClient) {}

  // Fetch file as Blob using firstValueFrom
  fetchFile(url: string): Promise<Blob> {
    return firstValueFrom(this.http.get(url, { responseType: 'blob' }));
  }

  // Download ZIP file
  downloadZip(zipData: Uint8Array, filename: string): void {
    const blob = new Blob([zipData], { type: 'application/zip' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Create ZIP and trigger download
  async createAndDownloadZip(urls: string[], zipName: string): Promise<void> {
    const zipFiles: { [key: string]: Uint8Array } = {};

    for (const url of urls) {
      try {
        const blob = await this.fetchFile(url);
        const filename = url.split('/').pop() || 'file';
        const arrayBuffer = await blob.arrayBuffer();
        zipFiles[filename] = new Uint8Array(arrayBuffer);
      } catch (error) {
        console.error(`Error downloading file: ${url}`, error);
      }
    }

    // Create ZIP
    const zipData = zipSync(zipFiles);
    this.downloadZip(zipData, zipName);
  }
}
