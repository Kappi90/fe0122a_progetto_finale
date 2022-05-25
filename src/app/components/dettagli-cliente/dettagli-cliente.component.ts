import { Component, OnInit } from '@angular/core';
import { ClientiService } from 'src/app/service/clienti.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Fattura } from 'src/app/interface/fattura';

@Component({
  selector: 'app-dettagli-cliente',
  templateUrl: './dettagli-cliente.component.html',
  styleUrls: ['./dettagli-cliente.component.scss']
})
export class DettagliClienteComponent implements OnInit {

  mostra: boolean = false;
  cliente!: any;
  fatture!: any;
  nuovaFattura!: Fattura;
  constructor(
    private clientiSrv: ClientiService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.clientiSrv.getbyID(id).subscribe((res) => {
        this.cliente = res;
      });
    });
  }
  mostraFatture(a: number) {
    if (this.mostra == false) {
      this.mostra = true;
      this.clientiSrv.getbyCliente(a).subscribe((res) => {
        this.fatture = res.content;
      });
    } else {
      this.mostra = false;
      return;
    }
  }
  newFattura(content: any) {
    this.modalService.open(content, { centered: true });
  }

  onAggiunta(dati: any) {
    this.nuovaFattura = {
      id: 0,
      numero: 0,
      anno: 0,
      importo: 0,
      data: '',
      stato: { id: 0, nome: '' },
      cliente: {},
    };
    this.nuovaFattura.anno = dati.value.anno;
    this.nuovaFattura.data = dati.value.data;
    this.nuovaFattura.importo = dati.value.importo;
    this.nuovaFattura.numero = dati.value.numero;
    this.nuovaFattura.stato.id = dati.value.stato;
    this.nuovaFattura.cliente.id = this.cliente.id;
    this.clientiSrv.creaFattura(this.nuovaFattura).subscribe((res) => {
      this.modalService.dismissAll();
      alert('Fattura aggiunta con successo!');
      this.mostraFatture(this.cliente.id);
    });
  }

}
