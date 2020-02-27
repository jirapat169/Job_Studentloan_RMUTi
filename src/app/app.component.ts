import { Component, OnDestroy, OnInit } from "@angular/core";
import { AppService } from "./services/app.service";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  ActivatedRoute
} from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  year = new Date().getFullYear();
  loading = false;
  public hideNav: boolean = false;

  ngOnInit() {}

  ngOnDestroy() {}

  constructor(
    public service: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe(async event => {
      // console.log(this.router.url);
      this.hideNav = this.router.url.split("/")[1] == "test"

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
