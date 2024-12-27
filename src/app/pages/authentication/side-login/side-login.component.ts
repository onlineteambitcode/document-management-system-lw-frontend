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
    OtpComponent
  ],
  providers: [ComponentApiService],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  otpType: OTP_TYPE = OTP_TYPE.LOGIN_OTP_PENDING;
  isLoginEnable:boolean = true;
  isOtpEnable:boolean = false;
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
      email: this.form.value.uname,
      password: this.form.value.password,
    };

     // Use the API service to send the POST request
        this.apiService.loginUser<Response>(requestBody).subscribe(
          {
            next: (response: Response) => {
              console.log('Login successful and OTP verification pending:', response);
              this.isOtpEnable = true;
              this.alertService.successToster('top-end', 'OTP verification sent to your mobile', 5000);
              this.storageService.setItem('user',response.data.user_id)
              // Add success message or redirect here
            },
            error: (error) => {
              this.fullPageLoaderService.setLoadingStatus(false);
              console.error('Login failed:', error);
              this.alertService.errorAlert('center', 'Login failed', '');
              // Handle error scenarios here
            },
            complete: () => {
              this.fullPageLoaderService.setLoadingStatus(false);
              console.log('Login request completed.');
            },
          }
        );
  }
}
