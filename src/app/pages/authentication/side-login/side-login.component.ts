import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { OtpComponent } from '../otp/otp.component';
import { CommonModule } from '@angular/common';
import { SweetAlertService } from 'src/app/common/services/sweetAlert2.service';
import { ComponentApiService } from '../services/componentApi.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { FullPageLoaderService } from 'src/app/common/services/full-page-loader.service';
import { Response } from 'src/app/common/interfaces/response.interface';
import { OTP_TYPE } from 'src/app/common/enums/otp-type.enum';
import { ErrorSweetAlertData } from 'src/app/common/interfaces/errorSweetAlertData';
import { LoginAndRegisterErrorHandlerUtil } from '../utils/loginAndRegisterErrorHandle'; // Adjust the path as needed
import { USER_STATUS_ENUM } from 'src/app/common/enums/user.enum';
import { OtpEvent } from 'src/app/common/interfaces/otp-event.interface';
import { PasswordResetComponent } from '../password-reset/password-reset.component';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    OtpComponent,
    PasswordResetComponent
  ],
  providers: [ComponentApiService],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  otpType: OTP_TYPE = OTP_TYPE.LOGIN_OTP_PENDING;
  isLoginEnable:boolean = true;
  isOtpEnable:boolean = false;
  isResetPasswordEnable: boolean = false;
  isFrogetPasswordEnable:boolean = false;
  constructor(
    private router: Router,
    private alertService: SweetAlertService,
    private apiService: ComponentApiService,
    private storageService: StorageService,
    private fullPageLoaderService: FullPageLoaderService) {
      this.form = new FormGroup(
        {
          uname: new FormControl('', [
            Validators.required,
            Validators.email,
          ]),
          password: new FormControl('', [
            Validators.required,
          ]),
        }
      );
    }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  formPasswordReset = new FormGroup({
    uname: new FormControl('', [
      Validators.required,
      Validators.email,
    ])
  });
  get f() {
    return this.form.controls;
  }

  get fReset() {
    return this.formPasswordReset.controls;
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
      email: this.form.value.uname,
      password: this.form.value.password,
    };

     // Use the API service to send the POST request
        this.apiService.loginUser<Response>(requestBody).subscribe(
          {
            next: (response: Response) => {
              console.log('Login successful and OTP verification pending:', response);
              this.isOtpEnable = true;
              this.isLoginEnable = false;
              this.alertService.successToster('top-end', 'OTP verification sent to your mobile', 5000);
              this.storageService.setItem('user',response.data.user_id);
              // Add success message or redirect here
            },
            error: (error) => {
              this.fullPageLoaderService.setLoadingStatus(false);
              console.error('Login failed:', error);
              if(error && error.error && error.error.erroroCode){
                let errorData: ErrorSweetAlertData = LoginAndRegisterErrorHandlerUtil.handleErrorAndGetAlertData(error.error);
                if(error.error.erroroCode === USER_STATUS_ENUM.REGISTRATION_OTP_VERIFICATION_PENDING){
                  this.otpType = OTP_TYPE.REGISTER_OTP_PENDING;
                  this.alertService.confirmAlert(errorData.title,errorData.text, 'warning', errorData.showCancelButton,"No",errorData.showConfirmButton,errorData.confirmButtonText, this.calbackForPendingRegisterOtpVerification.bind(this,''));
                  this.storageService.setItem('user',error.error.data)
                }else{
                  this.alertService.errorAlert('center',errorData.title, errorData.text, errorData.timer, errorData.showCancelButton, errorData.confirmButtonText, errorData.showConfirmButton);

                }
              }else{
                this.alertService.errorAlert('center','Login failed', ((error?.error?.message) ? error.error.message :  ''), 4000, false,'', false);
              }
              // Handle error scenarios here
            },
            complete: () => {
              this.fullPageLoaderService.setLoadingStatus(false);
              console.log('Login request completed.');
            },
          }
        );
  }

  passwordResetFlow(){
    if(!this.formPasswordReset.controls['uname'].valid){
      this.alertService.errorToaster('top-end',"Please enter valid email address");
      return;
    }
    
    this.otpType = OTP_TYPE.FORGET_PASSWORD_OTP_PENDING;

    this.fullPageLoaderService.setLoadingStatus(true);

    // Prepare the request body from the form data
    const requestBody = {
      email: this.formPasswordReset.value.uname
    };

     // Use the API service to send the POST request
        this.apiService.passwordResetOtp<Response>(requestBody).subscribe(
          {
            next: (response: Response) => {
              console.log('Password reset successful and OTP verification pending:', response);
              this.alertService.successToster('top-end', 'OTP verification sent to your mobile', 5000);
              this.storageService.setItem('user',response.data.user_id)
              this.isOtpEnable = true;
              this.isLoginEnable = false;
              this.isResetPasswordEnable= false;
              // Add success message or redirect here
            },
            error: (error) => {
              this.fullPageLoaderService.setLoadingStatus(false);
              console.error('Password resetn failed:', error);
              if(error && error.error && error.error.erroroCode){
                let errorData: ErrorSweetAlertData = LoginAndRegisterErrorHandlerUtil.handleErrorAndGetAlertData(error.error);
                if(error.error.erroroCode === USER_STATUS_ENUM.REGISTRATION_OTP_VERIFICATION_PENDING){
                  this.alertService.confirmAlert(errorData.title,errorData.text, 'warning', errorData.showCancelButton,"No",errorData.showConfirmButton,errorData.confirmButtonText, this.calbackForPendingRegisterOtpVerification.bind(this, error.error.data));
                  this.storageService.setItem('user',error.error.data)
                }else{
                  this.alertService.errorAlert('center',errorData.title, errorData.text, errorData.timer, errorData.showCancelButton, errorData.confirmButtonText, errorData.showConfirmButton);

                }
              }else{
                this.alertService.errorAlert('center','Password reset failed', ((error?.error?.message) ? error.error.message :  ''), 4000, false,'', false);
              }
              // Handle error scenarios here
            },
            complete: () => {
              this.fullPageLoaderService.setLoadingStatus(false);
              console.log('Password reset request completed.');
            },
          }
        );

  }

  calbackForPendingRegisterOtpVerification(userId: string){

    if(!this.formPasswordReset.controls['uname'].valid){
      this.alertService.errorToaster('top-end',"Please enter valid email address");
      return;
    }
    
    this.otpType = OTP_TYPE.REGISTER_OTP_PENDING;

    this.fullPageLoaderService.setLoadingStatus(true);

    // Prepare the request body from the form data
    const requestBody = {
      email:this.formPasswordReset.value.uname,
      user_id: userId,
      otp_type: this.otpType
    };

     // Use the API service to send the POST request
        this.apiService.resendOtp<Response>(requestBody).subscribe(
          {
            next: (response: Response) => {
              console.log('Register OTP verification pending:', response);
              this.alertService.successToster('top-end', 'OTP verification sent to your mobile', 5000);
              this.storageService.setItem('user',response.data.user_id);
              this.isOtpEnable = true;
              this.isLoginEnable = false;
              this.isResetPasswordEnable= false;
              this.isFrogetPasswordEnable= false;
            },
            error: (error) => {
              this.fullPageLoaderService.setLoadingStatus(false);
              console.error('Register OTP sending failed:', error);
              if(error && error.error && error.error.erroroCode){
                let errorData: ErrorSweetAlertData = LoginAndRegisterErrorHandlerUtil.handleErrorAndGetAlertData(error.error);
                this.alertService.errorAlert('center',errorData.title, errorData.text, errorData.timer, errorData.showCancelButton, errorData.confirmButtonText, errorData.showConfirmButton);
              }else{
                this.alertService.errorAlert('center','OTP sending failed', ((error?.error?.message) ? error.error.message :  ''), 4000, false,'', false);
              }
              // Handle error scenarios here
            },
            complete: () => {
              this.fullPageLoaderService.setLoadingStatus(false);
              console.log('Register OTP request completed.');
            },
          }
        );
  }

  navigateToForgotPassword(){
    this.isFrogetPasswordEnable = false;
    this.isOtpEnable = false;
    this.isLoginEnable = false;
    this.isResetPasswordEnable = true;
  }

  onOtpVerifyEvent(eventData: OtpEvent){
    console.log(eventData);
    if(this.otpType === OTP_TYPE.LOGIN_OTP_PENDING){
      this.navigateToHome();
    }else{
      this.isFrogetPasswordEnable = false;
      this.isOtpEnable = false;
      this.isLoginEnable = false;
      this.isResetPasswordEnable = true;
    }
    
  }

  onPasswordRestOutputEvent(eventData: boolean){
    console.log(eventData);
    if(eventData){
      this.backToLogin();
    }
  }

  backToLogin(){
    this.isFrogetPasswordEnable = false;
    this.isOtpEnable = false;
    this.isLoginEnable = true;
    this.isResetPasswordEnable = false;
  }

  navigateToRegister(){
    this.router.navigate(["/authentication/register"]);
  }

  navigateToHome(){
    this.router.navigate(["/dashboard"]);
  }
}
