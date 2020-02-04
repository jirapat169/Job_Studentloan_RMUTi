import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TeacherRoutingModule } from "./teacher-routing.module";
import { TeacherComponent } from "./teacher.component";
import { SharedModules } from "src/app/shared-modules";
import { Check103Component } from './check103/check103.component';

@NgModule({
  declarations: [TeacherComponent, Check103Component],
  imports: [CommonModule, TeacherRoutingModule, SharedModules]
})
export class TeacherModule {}
