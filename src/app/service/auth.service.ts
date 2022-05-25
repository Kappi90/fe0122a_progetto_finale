import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  signup(item: any) {
    return this.http.post(`${environment.pathApi}/api/auth/signup`, item);
  }

  login(item: any) {
    return this.http.post<any>(`${environment.pathApi}/api/auth/login`, item);
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('utente');
  }

  getAll(p: number) {
    return this.http.get<any>(
      `${environment.pathApi}/api/users?page=${p}&size=20&sort=id,ASC`
    );
  }
}
