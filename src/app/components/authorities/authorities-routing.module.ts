import { CheckDocComponent } from "./check-doc/check-doc.component";
import { AuthoritiesComponent } from "./authorities.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChangePasswordComponent } from "src/app/shared/change-password/change-password.component";

const routes: Routes = [
  {
    path: "",
    component: AuthoritiesComponent,
    children: [
      { path: "checkdoc", component: CheckDocComponent },
      { path: "changepass", component: ChangePasswordComponent },
      { path: "", redirectTo: "/authorities/checkdoc", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthoritiesRoutingModule {}
