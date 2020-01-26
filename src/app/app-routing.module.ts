import { AuthoritiesGuard } from "./guards/authorities.guard";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { StudentGuard } from "./guards/student.guard";
import { TeacherGuard } from "./guards/teacher.guard";
import { CommitteeGuard } from "./guards/committee.guard";
import { AdminGuard } from "./guards/admin.guard";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { ContactComponent } from "./components/contact/contact.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IndexComponent } from "./components/index/index.component";

const routes: Routes = [
  { path: "index", component: IndexComponent },
  { path: "statistics", component: StatisticsComponent },
  { path: "contact", component: ContactComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "admin",
    loadChildren: () =>
      import("./components/admin/admin.module").then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path: "committee",
    loadChildren: () =>
      import("./components/committee/committee.module").then(
        m => m.CommitteeModule
      ),
    canActivate: [CommitteeGuard]
  },
  {
    path: "teacher",
    loadChildren: () =>
      import("./components/teacher/teacher.module").then(m => m.TeacherModule),
    canActivate: [TeacherGuard]
  },
  {
    path: "student",
    loadChildren: () =>
      import("./components/student/student.module").then(m => m.StudentModule),
    canActivate: [StudentGuard]
  },
  {
    path: "authorities",
    loadChildren: () =>
      import("./components/authorities/authorities.module").then(
        m => m.AuthoritiesModule
      ),
    canActivate: [AuthoritiesGuard]
  },
  { path: "", redirectTo: "/index", pathMatch: "full" },
  {
    path: "**",
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
