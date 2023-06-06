import { Injectable } from '@angular/core';
import { FigureInterface } from 'src/app/models/ifigure.interface';
import { UpdateDrawService } from '../api-draws/update-draw.service';

@Injectable({
  providedIn: 'root'
})
export class FiguresService {
  private figures: FigureInterface[] = []

  constructor(
    private updateDrawWS: UpdateDrawService
  ) {}

  public addFigure(figure: FigureInterface, isOwner: boolean): void {
    this.figures.unshift(figure)
    if(isOwner)
      this.updateDrawWS.sendFigures(this.figures)
  }

  public updateFigure(newData: FigureInterface, isOwner: boolean): void {
    this.figures[0] = newData
    if(isOwner)
      this.updateDrawWS.sendFigures(this.figures)
  }

  public updateAllFigure(newData: FigureInterface[]): void {
    this.figures = newData
  }

  public deleteFirst(): void {
    this.figures.splice(0)
  }

  public deleteAll(): void {
    this.figures.splice(0,this.figures.length)
  }
}
