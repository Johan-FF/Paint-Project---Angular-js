import { Component, Input } from '@angular/core';
import { UserInterface } from 'src/app/models/iuser.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public ubicacion_foto: string = '../../../assets/foto_default.webp'
  @Input() ver_descripcion: boolean = false
  @Input() public user!: UserInterface


}
