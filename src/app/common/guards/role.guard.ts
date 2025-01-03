import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { USER_ROLE_ENUM } from '../enums/user.enum';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    if (this.authService.isLoggedIn() && this.authService.hasRole(expectedRole)) {
      return true;
    }
    // this.router.navigate(['/unauthorized']); // Redirect to unauthorized page
    return true;
  }
}
