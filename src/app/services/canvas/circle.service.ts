import { Injectable } from '@angular/core';
import { fabric } from 'fabric'
import { ColorsService } from './colors.service';
import { FiguresService } from './figures.service';

@Injectable({
  providedIn: 'root'
})
export class CircleService {
  private canvas!: fabric.Canvas
  private circle: fabric.Circle | null = null
  private mouseDown: boolean = false
  private initCoordinates = {x: 0, y: 0}
  private colorFill: string = ''
  private colorBorder: string = ''
  private mouseDownHandler?: (event: fabric.IEvent) => void 
  private mouseMoveHandler?: (event: fabric.IEvent) => void
  private mouseUpHandler?: (event: fabric.IEvent) => void

  constructor(
    private colorsService: ColorsService,
    private figuresService: FiguresService
  ) {}

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
      this.colorFill = this.colorsService.getColorFill()
      this.colorBorder = this.colorsService.getColorBorder()
      this.circle = new fabric.Circle({
        radius: 1,
        fill: this.colorFill,
        left: pointer.x,
        top: pointer.y,
        stroke: this.colorBorder,
        strokeWidth: 15
      })
      this.canvas.add(this.circle)
      this.figuresService.addFigure({
        name: 'circle',
        pointers: [],
        radius: 1,
        fill: this.colorFill,
        left: pointer.x,
        top: pointer.y,
        stroke: this.colorBorder,
      }, true)
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
      const newLeft = pointer.x<this.initCoordinates.x?pointer.x:this.initCoordinates.x
      const newTop = pointer.y<this.initCoordinates.y?pointer.y:this.initCoordinates.y  
      this.circle?.set({
        radius: radio/3,
        left: newLeft,
        top: newTop
      })
      this.figuresService.updateFigure({
        name: 'circle',
        pointers: [],
        radius: radio/3,
        fill: this.colorFill,
        left: newLeft,
        top: newTop,
        stroke: this.colorBorder,
      }, true)
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

  public drawCircleByObject(circle: any): void {
    this.circle = new fabric.Circle({
      radius: circle.radius,
      fill: circle.fill,
      left: circle.left,
      top: circle.top,
      stroke: circle.stroke,
      strokeWidth: 15
    })
    this.canvas.add(this.circle)
    this.figuresService.addFigure({
      name: 'circle',
      pointers: [],
      radius: circle.radius,
      fill: circle.fill,
      left: circle.left,
      top: circle.top,
      stroke: circle.stroke,
    }, false)
    this.canvas.requestRenderAll()
  }
}
