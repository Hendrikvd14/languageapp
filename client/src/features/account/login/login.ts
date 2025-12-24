import { Component, inject, output, signal } from '@angular/core';
import { TextInput } from "../../../shared/text-input/text-input";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TextInput],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected accountService = inject(AccountService)
  protected creds: any = {}
  private fb = inject(FormBuilder);
  private toast = inject(ToastService)
  private router = inject(Router);
  protected credentialsForm: FormGroup;
  protected validationErrors = signal<string[]>([]);
  cancelLogin = output<boolean>();
  protected loading = signal(false);

  constructor() {
    this.credentialsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    });
  }

  login() {
    /* this.loading.set(true);
    this.accountService.login(this.creds).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        this.toast.success('Logged in successfully');
        this.creds = {};
      },
      error: error => {
        this.toast.error(error.error)
      },
      complete: () => this.loading.set(false)
    }); */
    if(this.credentialsForm.valid) {
      const formData = this.credentialsForm.value;
      this.accountService.login(formData).subscribe({
        next: () => {
          this.router.navigateByUrl('/');
          
        },
        error: error => {
          console.log(error);
          this.validationErrors.set(error)
        }
      })
    }
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;

      const matchValue = parent.get(matchTo)?.value;
      return control.value === matchValue ? null : { passwordMismatch: true }
    }
  }

  cancel() {
     this.router.navigateByUrl('/');
  }

}
