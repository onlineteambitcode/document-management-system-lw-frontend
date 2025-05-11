import { USER_STATUS_ENUM } from "src/app/common/enums/user.enum";
import { ErrorSweetAlertData } from "src/app/common/interfaces/errorSweetAlertData";
import { Response } from "src/app/common/interfaces/response.interface";



export class LoginAndRegisterErrorHandlerUtil {

    static handleErrorAndGetAlertData(errorResponse: Response): ErrorSweetAlertData{
        if(errorResponse.erroroCode === USER_STATUS_ENUM.DEACTIVATED){
            return {
                position: "center",
                text: 'Your account Deactivated by ADMIN',
                timer: 4000,
                title: 'Access denied',
                allowEnterKey: true,
                allowEscapeKey: true,
                allowOutsideClick: true,
                hasTimer: true,
                confirmButtonText: 'Ok',
                showCancelButton: false,
                showConfirmButton: false
            }
        }else if(errorResponse.erroroCode === USER_STATUS_ENUM.REGISTRATION_OTP_VERIFICATION_PENDING){
            return {
                position: "center",
                text: "Your account was previously created, but the verification process is not yet complete.",
                title: "Hay, We got you!",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                timer: null,
                hasTimer: false,
                confirmButtonText: 'Verify My Account',
                showCancelButton: true,
                showConfirmButton: true
            }
        }
        if(errorResponse.erroroCode === USER_STATUS_ENUM.ADMIN_VERIFICATION_PENDING){
            return {
                position: "center",
                text: 'Your account not verified by ADMIN',
                title: 'Access denied',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                timer: 4000,
                hasTimer: true,
                confirmButtonText: 'Ok',
                showCancelButton: false,
                showConfirmButton: false
            }
        }

        return{
            position: "center",
            text: 'Login error',
            title: '',
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            timer: 4000,
            hasTimer: true,
            confirmButtonText: 'Ok',
            showCancelButton: false,
            showConfirmButton: false
        };
    }
}