import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user = {
    username: "",
    email: "",
    password: "",
    role: []
  };
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signup(form: { username: string; email: string; password: string; roles: any;}) {
    const r = Array();
    r.push(form.roles);
    this.user.username = form.username;
    this.user.email = form.email;
    this.user.password = form.password;
    this.user.role = r[0];

    this.authSrv.signup(this.user).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/login']);
    });
  }

}
