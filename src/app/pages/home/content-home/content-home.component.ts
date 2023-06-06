import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DrawInterface } from 'src/app/models/idraw.interface';
import { DrawService } from 'src/app/services/api-draws/draw.service';
import { AuthService } from 'src/app/services/api-users/auth.service';


@Component({
  selector: 'app-content-home',
  templateUrl: './content-home.component.html',
  styleUrls: ['./content-home.component.css']
})
export class ContentHomeComponent {
  public draws: DrawInterface[] = []
  public nuevoDraw: boolean = false
  public drawExistente: boolean = false
  public nombreNuevo: string = ''
  public idExistente: string = ''

  constructor(
    private drawService: DrawService,
    private router: Router,
    public authService: AuthService,
  ) {}

  ngOnInit() {
    this.drawService.getDrawsOwner()
      .subscribe({
        next: (data) => {
          data.forEach(element => {
            this.draws.push({
              id_owner: element.id_owner,
              name: element.name,
              details: element.details
            })
          });
        },
        error: (e) => {
          console.log(e)
        }
      }
    )
  }

  public navegarADibujo(nombre: string): void {
    this.drawService.getIDbyName(nombre)
      .subscribe({
        next: (data) => {
          const id: number = data.id
          this.authService.setDrawId(id)
          this.router.navigate([`/drawing/${id}`])
        },
        error: (e) => {
          console.log(e)
        }
      }
    )
  }

  public setNuevoDraw(): void {
    const nuevo: boolean = !this.nuevoDraw
    this.nuevoDraw = nuevo
  }

  public setDrawExistente(): void {
    const nuevo: boolean = !this.drawExistente
    this.drawExistente = nuevo
  }

  public redireccionarDrawID(): void {
    this.authService.setDrawId(parseInt(this.idExistente))
    this.router.navigate([`/drawing/${parseInt(this.idExistente)}`])
  }

  public crearNuevoDraw(): void {
    if(this.nombreNuevo!=''){
      this.setNuevoDraw()
      this.drawService.createDraw(this.nombreNuevo)
        .subscribe({
          next: (data) => {
            const id: number = data.id
            this.authService.setDrawId(id)
            this.router.navigate([`/drawing/${id}`])
          },
          error: (e) => {
            console.log(e)
          }
        }
      )
    }
  }
}
