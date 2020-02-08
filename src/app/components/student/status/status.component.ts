import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-status",
  templateUrl: "./status.component.html",
  styleUrls: ["./status.component.scss"]
})
export class StatusComponent implements OnInit {
  public statusTerm1: Array<any> = null;
  public statusTerm2: Array<any> = null;
  public teacherRemark: string = null;

  constructor(public service: AppService) {}

  async ngOnInit() {
    await this.getStatus();
    await this.getRemark();
  }

  private getRemark = async () => {
    let formData = new FormData();
    formData.append(
      "username",
      this.service.localStorage.get("userlogin").username
    );
    formData.append("term", "1"),
      formData.append("year", this.service.yearOnSystem());
    let http_getRemark: any = await this.service.http.post(
      `103_teacherremark/get`,
      formData
    );

    if (http_getRemark.rowCount > 0) {
      this.teacherRemark = http_getRemark.result[0]["remark"];
    }
    console.log(http_getRemark);
  };

  public getFormDoc = (arr: any, data: string) => {
    let search = this.service.underscore.where(arr, { formDoc: data });
    if (search.length > 0) {
      return search[0]["remark"];
    } else {
      return "ยังไม่ยืนยันเอกสาร";
    }
  };

  private getStatus = async () => {
    let confirm: any = await this.service.http.get("student_confirm/getall");
    if (confirm.rowCount > 0) {
      this.statusTerm1 = this.service.underscore.where(confirm.result, {
        username: this.service.localStorage.get("userlogin")["username"],
        term: "1",
        year: this.service.yearOnSystem()
      });

      this.statusTerm2 = this.service.underscore.where(confirm.result, {
        username: this.service.localStorage.get("userlogin")["username"],
        term: "2",
        year: this.service.yearOnSystem()
      });
    }
    console.log("Term 1", this.statusTerm1);
    console.log("Term 2", this.statusTerm2);
  };
}
