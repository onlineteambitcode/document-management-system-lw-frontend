import { Routes } from '@angular/router';
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SingleGroupUsersTablePaginationComponent } from './components/single-group-users-table-pagination/single-group-users-table-pagination.component';
import { USER_ROLE_ENUM } from 'src/app/common/enums/user.enum';
import { RoleGuard } from 'src/app/common/guards/role.guard';
import { MyAccountGuard } from 'src/app/common/guards/my-account.guard';


export const UserManagemntRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [RoleGuard],
        data: { title: 'Available Users', expectedRole: USER_ROLE_ENUM.ADMIN }
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        canActivate: [MyAccountGuard],
        data: { title: 'User Profile' }
      }

    ],
  },
];
