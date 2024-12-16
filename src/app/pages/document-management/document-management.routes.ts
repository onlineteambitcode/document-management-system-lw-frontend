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
      },
      {
        path: 'document-access',
        component: DocumentAccessComponent,
      },
      {
        path: 'single-case',
        component: SingleCaseDetailsComponent
      }
    ],
  },
];
