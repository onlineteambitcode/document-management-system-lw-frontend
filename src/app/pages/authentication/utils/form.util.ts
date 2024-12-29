import { AbstractControl, ValidatorFn } from "@angular/forms";


export class FromUtil {

    // Custom validator for matching passwords
    static passwordMatchValidator: ValidatorFn = (group: AbstractControl): { [key: string]: boolean } | null => {
        const passwordControl = group.get('new_password');
        const confirmPasswordControl = group.get('confirm_password');

        if (!passwordControl || !confirmPasswordControl) return null;

        const password = passwordControl.value;
        const confirmPassword = confirmPasswordControl.value;

        if (password !== confirmPassword) {
            confirmPasswordControl.setErrors({ passwordsMismatch: true });
        } else {
            confirmPasswordControl.setErrors(null); // Clear previous errors if any
        }

        return null; // No errors at the form group level
    };
}