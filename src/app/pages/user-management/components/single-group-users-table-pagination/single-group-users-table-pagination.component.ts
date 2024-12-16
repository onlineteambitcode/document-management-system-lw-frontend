import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { USER_ROLE_ENUM, USER_STATUS_ENUM } from 'src/app/common/enums/user.enum';
import { UserData } from 'src/app/common/interfaces/user.interface';
import { DeleteConfirmComponent } from 'src/app/components/modal/delete-confirm/delete-confirm.component';
import { MaterialModule } from 'src/app/material.module';
import { Section } from 'src/app/pages/ui-components/lists/lists.component';

@Component({
  selector: 'app-single-group-users-table-pagination',
  standalone: true,
  imports: [  MatTableModule,
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
    MatRadioModule],
  templateUrl: './single-group-users-table-pagination.component.html',
  styleUrl: './single-group-users-table-pagination.component.scss'
})
export class SingleGroupUsersTablePaginationComponent implements AfterViewInit, OnInit {
  tableData: any[] = [];
  displayedColumns: string[]  = ['name', 'role', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  removeDialogTitle:string = 'Do you want to remove?';
  messageBodayKey:string = '';
  editRouterLink:string = '';
  readonly deleteConfirmDialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.tableData = [
      {
        user_id: 1,
        name: 'Dilupa Marasinghe',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.ADMIN,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-1.jpg'
      },
      {
        user_id: 2,
        name: 'Asith siriwardhana',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.USER,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-2.jpg'
      },
      {
        user_id: 3,
        name: 'Kasun janaka',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.USER,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-3.jpg'
      },
      {
        user_id: 4,
        name: 'Herath P.L.G',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.USER,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-4.jpg'
      },
      {
        user_id: 5,
        name: 'K.S.C.Janith',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.USER,
        status: USER_STATUS_ENUM.DEACTIVE,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-5.jpg'
      },
      {
        user_id: 6,
        name: 'Kamal Senath',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.USER,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-6.jpg'
      },
      {
        user_id: 7,
        name: 'Lal Guruge',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.USER,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-7.jpg'
      },
      {
        user_id: 8,
        name: 'Sahan H.L.R',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.USER,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-8.jpg'
      },
    ];
    this.dataSource = new MatTableDataSource<UserData>(this.tableData);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // Cast target to HTMLInputElement
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

  openSnackBar(message:string) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2000

    });
  }
}
