import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientiService } from 'src/app/service/clienti.service';
import { ComuniService } from 'src/app/service/comuni.service';
import { ProvinceService } from 'src/app/service/province.service';
import { Cliente } from 'src/app/interface/cliente';
import { Comune } from 'src/app/interface/comune';
import { Provincia } from 'src/app/interface/provincia';

@Component({
  selector: 'app-crea-cliente',
  templateUrl: './crea-cliente.component.html',
  styleUrls: ['./crea-cliente.component.scss']
})
export class CreaClienteComponent implements OnInit {

  constructor(
    private clientiSrv: ClientiService,
      private comuniSrv: ComuniService,
      private provinceSrv: ProvinceService,
      private router: Router,
    ) {}

    tipiClienti: any;
    comuni!: Comune[];
    province!: Provincia[];
    response: any;
    idProvincia: any;
    provincia1!: string;
    provincia2!: string;
    filterComuni: Comune[] = [];

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
    }
    cambioCitta1(event: any) {
      this.idProvincia = event.target.value;
      let filterComuni: Array<any> = [];
      this.comuni.filter((comune) => {
        if (this.idProvincia == comune.provincia.id) {
          filterComuni.push(comune);
        }
      });
      this.filterComuni = filterComuni;
    }

    addCliente(newCliente: Cliente) {
      this.clientiSrv.createCliente(newCliente).subscribe((res) => {
        this.router.navigate(['/clienti']);
      });
    }

}
