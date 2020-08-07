import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { appRouting, appRoutingProviders } from "./app.routing";

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
