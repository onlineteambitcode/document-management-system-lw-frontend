import { Pipe, PipeTransform } from '@angular/core';
import { ITEM_STATUS } from '../enums/item-status.enum';
import { UserData } from '../interfaces/user.interface';

@Pipe({
    name: 'userFilterByAccessStatus',
    standalone: true,
    pure: false,
})
export class UserFilterByAccessStatus implements PipeTransform {
    transform(users: UserData[], updatedUserIdMap: Map<string, ITEM_STATUS>, isReturnInMap: boolean): any[] {
        if (!users || updatedUserIdMap.size == 0) {
            return isReturnInMap ? [] : users; // Return the full list if there's no filter
        }

        return users.filter(user => {
            if (isReturnInMap) {
                return updatedUserIdMap.has(user.user_id+"") && updatedUserIdMap.get(user.user_id+"") !== ITEM_STATUS.REMOVED;
            } else {
                return (!updatedUserIdMap.has(user.user_id+"")) || updatedUserIdMap.get(user.user_id+"") === ITEM_STATUS.REMOVED;
            }
        }
        );
    }
}
