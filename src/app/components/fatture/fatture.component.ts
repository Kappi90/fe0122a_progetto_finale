import { Component, OnInit } from '@angular/core';
import { FatturaService } from 'src/app/service/fattura.service';
import { Fattura } from 'src/app/interface/fattura';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss']
})
export class FattureComponent implements OnInit {

  constructor(private fatturaSrv: FatturaService, private router: Router) {}
  fatture!: Fattura[];
  page!: number;
  idCliente!: number;
  pageSize!: number;
  response: any;
  cliente: any;
  data!: string;
  numP: any;
  pagCorr: number = 0;

  ngOnInit(): void {
    this.getFatture();
  }

  getFatture() {
    this.fatturaSrv.getAll(0).subscribe((res) => {
      this.response = res;
      this.fatture = this.response.content;
      const numP = Array(this.response.totalPages);
      this.numP = numP;
    },
    (error) => {
      console.log(error);
    }
    );
  }

  CambiaPagina(p: number) {
    if (this.idCliente) {
      this.fatturaSrv.getFattureByCliente(this.idCliente, p).subscribe((c) => {
        this.response = c;
        this.fatture = c.content;
      });
    } else {
      this.fatturaSrv.getAll(p).subscribe((c) => {
        this.response = c;
        this.fatture = c.content;
      });
    }
  }
  counter(i: number) {
    return new Array(i);
  }


}
