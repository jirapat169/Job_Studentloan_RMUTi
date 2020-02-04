import { TeacherComponent } from "./teacher.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChangePasswordComponent } from "src/app/shared/change-password/change-password.component";
import { Check103Component } from "./check103/check103.component";

const routes: Routes = [
  {
    path: "",
    component: TeacherComponent,
    children: [
      { path: "check103", component: Check103Component },
      { path: "changepass", component: ChangePasswordComponent },
      { path: "", redirectTo: "/teacher/check103", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}
