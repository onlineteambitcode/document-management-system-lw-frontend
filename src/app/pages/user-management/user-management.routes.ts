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
        data: { title: 'Available User Groups' }
      },
      {
        path: 'single-group-users',
        component: SingleGroupUsersTablePaginationComponent,
        data: { title: 'User Group Detail' }
      },
      {
        path: 'users',
        component: UsersComponent,
        data: { title: 'Available Users' }
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        data: { title: 'User Profile' }
      }

    ],
  },
];
