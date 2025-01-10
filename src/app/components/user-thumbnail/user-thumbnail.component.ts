import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { TablerIconsModule } from 'angular-tabler-icons';
import { UserData, UserOrGroup } from 'src/app/common/interfaces/user.interface';

@Component({
  selector: 'app-user-thumbnail',
  standalone: true,
  imports: [CommonModule, MatListModule, TablerIconsModule],
  templateUrl: './user-thumbnail.component.html',
  styleUrl: './user-thumbnail.component.scss'
})
export class UserThumbnailComponent {
  @Output() clickActionIcon = new EventEmitter<any>();
  @Input() item: any;
  @Input() isGroup: boolean;
  @Input() showLabels: boolean;
  @Input() isNew: boolean;
  @Input() isRemoved: boolean;
  @Input() hasActionIcon: boolean = false;
  @Input() iconName: string = '';
  @Input() iconColor: string = '';

  onClickActionIcon() {
    this.clickActionIcon.emit(this.item);
  }

  getInitials(name: string): string {
    if (!name) {
      return '?';
    }
    const names = name.trim().split(' ');
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    // Combine initials from the first two words
    return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
  }
}
