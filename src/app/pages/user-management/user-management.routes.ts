import { Routes } from '@angular/router';
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { UsersComponent } from './users/users.component';


export const UserManagemntRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'user-groups',
        component: UserGroupsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      }
    ],
  },
];
