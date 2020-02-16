import { Component } from "@angular/core";
import { AppService } from "./services/app.service";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  year = new Date().getFullYear();
  loading = false;
  constructor(public service: AppService, private router: Router) {
    this.router.events.subscribe(async event => {
      // console.log(event)
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          await this.service.delay(200);
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  public onLogout = () => {
    this.service.alert.confirm("ยืนยันการออกจากระบบ").then((value: boolean) => {
      if (value) {
        this.service.localStorage.clear();
        this.router.navigate(["/home"]);
      }
    });
  };
}
