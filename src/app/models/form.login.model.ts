import { FormControl } from "@angular/forms";

export interface FormLoginModel {
    emailOrNumberPhone: FormControl<string | null>;
    password: FormControl<string | null>;
}