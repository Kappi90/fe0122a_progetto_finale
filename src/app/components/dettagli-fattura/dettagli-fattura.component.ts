import { Component, OnInit } from '@angular/core';
import { StatoFattura } from 'src/app/interface/stato-fattura';
import { Router, ActivatedRoute } from '@angular/router';
import { Fattura } from 'src/app/interface/fattura';
import { FatturaService } from 'src/app/service/fattura.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dettagli-fattura',
  templateUrl: './dettagli-fattura.component.html',
  styleUrls: ['./dettagli-fattura.component.scss']
})
export class DettagliFatturaComponent implements OnInit {

  fattura!: Fattura;
  modificato!: boolean;
  nuovoStato!: StatoFattura;
  k!: number;

  constructor(
    private fatturaSrv: FatturaService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  async ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.carica(id);
    });
  }

  async carica(id: number) {
    await this.fatturaSrv.clickdettagli(id).subscribe((res) => {
      this.fattura = res;
    });
  }
  onChange(e: any) {
    this.modificato = true;
    this.k = e.target.value;
    if (this.k == 2) {
      this.nuovoStato = {
        id: 2,
        nome: 'PAGATA',
      };
    } else {
      this.nuovoStato = {
        id: 1,
        nome: 'NON PAGATA',
      };
    }
    this.fattura.stato = this.nuovoStato;
  }

  inviaDati() {
    this.fatturaSrv.change(this.fattura).subscribe((res) => {
      this.modificato = false;
    });
    alert('Fattura modificata con successo!');
  }

  elimina() {
    this.fatturaSrv.onElimina(this.fattura.id).subscribe((res) => {
      this.modalService.dismissAll();
      this.router.navigate(['/fatture']);
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

}
