import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TablerIconsModule } from 'angular-tabler-icons';
import { USER_ROLE_ENUM, USER_STATUS_ENUM } from 'src/app/common/enums/user.enum';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, 
    MaterialModule, 
    MatIconModule,
    MatButtonModule,
    TablerIconsModule,
    MatDialogModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  tableData: any[] = [];

  applyFilter():void {

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
        status: USER_STATUS_ENUM.DEACTIVATED,
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
  }
}
