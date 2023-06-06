import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentHomeComponent } from './pages/home/content-home/content-home.component';
import { ContentDrawingComponent } from './pages/drawing/content-drawing/content-drawing.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { ContentSingupComponent } from './pages/singup/content-singup/content-singup.component';
import { ContentSinginComponent } from './pages/singin/content-singin/content-singin.component';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    title: 'Login - PAINT',
    component: ContentSinginComponent
  },
  {
    path: 'singup',
    title: 'Singup - PAINT',
    component: ContentSingupComponent 
  },
  {
    path: 'home',
    title: 'Home - PAINT',
    component: ContentHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'drawing/:id',
    title: 'Drawing - PAINT',
    component: ContentDrawingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'error-404',
    pathMatch: 'full'
  },
  {
    path: 'error-404',
    title: 'Error 404',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
