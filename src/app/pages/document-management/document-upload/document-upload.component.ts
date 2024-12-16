import { Component } from '@angular/core';
import { CaseTablePaginationComponent } from '../components/case-table-pagination/case-table-pagination.component';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [CaseTablePaginationComponent],
  templateUrl: './document-upload.component.html'
})
export class DocumentUploadComponent {

}
