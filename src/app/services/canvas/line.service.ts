import { Injectable } from '@angular/core';
import { fabric } from 'fabric'

@Injectable({
  providedIn: 'root'
})
export class LineService {
  private canvas!: fabric.Canvas
  private line: fabric.Line | null = null
  private mouseDown: boolean = false
  private mouseDownHandler?: (event: fabric.IEvent) => void 
  private mouseMoveHandler?: (event: fabric.IEvent) => void
  private mouseUpHandler?: (event: fabric.IEvent) => void

  public setCanvas(_canvas: fabric.Canvas): void {
    this.canvas = _canvas
  }

  public drawLine(): void {
    this.mouseDownHandler = (event: fabric.IEvent) => this.startAddingLine(event)
    this.mouseMoveHandler = (event: fabric.IEvent) => this.startDrawingLine(event)
    this.mouseUpHandler = () => this.stopDrawingLine()
  
    this.canvas.on('mouse:down', this.mouseDownHandler)
    this.canvas.on('mouse:move', this.mouseMoveHandler)
    this.canvas.on('mouse:up', this.mouseUpHandler)
  }

  private startAddingLine(event: fabric.IEvent): void {
    const pointer = this.canvas.getPointer(event.e)
    this.mouseDown = true

    if( pointer ){
      this.line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        stroke: '#EEEEEE',
        strokeWidth: 5,
        selectable: false
      })
      this.canvas.add(this.line)
      this.canvas.requestRenderAll()
    }
  }

  private startDrawingLine(event: fabric.IEvent): void {
    if( this.mouseDown ){
      const pointer = this.canvas.getPointer(event.e)
      this.line?.set({
        x2: pointer?.x,
        y2: pointer?.y
      })
      this.canvas.requestRenderAll()
    }
  }

  private stopDrawingLine(): void {
    this.mouseDown = false
  }

  public stopDrawLine(): void {
    this.canvas.off('mouse:down', this.mouseDownHandler)
    this.canvas.off('mouse:move', this.mouseMoveHandler)
    this.canvas.off('mouse:up', this.mouseUpHandler)
  }
}
