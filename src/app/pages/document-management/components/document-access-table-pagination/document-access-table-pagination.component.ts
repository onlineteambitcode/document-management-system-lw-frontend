import { DialogModule } from '@angular/cdk/dialog';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, inject, Input, model, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CaseData, CaseDocumentData } from 'src/app/common/interfaces/case.interface';
import { UserData, UserOrGroup } from 'src/app/common/interfaces/user.interface';
import { MaterialModule } from 'src/app/material.module';
import {SelectionModel} from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { UserThumbnailComponent } from 'src/app/components/user-thumbnail/user-thumbnail.component';
import { MatInputModule } from '@angular/material/input';
import { FileUploadUiComponent } from '../file-upload-ui/file-upload-ui.component';
import { MatSelectModule } from '@angular/material/select';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-document-access-table-pagination',
  standalone: true,
    imports: [MatTableModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSlideToggleModule,
    TablerIconsModule,
    DialogModule,
    RouterModule,
    MatRadioModule,
    MatCheckboxModule,
    MatChipsModule,
    MatAutocompleteModule,
    UserThumbnailComponent,
  MatSlideToggleModule,
MatInputModule,
FileUploadUiComponent,
  MatSelectModule,
  ReactiveFormsModule,
  AsyncPipe],
  templateUrl: './document-access-table-pagination.component.html',
  styleUrl: './document-access-table-pagination.component.scss'
})
export class DocumentAccessTablePaginationComponent {
  myControl = new FormControl<string | CaseData>('');
  filteredOptions: Observable<CaseData[]>;

