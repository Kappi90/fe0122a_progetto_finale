import { AuthService } from './service/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyHttpInterceptor } from './interceptor/my-http.interceptor';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListaUtentiComponent } from './components/lista-utenti/lista-utenti.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientiComponent } from './components/clienti/clienti.component';
import { FattureComponent } from './components/fatture/fatture.component';
import { DettagliClienteComponent } from './components/dettagli-cliente/dettagli-cliente.component';
import { ModificaClienteComponent } from './components/modifica-cliente/modifica-cliente.component';
import { CreaClienteComponent } from './components/crea-cliente/crea-cliente.component';
import { DettagliFatturaComponent } from './components/dettagli-fattura/dettagli-fattura.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    ListaUtentiComponent,
    ClientiComponent,
    FattureComponent,
    DettagliClienteComponent,
    ModificaClienteComponent,
    CreaClienteComponent,
    DettagliFatturaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
