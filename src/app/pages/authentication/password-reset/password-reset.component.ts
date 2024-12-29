import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpCommonApiModule } from 'src/app/common/modules/http-api.module';
import { MaterialModule } from 'src/app/material.module';
import { FromUtil } from '../utils/form.util';
import { SweetAlertService } from 'src/app/common/services/sweetAlert2.service';
import { ComponentApiService } from '../services/componentApi.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { FullPageLoaderService } from 'src/app/common/services/full-page-loader.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [CommonModule,
      RouterModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      HttpCommonApiModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {
@Output() passwordRestOutputEvent = new EventEmitter<boolean>();
form: FormGroup;
constructor(
    private alertService: SweetAlertService,
    private apiService: ComponentApiService,
    private fullPageLoaderService: FullPageLoaderService) {
      this.form = new FormGroup(
            {
              old_password: new FormControl('', [
                Validators.required
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


    submit() {
        if (this.form.invalid) {
          // Ensure form is valid before submission
          console.error('Form is invalid');
          return;
        }
    
        this.fullPageLoaderService.setLoadingStatus(true);
    
        // Prepare the request body from the form data
        const requestBody = {
          old_password: this.form.value.old_password,
          new_password: this.form.value.new_password,
          confirm_password: this.form.value.confirm_password
        };
    
        // Use the API service to send the POST request
        this.apiService.passwordReset<Response>(requestBody).subscribe(
          {
            next: (response: Response) => {
              console.log('Password successful:', response);
              this.alertService.successToster('top-end', 'Your password has been successfully reset!', 5000);
              this.passwordRestOutputEvent.emit(true);
              // Add success message or redirect here
            },
            error: (error) => {
              this.fullPageLoaderService.setLoadingStatus(false);
              console.error('Password rest failed:', error);
              this.alertService.errorAlert('center', 'Password rest failed', '',3000,false,'',false);
              this.passwordRestOutputEvent.emit(false);

    
            },
            complete: () => {
              this.fullPageLoaderService.setLoadingStatus(false);
              console.log('Password reset request completed.');
            },
          }
        );
      }

      get f() {
        return this.form.controls;
      }
}
