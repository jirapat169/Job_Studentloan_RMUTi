import { Component, OnInit, Input } from "@angular/core";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-std101-std",
  templateUrl: "./std101.component.html",
  styleUrls: ["./std101.component.scss"]
})
export class Std101Component implements OnInit {
  @Input("route") route: any;
  public stepper: number = 0;

  constructor(public service: AppService) {}

  async ngOnInit() {
    console.log(this.route);
  }
}
