import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: User;
  loginForm: FormGroup;
  showErrorMessage: boolean;

  private userUrl = 'http://localhost:4200/api/admin/';  // URL to web api

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
    this.showErrorMessage == false;
    // console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.authservice.login(this.loginForm.value)
        .subscribe(
          (res : any) => {
            this.user = res;
            console.log(this.user.username);
            console.log(`${this.userUrl}${this.user.username}`);
            if (this.user.username !== '') {
              // this.router.navigate([`${this.userUrl}${this.user.username}`]);
              this.router.navigate([`../admin/${this.user.username}`], { relativeTo: this.activatedRoute });
            }
            else{
              this.showErrorMessage = true;
            }
          },
          (err) => {
            console.log(err)
            this.showErrorMessage = true;
          }
        )
    }
  }

  movetoregister() {
    this.router.navigate(['../register'], { relativeTo: this.activatedRoute });
  }
}
