import { NgModule } from "@angular/core";
// @ts-ignore
import { Routes, RouterModule } from "@angular/router";

import { MainComponent } from "./components/main/main.component";
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';

const userPanelRoutes: Routes = [
  {
    path: "panel",
    component: MainComponent,
    children: [
      {path: "", component: ListComponent},
      {path: "create", component: AddComponent},
      {path: "list", component: ListComponent},
      {path: "edit/:id", component: EditComponent},
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(userPanelRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class UserPanelRoutingModule { }
