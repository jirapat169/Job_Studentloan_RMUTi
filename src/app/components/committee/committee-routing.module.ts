import { HistoryBorrowComponent } from "./history-borrow/history-borrow.component";
import { StatisticsBorrowComponent } from "./statistics-borrow/statistics-borrow.component";
import { ChangePasswordComponent } from "./../../shared/change-password/change-password.component";
import { CommitteeComponent } from "./committee.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConfirmBorrowComponent } from "./confirm-borrow/confirm-borrow.component";
import { ViewTerm1Component } from "src/app/shared/view-term1/view-term1.component";
import { ViewTerm2Component } from "src/app/shared/view-term2/view-term2.component";

const routes: Routes = [
  {
    path: "",
    component: CommitteeComponent,
    children: [
      {
        path: "confirm",
        pathMatch: "prefix",
        children: [
          { path: "", component: ConfirmBorrowComponent },
          { path: "history/:username", component: HistoryBorrowComponent },
          { path: "1/:username/:role", component: ViewTerm1Component },
          { path: "2/:username/:role", component: ViewTerm2Component }
        ]
      },
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
