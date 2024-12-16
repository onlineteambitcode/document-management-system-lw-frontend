import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { USER_ROLE_ENUM, USER_STATUS_ENUM } from 'src/app/common/enums/user.enum';
import { UserData } from 'src/app/common/interfaces/user.interface';
import { AppTablePaginationComponent } from 'src/app/components/table-pagination/table-pagination.component';
// table 1

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AppTablePaginationComponent],
  templateUrl: './users.component.html',
  styleUrl: './user.component.scss'
})
export class UsersComponent implements OnInit {
  public dataSource: MatTableDataSource<UserData> = new MatTableDataSource<UserData>();
  public tableData: UserData[] = [];
  public displayedColumns: string[]  = ['name', 'role', 'status', 'created_date', 'action'];

  ngOnInit(): void {
    this.tableData = [
      {
        user_id: '1',
        name: 'Dilupa Marasinghe',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.ADMIN,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-1.jpg'
      },
      {
        user_id: '2',
        name: 'Asith siriwardhana',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.USER,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-2.jpg'
      },
      {
        user_id: '3',
        name: 'Kasun janaka',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.USER,
        status: USER_STATUS_ENUM.PENDING,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-3.jpg'
      },
      {
        user_id: '4',
        name: 'Herath P.L.G',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.USER,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-4.jpg'
      },
      {
        user_id: '5',
        name: 'K.S.C.Janith',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.USER,
        status: USER_STATUS_ENUM.DEACTIVE,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-5.jpg'
      },
      {
        user_id: '6',
        name: 'Kamal Senath',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.USER,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-6.jpg'
      },
      {
        user_id: '7',
        name: 'Lal Guruge',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.USER,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-7.jpg'
      },
      {
        user_id: '8',
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

}
