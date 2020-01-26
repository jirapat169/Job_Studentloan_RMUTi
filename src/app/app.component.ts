import { Component } from "@angular/core";
import { AppService } from "./services/app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  year = new Date().getFullYear();
  constructor(public service: AppService, private router: Router) {}

  public onLogout = () => {
    this.service.alert.confirm("ยืนยันการออกจากะบบ").then((value: boolean) => {
      if (value) {
        this.service.localStorage.clear();
        this.router.navigate(["/index"]);
      }
    });
  };
}
