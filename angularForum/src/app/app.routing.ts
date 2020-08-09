import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { TopicsComponent } from "./components/topics/topics.component";
import { TopicDetailComponent } from "./components/topic-detail/topic-detail.component";
import { UserGuard } from "./services/user.guard";
import { NoIdentityGuard } from "./services/no-identity.guard";
import { UsersComponent } from "./components/users/users.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SearchComponent } from "./components/search/search.component";

const appRoutes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home",canActivate:[NoIdentityGuard], component: HomeComponent},
  {path: "login", canActivate:[NoIdentityGuard], component: LoginComponent},
  {path: "register", canActivate:[NoIdentityGuard], component: RegisterComponent},
  {path: "settings", canActivate:[UserGuard], component: UserEditComponent},
  {path: "topics", component: TopicsComponent},
  {path: "topics/:page", component: TopicsComponent},
  {path: "topic/:id", component: TopicDetailComponent},
  {path: "users", component: UsersComponent},
  {path: "profile/:id", component: ProfileComponent},
  {path: "search/:search", component: SearchComponent},
  {path: "**", component: HomeComponent},
];

export const appRoutingProviders: any[] = [];
export const appRouting: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
