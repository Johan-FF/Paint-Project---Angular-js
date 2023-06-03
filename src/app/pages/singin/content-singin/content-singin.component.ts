import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInterface } from 'src/app/models/login.interface';
import { RequestStatus } from 'src/app/models/request-status.model';
import { LoginService } from 'src/app/services/api-users/login.service';

@Component({
  selector: 'app-content-singin',
  templateUrl: './content-singin.component.html',
  styleUrls: ['./content-singin.component.css']
})
export class ContentSinginComponent {
  public form!: FormGroup
  public status: RequestStatus["singin"] = 'Correct' 
  public labelsError = [
    { name: 'email', esVisible: [false, false] },
    { name: 'password', esVisible: [false, false] }
  ]

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _api: LoginService
  ) {}

  public ngOnInit(): void {
    this.form = this.createForm();
  }

  private createForm(): FormGroup{
    return this._fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  public enviarFormulario(): void {
    this.verificarInputs()
    if( this.form.valid ){
      const user: LoginInterface = this.form.value  
      this._api.loginByEmail(user)
      .subscribe({
        next: () => {
          this.status = 'Correct'
          this._router.navigate(['/home'])
        },
        error: (e) => {
          if( e.error.message==='PasswordError' ){
            this.status = 'PasswordError'
          } else if( e.error.message==='EmailError' ) {
            this.status = 'EmailError'
          }
        }
      })
    }
  }

  private verificarInputs(): void {
    this.labelsError.map(label => {
      const control = this.form.get(label.name)

      if( control?.value == '' ) {label.esVisible[0] = true}
      else {
        label.esVisible[0] = false
        if( control?.valid ) {label.esVisible[1] = false}
        else {label.esVisible[1] = true}
      }

    });
  }

  public navegarARegistro(): void {
    this._router.navigate(['/singup'])
  }
}
