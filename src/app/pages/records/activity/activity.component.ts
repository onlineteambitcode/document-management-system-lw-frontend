import { Component } from '@angular/core';
import { TableExpandableRowsExample } from '../components/expanded-activity-table-pagination/expanded-activity-table-pagination.component';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [TableExpandableRowsExample],
  templateUrl: './activity.component.html'
})
export class ActivityComponent {

}
