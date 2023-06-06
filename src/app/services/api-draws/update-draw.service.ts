import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/app/environments/environment';
import { FigureInterface } from 'src/app/models/ifigure.interface';
import { AuthService } from '../api-users/auth.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateDrawService {
  private socket$!: WebSocketSubject<any>
  private api: string = environment.ws_url
  private mensajesSubject: Subject<any> = new Subject<any>()

  constructor(
    private authService: AuthService
  ) { 
    this.socket$ = webSocket(this.api+`/figures/ws/${this.authService.getDrawId()}/${this.authService.getId()}`)
    this.socket$.subscribe({
      next: (data) => {
        this.mensajesSubject.next(data)
      },
      error: (e) => {
        console.log(e)
      }
    }
  )
  }

  public sendFigures(figures: FigureInterface[]): void {
    this.socket$.next({figures})
  }

  public subscribeToMessages(): Observable<any> {
    return this.mensajesSubject.asObservable()
  }

  public disconnect() {
    if (this.socket$) {
      this.socket$.complete()
    }
  }
}
