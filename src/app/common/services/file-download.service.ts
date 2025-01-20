import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { zipSync } from 'fflate';

@Injectable({
  providedIn: 'root',
})
export class FileDownloadService {
  constructor(private http: HttpClient) {}

  // Fetch file as Blob using firstValueFrom
  fetchFile(url: string): Promise<Blob> {
    return firstValueFrom(this.http.get(url, { responseType: 'blob' }));
  }

  // Convert Blob to Uint8Array
  async blobToUint8Array(blob: Blob): Promise<Uint8Array> {
    const arrayBuffer = await blob.arrayBuffer();
    console.log(`Blob size: ${blob.size}, ArrayBuffer size: ${arrayBuffer.byteLength}`);
    return new Uint8Array(arrayBuffer);
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
        console.log(`Fetching file from: ${url}`);
        const blob = await this.fetchFile(url);
        const filename = url.split('/').pop() || `file-${Date.now()}`;
        const fileData = await this.blobToUint8Array(blob);
        console.log(`Adding file to ZIP: ${filename}, Size: ${fileData.length}`);
        zipFiles[filename] = fileData;
      } catch (error) {
        console.error(`Error downloading file: ${url}`, error);
      }
    }

    // Create ZIP
    console.log(`Creating ZIP with ${Object.keys(zipFiles).length} files`);
    const zipData = zipSync(zipFiles);
    console.log(`ZIP size: ${zipData.length}`);
    this.downloadZip(zipData, zipName);
  }
}
