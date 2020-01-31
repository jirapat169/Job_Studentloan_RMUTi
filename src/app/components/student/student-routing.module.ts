import { TeacherRemarkComponent } from "./borrow/shared/103/teacher-remark/teacher-remark.component";
import { NonParentComponent } from "./borrow/shared/101/non-parent/non-parent.component";
import { View101Component } from "./borrow/shared/101/view101/view101.component";
import { Term1Component } from "./borrow/term1/term1.component";
import { HistoryComponent } from "./history/history.component";
import { StatusComponent } from "./status/status.component";
import { BorrowComponent } from "./borrow/borrow.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StudentComponent } from "./student.component";
import { ChangePasswordComponent } from "src/app/shared/change-password/change-password.component";
import { Term2Component } from "./borrow/term2/term2.component";
import { StudentTerm1Guard } from "src/app/guards/student-term1.guard";
import { StudentTerm2Guard } from "src/app/guards/student-term2.guard";
import { NewsComponent } from "./borrow/term1/news/news.component";
import { OldComponent } from "./borrow/term1/old/old.component";
import { ProfileComponent } from "./borrow/shared/101/profile/profile.component";
import { ParentComponent } from "./borrow/shared/101/parent/parent.component";
import { SpouseComponent } from "./borrow/shared/101/spouse/spouse.component";
import { IncomeComponent } from "./borrow/shared/102/income/income.component";
import { MapComponent } from "./borrow/shared/104/map/map.component";
import { DocComponent } from "./borrow/term1/news/doc/doc.component";

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
            pathMatch: "prefix",
            canActivate: [StudentTerm1Guard],
            children: [
              {
                path: "",
                component: Term1Component
              },
              {
                path: "new",
                component: NewsComponent,
                children: [
                  {
                    path: "101",
                    component: View101Component,
                    children: [
                      {
                        path: "profile",
                        component: ProfileComponent
                      },
                      {
                        path: "parent",
                        component: ParentComponent
                      },
                      {
                        path: "nparent",
                        component: NonParentComponent
                      },
                      {
                        path: "spouse",
                        component: SpouseComponent
                      },
                      {
                        path: "",
                        redirectTo: "/student/borrow/1/new/101/profile",
                        pathMatch: "full"
                      }
                    ]
                  },
                  {
                    path: "102",
                    pathMatch: "prefix",
                    children: [
                      {
                        path: "income",
                        component: IncomeComponent
                      },
                      {
                        path: "",
                        redirectTo: "/student/borrow/1/new/102/income",
                        pathMatch: "full"
                      }
                    ]
                  },
                  {
                    path: "103",
                    pathMatch: "prefix",
                    children: [
                      {
                        path: "teacher-remark",
                        component: TeacherRemarkComponent
                      },
                      {
                        path: "",
                        redirectTo: "/student/borrow/1/new/103/teacher-remark",
                        pathMatch: "full"
                      }
                    ]
                  },
                  {
                    path: "104",
                    pathMatch: "prefix",
                    children: [
                      {
                        path: "map",
                        component: MapComponent
                      },
                      {
                        path: "",
                        redirectTo: "/student/borrow/1/new/104/map",
                        pathMatch: "full"
                      }
                    ]
                  },
                  {
                    path: "doc",
                    pathMatch: "prefix",
                    children: [
                      {
                        path: "",
                        component: DocComponent
                      }
                    ]
                  },
                  {
                    path: "",
                    redirectTo: "/student/borrow/1/new/101/profile",
                    pathMatch: "full"
                  }
                ]
              },
              {
                path: "old",
                component: OldComponent
              }
            ]
          },
          {
            path: "2",
            pathMatch: "prefix",
            canActivate: [StudentTerm2Guard],
            children: [
              {
                path: "",
                component: Term2Component
              }
            ]
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
