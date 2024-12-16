import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { TablerIconsModule } from 'angular-tabler-icons';
import { UserData, UserOrGroup } from 'src/app/common/interfaces/user.interface';

@Component({
  selector: 'app-user-thumbnail',
  standalone: true,
  imports: [CommonModule ,MatListModule, TablerIconsModule],
  templateUrl: './user-thumbnail.component.html',
  styleUrl: './user-thumbnail.component.scss'
})
export class UserThumbnailComponent {
  @Input() item: any;
  @Input() isGroup: boolean;
}
