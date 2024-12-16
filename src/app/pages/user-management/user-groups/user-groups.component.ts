import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { USER_ROLE_ENUM, USER_STATUS_ENUM } from 'src/app/common/enums/user.enum';
import { UserGroupData } from 'src/app/common/interfaces/user.interface';
import { AppUserGroupTablePaginationComponent } from '../components/user-group-table-pagination/user-group-table-pagination.component';

@Component({
  selector: 'app-user-groups',
  standalone: true,
  imports: [AppUserGroupTablePaginationComponent],
  templateUrl: './user-groups.component.html'
})
export class UserGroupsComponent {
  public dataSource: MatTableDataSource<UserGroupData> = new MatTableDataSource<UserGroupData>();
  public tableData: UserGroupData[] = [];
  public displayedColumns: string[]  = ['name', 'permission','count', 'status', 'created_date', 'action'];

  ngOnInit(): void {
    this.tableData = [
      {
        group_id: 1,
        name: 'CASE_2012_SPE_15_USER_GROUP',
        permission: USER_ROLE_ENUM.USER,
        count: 10,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27'
      },
      {
        group_id: 2,
        name: 'CASE_2019_FEB_11_ADMIN_GROUP',
        permission: USER_ROLE_ENUM.ADMIN,
        count: 10,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27'
      },
      {
        group_id: 3,
        name: 'CASE_2022_MAR_18_USER_GROUP',
        permission: USER_ROLE_ENUM.USER,
        count: 10,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27'
      },
      {
        group_id: 4,
        name: 'CASE_2024_JAN_2_USER_GROUP',
        permission: USER_ROLE_ENUM.USER,
        count: 30,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27'
      },
      {
        group_id: 5,
        name: 'CASE_2024_NOV_2_USER_GROUP',
        permission: USER_ROLE_ENUM.USER,
        count: 10,
        status: USER_STATUS_ENUM.DEACTIVE,
        created_date: '202-10-27'
      }
    ];
    this.dataSource = new MatTableDataSource<UserGroupData>(this.tableData);
  }

}
