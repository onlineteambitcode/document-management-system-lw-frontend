import { Component, Inject, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-delete-confirm',
  standalone: true,
  imports: [MatButtonModule,
     MatDialogActions, 
     MatDialogClose, 
     MatDialogTitle,
      MatDialogContent,
      TablerIconsModule],
  templateUrl: './delete-confirm.component.html',
  styleUrl: './delete-confirm.component.scss'
})
export class DeleteConfirmComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteConfirmComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { item: string, title: string }) {}
}
