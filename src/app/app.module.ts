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
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClient,
} from "@angular/common/http";
import { AuthHttpInterceptor } from "./services/auth/auth-http-interceptor";
import { SearchPipe } from "./filter/list-filter";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { TextareaAutosizeModule } from "ngx-textarea-autosize";
import { FloattheadDirective } from './models/floatthead.directive';

import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const appRoutes: Routes = [
  { path: "details/:id", component: AnswerDetailsComponent },
  { path: "list", component: AnswerListComponent },
  { path: "home", component: HomePageComponent },
  { path: "form", component: FormPageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home" },
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
    SearchPipe,
    FooterComponent,
    HeaderComponent,
    FloattheadDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TextFieldModule,
    RouterModule.forRoot(appRoutes, { anchorScrolling: 'enabled'}),
    BrowserAnimationsModule,
    MatSortModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    TextareaAutosizeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    HeaderComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
