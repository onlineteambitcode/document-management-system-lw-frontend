import { Routes } from '@angular/router';
import { ActivityComponent } from './activity/activity.component';
import { USER_ROLE_ENUM } from 'src/app/common/enums/user.enum';
import { RoleGuard } from 'src/app/common/guards/role.guard';


export const RecordsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'activity',
        component: ActivityComponent,
        canActivate: [RoleGuard],
        data: { title: 'Monitor User Activities', expectedRole: USER_ROLE_ENUM.ADMIN }
      }
    ],
  },
];
