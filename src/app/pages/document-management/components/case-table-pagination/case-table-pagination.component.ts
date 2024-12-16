import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Input, ViewChild } from '@angular/core';
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
import { RouterModule } from '@angular/router';
import { CaseData } from 'src/app/common/interfaces/case.interface';
import { DeleteConfirmComponent } from 'src/app/components/modal/delete-confirm/delete-confirm.component';
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
],
  templateUrl: './case-table-pagination.component.html',
  styleUrl: './case-table-pagination.component.scss'
})
export class CaseTablePaginationComponent {
  public tableData: CaseData[] = [];
  public displayedColumns: string[]  = ['id', 'allowed','documents', 'last_updated', 'action'];
  removeDialogTitle:string = 'Do you want to remove?';
  messageBodayKey:string = '';
  editRouterLink:string = '';
  public dataSource: MatTableDataSource<CaseData> = new MatTableDataSource<CaseData>();
  readonly deleteConfirmDialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator: MatPaginator;



  ngOnInit(): void {
    this.tableData = [
      {
        case_id: 'CASE_2012_SPE_15',
        name: '',
        allowed_users: 10,
        documents: 17,
        created_date: '2024-10-27',
        last_updated_date: '2024-12-15',
        description: 'Test description'
      },
      {
        case_id: 'CASE_2019_FEB_11_ADMIN_GROUP',
        name: '',
        allowed_users: 10,
        documents: 20,
        created_date: '2024-10-27',
        last_updated_date: '2024-12-15',
        description: 'Test description'
      },
      {
        case_id: 'CASE_2022_MAR_18',
        name: '',
        allowed_users: 10,
        documents: 30,
        created_date: '2024-10-27',
        last_updated_date: '2024-12-15',
        description: 'Test description'
      },
      {
        case_id: 'CASE_2024_JAN_2',
        name: '',
        allowed_users: 30,
        documents: 28,
        created_date: '2024-10-27',
        last_updated_date: '2024-12-15',
        description: 'Test description'
      },
      {
        case_id: 'CASE_2024_NOV_2',
        name: '',
        allowed_users: 10,
        documents: 11,
        created_date: '2024-10-27',
        last_updated_date: '2024-12-15',
        description: 'Test description'
      }
    ];
    this.dataSource = new MatTableDataSource<CaseData>(this.tableData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  // navigateSingleCase(element: CaseData){

  // }
}
