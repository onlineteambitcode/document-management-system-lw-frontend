import {Component, Input, ViewChild} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { UserData } from 'src/app/common/interfaces/user.interface';
import { MatListModule } from '@angular/material/list';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { UserThumbnailComponent } from 'src/app/components/user-thumbnail/user-thumbnail.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { catchError, map, Observable, of, startWith, switchMap } from 'rxjs';
import { RandomColor } from 'src/app/common/utils/random-lolor.util';
import { ComponentApiService } from '../../services/conponent-api.service';
import { MatDialogModule } from '@angular/material/dialog';
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
  // @ViewChild(MatSort) sort: MatSort;
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
         private apiService: ComponentApiService,
   ) { }
 
   ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.apiService
            .getAllActivitiesWithServerSidePagination<any>(
              this.paginator.pageIndex,
              this.paginator.pageSize,
              'createdAt',
              'desc'
            )
            .pipe(
              map((data: any) => {
                this.isLoadingResults = false;
                this.resultsLength = data.totalRecords;
                return data.data;
              }),
              catchError(() => {
                this.isLoadingResults = false;
                this.isRateLimitReached = true;
                return of([]);
              })
            );
        })
      )
      .subscribe((data) => {
        this.dataSource.data = data;
        RandomColor.getConsitantRandomColorPerUser(data, false);
      });
  }
  
   requestTableData(): Observable<{ data: any[]; totalRecords: number }> {
    return this.apiService.getAllActivitiesWithServerSidePagination<any>(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      'createdAt',
      'desc'
    ).pipe(
      map((data: any) => {
        return {
          data: data.data,
          totalRecords: data.totalRecords
        };
      }),
      catchError(() => {
        this.isLoadingResults = false;
        this.isRateLimitReached = true;
        return [];
      })
    );
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

