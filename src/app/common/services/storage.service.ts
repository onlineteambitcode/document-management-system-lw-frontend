import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  // Encode a string and store it in localStorage
  setItem(key: string, value: string): void {
    const encodedValue = this.encode(value);
    localStorage.setItem(key, encodedValue);
  }

  // Get and decode a string from localStorage
  getItem(key: string): string | null {
    const encodedValue = localStorage.getItem(key);
    return encodedValue ? this.decode(encodedValue) : null;
  }

  // Encode a string using Base64
  private encode(value: string): string {
    return btoa(value); // btoa() is the function to encode to Base64
  }

  // Decode a Base64 string
  private decode(value: string): string {
    return atob(value); // atob() is the function to decode from Base64
  }

  // Remove an item from localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all localStorage items
  clear(): void {
    localStorage.clear();
  }
}
