import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { RoleGuard } from './common/guards/role.guard';
import { USER_ROLE_ENUM } from './common/enums/user.enum';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoggedInUserGuard } from './common/guards/loggedInUser.guard';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
        canActivate: [LoggedInUserGuard,RoleGuard], // Apply the canActivate guard here
        data: { expectedRole: USER_ROLE_ENUM.ADMIN }, 
      },
      {
        path: 'document-managemnt',
        loadChildren: () =>
          import('./pages/document-management/document-management.routes').then(
            (m) => m.DocumentManagemntRoutes
          ),
          canActivate: [LoggedInUserGuard]
      },
      {
        path: 'user-managemnt',
        loadChildren: () =>
          import('./pages/user-management/user-management.routes').then(
            (m) => m.UserManagemntRoutes
          ),
          canActivate: [LoggedInUserGuard]
      },
      {
        path: 'records',
        loadChildren: () =>
          import('./pages/records/records.routes').then(
            (m) => m.RecordsRoutes
          ),
          canActivate: [LoggedInUserGuard]
      }
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: 'unauthorized',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
