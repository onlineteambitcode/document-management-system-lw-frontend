import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';

// table 1
export interface userData {
  id: number;
  imagePath: string;
  uname: string;
  budget: number;
  permissions: string[];
}

const PRODUCT_DATA: userData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Dilupa Marasinghe',
    budget: 180,
    permissions: ['Admin','Full Access'],
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Asith siriwardhana',
    budget: 90,
    permissions: ['Customer','View','Download'],
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Kasun jnak',
    budget: 120,
    permissions: ['Customer','View','Download'],
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Herath P.L.G',
    budget: 160,
    permissions: ['Customer','View','Download'],
  },
  {
    id: 5,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'K.S.C.Janith',
    budget: 180,
    permissions: ['Customer','View','Download'],
  },
  {
    id: 6,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Kamal Senath',
    budget: 90,
    permissions: ['Customer','View','Download'],
  },
  {
    id: 7,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Lal Guruge',
    budget: 120,
    permissions: ['Customer','View','Download'],
  },
  {
    id: 8,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Sahan H.L.R',
    budget: 160,
    permissions: ['Customer','View','Download'],
  },
];

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
  ],
  templateUrl: './table-pagination.component.html',
})
export class AppTablePaginationComponent implements AfterViewInit {
  // table 1
  displayedColumns1: string[] = ['assigned', 'name', 'permissions', 'budget'];
  dataSource1 = new MatTableDataSource<userData>(PRODUCT_DATA);;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // Cast target to HTMLInputElement
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
}
