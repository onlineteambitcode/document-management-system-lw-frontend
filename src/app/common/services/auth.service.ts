import { inject, Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { StorageService } from './storage.service';
import { USER_ROLE_ENUM } from '../enums/user.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isReadOnlyAdmin: boolean = false;
  private role: string = '';
  private logedInUserId: string = '';
  private storageService = inject(StorageService); // Inject the SweetAlertService service

  constructor() {
    this.updateAuth();
  }

  updateAuth(){
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: JwtPayload & { role ?: string, userId ?: string } = jwtDecode(token);
        this.role = decodedToken.role || '';
        this.logedInUserId = decodedToken.userId || '';
        this.isReadOnlyAdmin = this.role === USER_ROLE_ENUM.SUB_ADMIN;
      } catch (error) {
        console.error('Invalid authToken', error);
        this.logout(); // Clear token if decoding fails
      }
    }
  }

  // Fetch token from storage
  getToken(): string | null {
    return this.storageService.getItem('token');
  }

  getIsReadOnlyAdmin(): boolean{
    return this.isReadOnlyAdmin;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return (!!this.getToken()) && !!this.getLogedInUserId();
  }

  // Check if user has a specific role
  hasRole(role: string): boolean {
    return this.role === role;
  }

  isMyLogedInId(id:string): boolean{
    return parseInt(this.logedInUserId) === parseInt(id);
  }   

  getLogedInUserId(): string{
    return this.logedInUserId;
  }

  // Log out the user
  logout(): void {
    this.storageService.removeItem('token'); // Remove token
  }
}
