import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { appRouting, appRoutingProviders } from "./app.routing";
import { AngularFileUploaderModule } from "angular-file-uploader";
import { UserPanelModule } from "./modules/user-panel/user-panel.module";
import { MomentModule } from "angular2-moment";
import { NgxHighlightJsModule } from "@nowzoo/ngx-highlight-js";
import { UserGuard } from "./services/user.guard";
import { NoIdentityGuard } from "./services/no-identity.guard";
import { UserService } from "./services/user.service";

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from "@angular/forms";
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    UserEditComponent,
    TopicsComponent,
    TopicDetailComponent,
    UsersComponent,
    ProfileComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    UserPanelModule,
    MomentModule,
    NgxHighlightJsModule.forRoot()
  ],
  providers: [
    appRoutingProviders,
    UserGuard,
    UserService,
    NoIdentityGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
