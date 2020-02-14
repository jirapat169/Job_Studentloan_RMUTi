import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { AppService } from "src/app/services/app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-non-parent-std",
  templateUrl: "./non-parent.component.html",
  styleUrls: ["./non-parent.component.scss"]
})
export class NonParentComponent implements OnInit {
  @Input("route") route: any;
  public pageWaitting: boolean = false;
  public nonParent: any = {};

  constructor(
    private formBuilder: FormBuilder,
    public service: AppService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.pageWaitting = true;
    await this.getNonParent();

    console.log(this.nonParent);
    this.pageWaitting = false;
  }

  private getNonParent = async () => {
    let http: any = await this.service.http.get(
      `101_parent/get/${this.route.username}`
    );

    if (http.result.length > 0) {
      Object.keys(http.result[0]).forEach(key => {
        this.nonParent[`${key}`] = http.result[0][key];
      });
    }else{
      this.nonParent == null;
    }
  };
}
