import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-confirm101",
  templateUrl: "./confirm101.component.html",
  styleUrls: ["./confirm101.component.scss"]
})
export class Confirm101Component implements OnInit {
  constructor(public service: AppService) {}

  ngOnInit() {}

  public submitConfirm = async () => {
    let confirmData: any = await this.service.alert.confirm(
      "ยืนยันข้อมูล กยศ.101"
    );
    if (confirmData) {
      let formData = new FormData();
      formData.append(
        "username",
        this.service.localStorage.get("userlogin")["username"]
      );
      formData.append("year", this.service.yearOnSystem());
      formData.append("term", "1");
      formData.append("formDoc", "101");
      formData.append("remark", "รอการตรวจสอบจากเจ้าหน้าที่กองทุน");

      let http_confirm: any = await this.service.http.post(
        "student_confirm/inup",
        formData
      );

      if(http_confirm.success){
        window.location.reload();
      }
      console.log(http_confirm);
    }
  };
}
