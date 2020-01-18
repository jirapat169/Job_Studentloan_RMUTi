import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TeacherRoutingModule } from "./teacher-routing.module";
import { TeacherComponent } from "./teacher.component";
import { SharedModules } from "src/app/shared-modules";

@NgModule({
  declarations: [TeacherComponent],
  imports: [CommonModule, TeacherRoutingModule, SharedModules]
})
export class TeacherModule {}
