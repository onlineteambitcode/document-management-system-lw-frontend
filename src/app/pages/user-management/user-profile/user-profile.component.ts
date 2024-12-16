import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

interface ISelectKeyValue {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  
  role: ISelectKeyValue[] = [
    { value: 'ADMIN', viewValue: 'Admin' },
    { value: 'USER', viewValue: 'User' },
  ];

  selectedRole = this.role[1].value;



}
