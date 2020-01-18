import { Term1Component } from "./borrow/term1/term1.component";
import { HistoryComponent } from "./history/history.component";
import { StatusComponent } from "./status/status.component";
import { BorrowComponent } from "./borrow/borrow.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StudentComponent } from "./student.component";
import { ChangePasswordComponent } from "src/app/shared/change-password/change-password.component";
import { Term2Component } from "./borrow/term2/term2.component";

const routes: Routes = [
  {
    path: "",
    component: StudentComponent,
    children: [
      {
        path: "borrow",
        pathMatch: "prefix",
        children: [
          {
            path: "",
            component: BorrowComponent
          },
          {
            path: "1",
            component: Term1Component
          },
          {
            path: "2",
            component: Term2Component
          }
        ]
      },
      { path: "status", component: StatusComponent },
      { path: "history", component: HistoryComponent },
      { path: "changepass", component: ChangePasswordComponent },
      { path: "", redirectTo: "/student/borrow", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
