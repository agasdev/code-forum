import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { UserPanelRoutingModule } from "./user-panel.routing";

import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { MainComponent } from './components/main/main.component';

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
    UserPanelRoutingModule
  ],
  exports: [
    AddComponent,
    EditComponent,
    ListComponent,
    MainComponent
  ],
  providers: []
})

export class UserPanelModule { }
