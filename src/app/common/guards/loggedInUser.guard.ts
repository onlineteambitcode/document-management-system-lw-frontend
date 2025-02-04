import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { USER_ROLE_ENUM } from '../enums/user.enum';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/authentication/login']); // Redirect to login page
    return false;
  }
}
