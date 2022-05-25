import { User } from './../../interface/user';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-utenti',
  templateUrl: './lista-utenti.component.html',
  styleUrls: ['./lista-utenti.component.scss']
})
export class ListaUtentiComponent implements OnInit {

  constructor(private authSrv: AuthService) {}

  utenti!: Array<User>;
  response!: any;
  pagCorr: any;
  numP: any;

  ngOnInit() {
    this.authSrv.getAll(0).subscribe((c) => {
      this.response = c;
      this.utenti = this.response.content
      const numP = Array(this.response.totalPages);
      this.numP = numP;
    });
  }

  cambiaPag(page: number) {
    this.authSrv.getAll(page).subscribe((c) => {
      this.response = c;
      this.utenti = this.response.content;
      this.pagCorr = page;
    });
  }

}
