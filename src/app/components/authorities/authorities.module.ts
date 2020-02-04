import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthoritiesRoutingModule } from "./authorities-routing.module";
import { AuthoritiesComponent } from "./authorities.component";
import { CheckDocComponent } from "./check-doc/check-doc.component";
import { SharedModules } from "src/app/shared-modules";

@NgModule({
  declarations: [AuthoritiesComponent, CheckDocComponent],
  imports: [CommonModule, AuthoritiesRoutingModule, SharedModules]
})
export class AuthoritiesModule {}
