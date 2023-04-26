import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLoginComponent } from './pages/login/content-login/content-login.component';
import { ContentHomeComponent } from './pages/home/content-home/content-home.component';
import { ContentDrawingComponent } from './pages/drawing/content-drawing/content-drawing.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    title: 'Login - PAINT',
    component: ContentLoginComponent
  },
  {
    path: 'home',
    title: 'Home - PAINT',
    component: ContentHomeComponent
  },
  {
    path: 'drawing',
    title: 'Drawing - PAINT',
    component: ContentDrawingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
