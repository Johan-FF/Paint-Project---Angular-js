import { Injectable } from '@angular/core';
import { fabric } from 'fabric'
import { ColorsService } from './colors.service';
import { FiguresService } from './figures.service';

@Injectable({
  providedIn: 'root'
})
export class LineService {
  private canvas!: fabric.Canvas
  private line: fabric.Line | null = null
  private mouseDown: boolean = false
  private initPointer: number[] = []
  private colorFill: string = ''
  private mouseDownHandler?: (event: fabric.IEvent) => void 
  private mouseMoveHandler?: (event: fabric.IEvent) => void
  private mouseUpHandler?: (event: fabric.IEvent) => void

  constructor(
    private colorsService: ColorsService,
    private figuresServices: FiguresService
  ) {}

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
      this.colorFill = this.colorsService.getColorFill()
      this.initPointer = [pointer.x, pointer.y]
      const newPointers = [pointer.x, pointer.y, pointer.x, pointer.y]
      this.line = new fabric.Line(newPointers , {
        stroke: this.colorFill,
        strokeWidth: 5,
        selectable: false
      })
      this.canvas.add(this.line)
      this.figuresServices.addFigure({
        name: 'line',
        pointers: newPointers,
        radius: 0,
        fill: this.colorFill,
        left: 0,
        top: 0,
        stroke: '',
      }, true)
      this.canvas.requestRenderAll()
    }
  }

  private startDrawingLine(event: fabric.IEvent): void {
    if( this.mouseDown ){
      const pointer = this.canvas.getPointer(event.e)
      const newPointers = [
        this.initPointer[0],
        this.initPointer[1],
        pointer.x,
        pointer.y
      ]
      this.line?.set({
        x2: pointer?.x,
        y2: pointer?.y
      })
      this.figuresServices.updateFigure({
        name: 'line',
        pointers: newPointers,
        radius: 0,
        fill: this.colorFill,
        left: 0,
        top: 0,
        stroke: '',
      }, true)
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

  public getLine(): fabric.Line | null {
    return this.line
  }

  public drawLineByObject(line: any): void {
    this.line = new fabric.Line(line.pointers , {
      stroke: line.fill,
      strokeWidth: 5,
      selectable: false
    })
    this.canvas.add(this.line)
    this.figuresServices.addFigure({
      name: 'line',
      pointers: line.pointers,
      radius: 0,
      fill: line.fill,
      left: 0,
      top: 0,
      stroke: '',
    }, false)
    this.canvas.requestRenderAll()
  }
}
