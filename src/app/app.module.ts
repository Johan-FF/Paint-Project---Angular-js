import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentDrawingComponent } from './pages/drawing/content-drawing/content-drawing.component';
import { ContentHomeComponent } from './pages/home/content-home/content-home.component';
import { ContentLoginComponent } from './pages/login/content-login/content-login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PanelHerrramientasComponent } from './pages/drawing/panel-herrramientas/panel-herrramientas.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentDrawingComponent,
    ContentHomeComponent,
    ContentLoginComponent,
    ProfileComponent,
    PanelHerrramientasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
