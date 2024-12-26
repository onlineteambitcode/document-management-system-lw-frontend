import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NgOtpInputModule } from 'ng-otp-input';
import { MaterialModule } from 'src/app/material.module';
import { ComponentApiService } from '../services/componentApi.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { SweetAlertService } from 'src/app/common/services/sweetAlert2.service';
import { OTP_TYPE } from 'src/app/common/enums/otp-type.enum';
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
        MatButtonModule
  ],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
  providers:[ComponentApiService]
})
export class OtpComponent {
  otpCode: string = '';
  enableVerify: boolean = false;
  userIdEncoded: string = '';
  constructor(
    private apiService: ComponentApiService, 
    private storageService: StorageService,
    private alertService: SweetAlertService){}
  onOtpChange(event: any):void{
    console.log(event);
    this.otpCode = event;
    if(this.otpCode.length === 5){
      this.enableVerify = true;
    }else{
      this.enableVerify = false;
    }
  }

  proceedToVerify(){
    if (this.otpCode.length !== 5) {
      // Ensure form is valid before submission
      console.error('Form is invalid');
      return;
    }

    // Prepare the request body from the form data
    const requestBody = {
      user_id: this.storageService.getItem('user'),
      otp: this.otpCode,
      otp_type: OTP_TYPE.REGISTER_OTP_PENDING
    };

    // Use the API service to send the POST request
    this.apiService.verifyOtp(requestBody).subscribe(
      {
        next: (response) => {
          console.log('OTP Verification successful:', response);
          this.alertService.successAlert('center','Registration Successful!',
            'Your account has been created successfully. 🚀 You will receive an SMS once it\'s activated. Thank you for your patience!',
          7000);
          // Add success message or redirect here
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.alertService.errorAlert('center','OTP Verification failed','');
          // Handle error scenarios here
        },
        complete: () => {
          console.log('OTP request completed.');
        },
      }
    );
  }


}
