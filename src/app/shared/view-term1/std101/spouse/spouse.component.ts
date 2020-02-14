import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { AppService } from "src/app/services/app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-spouse-std",
  templateUrl: "./spouse.component.html",
  styleUrls: ["./spouse.component.scss"]
})
export class SpouseComponent implements OnInit {
  @Input("route") route: any;
  public pageWaitting: boolean = false;
  public spouse: any = {};

  constructor(
    private formBuilder: FormBuilder,
    public service: AppService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.pageWaitting = true;
    await this.getSpouse();

    console.log(this.spouse)
    this.pageWaitting = false;
  }

  private getSpouse = async () => {
    let http: any = await this.service.http.get(
      `101_spouse/get/${this.route.username}`
    );

    if (http.result.length > 0) {
      Object.keys(http.result[0]).forEach(key => {
        this.spouse[`${key}`] = http.result[0][key];
      });
    } else {
      this.spouse = null;
    }
  };
}
