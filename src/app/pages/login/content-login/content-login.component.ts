import { Component } from '@angular/core';

@Component({
  selector: 'app-content-login',
  templateUrl: './content-login.component.html',
  styleUrls: ['./content-login.component.css']
})
export class ContentLoginComponent {
  correo: string = '';
  password: string = '';

  ingresar(): void{
    
  }
}
