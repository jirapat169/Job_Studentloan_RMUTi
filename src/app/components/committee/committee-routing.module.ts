import { StatisticsBorrowComponent } from "./statistics-borrow/statistics-borrow.component";
import { ChangePasswordComponent } from "./../../shared/change-password/change-password.component";
import { CommitteeComponent } from "./committee.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConfirmBorrowComponent } from "./confirm-borrow/confirm-borrow.component";

const routes: Routes = [
  {
    path: "",
    component: CommitteeComponent,
    children: [
      { path: "confirm", component: ConfirmBorrowComponent },
      { path: "statistice", component: StatisticsBorrowComponent },
      { path: "changepass", component: ChangePasswordComponent },
      { path: "", redirectTo: "/committee/confirm", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommitteeRoutingModule {}
