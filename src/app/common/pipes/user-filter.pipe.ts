import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter',
  standalone: true,
})
export class UserFilterPipe implements PipeTransform {
  transform(users: any[], filterText: string): any[] {
    if (!users || !filterText) {
      return users; // Return the full list if there's no filter
    }
    const lowerFilter = filterText.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(lowerFilter) ||
      user.email.toLowerCase().includes(lowerFilter) ||
      user.role.toLowerCase().includes(lowerFilter)
    );
  }
}
