import { Routes } from '@angular/router';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { DocumentAccessComponent } from './document-access/document-access.component';
import { SingleCaseDetailsComponent } from './single-case-details/single-case-details.component';

export const DocumentManagemntRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'document-upload',
        component: DocumentUploadComponent,
        data: { title: 'Available Cases' }
      },
      {
        path: 'document-access',
        component: DocumentAccessComponent,
        data: { title: 'Manage Document Access' }
      },
      {
        path: 'single-case',
        component: SingleCaseDetailsComponent,
        data: { title: 'Case Detail' }
      }
    ],
  },
];
