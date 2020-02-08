import { Component, OnInit } from "@angular/core";
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"]
})
export class StudentComponent implements OnInit {
  constructor(public service:AppService) {}

  ngOnInit() {}
}
