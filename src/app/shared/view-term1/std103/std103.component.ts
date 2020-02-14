import { Component, OnInit, Input } from "@angular/core";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-std103-std",
  templateUrl: "./std103.component.html",
  styleUrls: ["./std103.component.scss"]
})
export class Std103Component implements OnInit {
  @Input("route") route: any;
  @Input("term") term: string;
  public teacherRemark: any = null;
  public pageWaitting: boolean = false;
  constructor(public service: AppService) {}

  async ngOnInit() {
    this.pageWaitting = true;
    await this.getRemark();
    this.pageWaitting = false;
  }

  private getRemark = async () => {
    let formData = new FormData();
    formData.append("username", this.route.username);
    formData.append("term", this.term),
      formData.append("year", this.service.yearOnSystem());
    let http_getRemark: any = await this.service.http.post(
      `103_teacherremark/get`,
      formData
    );

    if (http_getRemark.rowCount > 0) {
      this.teacherRemark = http_getRemark.result[0];
    } else {
      this.teacherRemark = null;
    }
    console.log("Remark", http_getRemark);
  };
}
