import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { NgOtpInputModule } from 'ng-otp-input';
import { MaterialModule } from 'src/app/material.module';
import { ComponentApiService } from '../services/componentApi.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { SweetAlertService } from 'src/app/common/services/sweetAlert2.service';
import { OTP_TYPE } from 'src/app/common/enums/otp-type.enum';
import { FullPageLoaderService } from 'src/app/common/services/full-page-loader.service';
import { CountdownModule } from 'ngx-countdown';
import { OtpEvent } from 'src/app/common/interfaces/otp-event.interface';
import { Response } from 'src/app/common/interfaces/response.interface';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [
    NgOtpInputModule,
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    CountdownModule
  ],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
  providers: [ComponentApiService]
})
export class OtpComponent {
  @Input() otpType: OTP_TYPE;
  @Output() otpVerifyEvent = new EventEmitter<OtpEvent>();

  otpCode: string = '';
  enableVerify: boolean = true;
  showVerify: boolean = true;
  enableSuccess:boolean = false;
  userIdEncoded: string = '';
  otpSuccessMessage: string = "Please wait for admin approval to proceed.";
  otpSuccessTitle: string = "Your registration was successful";
  constructor(
    private apiService: ComponentApiService,
    private storageService: StorageService,
    private alertService: SweetAlertService,
    private fullPageLoaderService: FullPageLoaderService,
  private router: Router) { }
  onOtpChange(event: any): void {
    console.log(event);
    this.otpCode = event;
    if (this.otpCode.length === 5) {
      this.enableVerify = true;
    } else {
      this.enableVerify = false;
    }
  }

  proceedToVerify() {
    if (this.otpCode.length !== 5) {
      // Ensure form is valid before submission
      console.error('Form is invalid');
      return;
    }
    this.fullPageLoaderService.setLoadingStatus(true);
    // Prepare the request body from the form data
    const requestBody = {
      user_id: this.storageService.getItem('user'),
      otp: this.otpCode,
      otp_type: this.otpType
    };

    // Use the API service to send the POST request
    this.apiService.verifyOtp<Response>(requestBody).subscribe(
      {
        next: (response: Response) => {
          console.log('OTP Verification successful:', response);
          this.onSuccessOtpVerification(response.data);
          // Add success message or redirect here
        },
        error: (error) => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.error('Registration failed:', error);
          this.alertService.errorAlert('center', 'OTP Verification failed', '',3000,false,'',false);
          // Handle error scenarios here
        },
        complete: () => {
          this.fullPageLoaderService.setLoadingStatus(false);
          console.log('OTP request completed.');
        },
      }
    );
  }

  private onSuccessOtpVerification(data: any): void {
    this.showVerify = false;
    switch (this.otpType) {
      case OTP_TYPE.REGISTER_OTP_PENDING:
        this.showSuccessRegisterModal();
        this.enableSuccess = true;
        this.otpSuccessMessage = "Your registration was successful. Please wait for admin approval to proceed.";
        break;
      case OTP_TYPE.LOGIN_OTP_PENDING:
        this.showSuccessLoginToaster();
        this.storageService.setItem('token',data);
        this.otpVerifyEvent.emit({data:'',status: true,type: OTP_TYPE.LOGIN_OTP_PENDING})
        break;
      case OTP_TYPE.FORGET_PASSWORD_OTP_PENDING:
        this.showSuccessLoginToaster();
        this.storageService.setItem('token',data);
        this.otpVerifyEvent.emit({data:'',status: true,type: OTP_TYPE.FORGET_PASSWORD_OTP_VERIFIED})
        break;
      default:
        break;
    }

  }

  private showSuccessLoginToaster() {
    this.alertService.successToster('top-end', `Welcome, You’ve been successfully verified`, 6000);
  }

  private showSuccessRegisterModal() {
    this.alertService.successAlert('center', 'Registration Successful!',
      'Your account has been created successfully. 🚀 You will receive an SMS once it\'s activated. Thank you for your patience!',
      7000,
      false,
      false,
      false);
  }

  handleEvent(eventData: any){
    console.log(eventData);
  }

}
