import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  private colorBorder: string = '#EEEEEE'
  private colorFill: string = '#EEEEEE90'

  public getColorBorder(): string {
    return this.colorBorder
  }

  public getColorFill(): string {
    return this.colorFill
  }

  public setColorFill(newColor: string): void {
    this.colorFill = newColor
  }

  public setColorBorder(newColor: string): void {
    this.colorBorder = newColor
  }
}
