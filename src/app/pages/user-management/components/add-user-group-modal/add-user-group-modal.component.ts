import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-group-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './add-user-group-modal.component.html',
  styleUrl: './add-user-group-modal.component.scss'
})
export class AddUserGroupModalComponent {

}
