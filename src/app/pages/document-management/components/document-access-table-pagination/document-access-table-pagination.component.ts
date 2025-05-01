import { DialogModule } from '@angular/cdk/dialog';
import { AsyncPipe, CommonModule, Location } from '@angular/common';
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
import { Router, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { USER_ROLE_ENUM, USER_STATUS_ENUM } from 'src/app/common/enums/user.enum';
import { CaseData, CaseDocumentData } from 'src/app/common/interfaces/case.interface';
import { UserData, UserOrGroup } from 'src/app/common/interfaces/user.interface';
import { MaterialModule } from 'src/app/material.module';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { UserThumbnailComponent } from 'src/app/components/user-thumbnail/user-thumbnail.component';
import { MatInputModule } from '@angular/material/input';
import { FileUploadUiComponent } from '../file-upload-ui/file-upload-ui.component';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime, map, Observable, startWith, switchMap } from 'rxjs';
import { UserFilterPipe } from 'src/app/common/pipes/user-filter.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CASE_MOCK_DATA, USER_MOCK_DATA_ALLOWED, USER_MOCK_DATA_NOT_ALLOWED } from 'src/app/mock/user-mock-data';
import { SweetAlertService } from 'src/app/common/services/sweetAlert2.service';
import { PermittedRoleToEdit } from 'src/app/common/utils/permitted-role-to-edit.util';
import { AuthService } from 'src/app/common/services/auth.service';
import { FullPageLoaderService } from 'src/app/common/services/full-page-loader.service';
import { ComponentApiService } from '../../services/conponent-api.service';
import { COMMON_ERROR_CODES } from 'src/app/common/enums/common-error-codes.enum';
import { Response } from 'src/app/common/interfaces/response.interface';
import { HttpCommonApiModule } from 'src/app/common/modules/http-api.module';
import { ITEM_STATUS } from 'src/app/common/enums/item-status.enum';
import { UserFilterByAccessStatus } from 'src/app/common/pipes/user-filer-by-access-status.pipe';
import { RandomColor } from 'src/app/common/utils/random-lolor.util';

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
    AsyncPipe,
    UserFilterPipe,
    UserFilterByAccessStatus,
    ScrollingModule,
    HttpCommonApiModule],
  templateUrl: './document-access-table-pagination.component.html',
  styleUrl: './document-access-table-pagination.component.scss',
  providers: [ComponentApiService]
})
export class DocumentAccessTablePaginationComponent {
  caseId: string = '';
  isReadOnly: boolean = true;
  isLoading: boolean = true;
  caseData: CaseData;
  myControl = new FormControl<string | CaseData>('');
  filteredOptions: Observable<CaseData[]>;
  selectedCase: CaseData;
  isAdmin: boolean = true;
  tableData: CaseDocumentData[] = [];
  selectData: CaseData[] = [];
  userTableDataAllowed: UserData[] = [];
  userTableDataNotAllowed: UserData[] = [];
  filterText: string = '';
  displayedColumns: string[] = ['select', 'name', 'action'];
  selection = new SelectionModel<CaseDocumentData>(true, []);
  dataSource: MatTableDataSource<CaseDocumentData> = new MatTableDataSource<CaseDocumentData>();
  removeDialogTitle: string = 'Do you want to fremove?';
  messageBodayKey: string = '';
  editRouterLink: string = '';
  caseName = 'CASE_2012_SPE_15_1';
  caseDescription = 'Test description'
  isUpload: boolean = false;
  updatedUserIdMap: Map<string, ITEM_STATUS> = new Map();
  userCurrentMap: Map<string, UserData> = new Map();
  currentSelectedDocumentId: string = '';
  readonly deleteConfirmDialog = inject(MatDialog);
  readonly documentUploadDialog = inject(MatDialog);
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentUserOrGroup = model('');
  readonly usersOrGroups = signal<UserOrGroup[]>([]);
  readonly allUsersOrGroups = signal<UserOrGroup[]>([
    {
      name: 'Dilupa', id: '100WS', isGroup: false, profile_image: 'assets/images/profile/user-1.jpg', email: 'test@gmail.com',
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
    {
      name: 'CASE November 1 -23', id: 'CASE_441_NOV', isGroup: true, profile_image: 'assets/images/profile/user-1.jpg', email: 'test@gmail.com',
      user: null
    },
    {
      name: 'CASE Jan 3 -23', id: 'CASE_201_NOV', isGroup: true, profile_image: 'assets/images/profile/user-1.jpg', email: 'test@gmail.com',
      user: null
    },
    {
      name: 'Randima', id: '102RANWS', isGroup: false, profile_image: 'assets/images/profile/user-1.jpg', email: 'test@gmail.com',
      user: {
        user_id: '3',
        name: 'Randima Senanayake',
        email: 'test@gmail.com',
        role: USER_ROLE_ENUM.USER,
        status: USER_STATUS_ENUM.ACTIVE,
        created_date: '202-10-27',
        profile_image: 'assets/images/profile/user-3.jpg'
      }
    },
    {
      name: 'CASE Mrch 3 -12', id: 'CASE_011_NOV', isGroup: true, profile_image: 'assets/images/profile/user-1.jpg', email: 'test@gmail.com',
      user: null
    },
    {
      name: 'Kasun', id: '100KSWS', isGroup: false, profile_image: 'assets/images/profile/user-1.jpg', email: 'test@gmail.com',
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

  constructor(
    private location: Location,
    private router: Router,
    private alertService: SweetAlertService,
    private authService: AuthService,
    private fullPageLoaderService: FullPageLoaderService,
    private apiService: ComponentApiService) {

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  trackByUserId(index: number, user: any): string {
    return user.user_id; // Use user_id to uniquely identify each item
  }
  ngOnInit(): void {
    // this.selectData = CASE_MOCK_DATA;

    // this.userTableDataAllowed = USER_MOCK_DATA_ALLOWED;
    // this.userTableDataNotAllowed = USER_MOCK_DATA_NOT_ALLOWED;
    this.loadAllUsers();
    this.dataSource = new MatTableDataSource<CaseDocumentData>(this.tableData);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''), // Start with an empty value
      debounceTime(300), // Wait for 300ms after user stops typing
      switchMap((value) => this.searchCases(value as string)) // Call the API with the input value
    );


  }


   // Method to fetch cases from the server
   searchCases(query: string): Observable<any[]> {
    if (!query || query.length < 2) {
      return new Observable((observer) => {
        observer.next([]); // Return empty result for short queries
        observer.complete();
      });
    }
    return this.apiService.getAllCases<Response>(query).pipe(
      map((response: Response) => response.data) // Assuming response has `data` as the array of cases
    );
  }
  loadAllCaseData() {

    if (!this.caseId) {
      this.isLoading = true;
      console.error('User Id is invalid');
      return;
    }
    this.isReadOnly = (!PermittedRoleToEdit.hasCommonEditPermission(this.authService));

    this.fullPageLoaderService.setLoadingStatus(true);

    // Use the API service to send the POST request
    this.apiService.getOneCase<Response>(this.caseId).subscribe(
      {
        next: (response: Response) => {
          console.log('Case fetching successful:', response);
          // this.alertService.successAlert('center', 'User fetching success','', 3000);
          this.caseData = response.data;

          this.tableData = this.caseData.documents;
          this.loadDocumentTableData();
          console.log('this.caseData');
          console.log(this.caseData);
          console.log('this.caseData');
          this.isLoading = false;
        },
        error: (error) => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.error('Case loading failed:', error);
          if (error.error.errorCode === COMMON_ERROR_CODES.NOT_FOUND) {
            this.alertService.errorAlert('center', 'Case not found', error.error.message, 3000, false, '', false);
          } else if (error.error.errorCode === COMMON_ERROR_CODES.ACCESSDENIED) {
            this.alertService.errorAlert('center', `You are not permitted to load this case`, error.error.message, 4000, false, '', false);
          } else {
            this.alertService.errorAlert('center', 'Error while loading case details', '', 3000, false, '', false);
          }
          this.router.navigate(['/document-managemnt/document-upload']);
        },
        complete: () => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.log('Case loading request completed.');
        },
      }
    );

  }

  loadCaseData() {

    if (!this.caseId) {
      this.isLoading = true;
      console.error('User Id is invalid');
      return;
    }
    this.isReadOnly = (!PermittedRoleToEdit.hasCommonEditPermission(this.authService));

    this.fullPageLoaderService.setLoadingStatus(true);

    // Use the API service to send the POST request
    this.apiService.getOneCase<Response>(this.caseId).subscribe(
      {
        next: (response: Response) => {
          console.log('Case fetching successful:', response);
          // this.alertService.successAlert('center', 'User fetching success','', 3000);
          this.caseData = response.data;

          this.tableData = this.caseData.documents;
          this.loadDocumentTableData();
          console.log('this.caseData');
          console.log(this.caseData);
          console.log('this.caseData');
          this.isLoading = false;
        },
        error: (error) => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.error('Case loading failed:', error);
          if (error.error.errorCode === COMMON_ERROR_CODES.NOT_FOUND) {
            this.alertService.errorAlert('center', 'Case not found', error.error.message, 3000, false, '', false);
          } else if (error.error.errorCode === COMMON_ERROR_CODES.ACCESSDENIED) {
            this.alertService.errorAlert('center', `You are not permitted to load this case`, error.error.message, 4000, false, '', false);
          } else {
            this.alertService.errorAlert('center', 'Error while loading case details', '', 3000, false, '', false);
          }
          this.router.navigate(['/document-managemnt/document-upload']);
        },
        complete: () => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.log('Case loading request completed.');
        },
      }
    );

  }

  loadAllUsers() {
    this.isReadOnly = (!PermittedRoleToEdit.hasCommonEditPermission(this.authService));
    this.updatedUserIdMap = new Map();
    this.fullPageLoaderService.setLoadingStatus(true);

    // Use the API service to send the POST request
    this.apiService.getAllUsers<Response>().subscribe(
      {
        next: (response: Response) => {
          console.log('All users fetching successful - Document access:', response);
          this.userTableDataNotAllowed = response.data;
          RandomColor.getConsitantRandomColorPerUser(this.userTableDataNotAllowed, true);
          this.isLoading = false;
        },
        error: (error) => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.error('All user loading failed:', error);
          this.alertService.errorAlert('center', 'Error while loading user details', '', 3000, false, '', false);
        },
        complete: () => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.log('All user details loading request completed.');
        },
      }
    );

  }

  loadAllowedUsers(documentId: string) {

    if (!documentId) {
      this.isLoading = true;
      console.error('Document Id is invalid');
      return;
    }
    this.isReadOnly = (!PermittedRoleToEdit.hasCommonEditPermission(this.authService));
    this.updatedUserIdMap = new Map();
    this.fullPageLoaderService.setLoadingStatus(true);

    // Use the API service to send the POST request
    this.apiService.getAllowedUsersByDocId<Response>(documentId).subscribe(
      {
        next: (response: Response) => {
          console.log('Document access details fetching successful:', response);
          this.userTableDataAllowed = response.data;
          this.userTableDataAllowed.forEach(element => {
            this.updatedUserIdMap.set(element.user_id.toString(), ITEM_STATUS.CURRENT);
            this.userCurrentMap.set(element.user_id, element);
          });
          RandomColor.getConsitantRandomColorPerUser(this.userTableDataAllowed, true);
          console.log('documentId');
          console.log(documentId);
          console.log('documentId');
          this.isLoading = false;
        },
        error: (error) => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.error('Document access details loading failed:', error);
          if (error.error.errorCode === COMMON_ERROR_CODES.NOT_FOUND) {
            this.alertService.errorAlert('center', 'Document ID not found', error.error.message, 3000, false, '', false);
          } else if (error.error.errorCode === COMMON_ERROR_CODES.ACCESSDENIED) {
            this.alertService.errorAlert('center', `You are not permitted to use document access details`, error.error.message, 4000, false, '', false);
          } else {
            this.alertService.errorAlert('center', 'Error while document access details', '', 3000, false, '', false);
          }
          this.updatedUserIdMap = new Map();
          this.userCurrentMap = new Map();
          this.router.navigate(['/document-managemnt/document-upload']);
        },
        complete: () => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.log('Document access details loading request completed.');
        },
      }
    );

  }

  loadDocumentTableData() {
    this.dataSource = new MatTableDataSource<CaseDocumentData>(this.tableData);
    this.dataSource.paginator = this.paginator;
  }


  // Event handler when the user selects a row
  onRowSelectionChange(event: any, row: any) {
    console.log('Selected Row:', row);
    this.loadAllowedUsers(row.document_id);
    this.currentSelectedDocumentId = row.document_id;
      // You can perform other operations like fetching more details about the selected row
  }



  onOptionSelected(eventData: any){
    console.log(eventData.option.value);
    this.selectedCase = eventData.option.value;
    this.caseId = this.selectedCase.id;
    this.loadCaseData();
  }
  onToggleChange() {

  }
  backToCase() {
    this.isUpload = false;
  }

  clickBack(){
    this.location.back();
  }

  removeAccessWarn(eventData: any) {
    console.log(eventData);
    this.alertService.confirmAlert("Are you sure?", `Removing access for this user: ${eventData.name}`, "warning", true, "No", true, "Yes, Proceed", false, this.removeUserFromAllowedList.bind(this,eventData))
  }

  giveAccessWarn(eventData: any) {
    console.log(eventData);
    this.alertService.confirmAlert("Are you sure?", `Enabling access for this user: ${eventData.name}`, "warning", true, "No", true, "Yes, Proceed", false, this.addUserToAllowedMap.bind(this,eventData))
  }

  addUserToAllowedMap(user: UserData){
    const userId = user.user_id.toString();
    if(this.updatedUserIdMap.has(userId) && this.updatedUserIdMap.get(userId) === ITEM_STATUS.CURRENT){
      return;
    }
    if(this.userCurrentMap.has(userId)){
      this.updatedUserIdMap.set(userId, ITEM_STATUS.CURRENT);
    }
    if(!this.updatedUserIdMap.has(userId)){
      this.updatedUserIdMap.set(userId, ITEM_STATUS.NEW);
    }
    this.updateUserDocumentAccess();
  }

  removeUserFromAllowedList(user: UserData){
    const userId = user.user_id.toString();
    if((!this.updatedUserIdMap.has(userId)) || this.updatedUserIdMap.get(userId) === ITEM_STATUS.REMOVED){
      return;
    }
    if(this.updatedUserIdMap.has(userId)){
      if(this.updatedUserIdMap.get(userId) === ITEM_STATUS.NEW){
        this.updatedUserIdMap.delete(userId);
      }else{
      this.updatedUserIdMap.set(userId, ITEM_STATUS.REMOVED);
    }
    }
    this.updateUserDocumentAccess();
  }

  updateUserDocumentAccess(): void{
    this.fullPageLoaderService.setLoadingStatus(true);
    const selectedDocumentId = this.currentSelectedDocumentId;
    const userList: string[] = Array.from(this.updatedUserIdMap.entries())
    .filter(([key, value]) => value !== ITEM_STATUS.REMOVED) // Filter out 'active' values
    .map(([key]) => key.toString()); // Convert keys to strings

    // Use the API service to send the POST request
    this.apiService.updateDocumentAccess<Response>(userList,selectedDocumentId).subscribe(
      {
        next: (response: Response) => {
          console.log('Document access modification successfull:', response);
          this.alertService.successToster('top-end', 'The document access settings have been updated successfully', 5000);
          this.isLoading = false;
        },
        error: (error) => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.error('Document access modification  failed:', error);
          if (error.error.errorCode === COMMON_ERROR_CODES.NOT_FOUND) {
            this.alertService.errorAlert('center', 'Document not found', error.error.message, 3000, false, '', false);
          } else if (error.error.errorCode === COMMON_ERROR_CODES.ACCESSDENIED) {
            this.alertService.errorAlert('center', `You are not permitted to update the document access`, error.error.message, 4000, false, '', false);
          } else {
            this.alertService.errorAlert('center', 'Error while updating document access', '', 3000, false, '', false);
          }
        },
        complete: () => {
          this.fullPageLoaderService.setLoadingStatus(false);
          this.loadAllCaseData();
          console.log('Document access modification request completed.');
        },
      }
    );
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

  openFileUploadDialog(): void {

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


  deleteConfirmation(documentName:string){
    this.alertService.confirmAlert("Are you sure?",`Do you want to remove this document?  ID: ${documentName}?`,"warning",true,"No",true,"Yes, Proceed",true,this.removeDocumentCascade.bind(this));
  }

  removeDocumentCascade() {
    this.isReadOnly = (!PermittedRoleToEdit.hasCommonEditPermission(this.authService));
    if (!this.currentSelectedDocumentId && (!this.isAdmin) && this.isReadOnly && (!this.isLoading)) {
      // Ensure form is valid before submission
      console.error('Cannot preceed to remove document');
      return;
    }

    this.fullPageLoaderService.setLoadingStatus(true);

    // Use the API service to send the POST request
    this.apiService.removeDocumentCasecade<Response>(this.currentSelectedDocumentId).subscribe(
      {
        next: (response: Response) => {
          console.log('Document casecade deleation successful:', response);
          this.alertService.successAlert('center', 'Document removed successfully','', 3000);
          this.loadCaseData();
          this.loadAllUsers();
        },
        error: (error) => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.error('Document casecade deleation failed:', error);
          if(error.error.errorCode === COMMON_ERROR_CODES.NOT_FOUND){
            this.alertService.errorAlert('center', 'Failed to remove the Document', error.error.message, 3000, false, '', false);
          }else if(error.error.errorCode === COMMON_ERROR_CODES.ACCESSDENIED){
            this.alertService.errorAlert('center', 'Failed to remove the Document', error.error.message, 3000, false, '', false);
          }else{
            this.alertService.errorAlert('center', 'Failed to remove the Document', '', 3000, false, '', false);
          }


        },
        complete: () => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.log('Document casecade deleation request completed.');
        },
      }
    );
  }
}
