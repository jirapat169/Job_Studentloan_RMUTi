import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-view-term1",
  templateUrl: "./view-term1.component.html",
  styleUrls: ["./view-term1.component.scss"]
})
export class ViewTerm1Component implements OnInit {
  public routeValue = {
    username: null, // Student
    role: null // "authorities", "committee"
  };
  public initialBorrow: any = null;
  public tabIndex: number = 0;
  public pageWaitting: boolean = false;

  //  ---- 101 ----

  constructor(
    public service: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public tabSelect = event => {
    this.tabIndex = event.index;
  };

  async ngOnInit() {
    this.pageWaitting = true;
    this.routeValue = {
      username: this.route.snapshot.paramMap.get("username"),
      role: this.route.snapshot.paramMap.get("role")
    };
    // console.log("route", this.routeValue);
    await this.getInitialBorrow();
    this.pageWaitting = false;
  }

  private getInitialBorrow = async () => {
    let formData = new FormData();
    formData.append("username", this.routeValue.username);
    formData.append("year", this.service.yearOnSystem());
    formData.append("term", "1");

    let http_getInitialBorrow: any = await this.service.http.post(
      "Initial_borrow/get",
      formData
    );
    if (http_getInitialBorrow.rowCount > 0) {
      this.initialBorrow = http_getInitialBorrow.result[0];
    }
    console.log("initialBorrow", this.initialBorrow);
  };
}
