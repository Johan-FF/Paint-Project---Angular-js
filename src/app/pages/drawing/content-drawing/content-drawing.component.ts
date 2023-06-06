import { Component } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { fabric } from 'fabric'
import { UserInterface } from 'src/app/models/iuser.interface'
import { ImgLocations } from 'src/app/models/location-img.model'
import { UpdateDrawService } from 'src/app/services/api-draws/update-draw.service'
import { AuthService } from 'src/app/services/api-users/auth.service'
import { UserService } from 'src/app/services/api-users/user.service'
import { CircleService } from 'src/app/services/canvas/circle.service'
import { ColorsService } from 'src/app/services/canvas/colors.service'
import { FiguresService } from 'src/app/services/canvas/figures.service'
import { LineService } from 'src/app/services/canvas/line.service'
import { RegularPolygonService } from 'src/app/services/canvas/regular-polygon.service'

@Component({
  selector: 'app-content-drawing',
  templateUrl: './content-drawing.component.html',
  styleUrls: ['./content-drawing.component.css']
})
export class ContentDrawingComponent {
  private canDraw: boolean = true
  public copiedLink: boolean = false
  public users: UserInterface[] = []
  public idUsers: number[] = []
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
    private regularPolygon: RegularPolygonService,
    private colorsService: ColorsService,
    private updateDrawService: UpdateDrawService,
    private userService: UserService,
    private figuresService: FiguresService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
  ){
    this.route.params.subscribe((params: Params) => {
      this.authService.setDrawId(params['id'])
    })
    this.updateDrawService.subscribeToMessages().subscribe({
      next: (data) => {
        this.canDraw = false
        const figures = data.figures
        this.figuresService.deleteAll()
        this._canvas.clear()
        figures.forEach((figure: any) => {
          if(figure.name==='circle')
            this.circle.drawCircleByObject(figure)
          else if(figure.name==='line')
            this.line.drawLineByObject(figure)
          else if(figure.name==='polygon')
            this.regularPolygon.drawRegularPolygonByObject(figure)
        })
        this.canDraw = true
        this.updateUsersActivated(data)
      },
      error: (e) => {
        console.log(e)
      }
    }
  )
  }

  public updateUsersActivated(data: any): void {
    const usersDiference = data.users.filter((item: any) => !this.users.includes(item))
    usersDiference.forEach((user: any) => {
      this.userService.getUser(user).subscribe({
        next: (exit) => {
          if(this.idUsers.includes(user)){
            this.users.forEach((userNow, key) => {
              if(userNow.name == exit.name)
                this.users.splice(key)
            })
            this.idUsers.splice(this.idUsers.indexOf(user))
          } else if(data.users.includes(user) && user!=this.authService.getId()){
            this.users.push({
              name: exit.name,
              last_name: exit.last_name,
              nickname: exit.nickname,
              email: exit.email,
              password: exit.password,
            })
            this.idUsers.push(user)
          }
        },
        error: (e) => {
          console.log(e)
        }
      })
    })
  } 

  public drawLine(): void {
    this.configDrawing()
    if(this.canDraw)
      this.line.drawLine()
  }

  public drawCircle(): void {
    this.configDrawing()
    if(this.canDraw)
      this.circle.drawCircle()
  }

  public drawRegularPolygon(): void {
    if( this.numSides>2 ){
      this.configDrawing()
      if(this.canDraw)
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
    this.copiedLink = false
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

  public fillColorSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const selectedColor = inputElement.value;
    this.colorsService.setColorFill(selectedColor)
  }

  public borderColorSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const selectedColor = inputElement.value;
    this.colorsService.setColorBorder(selectedColor)
  }

  public redirectHome(): void {
    this.updateDrawService.disconnect()
    this.router.navigate(['/home'])
  }

  public copyCode() {
    const el = document.createElement('textarea')
    el.value = this.authService.getDrawId().toString()
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    this.copiedLink = true
  }
}
