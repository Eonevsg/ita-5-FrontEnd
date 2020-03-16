import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormPageComponent } from './form-page/form-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {RouterModule, Routes} from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

const appRoutes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'form', component: FormPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FormPageComponent,
    NotFoundComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,{anchorScrolling: 'enabled'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
