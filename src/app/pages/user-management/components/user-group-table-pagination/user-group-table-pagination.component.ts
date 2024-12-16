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
import { DeleteConfirmComponent } from 'src/app/components/modal/delete-confirm/delete-confirm.component';
import { UsersListComponent } from '../users-list/users-list.component';


@Component({
  selector: 'app-user-group-table-pagination',
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
  ],
  templateUrl: './user-group-table-pagination.component.html',
  styleUrl: './user-group-table-pagination.component.scss'
})
export class AppUserGroupTablePaginationComponent implements AfterViewInit {
  @Input() tableData: any[] = [];
  @Input() displayedColumns: any[] = [];
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @Input() removeDialogTitle:string = 'Do you want to remove?';
  @Input() messageBodayKey:string = '';
  @Input() editRouterLink:string = '';
  readonly deleteConfirmDialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator: MatPaginator;

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
  openUsersDialod(): void{
    this.deleteConfirmDialog.open(UsersListComponent);
  }
}