  isAdmin: boolean = true;
  tableData: CaseDocumentData[] = [];
  selectData: CaseData[] = [];
  userTableData: UserData[] = [];
  displayedColumns: string[]  = ['select','name', 'action'];
  selection = new SelectionModel<CaseDocumentData>(true, []);
  dataSource: MatTableDataSource<CaseDocumentData> = new MatTableDataSource<CaseDocumentData>();
  removeDialogTitle:string = 'Do you want to remove?';
  messageBodayKey:string = '';
  editRouterLink:string = '';
  caseName = 'CASE_2012_SPE_15_1';
  caseDescription='Test description'
  isUpload: boolean = false;
  readonly deleteConfirmDialog = inject(MatDialog);
  readonly documentUploadDialog = inject(MatDialog);
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentUserOrGroup = model('');
  readonly usersOrGroups = signal<UserOrGroup[]>([]);
  readonly allUsersOrGroups = signal<UserOrGroup[]>([
    { name: 'Dilupa', id: '100WS', isGroup: false, profile_image: 'assets/images/profile/user-1.jpg', email: 'test@gmail.com',
      user: {
        user_id: '1',
        name: 'Dilupa Marasinghe',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.ADMIN,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-1.jpg',
      }
     },
    { name: 'CASE November 1 -23', id: 'CASE_441_NOV', isGroup: true, profile_image: 'assets/images/profile/user-1.jpg', email: 'test@gmail.com',
      user: null },
    { name: 'CASE Jan 3 -23', id: 'CASE_201_NOV', isGroup: true, profile_image: 'assets/images/profile/user-1.jpg', email: 'test@gmail.com',
      user: null
     },
    { name: 'Randima', id: '102RANWS', isGroup: false, profile_image: 'assets/images/profile/user-1.jpg', email: 'test@gmail.com' ,
      user: {
        user_id: '3',
        name: 'Randima Senanayake',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.USER,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-3.jpg'
      } },
    { name: 'CASE Mrch 3 -12', id: 'CASE_011_NOV', isGroup: true, profile_image: 'assets/images/profile/user-1.jpg', email: 'test@gmail.com',
      user: null
    },
    { name: 'Kasun', id: '100KSWS', isGroup: false, profile_image: 'assets/images/profile/user-1.jpg', email: 'test@gmail.com',
      user: {
        user_id: '5',
        name: 'K.S.C.Janith',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.USER,
        status: USER_STATUS_ENUM.DEACTIVE,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-5.jpg'
      }
     },
  ]);
  readonly filteredUsersOrGroups = computed(() => {
    const currentFruit = this.currentUserOrGroup().toLowerCase();
    const selectedIds = new Set(this.usersOrGroups().map((ele) => ele.id));

    return this.allUsersOrGroups()
      .filter((ele) => !selectedIds.has(ele.id)) // Exclude already selected
      .filter((ele) =>
        ele.name.toLowerCase().includes(currentFruit) // Filter by search
      );
  });
  readonly announcer = inject(LiveAnnouncer);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.selectData = [
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

      this.tableData = [
        {
          document_id: 'DOC_CASE_2012_SPE_15_1',
          name: 'Case 2012 Sep.pdf',
          file_size: 2,
          created_date: '2024-10-27',
          last_updated_date: '2024-12-15',
          description: 'Test description'
        },
        {
          document_id: 'DOC_CASE_2012_MAY_15_2',
          name: 'Case 2012 May.pdf',
          file_size: 7.1,
          created_date: '2024-10-27',
          last_updated_date: '2024-12-15',
          description: 'Test description'
        },
        {
          document_id: 'DOC_CASE_2018_JAN_15_3',
          name: 'Case 2018 Jan.pdf',
          file_size: 3.2,
          created_date: '2024-10-27',
          last_updated_date: '2024-12-15',
          description: 'Test description'
        },
        {
          document_id: 'DOC_CASE_2012_SPE_15_4',
          name: 'Case 2012 Sep.pdf',
          file_size: 0.5,
          created_date: '2024-10-27',
          last_updated_date: '2024-12-15',
          description: 'Test description'
        },
        {
          document_id: 'DOC_CASE_2012_SPE_15_5',
          name: 'Case 2012 Sep.pdf',
          file_size: 1.3,
          created_date: '2024-10-27',
          last_updated_date: '2024-12-15',
          description: 'Test description'
        }
      ];

      this.userTableData = [
        {
          user_id: '1',
          name: 'Dilupa Marasinghe',
          email: 'test@gmail.com',
          role: USER_ROLE_ENUM.ADMIN,
          status: USER_STATUS_ENUM.ACTIVE,
          created_date: '202-10-27',
          profile_image: 'assets/images/profile/user-1.jpg',
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
          status: USER_STATUS_ENUM.ACTIVE,
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
    this.dataSource = new MatTableDataSource<CaseDocumentData>(this.tableData);
  
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.selectData.slice();
      }),
    );
  
  
  }
  onToggleChange(){
    
  }
  backToCase(){
    this.isUpload = false;
  }
 /** Whether the number of selected elements matches the total number of rows. */
 isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

 /** Selects all rows if they are not all selected; otherwise clear selection. */
 toggleAllRows() {
  if (this.isAllSelected()) {
    this.selection.clear();
    return;
  }

  this.selection.select(...this.dataSource.data);
}
 /** The label for the checkbox on the passed row */
 checkboxLabel(row?: CaseDocumentData): string {
  if (!row) {
    return `${this.isAllSelected() ? 'Deselect' : 'Select'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.document_id}`;
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // Cast target to HTMLInputElement
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

// Compute filtered fruits excluding already selected ones
readonly filteredFruits = computed(() => {
  const currentFruit = this.currentUserOrGroup().toLowerCase();
  const selectedIds = new Set(this.usersOrGroups().map((ele) => ele.id));

  return this.allUsersOrGroups()
    .filter((ele) => !selectedIds.has(ele.id)) // Exclude already selected
    .filter((ele) =>
      ele.name.toLowerCase().includes(currentFruit) // Filter by search
    );
});

add(event: MatChipInputEvent): void {
  const value = (event.value || '').trim();

  if (value) {
    const match = this.allUsersOrGroups().find(
      (ele) => ele.name.toLowerCase() === value.toLowerCase()
    );

    if (match) {
      this.usersOrGroups.update((items) => [...items, match]);
    }
  }

  this.currentUserOrGroup.set('');
}

remove(removeItem: UserOrGroup): void {
  this.usersOrGroups.update((items) => {
    const index = items.findIndex((f) => f.id === removeItem.id);
    if (index < 0) {
      return items;
    }

    items.splice(index, 1);
    this.announcer.announce(`Removed ${removeItem.name}`);
    return [...items];
  });

  // Add the removed fruit back to the allFruits signal
  this.allUsersOrGroups.update((all) => [...all, removeItem]);
  this.updateFilteredData();
}

private updateFilteredData(): void {
  this.filteredUsersOrGroups();
}

handleBackspace(): void {
  if (!this.currentUserOrGroup()) {
    const selectedItems = this.usersOrGroups();
    if (selectedItems.length > 0) {
      const lastFruit = selectedItems[selectedItems.length - 1];
      this.remove(lastFruit);
    }
  }
}

selected(event: MatAutocompleteSelectedEvent): void {
  const selectedFruit = this.allUsersOrGroups().find(
    (ele) => ele.name === event.option.value.name
  );

  if (selectedFruit) {
    // Add the selected fruit to the chips
    this.usersOrGroups.update((items) => [...items, selectedFruit]);

    // Remove the selected fruit from the allFruits signal
    this.allUsersOrGroups.update((all) =>
      all.filter((ele) => ele.id !== selectedFruit.id)
    );
  }

  this.currentUserOrGroup.set('');
}

  openFileUploadDialog():void{
    
    // this.documentUploadDialog.open(FileUploadUiComponent, {
    //   width: '50%',
    //   height: 'auto',
    //   enterAnimationDuration: '100ms',
    //  exitAnimationDuration:'100ms'
    // });

    this.isUpload = true;
  }

  private _filter(name: string): CaseData[] {
    const filterValue = name.toLowerCase();

    return this.selectData.filter(option => option.case_id.toLowerCase().includes(filterValue));
  }

  displayFn(user: CaseData): string {
    return user && user.case_id ? user.case_id : '';
  }
}
