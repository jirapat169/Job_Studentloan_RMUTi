import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-std101",
  templateUrl: "./std101.component.html",
  styleUrls: ["./std101.component.scss"]
})
export class Std101Component implements OnInit {
  @Input("route") route: string;
  constructor() {}

  ngOnInit() {
    console.log(this.route)
  }
}
