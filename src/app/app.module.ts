import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { FormPageComponent } from "./form-page/form-page.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { TextFieldModule } from "@angular/cdk/text-field";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AnswerListComponent } from "./answer-list/answer-list.component";
import { AnswerDetailsComponent } from "./answer-details/answer-details.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CustomHttpInterceptor } from "./services/auth/custom-http-interceptor";
import { SearchPipe } from './filter/list-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSortModule} from '@angular/material/sort';

const appRoutes: Routes = [
  { path: "details/:id", component: AnswerDetailsComponent },
  { path: "list", component: AnswerListComponent },
  { path: "home", component: HomePageComponent },
  { path: "form", component: FormPageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FormPageComponent,
    NotFoundComponent,
    AnswerListComponent,
    LoginPageComponent,
    AnswerDetailsComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TextFieldModule,
    RouterModule.forRoot(appRoutes, { anchorScrolling: "enabled" }),
    BrowserAnimationsModule,
    MatSortModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
