import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import * as Pako from 'pako';
import { saveAs } from 'file-saver'; // Optional for better cross-browser support

@Injectable({
  providedIn: 'root',
})
export class FileDownloadService {
  constructor(private http: HttpClient) {}

  // Fetch file as Blob using firstValueFrom
  fetchFile(url: string): Promise<Blob> {
    return firstValueFrom(this.http.get(url, { responseType: 'blob' }));
  }

  // Download the ZIP file using Pako and FileSaver
  async createAndDownloadZip(urls: string[], zipName: string): Promise<void> {
    const zipFiles: { [key: string]: Blob } = {};

    for (const url of urls) {
      try {
        console.log(`Fetching file from: ${url}`);
        const blob = await this.fetchFile(url);
        const filename = url.split('/').pop() || `file-${Date.now()}`;
        zipFiles[filename] = blob;
        console.log(`Adding file to ZIP: ${filename}, Size: ${blob.size}`);
      } catch (error) {
        console.error(`Error downloading file: ${url}`, error);
      }
    }

    // Create ZIP using Pako
    const zipData = await this.createZipBlob(zipFiles);

    // Download ZIP
    this.downloadZip(zipData, zipName);
  }

  // Create a ZIP Blob using Pako
  private async createZipBlob(files: { [key: string]: Blob }): Promise<Blob> {
    const zipContent: Uint8Array[] = [];

    // Loop through files and create entries
    for (const filename in files) {
      if (files.hasOwnProperty(filename)) {
        const fileBlob = files[filename];
        const fileData = await this.blobToUint8Array(fileBlob);

        // Compress the file using Pako (gzip compression)
        const compressedData = Pako.gzip(fileData, { level: 9 }); // You can adjust compression level here

        // Create a file entry with the compressed data
        zipContent.push(this.createFileEntry(filename, compressedData));
      }
    }

    // Create the final ZIP Blob (this is a simplified version)
    const zipBlob = new Blob(zipContent, { type: 'application/zip' });

    return zipBlob;
  }

  // Helper to convert Blob to Uint8Array
  private async blobToUint8Array(blob: Blob): Promise<Uint8Array> {
    const arrayBuffer = await blob.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }

  // Create a simple file entry in the ZIP (simplified for this example)
  private createFileEntry(filename: string, fileData: Uint8Array): Uint8Array {
    // Simple file entry header with file name and file data
    const fileHeader = new Uint8Array([0x50, 0x4b, 0x03, 0x04]); // Simplified; a full ZIP entry would require more details
    // Add filename and data here
    const entry = new Uint8Array([...fileHeader, ...fileData]); // Combine header and data (simplified)
    return entry;
  }

  // Trigger the download of the ZIP file
  private downloadZip(zipData: Blob, filename: string): void {
    saveAs(zipData, filename); // Alternatively, use window.URL.createObjectURL if not using FileSaver
  }
}
