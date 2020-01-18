import { TeacherComponent } from "./teacher.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChangePasswordComponent } from "src/app/shared/change-password/change-password.component";

const routes: Routes = [
  {
    path: "",
    component: TeacherComponent,
    children: [{ path: "changepass", component: ChangePasswordComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}
