import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2'

@Injectable({
    providedIn: 'root',
})
export class SweetAlertService {


    successAlert(
      position: SweetAlertPosition, 
      title: string, text:string,
      timer: number,
      allowOutsideClick: boolean = true,
      allowEscapeKey: boolean = true,
      allowEnterKey: boolean = true): void {
        Swal.fire({
            position: position,
            icon: "success",
            title,
            text,
            showConfirmButton: false,
            timer,
            allowOutsideClick,  // This prevents the modal from closing when clicking outside
            allowEscapeKey,     // Optionally, you can also disable closing with the Escape key
            allowEnterKey,       // Optionally, you can disable closing with the Enter key
        });
    }

    errorAlert(position: SweetAlertPosition, title: string, text:string, timer: number | null, showCancelButton: boolean | false,confirmButtonText: string | 'Ok', showConfirmButton: boolean | false){
      Swal.fire({
        position: position,
        icon: "error",
        title,
        text,
        showConfirmButton,
        timer: timer ? timer : undefined,
        showCancelButton,
        confirmButtonText

    });
    }

    successToster(
      position: SweetAlertPosition, 
      title: string, 
      timer: number ){
        const Toast = Swal.mixin({
            toast: true,
            position,
            showConfirmButton: false,
            timer,
            timerProgressBar: false,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title
          });
    }

    errorToaster(position: SweetAlertPosition, title: string){
        const Toast = Swal.mixin({
            toast: true,
            position,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title
          });
    }

    confirmAlert(title: string, text:string, icon: SweetAlertIcon | "warning", showCancelButton: boolean | true, cancelButtonText: string | "No",showConfirmButton: boolean | false,confirmButtonText: string | 'Ok',hasInput: boolean, callback: () => void){
     if(hasInput){
      Swal.fire({
        title,
        text,
        input: 'text',
        inputPlaceholder: 'Type "delete" here',
        icon,
        showCancelButton,
        confirmButtonText,
        cancelButtonText,
        inputValidator: (value) => {
          if (value !== 'delete') {
            return 'You need to type "delete" to proceed!';
          }
          return null;
        }
      }).then((result) => {
        if (result.isConfirmed) {
          callback();
        }
      });
     }else{
      Swal.fire({
        title,
        text,
        icon,
        showCancelButton,
        confirmButtonText,
        cancelButtonText
      }).then((result) => {
        if (result.isConfirmed) {
          callback();
        }
      });
     }
    }
}
