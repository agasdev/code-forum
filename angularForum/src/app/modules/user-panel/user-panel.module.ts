import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { UserPanelRoutingModule } from "./user-panel.routing";
import { MomentModule } from "angular2-moment";

import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { MainComponent } from './components/main/main.component';

import { UserService } from "../../services/user.service";
import { UserGuard } from "../../services/user.guard";

@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    ListComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    UserPanelRoutingModule,
    MomentModule
  ],
  exports: [
    AddComponent,
    EditComponent,
    ListComponent,
    MainComponent
  ],
  providers: [
    UserService,
    UserGuard
  ]
})

export class UserPanelModule { }
