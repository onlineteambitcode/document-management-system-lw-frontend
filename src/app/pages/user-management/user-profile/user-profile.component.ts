import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { FullPageLoaderService } from 'src/app/common/services/full-page-loader.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { SweetAlertService } from 'src/app/common/services/sweetAlert2.service';
import { FromUtil } from '../../authentication/utils/form.util';
import { ComponentApiService } from '../services/componentApi.service';
import { CommonModule } from '@angular/common';
import { Response } from 'src/app/common/interfaces/response.interface';
import { COMMON_ERROR_CODES } from 'src/app/common/enums/common-error-codes.enum';
import { MaterialModule } from 'src/app/material.module';
import { HttpCommonApiModule } from 'src/app/common/modules/http-api.module';
import { UserData } from 'src/app/common/interfaces/user.interface';

interface ISelectKeyValue {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MaterialModule,
    HttpCommonApiModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  providers: [ComponentApiService]
})
export class UserProfileComponent {
  userId:string = '';
  isUserProfile = false;
  hideConfirmPassword: boolean = true;
  hidePassword: boolean = true;
  role: ISelectKeyValue[] = [
    { value: 'ADMIN', viewValue: 'Admin' },
    { value: 'USER', viewValue: 'User' },
  ];

  selectedRole = this.role[1].value;
  form: FormGroup;
  userData: UserData;
  constructor(
    private route: ActivatedRoute,
    private alertService: SweetAlertService,
    private apiService: ComponentApiService,
    private storageService: StorageService,
    private fullPageLoaderService: FullPageLoaderService) {
    this.form = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
        role: new FormControl('USER', [Validators.required]), // Added Role field
        email: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
        mobileNumber: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{9}$/), // Matches a 9-digit Sri Lankan mobile number
        ]),
        new_password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/), // At least 1 uppercase, 1 number
        ]),
        confirm_password: new FormControl('', [Validators.required]),
      },
      { validators: FromUtil.passwordMatchValidator }
    );
  }
  ngOnInit() {
    // Subscribe to query parameters
    this.route.queryParams.subscribe((params) => {
      this.userId = params['id'];
      this.loadUserData();
    });
  }

  get f() {
    return this.form.controls;
  }

  clickCreateUser(){
    const role = this.form.value.role;
    this.alertService.confirmAlert("Are you sure?",`Do you want to create this user with role: ${role}?`,"warning",true,"No",true,"Yes, Proceed",this.submit.bind(this))
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
      name: this.form.value.name,
      email: this.form.value.email,
      userRole: this.form.value.role,
      mobileNumber: `+94${this.form.value.mobileNumber}`,
      password: this.form.value.new_password,
    };

    // Use the API service to send the POST request
    this.apiService.createNewUser<Response>(requestBody).subscribe(
      {
        next: (response: Response) => {
          console.log('User creation successful:', response);
          this.alertService.successAlert('center', 'User creation success','', 3000);
        },
        error: (error) => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.error('Registration failed:', error);
          if(error.error.errorCode === COMMON_ERROR_CODES.ALREADY_EXIST){
            this.alertService.errorAlert('center', 'User creation failed', error.error.message, 3000, false, '', false);
          }else if(error.error.errorCode === COMMON_ERROR_CODES.ACCESSDENIED){
            this.alertService.errorAlert('center', 'User creation failed', error.error.message, 3000, false, '', false);
          }else{
            this.alertService.errorAlert('center', 'User creation failed', '', 3000, false, '', false);
          }


        },
        complete: () => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.log('Registration request completed.');
        },
      }
    );
  }

  loadUserData() {
    if (!this.userId) {
      // Ensure form is valid before submission
      this.isUserProfile = false;
      console.error('User Id is invalid');
      return;
    }
    this.isUserProfile = true;

    this.fullPageLoaderService.setLoadingStatus(true);

    // Use the API service to send the POST request
    this.apiService.getOneUser<Response>(this.userId).subscribe(
      {
        next: (response: Response) => {
          console.log('User fetching successful:', response);
          // this.alertService.successAlert('center', 'User fetching success','', 3000);
          this.userData = response.data;
          this.userData.mobileNumber = this.userData.mobileNumber.replace("+94","");
          this.form.patchValue(this.userData);
          console.log('this.userData');
          console.log(this.userData);
          console.log('this.userData');
        },
        error: (error) => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.error('User loading failed:', error);
          if(error.error.errorCode === COMMON_ERROR_CODES.NOT_FOUND){
            this.alertService.errorAlert('center', 'User not found', error.error.message, 3000, false, '', false);
          }else if(error.error.errorCode === COMMON_ERROR_CODES.ACCESSDENIED){
            this.alertService.errorAlert('center', 'You are not permitted to load other accounts', error.error.message, 4000, false, '', false);
          }else{
            this.alertService.errorAlert('center', 'Error while loading profile data', '', 3000, false, '', false);
          }
        },
        complete: () => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.log('User loading request completed.');
        },
      }
    );
  }

  showHideConfirmPassword(){
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  showHidePassword(){
    this.hidePassword = !this.hidePassword;
  }
}
