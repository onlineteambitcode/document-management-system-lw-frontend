import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
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

  // Create ZIP and trigger download
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

    // Create the ZIP file as a simple Blob
    const zipData = await this.createZipBlob(zipFiles);

    // Trigger download
    this.downloadZip(zipData, zipName);
  }

  // Create a basic ZIP Blob (non-compressed)
  private async createZipBlob(files: { [key: string]: Blob }): Promise<Blob> {
    const zipContent: Uint8Array[] = [];

    // Loop through files and create entries
    for (const filename in files) {
      if (files.hasOwnProperty(filename)) {
        const fileBlob = files[filename];
        const fileData = await this.blobToUint8Array(fileBlob);

        // Create a "file entry" with the file data
        zipContent.push(this.createFileEntry(filename, fileData));
      }
    }

    // Combine all content (header + file entries)
    const zipBlob = new Blob(zipContent, { type: 'application/zip' });

    return zipBlob;
  }

  // Helper to convert Blob to Uint8Array
  private async blobToUint8Array(blob: Blob): Promise<Uint8Array> {
    const arrayBuffer = await blob.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }

  // Create a simple file entry (simplified ZIP entry without compression)
  private createFileEntry(filename: string, fileData: Uint8Array): Uint8Array {
    const entryHeader = new Uint8Array([0x50, 0x4b, 0x03, 0x04]); // Simplified header

    // We are skipping all complex ZIP file header structure here
    const filenameLength = filename.length;
    const filenameBytes = new TextEncoder().encode(filename);

    // Create a file entry: file name + file data (simplified version)
    const entry = new Uint8Array(entryHeader.length + filenameLength + fileData.length);
    entry.set(entryHeader);
    entry.set(filenameBytes, entryHeader.length);
    entry.set(fileData, entryHeader.length + filenameLength);

    return entry;
  }

  // Trigger the download of the ZIP file
  private downloadZip(zipData: Blob, filename: string): void {
    saveAs(zipData, filename); // Alternatively, use window.URL.createObjectURL if not using FileSaver
  }
}
