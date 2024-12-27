import { Injectable } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FullPageLoaderService {
  private isLoading: boolean = false; // Private variable to hold the loading status
  private loadingSubject: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null); // Initialized with null
    // Private configuration object for ngx-loading
    private readonly config = {
    animationType: ngxLoadingAnimationTypes.threeBounce,
    backdropBackgroundColour: 'rgba(0,0,0,0.5)',
    backdropBorderRadius: '14px',
    primaryColour: '#ffffff',
    secondaryColour: '#ccc',
    tertiaryColour: '#333',
  };

  // Getter to retrieve the current loading status
  get loadingStatus(): Observable<boolean | null> {
    return this.loadingSubject.asObservable().pipe(
        filter((status) => status !== null) // Filters out the null initial state
      );
  }

  // Method to update the loading status
  setLoadingStatus(isLoading: boolean): void {
    this.isLoading = isLoading; // Update the private variable
    this.loadingSubject.next(this.isLoading); // Emit the new value to subscribers
  }

  // Getter to expose the ngxLoadingConfig
  get ngxLoadingConfig() {
    return this.config;
  }
}
