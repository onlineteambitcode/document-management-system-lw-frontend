import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, inject, Input, model, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import { FileUploadUiComponent } from '../file-upload-ui/file-upload-ui.component';
import { DeleteConfirmComponent } from 'src/app/components/modal/delete-confirm/delete-confirm.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SweetAlertService } from 'src/app/common/services/sweetAlert2.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { FullPageLoaderService } from 'src/app/common/services/full-page-loader.service';
import { COMMON_ERROR_CODES } from 'src/app/common/enums/common-error-codes.enum';
import { ComponentApiService } from '../../services/conponent-api.service';
import { Response } from 'src/app/common/interfaces/response.interface';
import { PermittedRoleToEdit } from 'src/app/common/utils/permitted-role-to-edit.util';
import { HttpCommonApiModule } from 'src/app/common/modules/http-api.module';
import { MAT_EXPANSION_PANEL_DEFAULT_OPTIONS, MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-single-case-table-pagination',
  standalone: true,
  imports: [MatTableModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
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
    FileUploadUiComponent,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    HttpCommonApiModule,
    MatExpansionModule,
],
  templateUrl: './single-case-table-pagination.component.html',
  styleUrl: './single-case-table-pagination.component.scss',
  providers: [ComponentApiService, AuthService,
    {
      provide: MAT_EXPANSION_PANEL_DEFAULT_OPTIONS,
      useValue: {
        expandedHeight: '48px', // Optional: Customize panel height when expanded
        collapsedHeight: '48px', // Optional: Customize panel height when collapsed
        animationDuration: '225ms cubic-bezier(0.4,0.0,0.2,1)' // Custom animation timing
      }
    }
  ]
})
export class SingleCaseTablePaginationComponent {
  isAdmin: boolean = false; 
  caseId: string = '';
  isCaseCreation: boolean = false;
  isReadOnly: boolean = true;
  isLoading: boolean = true;
  documentTableData: CaseDocumentData[] = [];
  userTableData: UserData[] = [];
  displayedColumns: string[]  = ['select','document_name', 'action'];
  selection = new SelectionModel<CaseDocumentData>(true, []);
  enableDownloadSelected: boolean = false;
  dataSource: MatTableDataSource<CaseDocumentData> = new MatTableDataSource<CaseDocumentData>();
  removeDialogTitle:string = 'Do you want to remove?';
  messageBodayKey:string = '';
  editRouterLink:string = '';
  caseName = 'CASE_2012_SPE_15_1';
  caseDescription='Test description'
  isUpload: boolean = false;
  form: FormGroup;
  caseData: CaseData;
  selectedFilesList: string[] = [];
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
  private http = inject(HttpClient); // Inject HttpClient
  @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private alertService: SweetAlertService,
        private apiService: ComponentApiService,
        private authService: AuthService,
        private fullPageLoaderService: FullPageLoaderService){
      this.form = new FormGroup(
            {
              case_id: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
              ]),
              description: new FormControl('', [
                Validators.maxLength(300),
              ]),
            }
          );
    }

  get f() {
      return this.form.controls;
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.isAdmin = this.authService.hasRole(USER_ROLE_ENUM.ADMIN);
    this.activatedRoute.queryParams.subscribe((params) => {
      this.caseId = params['id'];
      this.loadCaseData();
    });

      this.userTableData = [
        {
          user_id: '1',
          name: 'Dilupa Marasinghe',
          email: 'test@gmail.com',
          role: USER_ROLE_ENUM.ADMIN,
          status: USER_STATUS_ENUM.ACTIVE,
          created_date: '202-10-27',
          profile_image: 'assets/images/profile/user-1.jpg',
          mobileNumber: '+94712390348'
        },
        {
          user_id: '2',
          name: 'Asith siriwardhana',
          email: 'test@gmail.com',
          role: USER_ROLE_ENUM.USER,
          status: USER_STATUS_ENUM.ACTIVE,
          created_date: '202-10-27',
          profile_image: 'assets/images/profile/user-2.jpg',
          mobileNumber: '+94712390348'
        },
        {
          user_id: '3',
          name: 'Kasun janaka',
          email: 'test@gmail.com',
          role: USER_ROLE_ENUM.USER,
          status: USER_STATUS_ENUM.ACTIVE,
          created_date: '202-10-27',
          profile_image: 'assets/images/profile/user-3.jpg',
          mobileNumber: '+94712390348'
        },
        {
          user_id: '4',
          name: 'Herath P.L.G',
          email: 'test@gmail.com',
          role: USER_ROLE_ENUM.USER,
          status: USER_STATUS_ENUM.ACTIVE,
          created_date: '202-10-27',
          profile_image: 'assets/images/profile/user-4.jpg',
          mobileNumber: '+94712390348'
        },
        {
          user_id: '5',
          name: 'K.S.C.Janith',
          email: 'test@gmail.com',
          role: USER_ROLE_ENUM.USER,
          status: USER_STATUS_ENUM.DEACTIVE,
          created_date: '202-10-27',
          profile_image: 'assets/images/profile/user-5.jpg',
          mobileNumber: '+94712390348'
        },
        {
          user_id: '6',
          name: 'Kamal Senath',
          email: 'test@gmail.com',
          role: USER_ROLE_ENUM.USER,
          status: USER_STATUS_ENUM.ACTIVE,
          created_date: '202-10-27',
          profile_image: 'assets/images/profile/user-6.jpg',
          mobileNumber: '+94712390348'
        },
        {
          user_id: '7',
          name: 'Lal Guruge',
          email: 'test@gmail.com',
          role: USER_ROLE_ENUM.USER,
          status: USER_STATUS_ENUM.ACTIVE,
          created_date: '202-10-27',
          profile_image: 'assets/images/profile/user-7.jpg',
          mobileNumber: '+94712390348'
        },
        {
          user_id: '8',
          name: 'Sahan H.L.R',
          email: 'test@gmail.com',
          role: USER_ROLE_ENUM.USER,
          status: USER_STATUS_ENUM.ACTIVE,
          created_date: '202-10-27',
          profile_image: 'assets/images/profile/user-8.jpg',
          mobileNumber: '+94712390348'
        },
      ];
  }
  onToggleChange(){
    
  }
  backToCase(){
    this.isUpload = false;
  }
  handleBackToCaseDetailsEvent(event: boolean){
    if(event){
      this.isUpload = false;
      this.loadCaseData();
    }
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

docwnloadSelected(){
  if(this.selection.selected.length === 1){
    return;
  }else if(this.selection.selected.length > 1){
    console.log(this.selection.selected);
    this.sendBatchDownloadRequest();
  }else{
    this.alertService.errorToaster('top-end',"Please select documents to download");
  }

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


private updateFilteredData(): void {
  this.filteredUsersOrGroups();
}

handleBackspace(): void {
  if (!this.currentUserOrGroup()) {
    const selectedItems = this.usersOrGroups();
    if (selectedItems.length > 0) {
      const lastFruit = selectedItems[selectedItems.length - 1];
      // this.remove(lastFruit);
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

  sendBatchDownloadRequest() {
    // Send POST request to the batch download API with pipe and catchError
    this.selectedFilesList = [];
    this.selectedFilesList = this.selection.selected.map(elementData=>{
      return elementData.file_url
    });

    this.fullPageLoaderService.setLoadingStatus(true);
    this.apiService.fileBatchDownload<Blob>(this.caseId, this.selectedFilesList)
    .pipe(
      catchError(error => {
        console.error('Error during file download:', error);
        this.fullPageLoaderService.setLoadingStatus(false);
        this.alertService.errorToaster('top-end',"An error occurred. Please try again later.");
        // Handle the error: you can throw the error again or return an empty observable, depending on how you want to handle it
        throw error;  // Re-throw the error for downstream subscribers
      })
    )
    .subscribe({
      next: (response: Blob) => {
        // Handle successful response (e.g., trigger download)
        this.fullPageLoaderService.setLoadingStatus(false);
        this.alertService.successToster('center',"Your download will begin now.",3000);
        this.downloadFile(response);
      },
      error: (error) => {
        // Handle the error if the observable throws (after catchError)
        this.fullPageLoaderService.setLoadingStatus(false);
        this.alertService.errorToaster('top-end',"An error occurred. Please try again later.");
        console.error('Error in subscription:', error);
      },
      complete: () => {
        this.fullPageLoaderService.setLoadingStatus(false);
        console.log('Batch download request completed.');
      }
    });
  }

  downloadFile(response: Blob) {
    // Create a link element to trigger the file download
    const blob = new Blob([response], { type: 'application/zip' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'batch-files.zip'; // Default file name for the downloaded ZIP
    a.click();
    window.URL.revokeObjectURL(url);
  }

  deleteConfirmation(){
    this.alertService.confirmAlert("Are you sure?",`Do you want to remove this Case?  ID: ${this.caseData.case_id}?`,"warning",true,"No",true,"Yes, Proceed",true,this.removeCase.bind(this));
  }

  clickCreateCase(){
    // if(this.isReadOnly){
    //   return;
    // }
    const caseId = this.form.value.case_id;
    this.alertService.confirmAlert("Are you sure?",`Do you want to create this user with Case ID: ${caseId}`,"warning",true,"No",true,"Yes, Proceed",false,this.submit.bind(this));
  }

    submit() {
      if (this.form.invalid) {
        // Ensure form is valid before submission
        console.error('Form is invalid');
        return;
      }
  
      this.fullPageLoaderService.setLoadingStatus(true);
  
      // Prepare the request body from the form data
      const requestBody = {
        case_id: this.form.value.case_id,
        description: this.form.value.description
      };
  
      // Use the API service to send the POST request
      this.apiService.createNewCase<Response>(requestBody).subscribe(
        {
          next: (response: Response) => {
            const params = { id: response.data.id };
            console.log('Case creation successful:', response);
            this.alertService.successAlert('center', 'Case creation success','', 3000);
            this.router.navigate(['/document-managemnt/single-case'], { queryParams: params });
            // this.loadCaseData();
          },
          error: (error) => {
            this.fullPageLoaderService.setLoadingStatus(false);
            console.error('Registration failed:', error);
            if(error.error.errorCode === COMMON_ERROR_CODES.ALREADY_EXIST){
              this.alertService.errorAlert('center', 'Case creation failed', error.error.message, 3000, false, '', false);
            }else if(error.error.errorCode === COMMON_ERROR_CODES.ACCESSDENIED){
              this.alertService.errorAlert('center', 'Case creation failed', error.error.message, 3000, false, '', false);
            }else{
              this.alertService.errorAlert('center', 'Case creation failed', '', 3000, false, '', false);
            }
  
  
          },
          complete: () => {
            this.fullPageLoaderService.setLoadingStatus(false);
            console.log('Case creation request completed.');
          },
        }
      );
    }

    removeCase() {
      if (this.form.invalid && (!this.isCaseCreation) && (!this.isReadOnly)) {
        // Ensure form is valid before submission
        console.error('Form is invalid');
        return;
      }
  
      this.fullPageLoaderService.setLoadingStatus(true);
  
      // Use the API service to send the POST request
      this.apiService.removeCase<Response>(this.caseId).subscribe(
        {
          next: (response: Response) => {
            console.log('Case deleation successful:', response);
            this.alertService.successAlert('center', 'Case removed successfully','', 3000);
            this.router.navigate(['/document-managemnt/document-upload']);
          },
          error: (error) => {
            this.fullPageLoaderService.setLoadingStatus(false);
            console.error('Registration failed:', error);
            if(error.error.errorCode === COMMON_ERROR_CODES.NOT_FOUND){
              this.alertService.errorAlert('center', 'Failed to remove the Case', error.error.message, 3000, false, '', false);
            }else if(error.error.errorCode === COMMON_ERROR_CODES.ACCESSDENIED){
              this.alertService.errorAlert('center', 'Failed to remove the Case', error.error.message, 3000, false, '', false);
            }else{
              this.alertService.errorAlert('center', 'Failed to remove the Case', '', 3000, false, '', false);
            }
  
  
          },
          complete: () => {
            this.fullPageLoaderService.setLoadingStatus(false);
            console.log('Case creation request completed.');
          },
        }
      );
    }

    loadCaseData(){
      
          if (!this.caseId) {
            this.isLoading = true;
            // Ensure form is valid before submission
            this.isCaseCreation = true;
            console.error('User Id is invalid');
            return;
          }
          this.isReadOnly = (!PermittedRoleToEdit.hasCommonEditPermission(this.authService));
          this.isCaseCreation = false;
      
          this.fullPageLoaderService.setLoadingStatus(true);
      
          // Use the API service to send the POST request
          this.apiService.getOneCase<Response>(this.caseId).subscribe(
            {
              next: (response: Response) => {
                console.log('Case fetching successful:', response);
                // this.alertService.successAlert('center', 'User fetching success','', 3000);
                this.caseData = response.data;
                this.form.patchValue(this.caseData);
                if(this.isReadOnly){
                  this.form.disable();
                }
                this.documentTableData = this.caseData.documents;
                this.dataSource = new MatTableDataSource<CaseDocumentData>(this.documentTableData);
                console.log('this.caseData');
                console.log(this.caseData);
                console.log('this.caseData');
                this.isLoading = false;
              },
              error: (error) => {
                this.fullPageLoaderService.setLoadingStatus(false);
                console.error('Case loading failed:', error);
                if(error.error.errorCode === COMMON_ERROR_CODES.NOT_FOUND){
                  this.alertService.errorAlert('center', 'Case not found', error.error.message, 3000, false, '', false);
                }else if(error.error.errorCode === COMMON_ERROR_CODES.ACCESSDENIED){
                  this.alertService.errorAlert('center', `You are not permitted to load this case`, error.error.message, 4000, false, '', false);
                }else{
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

    // mapAndLoadDocuments(documents: any[]){
      
    //   this.documentTableData = [];

    //   documents.forEach(element => {
    //     const mappedElement: CaseDocumentData = {
          
    //     };
    //   });
    // }
}
