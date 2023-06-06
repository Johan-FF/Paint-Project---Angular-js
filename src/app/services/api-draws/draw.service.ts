import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { AuthService } from '../api-users/auth.service';
import { Observable } from 'rxjs';
import { DrawInterface } from 'src/app/models/idraw.interface';
import { ResponseInterface } from 'src/app/models/iresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class DrawService {
  private api: string = environment.api_url

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) { }

  public getDrawsOwner(): Observable<DrawInterface[]> {
    const id: number = this._authService.getId()
    const url: string = this.api+`/draws/owner/${id}`
    return this._httpClient.get<DrawInterface[]>(url)
  }

  public createDraw(name: string): Observable<ResponseInterface> {
    const url: string = this.api+'/draws'
    const draw: DrawInterface = {
      name: name,
      details: '',
      id_owner: this._authService.getId()
    }
    return this._httpClient.post<ResponseInterface>(url,draw)
  }

  public getIDbyName(name: string): Observable<ResponseInterface> {
    const url: string = this.api+`/draws/exist/${name}`
    return this._httpClient.get<ResponseInterface>(url)
  } 
}
