import { Component } from '@angular/core';

@Component({
  selector: 'app-panel-herramientas',
  templateUrl: './panel-herrramientas.component.html',
  styleUrls: ['./panel-herrramientas.component.css']
})
export class PanelHerrramientasComponent {
  ubicacion_poligono_regular: string = '../../../../assets/poligono_regular.webp'
  ubicacion_poligono_irregular: string = '../../../../assets/poligono_irregular.webp'
  ubicacion_colores: string = '../../../../assets/colores.webp'
  ubicacion_pinceles: string = '../../../../assets/pincel.webp'
  menus: Map<string, boolean> = new Map<string, boolean>()

  constructor(){
    this.menus.set('opciones', false)
    this.menus.set('poligono_regular', false)
    this.menus.set('poligono_irregular', false)
    this.menus.set('colores', false)
    this.menus.set('pinceles', false)
    this.menus.set('perfiles', false)
  }

  verMenu(menu: string): void{
    const visible: boolean | undefined = this.menus.get(menu) 
    this.menus.delete(menu)
    this.menus.set(menu,!visible)
  }
}
