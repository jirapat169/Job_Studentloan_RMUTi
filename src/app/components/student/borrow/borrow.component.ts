import { AppService } from "./../../../services/app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-borrow",
  templateUrl: "./borrow.component.html",
  styleUrls: ["./borrow.component.scss"]
})
export class BorrowComponent implements OnInit {
  constructor(public service: AppService) {}

  ngOnInit() {}
}
