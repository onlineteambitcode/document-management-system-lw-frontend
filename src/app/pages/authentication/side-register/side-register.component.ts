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
  isRegisterEnable: boolean = true;
  isOtpEnable: boolean = false;
  form: FormGroup;
  constructor(
    private router: Router,
    private alertService: SweetAlertService,
    private apiService: ComponentApiService,
    private storageService: StorageService) {
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
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator for matching passwords
  passwordMatchValidator: ValidatorFn = (group: AbstractControl): { [key: string]: boolean } | null => {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) return null;

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    if (password !== confirmPassword) {
      confirmPasswordControl.setErrors({ passwordsMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null); // Clear previous errors if any
    }

    return null; // No errors at the form group level
  };

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      // Ensure form is valid before submission
      console.error('Form is invalid');
      return;
    }

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
          console.error('Registration failed:', error);
          this.alertService.errorAlert('center', 'Registration failed', '');
          // Handle error scenarios here
        },
        complete: () => {
          console.log('Registration request completed.');
        },
      }
    );
  }
}
