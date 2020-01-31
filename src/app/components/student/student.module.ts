import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StudentRoutingModule } from "./student-routing.module";
import { StudentComponent } from "./student.component";
import { SharedModules } from "src/app/shared-modules";
import { BorrowComponent } from "./borrow/borrow.component";
import { StatusComponent } from "./status/status.component";
import { HistoryComponent } from "./history/history.component";
import { Term1Component } from "./borrow/term1/term1.component";
import { Term2Component } from "./borrow/term2/term2.component";
import { ProfileComponent } from "./borrow/shared/101/profile/profile.component";
import { ParentComponent } from "./borrow/shared/101/parent/parent.component";
import { NonParentComponent } from "./borrow/shared/101/non-parent/non-parent.component";
import { SpouseComponent } from "./borrow/shared/101/spouse/spouse.component";
import { IncomeComponent } from "./borrow/shared/102/income/income.component";
import { TeacherRemarkComponent } from "./borrow/shared/103/teacher-remark/teacher-remark.component";
import { MapComponent } from "./borrow/shared/104/map/map.component";
import { NewsComponent } from './borrow/term1/news/news.component';
import { OldComponent } from './borrow/term1/old/old.component';
import { View101Component } from './borrow/shared/101/view101/view101.component';
import { DocComponent } from './borrow/term1/news/doc/doc.component';

@NgModule({
  declarations: [
    StudentComponent,
    BorrowComponent,
    StatusComponent,
    HistoryComponent,
    Term1Component,
    Term2Component,
    ProfileComponent,
    ParentComponent,
    NonParentComponent,
    SpouseComponent,
    IncomeComponent,
    TeacherRemarkComponent,
    MapComponent,
    NewsComponent,
    OldComponent,
    View101Component,
    DocComponent,
  ],
  imports: [CommonModule, StudentRoutingModule, SharedModules]
})
export class StudentModule {}
