import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-view-term2",
  templateUrl: "./view-term2.component.html",
  styleUrls: ["./view-term2.component.scss"]
})
export class ViewTerm2Component implements OnInit {
  public initialBorrow: any = null;
  public routeValue = {
    username: null, // Student
    role: null // "authorities", "committee"
  };
  public pageWaitting: boolean = false;

  constructor(
    public service: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.pageWaitting = true;
    this.routeValue = {
      username: this.route.snapshot.paramMap.get("username"),
      role: this.route.snapshot.paramMap.get("role")
    };
    await this.getInitialBorrow()
    this.pageWaitting = false;
  }

  private getInitialBorrow = async () => {
    let formData = new FormData();
    formData.append("username", this.routeValue.username);
    formData.append("year", this.service.yearOnSystem());
    formData.append("term", "2");

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
