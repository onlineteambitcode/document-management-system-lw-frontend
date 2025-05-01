import { CommonModule, DatePipe } from '@angular/common';
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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CaseData } from 'src/app/common/interfaces/case.interface';
import { DeleteConfirmComponent } from 'src/app/components/modal/delete-confirm/delete-confirm.component';
import { ComponentApiService } from '../../services/conponent-api.service';
import { SweetAlertService } from 'src/app/common/services/sweetAlert2.service';
import { MatSort } from '@angular/material/sort';
import { catchError, map, Observable, startWith, switchMap } from 'rxjs';
import { HttpCommonApiModule } from 'src/app/common/modules/http-api.module';
import { AuthService } from 'src/app/common/services/auth.service';
import { FullPageLoaderService } from 'src/app/common/services/full-page-loader.service';
import { USER_ROLE_ENUM } from 'src/app/common/enums/user.enum';
import { ContentLoaderComponent } from 'src/app/common/components/content-loader/content-loader.component';
@Component({
  selector: 'app-case-table-pagination',
  standalone: true,
  imports: [MatTableModule,
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
    HttpCommonApiModule,
    ContentLoaderComponent
  ],
  templateUrl: './case-table-pagination.component.html',
  styleUrl: './case-table-pagination.component.scss',
  providers: [ComponentApiService, DatePipe],
})
export class CaseTablePaginationComponent implements AfterViewInit,OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  tableData: CaseData[] = [];
  public displayedColumns: string[] = ['id', 'documents', 'last_updated'];
  removeDialogTitle: string = 'Do you want to remove?';
  messageBodayKey: string = '';
  editRouterLink: string = '';
  resultsLength = 0;
  isLoadingResults = true;
  isLoading = true;
  isRateLimitReached = false;
  pageSize = 5;
  isAdmin: boolean = false; 
  caseId: string = '';
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ComponentApiService,
    private alertService: SweetAlertService,
    private deleteConfirmDialog: MatDialog,
    private authService: AuthService,
    private fullPageLoaderService: FullPageLoaderService
  ) { }

  ngOnInit() {
    this.isAdmin = this.authService.hasRole(USER_ROLE_ENUM.ADMIN);
    // Subscribe to query parameters
    
  }

  ngAfterViewInit() {
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
          const sortActive = this.sort ? this.sort.active : 'case_id';

          return this.requestTableData(sortActive, sortDirection);
        })
      )
      .subscribe((data) => {
        this.isLoadingResults = false;
        this.tableData = data;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(this.tableData);
      });
  }
 
  requestTableData(sortActive: string, sortDirection: string): Observable<any> {
    return this.apiService.getAllCasesWithServerSidePagination<any>(
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
    const sortActive = this.sort ? this.sort.active : 'case_id';

    this.requestTableData(sortActive, sortDirection).subscribe((data: any) => {
      this.isLoadingResults = false;
      this.resultsLength = data.total;
      this.dataSource.data = data.data;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // Cast target to HTMLInputElement
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, element: any): void {
    this.deleteConfirmDialog.open(DeleteConfirmComponent, {
      width: '30%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { item: element[this.messageBodayKey], title: this.removeDialogTitle }
    });
  }
  
  navigateSingleCase(caseData: any){
    console.log(caseData);
    const params = { id: caseData.id };
    // Navigate to the target route with parameters
    this.router.navigate(['/document-managemnt/single-case'], { queryParams: params });

  }
}
