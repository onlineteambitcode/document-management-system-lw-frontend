import { Routes } from '@angular/router';
import { ActivityComponent } from './activity/activity.component';


export const RecordsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'activity',
        component: ActivityComponent,
      }
    ],
  },
];
