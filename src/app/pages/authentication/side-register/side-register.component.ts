import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { HttpCommonApiModule } from 'src/app/common/modules/http-api.module';
import { HttpClientApiService } from 'src/app/common/services/http-client-api.service';
import { SweetAlertService } from 'src/app/common/services/sweetAlert2.service';
import { OtpComponent } from '../otp/otp.component';
import { ComponentApiService } from '../services/componentApi.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { Response } from 'src/app/common/interfaces/response.interface';
import { FullPageLoaderService } from 'src/app/common/services/full-page-loader.service';
import { OTP_TYPE } from 'src/app/common/enums/otp-type.enum';
import { COMMON_ERROR_CODES } from 'src/app/common/enums/common-error-codes.enum';
import { FromUtil } from '../utils/form.util';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpCommonApiModule,
    OtpComponent
  ],
  templateUrl: './side-register.component.html',
  providers: [ComponentApiService]
})
export class AppSideRegisterComponent {
  hideConfirmPassword: boolean = true;
  hidePassword: boolean = true;
  isRegisterEnable: boolean = true;
  isOtpEnable: boolean = false;
  form: FormGroup;
  otpType: OTP_TYPE = OTP_TYPE.REGISTER_OTP_PENDING;
  constructor(
    private router: Router,
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
        email: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
        mobileNumber: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{9}$/), // Matches a 9-digit Sri Lankan mobile number
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/), // At least 1 uppercase, 1 number
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: FromUtil.passwordMatchValidator }
    );
  }



  get f() {
    return this.form.controls;
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
      mobileNumber: `+94${this.form.value.mobileNumber}`,
      password: this.form.value.password,
    };

    // Use the API service to send the POST request
    this.apiService.registerUser<Response>(requestBody).subscribe(
      {
        next: (response: Response) => {
          console.log('Registration successful:', response);
          this.isOtpEnable = true;
          this.isRegisterEnable = false;
          this.alertService.successToster('top-end', 'OTP verification sent to your mobile', 5000);
          this.storageService.setItem('user',response.data.user_id)
          // Add success message or redirect here
        },
        error: (error) => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.error('Registration failed:', error);
          if(error.error.errorCode === COMMON_ERROR_CODES.ALREADY_EXIST){
            this.alertService.confirmAlert("Hay we know you!","You have registered befor with this email",'info',true,"No",true,"Try SignIn",false,this.calbackForPendingRegisterOtpVerification.bind(this));
          }else{
          this.alertService.errorAlert('center', 'Registration failed', '',3000,false,'',false);
          }

        },
        complete: () => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.log('Registration request completed.');
        },
      }
    );
  }

  calbackForPendingRegisterOtpVerification(){
    this.router.navigate(["/authentication/login"])
  }

  showHideConfirmPassword(){
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  showHidePassword(){
    this.hidePassword = !this.hidePassword;
  }
}
