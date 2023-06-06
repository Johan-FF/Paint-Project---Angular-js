import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { UserInterface } from 'src/app/models/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api: string = environment.api_url

  constructor(
    private _httpClient: HttpClient
  ) { }

  public getUser(id: number): Observable<UserInterface> {
    const url: string = this.api+`/users/${id}`
    return this._httpClient.get<UserInterface>(url) 
  }
}
