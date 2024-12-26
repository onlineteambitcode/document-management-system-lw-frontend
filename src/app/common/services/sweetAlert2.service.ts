import { Injectable } from '@angular/core';
import Swal, { SweetAlertPosition } from 'sweetalert2'

@Injectable({
    providedIn: 'root',
})
export class SweetAlertService {


    successAlert(position: SweetAlertPosition, title: string, text:string, timer: number): void {
        Swal.fire({
            position: position,
            icon: "success",
            title,
            text,
            showConfirmButton: false,
            timer
        });
    }

    errorAlert(position: SweetAlertPosition, title: string, text:string){
      Swal.fire({
        position: position,
        icon: "error",
        title,
        text,
        showConfirmButton: false,
        timer: 1500
    });
    }

    successToster(position: SweetAlertPosition, title: string, timer: number){
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
}
