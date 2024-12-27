import { SweetAlertPosition } from "sweetalert2";

export interface ErrorSweetAlertData {
    position: SweetAlertPosition;
    title: string;
    text:string;
    timer: number | null;
    allowOutsideClick: boolean | false,
    allowEscapeKey: boolean | false,
    allowEnterKey: boolean | false,
    hasTimer: boolean,
    showConfirmButton: boolean | false,
    showCancelButton: boolean | false,
    confirmButtonText: string | 'Ok'
  }