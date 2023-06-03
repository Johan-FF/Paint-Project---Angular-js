import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseInterface } from 'src/app/models/response.interface';
import { LoginInterface } from 'src/app/models/login.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private api: string = environment.api_url

  constructor(
    private _httpClient: HttpClient
  ) { }

  public loginByEmail(usuario: LoginInterface): Observable<ResponseInterface> {
    const url: string = this.api+'/users/login'
    return this._httpClient.post<ResponseInterface>(url, usuario)
  }
}
