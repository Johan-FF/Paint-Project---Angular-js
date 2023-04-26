import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  ubicacion_foto: string = '../../../assets/foto_default.webp'
  @Input() ver_descripcion: boolean = false
}
