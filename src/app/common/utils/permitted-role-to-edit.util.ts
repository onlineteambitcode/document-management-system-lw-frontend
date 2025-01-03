import { USER_ROLE_ENUM, USER_STATUS_ENUM } from "src/app/common/enums/user.enum";
import { ErrorSweetAlertData } from "src/app/common/interfaces/errorSweetAlertData";
import { Response } from "src/app/common/interfaces/response.interface";
import { AuthService } from "../services/auth.service";
import { ActivatedRouteSnapshot } from "@angular/router";
import { UserData } from "../interfaces/user.interface";



export class PermittedRoleToEdit {

    static hasProfileEditPermission(authService: AuthService,userData: UserData): boolean {
        if (authService.hasRole(USER_ROLE_ENUM.ADMIN)) {
            return true;
        } else {
           
            const isMyAccount = authService.isMyLogedInId(userData.user_id);
            if (isMyAccount) {
                return true;
            } else {
                return false;
            }

        }
    }

    static hasCommonEditPermission(authService: AuthService): boolean {
        if (authService.hasRole(USER_ROLE_ENUM.ADMIN)) {
            return true;
        } else {
           return false;
        }
    }
}