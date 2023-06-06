import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestStatus } from 'src/app/models/request-status.model';
import { UserInterface } from 'src/app/models/iuser.interface';
import { SingupService } from 'src/app/services/api-users/singup.service';

@Component({
  selector: 'app-content-singup',
  templateUrl: './content-singup.component.html',
  styleUrls: ['./content-singup.component.css']
})
export class ContentSingupComponent {
  public form!: FormGroup
  public status: RequestStatus["singup"] = 'InProgress'
  public labelsError = [
    { name: 'nombre', esVisible: [false, false]},
    { name: 'apellido', esVisible: [false, false]},
    { name: 'nickname', esVisible: [false, false]},
    { name: 'email', esVisible: [false, false]},
    { name: 'password', esVisible: [false, false]},
    { name: 'con_password', esVisible: [false, false]},
    { name: 'password_igual', esVisible: [false, false]},
  ]

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _api: SingupService
  ){}

  public ngOnInit(): void {
    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    return this._fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      nickname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.required]),
      con_password: new FormControl('', [Validators.minLength(8), Validators.required])
    })
  }

  public enviarFormulario(): void {
    this.verificarInputs()
    if( this.form.valid ){
      const user: UserInterface = {
        name: this.form.get('nombre')?.value,
        last_name: this.form.get('apellido')?.value,
        nickname: this.form.get('nickname')?.value,
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value
      }
      this._api.createNewUser(user)
      .subscribe({
        next: () => {
          this.status = 'Correct'
        },
        error: (e) => {
          if( e.error.message==='UserError' ){
            this.status = 'UserError'
          }
        }
      })
    }
  }

  private verificarInputs(): void {
    this.labelsError.map(label => {
      const control = this.form.get(label.name)

      if( control?.value == '' ){label.esVisible[0] = true}
      else {
        label.esVisible[0] = false
        if( control?.valid ) {label.esVisible[1] = false}
        else {label.esVisible[1] = true}
      }
    })

    if( this.form.get('password')?.value != this.form.get('con_password')?.value ){
      this.labelsError[6].esVisible[0] = true
    } else {
      this.labelsError[6].esVisible[0] = false
    }
  }

  public navegarASingin(): void {
    this._router.navigate(['/login'])
  }
}
