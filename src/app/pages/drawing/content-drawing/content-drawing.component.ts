import { Component } from '@angular/core'
import { fabric } from 'fabric'
import { ImgLocations } from 'src/app/models/img-location.model'
import { CircleService } from 'src/app/services/canvas/circle.service'
import { LineService } from 'src/app/services/canvas/line.service'
import { RegularPolygonService } from 'src/app/services/canvas/regular-polygon.service'

@Component({
  selector: 'app-content-drawing',
  templateUrl: './content-drawing.component.html',
  styleUrls: ['./content-drawing.component.css']
})
export class ContentDrawingComponent {
  public imgLocations = ImgLocations
  public numSides: number = 3
  public menus = [
    {name: 'options', view: false},
    {name: 'regularPolygon', view: false},
    {name: 'irregularPolygon', view: false},
    {name: 'colors', view: false},
    {name: 'brushes', view: false},
    {name: 'profiles', view: false}
  ]
  private _canvas!: fabric.Canvas

  ngAfterContentInit(): void {
    const panelDibujo = document.getElementById('panel-dibujo')
    if (panelDibujo) {
      this._canvas = new fabric.Canvas('canvas', {
        width: panelDibujo.clientWidth,
        height: panelDibujo.clientHeight,
        selection: false
      })
    }
    this.line.setCanvas(this._canvas)
    this.circle.setCanvas(this._canvas)
    this.regularPolygon.setCanvas(this._canvas)
  }

  constructor( 
    private line: LineService,
    private circle: CircleService,
    private regularPolygon: RegularPolygonService
  ){ }

  public drawLine(): void {
    this.configDrawing()
    this.line.drawLine()
  }

  public drawCircle(): void {
    this.configDrawing()
    this.circle.drawCircle()
  }

  public drawRegularPolygon(): void {
    if( this.numSides>2 ){
      this.configDrawing()
      this.regularPolygon.drawRegularPolygon(this.numSides)
    }
  }

  private configDrawing(): void {
    this.viewMenu('none')
    this.allSelectable(false)
  }

  public cancelAllDrawings(): void {
    this.line.stopDrawLine()
    this.circle.stopDrawCircle()
    this.regularPolygon.stopDrawRegularPolygon()
    this.viewMenu('none')
    this.allSelectable(true)
  }

  private allSelectable(view: boolean): void {
    this._canvas.selection = view
    this._canvas.getObjects().forEach(element => {
      element.set({
        selectable: view
      })
    })
  }

  public viewMenu(nameMenu: string): void{
    this.menus.forEach(menu => {
      if( menu.name===nameMenu ) {menu.view = !menu.view}
      else {menu.view = false}
    })
  }

}
