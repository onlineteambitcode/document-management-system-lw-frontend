import { Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AppTablePaginationComponent } from 'src/app/components/table-pagination/table-pagination.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AppTablePaginationComponent],
  templateUrl: './users.component.html'
})
export class UsersComponent {
  
}
