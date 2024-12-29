import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TablerIconsModule } from 'angular-tabler-icons';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { catchError, map, Observable, startWith, switchMap } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { SweetAlertService } from 'src/app/common/services/sweetAlert2.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { FullPageLoaderService } from 'src/app/common/services/full-page-loader.service';
import { HttpCommonApiModule } from 'src/app/common/modules/http-api.module';
import { MatChipsModule } from '@angular/material/chips';
import { ComponentApiService } from '../../services/componentApi.service';
import { DeleteConfirmComponent } from 'src/app/components/modal/delete-confirm/delete-confirm.component';


@Component({
  selector: 'app-table-pagination',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSlideToggleModule,
    TablerIconsModule,
    DialogModule,
    RouterModule,
    MatSortModule,
    HttpCommonApiModule,
    MatChipsModule
  ],
  providers: [ComponentApiService],
  templateUrl: './table-pagination.component.html',
  styleUrl: 'table-pagination.component.scss'
})
export class AppTablePaginationComponent implements AfterViewInit {
  tableData: any[] = [];
  @Input() displayedColumns: any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @Input() removeDialogTitle: string = 'Do you want to remove?';
  @Input() messageBodayKey: string = '';
  @Input() editRouterLink: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSize = 5;
  constructor(
    private apiService: ComponentApiService,
    private alertService: SweetAlertService,
    private deleteConfirmDialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    // Only bind the sort if it's available
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    // Listen for changes in the paginator and sort after view initialization
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          // Ensure that sort direction and active column are available
          const sortDirection = this.sort ? this.sort.direction : 'asc';
          const sortActive = this.sort ? this.sort.active : 'user_id';

          return this.requestTableData(sortActive, sortDirection);
        })
      )
      .subscribe((data) => {
        this.isLoadingResults = false;
        this.tableData = data;
        this.dataSource = new MatTableDataSource(this.tableData);
      });
  }
  // Method to disable the "Back" button
  isBackDisabled(): boolean {
    return this.paginator.pageIndex === 0;
  }

  // Method to disable the "Next" button
  isNextDisabled(): boolean {
    return this.paginator.pageIndex === Math.ceil(this.resultsLength / this.paginator.pageSize) - 1;
  }
  requestTableData(sortActive: string, sortDirection: string): Observable<any> {
    return this.apiService.getAllUsersWithServerSidePagination<any>(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      sortActive,
      sortDirection
    ).pipe(
      map((data: any) => {
        this.resultsLength = data.total;
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
    const sortActive = this.sort ? this.sort.active : 'user_id';

    this.requestTableData(sortActive, sortDirection).subscribe((data: any) => {
      this.isLoadingResults = false;
      this.resultsLength = data.total;
      this.dataSource.data = data.data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, element: any): void {
    this.deleteConfirmDialog.open(DeleteConfirmComponent, {
      width: '20%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { item: element[this.messageBodayKey], title: this.removeDialogTitle }
    });
  }

}
