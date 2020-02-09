import { ViewTerm1Component } from "src/app/shared/view-term1/view-term1.component";
import { ViewTerm2Component } from "src/app/shared/view-term2/view-term2.component";
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
      {
        path: "checkdoc",
        pathMatch: "prefix",
        children: [
          { path: "", component: CheckDocComponent },
          { path: "1/:username/:role", component: ViewTerm1Component },
          { path: "2/:username/:role", component: ViewTerm2Component }
        ]
      },
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
