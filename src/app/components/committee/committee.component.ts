import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-committee",
  templateUrl: "./committee.component.html",
  styleUrls: ["./committee.component.scss"]
})
export class CommitteeComponent implements OnInit {
  constructor(public service: AppService) {}

  ngOnInit() {}
}
