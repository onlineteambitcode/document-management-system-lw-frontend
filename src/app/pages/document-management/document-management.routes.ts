import { Routes } from '@angular/router';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { DocumentAccessComponent } from './document-access/document-access.component';
import { SingleCaseDetailsComponent } from './single-case-details/single-case-details.component';
import { RoleGuard } from 'src/app/common/guards/role.guard';
import { USER_ROLE_ENUM } from 'src/app/common/enums/user.enum';

export const DocumentManagemntRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'document-upload',
        component: DocumentUploadComponent,
        canActivate: [RoleGuard],
        data: { title: 'Available Cases', expectedRole: USER_ROLE_ENUM.ADMIN }
      },
      {
        path: 'document-access',
        component: DocumentAccessComponent,
        canActivate: [RoleGuard],
        data: { title: 'Manage Document Access', expectedRole: USER_ROLE_ENUM.ADMIN }
      },
      {
        path: 'single-case',
        component: SingleCaseDetailsComponent,
        data: { title: 'Case Detail' }
      }
    ],
  },
];
