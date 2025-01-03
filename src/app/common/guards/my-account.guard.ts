import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, Route } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { USER_ROLE_ENUM } from '../enums/user.enum';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { SweetAlertService } from '../services/sweetAlert2.service';

@Injectable({
  providedIn: 'root'
})
export class MyAccountGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private sweetAlertService : SweetAlertService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Get the user id from the query parameters
    const userIdFromQuery = route.queryParams['id']; // Assuming 'id' is passed as a query parameter

    // Decode the JWT token to get the user information
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']); // Redirect to login if no token is available
      return false;
    }

    try {
        const decodedToken: JwtPayload & { userId ?: string, role ?: string } = jwtDecode(token);
        const logedInUserRole = decodedToken.role || '';
        if(logedInUserRole === USER_ROLE_ENUM.ADMIN){
          return true;
        }
        
        const logedInUserId = decodedToken.userId || '';

        if (!userIdFromQuery) {
          this.router.navigate(['/unauthorized']); // Redirect if the query parameter 'id' is missing
          return false;
        }
      // Check if the user id from the query parameter matches the user id in the JWT
      if (userIdFromQuery === logedInUserId) {
        return true; // Allow access if the ids match
      } else {
        this.sweetAlertService.errorToaster('top',"Your are not permitted to load other accounts");
        this.router.navigate(['/unauthorized']);
        return false;
      }
    } catch (error) {
      console.error('Invalid token:', error);
      this.sweetAlertService.errorToaster('top',"Your are not permitted to load other accounts");
      return false;
    }
  }
}
