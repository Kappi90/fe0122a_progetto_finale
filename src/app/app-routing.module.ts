import { DettagliFatturaComponent } from './components/dettagli-fattura/dettagli-fattura.component';
import { CreaClienteComponent } from './components/crea-cliente/crea-cliente.component';
import { ModificaClienteComponent } from './components/modifica-cliente/modifica-cliente.component';
import { DettagliClienteComponent } from './components/dettagli-cliente/dettagli-cliente.component';
import { FattureComponent } from './components/fatture/fatture.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { ListaUtentiComponent } from './components/lista-utenti/lista-utenti.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path:'lista-utenti',
    component: ListaUtentiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clienti',
    canActivate: [AuthGuard],
    component: ClientiComponent,
  },
  {
    path: 'fatture',
    canActivate: [AuthGuard],
    component: FattureComponent,
  },
  {
    path: 'dettaglifattura/:id',
    canActivate: [AuthGuard],
    component: DettagliFatturaComponent,
  },
  {
    path: 'dettaglicliente/:id',
    canActivate: [AuthGuard],
    component: DettagliClienteComponent,
  },
  {
    path: 'modificacliente/:id',
    canActivate: [AuthGuard],
    component: ModificaClienteComponent
  },
  {
    path: 'creacliente',
    canActivate: [AuthGuard],
    component: CreaClienteComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
