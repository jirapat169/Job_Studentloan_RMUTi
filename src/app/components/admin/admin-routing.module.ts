import { EditOrganizationComponent } from "./edit-organization/edit-organization.component";
import { CommitteeComponent } from "./committee/committee.component";
import { TeacherComponent } from "./teacher/teacher.component";
import { StudentComponent } from "./student/student.component";
import { AdminComponent } from "./admin.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthoritiesComponent } from "./authorities/authorities.component";
import { TimeBorrowComponent } from "./time-borrow/time-borrow.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "student", component: StudentComponent },
      { path: "teacher", component: TeacherComponent },
      { path: "committee", component: CommitteeComponent },
      { path: "authorities", component: AuthoritiesComponent },
      { path: "organization", component: EditOrganizationComponent },
      { path: "time-borrow", component: TimeBorrowComponent },
      { path: "", redirectTo: "/admin/committee", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
