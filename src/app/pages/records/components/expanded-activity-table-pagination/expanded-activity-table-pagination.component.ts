import {Component, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { UserData } from 'src/app/common/interfaces/user.interface';
import { USER_ROLE_ENUM, USER_STATUS_ENUM } from 'src/app/common/enums/user.enum';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { UserThumbnailComponent } from 'src/app/components/user-thumbnail/user-thumbnail.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-expanded-activity-table-pagination',
  templateUrl: './expanded-activity-table-pagination.component.html',
  styleUrl: './expanded-activity-table-pagination.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers:provideNativeDateAdapter(),
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule, 
    MatButtonModule, 
    MatIconModule,
    MatCardModule,
  MatListModule,
  MaterialModule,
  UserThumbnailComponent,
MatCheckboxModule,
MatFormFieldModule,
MatInputModule,
MatDatepickerModule],
  standalone: true
})
export class TableExpandableRowsExample {
  columnsToDisplay = ['date', 'category', 'user'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: ActivityElement | null;
  dataSource: MatTableDataSource<ActivityElement> = new MatTableDataSource<ActivityElement>();
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

    ngOnInit(): void {
      this.dataSource = new MatTableDataSource<ActivityElement>(ELEMENT_DATA);
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value; // Cast target to HTMLInputElement
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}

export interface ActivityElement {
  date: string;
  category: string;
  details: any[];
  user: UserData;
}

const ELEMENT_DATA: ActivityElement[] = [
  {
    date: '2024:12:16 13:27:11',
    category: 'LOGIN',
    details: [
        {
          type: 'SUCCESS',
          message: 'Hydrogen is a chemical element with symbol H and atomic number 1.'
        },
        {
          type: 'SUCCESS',
          message: `With a standard`
        },
        {
          type: 'ERROR',
          message: `atomic weight of 1.008, hydrogen is the lightest`
        },
        {
          type: 'SUCCESS',
          message: `element on the periodic table.`
        }
      ],
    user: {
            user_id: '1',
            name: 'Dilupa Marasinghe',
            email: 'test@gmail.com',
            role: USER_ROLE_ENUM.ADMIN,
            status: USER_STATUS_ENUM.ACTIVE,
            created_date: '202-10-27',
            profile_image: 'assets/images/profile/user-1.jpg',
          mobileNumber: '+94712390348'
          }
  },
  {
    date: '2024:12:11 13:15:22',
    category: 'DOWNLOAD',
    details: [ {
      type: 'SUCCESS',
      message: 'Hydrogen is a chemical element with symbol H and atomic number 1.'
    },
    {
      type: 'SUCCESS',
      message: `With a standard`
    },
    {
      type: 'ERROR',
      message: `atomic weight of 1.008, hydrogen is the lightest`
    },
    {
      type: 'ERROR',
      message: `element on the periodic table.`
    }
      ],
    user: {
      user_id: '6',
      name: 'Kamal Senath',
      email: 'test@gmail.com',
      role: USER_ROLE_ENUM.USER,
      status: USER_STATUS_ENUM.ACTIVE,
      created_date: '202-10-27',
      profile_image: 'assets/images/profile/user-6.jpg',
          mobileNumber: '+94712390348'
    }
  },{
    date: '2024:12:10 11:33:54',
    category: 'DOWNLOAD',
    details: [ {
      type: 'SUCCESS',
      message: 'Hydrogen is a chemical element with symbol H and atomic number 1.'
    },
    {
      type: 'ERROR',
      message: `With a standard`
    },
    {
      type: 'ERROR',
      message: `atomic weight of 1.008, hydrogen is the lightest`
    },
    {
      type: 'SUCCESS',
      message: `element on the periodic table.`
    }
      ],
        user: {
          user_id: '6',
          name: 'Kamal Senath',
          email: 'test@gmail.com',
          role: USER_ROLE_ENUM.USER,
          status: USER_STATUS_ENUM.ACTIVE,
          created_date: '202-10-27',
          profile_image: 'assets/images/profile/user-6.jpg',
          mobileNumber: '+94712390348'
        }
  },{
    date: '2024:12:16 13:27:11',
    category: 'REGISTER',
    details: [ {
      type: 'SUCCESS',
      message: 'Hydrogen is a chemical element with symbol H and atomic number 1.'
    },
    {
      type: 'SUCCESS',
      message: `With a standard`
    },
    {
      type: 'SUCCESS',
      message: `atomic weight of 1.008, hydrogen is the lightest`
    },
    {
      type: 'SUCCESS',
      message: `element on the periodic table.`
    }
      ],
        user: {
          user_id: '3',
          name: 'Kasun janaka',
          email: 'test@gmail.com',
          role: USER_ROLE_ENUM.USER,
          status: USER_STATUS_ENUM.ADMIN_VERIFICATION_PENDING,
          created_date: '202-10-27',
          profile_image: 'assets/images/profile/user-3.jpg',
          mobileNumber: '+94712390348'
        }
  },{
    date: '2024:12:16 13:27:11',
    category: 'REGISTER',
    details: [ {
      type: 'SUCCESS',
      message: 'Hydrogen is a chemical element with symbol H and atomic number 1.'
    },
    {
      type: 'SUCCESS',
      message: `With a standard`
    },
    {
      type: 'SUCCESS',
      message: `atomic weight of 1.008, hydrogen is the lightest`
    },
    {
      type: 'SUCCESS',
      message: `element on the periodic table.`
    }
      ],
        user: {
          user_id: '3',
          name: 'Kasun janaka',
          email: 'test@gmail.com',
          role: USER_ROLE_ENUM.USER,
          status: USER_STATUS_ENUM.ADMIN_VERIFICATION_PENDING,
          created_date: '202-10-27',
          profile_image: 'assets/images/profile/user-3.jpg',
          mobileNumber: '+94712390348'
        }
  },{
    date: '2024:12:16 13:27:11',
    category: 'LOGIN',
    details: [ {
      type: 'SUCCESS',
      message: 'Hydrogen is a chemical element with symbol H and atomic number 1.'
    },
    {
      type: 'SUCCESS',
      message: `With a standard`
    },
    {
      type: 'SUCCESS',
      message: `atomic weight of 1.008, hydrogen is the lightest`
    },
    {
      type: 'ERROR',
      message: `element on the periodic table.`
    }
      ],
        user: {
          user_id: '4',
          name: 'Herath P.L.G',
          email: 'test@gmail.com',
          role: USER_ROLE_ENUM.USER,
          status: USER_STATUS_ENUM.ACTIVE,
          created_date: '202-10-27',
          profile_image: 'assets/images/profile/user-4.jpg',
          mobileNumber: '+94712390348'
        }
  },{
    date: '2024:12:16 13:27:11',
    category: 'LOGIN',
    details: [ {
      type: 'SUCCESS',
      message: 'Hydrogen is a chemical element with symbol H and atomic number 1.'
    },
    {
      type: 'SUCCESS',
      message: `With a standard`
    },
    {
      type: 'SUCCESS',
      message: `atomic weight of 1.008, hydrogen is the lightest`
    },
    {
      type: 'SUCCESS',
      message: `element on the periodic table.`
    }
      ],
        user: {
          user_id: '4',
          name: 'Herath P.L.G',
          email: 'test@gmail.com',
          role: USER_ROLE_ENUM.USER,
          status: USER_STATUS_ENUM.ACTIVE,
          created_date: '202-10-27',
          profile_image: 'assets/images/profile/user-4.jpg',
          mobileNumber: '+94712390348'
        }
  },{
    date: '2024:12:16 13:27:11',
    category: 'PASSWORD_CHANGE',
    details: [ {
      type: 'SUCCESS',
      message: 'Hydrogen is a chemical element with symbol H and atomic number 1.'
    },
    {
      type: 'SUCCESS',
      message: `With a standard`
    },
    {
      type: 'SUCCESS',
      message: `atomic weight of 1.008, hydrogen is the lightest`
    },
    {
      type: 'SUCCESS',
      message: `element on the periodic table.`
    }
      ],
        user: {
          user_id: '3',
          name: 'Kasun janaka',
          email: 'test@gmail.com',
          role: USER_ROLE_ENUM.USER,
          status: USER_STATUS_ENUM.ADMIN_VERIFICATION_PENDING,
          created_date: '202-10-27',
          profile_image: 'assets/images/profile/user-3.jpg',
          mobileNumber: '+94712390348'
        }
  },{
    date: '2024:12:16 13:27:11',
    category: 'DOWNLOAD',
    details: [ {
      type: 'SUCCESS',
      message: 'Hydrogen is a chemical element with symbol H and atomic number 1.'
    },
    {
      type: 'SUCCESS',
      message: `With a standard`
    },
    {
      type: 'SUCCESS',
      message: `atomic weight of 1.008, hydrogen is the lightest`
    },
    {
      type: 'SUCCESS',
      message: `element on the periodic table.`
    }
      ],
        user: {
          user_id: '3',
          name: 'Kasun janaka',
          email: 'test@gmail.com',
          role: USER_ROLE_ENUM.USER,
          status: USER_STATUS_ENUM.ADMIN_VERIFICATION_PENDING,
          created_date: '202-10-27',
          profile_image: 'assets/images/profile/user-3.jpg',
          mobileNumber: '+94712390348'
        }
  },
];
