import { Routes } from '@angular/router';
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SingleGroupUsersTablePaginationComponent } from './components/single-group-users-table-pagination/single-group-users-table-pagination.component';


export const UserManagemntRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'user-groups',
        component: UserGroupsComponent,
      },
      {
        path: 'single-group-users',
        component: SingleGroupUsersTablePaginationComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
      }

    ],
  },
];
