import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CommitteeRoutingModule } from "./committee-routing.module";
import { CommitteeComponent } from "./committee.component";
import { ConfirmBorrowComponent } from "./confirm-borrow/confirm-borrow.component";
import { StatisticsBorrowComponent } from "./statistics-borrow/statistics-borrow.component";
import { SharedModules } from "src/app/shared-modules";
import { HistoryBorrowComponent } from "./history-borrow/history-borrow.component";
import { ParentComponent } from './parent/parent.component';

@NgModule({
  declarations: [
    CommitteeComponent,
    ConfirmBorrowComponent,
    StatisticsBorrowComponent,
    HistoryBorrowComponent,
    ParentComponent
  ],
  imports: [CommonModule, CommitteeRoutingModule, SharedModules]
})
export class CommitteeModule {}
