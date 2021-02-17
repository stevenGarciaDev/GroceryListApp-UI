import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListComponent } from './pages/list/list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { GroceryItemComponent } from './components/grocery-item/grocery-item.component';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { AuthService } from './services/auth/auth.service';
import { GroceryListService } from './services/grocery-list/grocery-list.service';
import { AuthGuard } from './services/auth-guard/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    NavbarComponent,
    LoginComponent,
    SignUpComponent,
    GroceryItemComponent,
    AddItemFormComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      },
      {
        path: 'grocery-list/:userId',
        component: ListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]),
  ],
  providers: [
    HttpClient,
    AuthService,
    GroceryListService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
