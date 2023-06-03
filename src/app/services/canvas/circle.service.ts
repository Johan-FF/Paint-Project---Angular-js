import { Injectable } from '@angular/core';
import { fabric } from 'fabric'

@Injectable({
  providedIn: 'root'
})
export class CircleService {
  private canvas!: fabric.Canvas
  private circle: fabric.Circle | null = null
  private mouseDown: boolean = false
  private initCoordinates = {x: 0, y: 0}
  private mouseDownHandler?: (event: fabric.IEvent) => void 
  private mouseMoveHandler?: (event: fabric.IEvent) => void
  private mouseUpHandler?: (event: fabric.IEvent) => void

  public setCanvas(_canvas: fabric.Canvas): void {
    this.canvas = _canvas
  }

  public drawCircle(): void {
    this.mouseDownHandler = (event: fabric.IEvent) => this.startAddingCircle(event)
    this.mouseMoveHandler = (event: fabric.IEvent) => this.startDrawingCircle(event)
    this.mouseUpHandler = () => this.stopDrawingCircle()
  
    this.canvas.on('mouse:down', this.mouseDownHandler)
    this.canvas.on('mouse:move', this.mouseMoveHandler)
    this.canvas.on('mouse:up', this.mouseUpHandler)
  }

  private startAddingCircle(event: fabric.IEvent): void {
    const pointer = this.canvas.getPointer(event.e)
    this.mouseDown = true
    if( pointer ){
      this.initCoordinates.x = pointer.x
      this.initCoordinates.y = pointer.y
      this.circle = new fabric.Circle({
        radius: 1,
        fill: '#EEEEEE',
        left: pointer.x,
        top: pointer.y,
        stroke: '#EEEEEE90',
        strokeWidth: 15
      })
      this.canvas.add(this.circle)
      this.canvas.requestRenderAll()
    }
  }

  private startDrawingCircle(event: fabric.IEvent): void {
    if( this.mouseDown ){
      const pointer = this.canvas.getPointer(event.e)
      const radio: number = Math.sqrt(
        Math.pow(pointer.x-this.initCoordinates.x, 2) +
        Math.pow(pointer.y-this.initCoordinates.y, 2)
      ) 
      this.circle?.set({
        radius: radio/3,
        left: pointer.x<this.initCoordinates.x?pointer.x:this.initCoordinates.x,
        top: pointer.y<this.initCoordinates.y?pointer.y:this.initCoordinates.y
      })
      this.canvas.requestRenderAll()
    }
  }

  private stopDrawingCircle(): void {
    this.mouseDown = false
  }

  public stopDrawCircle(): void {
    this.canvas.off('mouse:down', this.mouseDownHandler)
    this.canvas.off('mouse:move', this.mouseMoveHandler)
    this.canvas.off('mouse:up', this.mouseUpHandler)
  }
}
