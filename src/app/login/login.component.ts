import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;

  constructor(private authservice: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  login() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this.authservice.login(this.loginForm.value)
        .subscribe(
          data => {
            console.log(data);
            // localStorage.setItem('token', data.toString());
            this.router.navigate(['/blogs'], { relativeTo: this.activatedRoute });
          },
          error => { }
        );
    }
  }

  movetoregister() {
    this.router.navigate(['../register'], { relativeTo: this.activatedRoute });
  }
}
