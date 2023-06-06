import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { UserInterface } from 'src/app/models/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user!: UserInterface
  private autenticado: boolean = false
  private token: string = ''
  private id: number = 0
  private id_draw: number = 0
  private api: string = environment.api_url

  constructor(
    private _httpClient: HttpClient
  ) { }

  public setUser(): void {
    const url: string = this.api+`/users/${this.id}`
    this._httpClient.get<UserInterface>(url)
    .subscribe({
      next: (data) => {
        this.user = {
          name: data.name,
          last_name: data.last_name,
          nickname: data.nickname,
          email: data.email,
          password: data.password
        }
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  public getUser(): UserInterface {
    return this.user
  }

  public setAutenticado(resultado: boolean): void {
    this.autenticado = resultado
  }

  public getAutenticado(): boolean {
    return this.autenticado
  }

  public setToken(resultado: string): void {
    this.token = resultado
  }

  public getToken(): string {
    return this.token
  }

  public setId(resultado: number): void {
    this.id = resultado
  }

  public getId(): number {
    return this.id
  }

  public setDrawId(resultado: number): void {
    this.id_draw = resultado
  }

  public getDrawId(): number {
    return this.id_draw
  }

}
