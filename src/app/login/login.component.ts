import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private login: LoginService, private router: Router) {}

  isJsonEmail: any;
  isJsonpassword: any;
  isJsonmobile: any;

  ngOnInit(): void {
    this.login.getjsonData().subscribe((result: any) => {
      console.log(result);
      this.isJsonEmail = result[0].email;
      this.isJsonpassword = result[0].password;
      this.isJsonmobile = result[0].mobile;
    });
  }
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });
  isLogin: any;
  formData(data: any) {
    this.form.reset();
    if (
      this.isJsonEmail == data.email &&
      this.isJsonpassword == data.password &&
      this.isJsonmobile == data.mobile
    ) {
      localStorage.setItem('token', 'validData');
      this.isLogin = true;
      this.router.navigate(['dashboard']);
    } else {
      this.isLogin = false;
    }
  }
}
