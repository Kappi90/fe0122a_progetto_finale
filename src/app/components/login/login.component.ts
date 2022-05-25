import { User } from './../../interface/user';
import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSrv: AuthService, private router: Router) {}

  item!: any;
  users!: User;
  isLogged!: boolean;



  ngOnInit(): void {
    localStorage.getItem('utente');
  }

  login(form: NgForm) {
    this.item = form.value;
    this.authSrv.login(this.item).subscribe(
      (res) => {
        this.users = res;
        localStorage.setItem('utente', JSON.stringify(this.users));
        this.router.navigate(['/lista-utenti']);
        localStorage.getItem('utente');
      },

      (err) => {
        switch (err.status) {
          case 400:
            alert('Inserire credenziali');
            break;
          case 401:
            alert('Credenziali errate');
        }
      }
    );
  }

}
