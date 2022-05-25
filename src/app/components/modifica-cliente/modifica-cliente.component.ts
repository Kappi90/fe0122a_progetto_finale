import { Component, OnInit } from '@angular/core';
import { Comune } from 'src/app/interface/comune';
import { ClientiService } from 'src/app/service/clienti.service';
import { ProvinceService } from 'src/app/service/province.service';
import { ComuniService } from 'src/app/service/comuni.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/interface/cliente';
import { Provincia } from 'src/app/interface/provincia';

@Component({
  selector: 'app-modifica-cliente',
  templateUrl: './modifica-cliente.component.html',
  styleUrls: ['./modifica-cliente.component.scss']
})
export class ModificaClienteComponent implements OnInit {

  constructor(
    private clientiSrv: ClientiService,
    private comuniSrv: ComuniService,
    private provinceSrv: ProvinceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  tipiClienti: any;
  comuni!: Comune[];
  province!: Provincia[];
  response: any;
  idCliente: any;
  cliente!: Cliente;

  newCliente: Cliente = new Cliente();

  ngOnInit(): void {
    this.clientiSrv.getTipiCliente().subscribe((c) => {
      this.tipiClienti = c;
    });
    this.provinceSrv.getAllProvince(0).subscribe((c) => {
      this.response = c;
      this.province = this.response.content;
    });
    this.comuniSrv.getAllComuni(0).subscribe((c) => {
      this.response = c;
      this.comuni = this.response.content;
    });
    this.route.params.subscribe((params) => {
      this.idCliente = +params['id'];
    });
    this.clientiSrv.getbyID(this.idCliente).subscribe((c) => {
      this.response = c;
      this.cliente = this.response;
      this.newCliente = this.cliente;
    });
  }

  modificaCliente(newCliente: Cliente) {
    this.clientiSrv.modifica(newCliente).subscribe((res) => {
      this.router.navigate(['/clienti']);
    });
  }

}
