import { HttpClientModule } from "@angular/common/http";
import { StudentTerm2Guard } from "./guards/student-term2.guard";
import { StudentTerm1Guard } from "./guards/student-term1.guard";
import { StudentGuard } from "./guards/student.guard";
import { TeacherGuard } from "./guards/teacher.guard";
import { CommitteeGuard } from "./guards/committee.guard";
import { AdminGuard } from "./guards/admin.guard";
import { AppService } from "./services/app.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModules } from "./shared-modules";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { IndexComponent } from "./components/index/index.component";
import { ContactComponent } from "./components/contact/contact.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { BackgroundComponent } from './components/index/background/background.component';
import { PropertyComponent } from './components/index/property/property.component';
import { StepComponent } from './components/index/step/step.component';
import { HomeComponent } from './components/index/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    ContactComponent,
    NotfoundComponent,
    StatisticsComponent,
    BackgroundComponent,
    PropertyComponent,
    StepComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModules
  ],
  providers: [
    AppService,
    AdminGuard,
    CommitteeGuard,
    TeacherGuard,
    StudentGuard,
    StudentTerm1Guard,
    StudentTerm2Guard,
    { provide: MAT_DATE_LOCALE, useValue: "th-TH" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
