import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { filter, map } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth.service';
import { SweetAlertService } from 'src/app/common/services/sweetAlert2.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NgScrollbarModule, MaterialModule, MatButtonModule, MatCardModule],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  headerTitle = '';

  constructor(
    private alertService: SweetAlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {}

  ngOnInit(): void {
     // Handle initial load
    this.updateTitleFromRoute(this.activatedRoute);

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd), // Trigger on navigation end
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          return child?.snapshot.data['title']; // Extract the title from route data
        })
      )
      .subscribe((title: string) => {
        this.headerTitle = title || ''; // Update header title
      });
  }

  /**
   * During ngOnInit, the updateTitleFromRoute method is called to immediately fetch the title from the current active route.
   * @param route 
   */
  private updateTitleFromRoute(route: ActivatedRoute): void {
    let child = route;
    while (child.firstChild) {
      child = child.firstChild;
    }
    const title = child.snapshot.data['title'];
    if (title) {
      this.headerTitle = title;
    }
  }

  navigateToProfile(){
    const logedInUserId = this.authService.getLogedInUserId();
    const params = { id: logedInUserId };
    // Navigate to the target route with parameters
    this.router.navigate(['/user-managemnt/user-profile'], { queryParams: params });
  }

  clickOnLogout(){
    this.alertService.confirmAlert("Are you sure?",`You're about to log out`,"warning",true,"No",true,"Yes, Logout",false,this.logoutUser.bind(this))
  }

  logoutUser(){
    this.authService.logout();
    this.router.navigate(['/authentication/login']);
  }
}
