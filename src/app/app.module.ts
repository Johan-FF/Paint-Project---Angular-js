import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentDrawingComponent } from './pages/drawing/content-drawing/content-drawing.component';
import { ContentHomeComponent } from './pages/home/content-home/content-home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContentSingupComponent } from './pages/singup/content-singup/content-singup.component';
import { ContentSinginComponent } from './pages/singin/content-singin/content-singin.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentDrawingComponent,
    ContentHomeComponent,
    ProfileComponent,
    PageNotFoundComponent,
    ContentSingupComponent,
    ContentSinginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
