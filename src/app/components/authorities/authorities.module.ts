import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthoritiesRoutingModule } from './authorities-routing.module';
import { AuthoritiesComponent } from './authorities.component';


@NgModule({
  declarations: [AuthoritiesComponent],
  imports: [
    CommonModule,
    AuthoritiesRoutingModule
  ]
})
export class AuthoritiesModule { }
