import { Injectable } from '@angular/core';
import { fabric } from 'fabric'

@Injectable({
  providedIn: 'root'
})
export class RegularPolygonService {
  private canvas!: fabric.Canvas
  private regularPolygon!: fabric.Polygon 
  private mouseDown: boolean = false
  private numSides!: number
  private initCoordinates = { x: 0, y: 0 }
  private mouseDownHandler?: (event: fabric.IEvent) => void
  private mouseMoveHandler?: (event: fabric.IEvent) => void
  private mouseUpHandler?: (event: fabric.IEvent) => void

  public setCanvas(_canvas: fabric.Canvas): void {
    this.canvas = _canvas
  }

  public drawRegularPolygon(_numSides: number): void {
    this.numSides = _numSides
    this.mouseDownHandler = (event: fabric.IEvent) => this.startAddingRegularPolygon(event)
    this.mouseMoveHandler = (event: fabric.IEvent) => this.startDrawingRegularPolygon(event)
    this.mouseUpHandler = () => this.stopDrawingRegularPolygon()

    this.canvas.on('mouse:down', this.mouseDownHandler)
    this.canvas.on('mouse:move', this.mouseMoveHandler)
    this.canvas.on('mouse:up', this.mouseUpHandler)
  }

  private startAddingRegularPolygon(event: fabric.IEvent): void {
    const pointer = this.canvas.getPointer(event.e)
    this.mouseDown = true
    if (pointer) {
      this.initCoordinates.x = pointer.x
      this.initCoordinates.y = pointer.y
      const pointers = this.getPoints(pointer)
      this.regularPolygon = new fabric.Polygon(pointers, {
        fill: '#EEEEEE',
        left: pointer.x,
        top: pointer.y,
        stroke: '#EEEEEE90',
        strokeWidth: 15,
        objectCaching: false,
      })
      this.canvas.add(this.regularPolygon)
      this.canvas.requestRenderAll()
    }
  }

  private startDrawingRegularPolygon(event: fabric.IEvent): void {
    if (this.mouseDown && this.regularPolygon) {
      const pointer = this.canvas.getPointer(event.e)
      this.canvas.remove(this.regularPolygon)
      const pointers = this.getPoints(pointer)
      this.regularPolygon = new fabric.Polygon(pointers, {
        fill: '#EEEEEE',
        left: pointer.x < this.initCoordinates.x ? pointer.x : this.initCoordinates.x,
        top: pointer.y < this.initCoordinates.y ? pointer.y : this.initCoordinates.y,
        stroke: '#EEEEEE90',
        strokeWidth: 15,
        objectCaching: false,
      })
      this.canvas.add(this.regularPolygon)
      this.canvas.requestRenderAll()
    }
  }

  private getPoints(pointer: any): fabric.Point[] {
    const center = {
      x: (pointer.x + this.initCoordinates.x) / 2,
      y: (pointer.y + this.initCoordinates.y) / 2,
    }
    const radio: number = Math.sqrt(
      Math.pow(pointer.x - this.initCoordinates.x, 2) +
      Math.pow(pointer.y - this.initCoordinates.y, 2)
    ) / 2
    const singleAngle: number = (2 * Math.PI) / this.numSides
    let points: fabric.Point[] = []
    let point: fabric.Point
    let x, y: number
    for (let i = 0; i < this.numSides; i++) {
      x = center.x + radio * Math.cos(singleAngle * i)
      y = center.y + radio * Math.sin(singleAngle * i)
      point = new fabric.Point(x, y)
      points.push(point)
    }
    return points
  }

  private setPoints(pointers: fabric.Point[]): void {
    const pointsPoly = this.regularPolygon?.get('points') as fabric.Point[]
    pointsPoly.map((point, key) => {
      point.x = pointers[key].x
      point.y = pointers[key].y
    })
    this.regularPolygon?.set('dirty', true)
  }

  private stopDrawingRegularPolygon(): void {
    this.mouseDown = false
  }

  public stopDrawRegularPolygon(): void {
    this.canvas.off('mouse:down', this.mouseDownHandler)
    this.canvas.off('mouse:move', this.mouseMoveHandler)
    this.canvas.off('mouse:up', this.mouseUpHandler)
  }
}
