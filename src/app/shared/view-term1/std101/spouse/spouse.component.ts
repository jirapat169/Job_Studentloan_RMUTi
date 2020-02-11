import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-spouse-std",
  templateUrl: "./spouse.component.html",
  styleUrls: ["./spouse.component.scss"]
})
export class SpouseComponent implements OnInit {
  @Input("route") route: string;
  constructor() {}

  ngOnInit() {
    console.log(this.route);
  }
}
