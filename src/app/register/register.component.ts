import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  successMessage: String = '';

  constructor(private authservice: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.registerForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      cnfpass: new FormControl(null, this.passValidator)
    });

    this.registerForm.controls.password.valueChanges
      .subscribe(
        x => this.registerForm.controls.cnfpass.updateValueAndValidity()
      );
  }

  ngOnInit() {
  }

  isValid(controlName) {
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched;
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;
      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }
    return null;
  }

  register() {
    if (this.registerForm.valid) {
      this.authservice.submitRegister(this.registerForm.value)
        .subscribe(
          res => {
            // localStorage.setItem('token', res.token)
            this.router.navigate(['../login'], { relativeTo: this.activatedRoute });
          },
          data => this.successMessage = 'Registration Success',
          () => this.successMessage = 'Registration Unsuccess'
        );
    }
  }

  movetologin() {
    this.router.navigate(['../login'], { relativeTo: this.activatedRoute });
  }
}
