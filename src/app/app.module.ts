import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormPageComponent } from './form-page/form-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {RouterModule, Routes} from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

import { FormsModule } from "@angular/forms";

import { ReactiveFormsModule } from "@angular/forms";
import { AnswerListComponent } from './answer-list/answer-list.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {path: 'list', component: AnswerListComponent},
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
    AnswerListComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes,{anchorScrolling: 'enabled'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
