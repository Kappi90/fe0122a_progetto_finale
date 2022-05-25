import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientiService } from 'src/app/service/clienti.service';
import { Cliente } from 'src/app/interface/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit {

  constructor(
    private clientiSrv: ClientiService,
    private router: Router,
    private modal: NgbModal
  ) {}

  response: any;
  closeResult = '';
  idCliente!: number;
  pagCorr: number = 0;
  numP: any;
  clienti!: Cliente[];
  data!: string;

  ngOnInit(): void {
    this.getClienti();
  }

  getClienti(): void {
    this.clientiSrv.getAll(0).subscribe(
      (c) => {
        this.response = c;
        this.clienti = this.response.content;
        const numP = Array(this.response.totalPages);
        this.numP = numP;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cambiaPag(page: number) {
    this.clientiSrv.getAll(page).subscribe((c) => {
      console.log(page);
      this.response = c;
      this.clienti = this.response.content;
      this.pagCorr = page;
    });
  }

  open(content: any) {
    this.modal
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async eliminaCliente(idCliente: number, i: number) {
    this.idCliente = idCliente;
    let id = this.pagCorr * 20 + this.idCliente;
    await this.clientiSrv.deleteFatture(idCliente).toPromise();
    this.clientiSrv.deleteCliente(idCliente).subscribe((c) => {;
      this.router.navigate(['/clienti']);
      this.clienti.splice(i, 1);
    });
  }

}
