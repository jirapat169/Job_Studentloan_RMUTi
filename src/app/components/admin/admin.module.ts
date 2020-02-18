import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { SharedModules } from "src/app/shared-modules";
import { StudentComponent } from "./student/student.component";
import { TeacherComponent } from "./teacher/teacher.component";
import { CommitteeComponent } from "./committee/committee.component";
import { AuthoritiesComponent } from "./authorities/authorities.component";
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { EditOrganizationComponent } from './edit-organization/edit-organization.component';
import { TimeBorrowComponent } from './time-borrow/time-borrow.component';

@NgModule({
  declarations: [
    AdminComponent,
    StudentComponent,
    TeacherComponent,
    CommitteeComponent,
    AuthoritiesComponent,
    ResetPassComponent,
    EditOrganizationComponent,
    TimeBorrowComponent
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModules]
})
export class AdminModule {}
