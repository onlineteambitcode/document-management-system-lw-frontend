import { Component } from '@angular/core';
import { DocumentAccessTablePaginationComponent } from '../components/document-access-table-pagination/document-access-table-pagination.component';

@Component({
  selector: 'app-document-access',
  standalone: true,
  imports: [DocumentAccessTablePaginationComponent],
  templateUrl: './document-access.component.html'
})
export class DocumentAccessComponent {

}
