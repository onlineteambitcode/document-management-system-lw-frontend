import {Component, Input, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { UserData } from 'src/app/common/interfaces/user.interface';
import { USER_ROLE_ENUM, USER_STATUS_ENUM } from 'src/app/common/enums/user.enum';
import { MatListModule } from '@angular/material/list';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { UserThumbnailComponent } from 'src/app/components/user-thumbnail/user-thumbnail.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { catchError, map, Observable, startWith, switchMap } from 'rxjs';
import { RandomColor } from 'src/app/common/utils/random-lolor.util';
import { ComponentApiService } from '../../services/conponent-api.service';
import { SweetAlertService } from 'src/app/common/services/sweetAlert2.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FullPageLoaderService } from 'src/app/common/services/full-page-loader.service';
import { ContentLoaderComponent } from 'src/app/common/components/content-loader/content-loader.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { HttpCommonApiModule } from 'src/app/common/modules/http-api.module';

@Component({
  selector: 'app-expanded-activity-table-pagination',
  templateUrl: './expanded-activity-table-pagination.component.html',
  styleUrl: './expanded-activity-table-pagination.component.scss',
  providers:[ComponentApiService, DatePipe],
  imports: [
    CommonModule,
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
MatDatepickerModule,
ContentLoaderComponent,
TablerIconsModule,
HttpCommonApiModule,
MatDialogModule],
  standalone: true
})
export class TableExpandableRowsExample {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   @Input() removeDialogTitle: string = 'Do you want to remove?';
   @Input() messageBodayKey: string = '';
   @Input() editRouterLink: string = '';

   public displayedColumns: string[] = ['user','activity_type', 'created_date','status','summary'];
   tableData: any[] = [];
   dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
   resultsLength = 0;
   isLoadingResults = true;
   isLoading = false;
   isRateLimitReached = false;
   pageSize = 5;
   constructor(
         private router: Router,
         private apiService: ComponentApiService,
         private alertService: SweetAlertService,
         private deleteConfirmDialog: MatDialog,
         private fullPageLoaderService: FullPageLoaderService
   ) { }
 
   ngAfterViewInit(): void {
     this.dataSource.paginator = this.paginator;
 
     // Only bind the sort if it's available
     if (this.sort) {
       this.dataSource.sort = this.sort;
     }
     this.loadTableData();
    
   }
 
 
   loadTableData(){
      // Listen for changes in the paginator and sort after view initialization
      this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
 
          // Ensure that sort direction and active column are available
          const sortDirection = this.sort ? this.sort.direction : 'desc';
          const sortActive = this.sort ? this.sort.active : 'createdAt';
 
          return this.requestTableData(sortActive, sortDirection);
        })
      )
      .subscribe((data) => {
        this.isLoadingResults = false;
        this.tableData = data;
        RandomColor.getConsitantRandomColorPerUser(this.tableData,false);
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(this.tableData);
      });
   }
  
  requestTableData(sortActive: string, sortDirection: string): Observable<any> {
    return this.apiService.getAllActivitiesWithServerSidePagination<any>(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      sortActive,
      sortDirection
    ).pipe(
      map((data: any) => {
        this.resultsLength = data.totalRecords;
        return data.data;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        this.isRateLimitReached = true;
        return [];
      })
    );
  }

  onPageChange() {
    this.isLoadingResults = true;
    const sortDirection = this.sort ? this.sort.direction : 'asc';
    const sortActive = this.sort ? this.sort.active : 'createdAt';

    this.requestTableData(sortActive, sortDirection).subscribe((data: any) => {
      this.isLoadingResults = false;
      this.resultsLength = data.totalRecords;
      this.dataSource.data = data.data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
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
