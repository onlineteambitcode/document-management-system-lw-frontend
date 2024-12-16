import { Component } from '@angular/core';
import { SingleCaseTablePaginationComponent } from '../components/single-case-table-pagination/single-case-table-pagination.component';

@Component({
  selector: 'app-single-case-details',
  standalone: true,
  imports: [SingleCaseTablePaginationComponent],
  templateUrl: './single-case-details.component.html',
  styleUrl: './single-case-details.component.scss'
})
export class SingleCaseDetailsComponent {

}
