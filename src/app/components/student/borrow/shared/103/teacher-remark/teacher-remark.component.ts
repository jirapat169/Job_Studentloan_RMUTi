import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-teacher-remark",
  templateUrl: "./teacher-remark.component.html",
  styleUrls: ["./teacher-remark.component.scss"]
})
export class TeacherRemarkComponent implements OnInit {
  public foundTeacher: boolean = false;
  public pageWaitting: boolean = false;
  public idTeacher: string = "";
  public teacherRemark: string = null;
  public teacherList: Array<any> = null;
  constructor(public service: AppService) {}

  async ngOnInit() {
    this.pageWaitting = true;
    await this.getRemark();
    await this.getTeacher();

    this.pageWaitting = false;
  }

  public getTeacherInBranch = () => {
    return this.teacherList.filter(
      value =>
        value.branch.indexOf(
          this.service.localStorage.get("userlogin")["branch"]
        ) > -1
    );
  };

  public sendToTeacher = async () => {
    if (this.idTeacher.length > 0) {
      let formData = new FormData();
      formData.append(
        "username",
        this.service.localStorage.get("userlogin").username
      );
      formData.append("term", "1");
      formData.append("year", this.service.yearOnSystem());
      formData.append("teacher", this.idTeacher);
      formData.append("remark", "รอความเห็นจากอาจารย์ที่ปรึกษา");

      let http_sentTeacher: any = await this.service.http.post(
        "103_teacherremark/inup",
        formData
      );
      console.log(http_sentTeacher);
      await this.getRemark();
    } else {
      this.service.alert.alert("warning", "โปรดเลือกอาจารย์ที่ปรึกษา");
    }
  };

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

  private getTeacher = async () => {
    this.teacherList = null;
    let http: any = await this.service.http.get("member/getmember/3500");
    if (http.connect) {
      if (http.rowCount > 0) {
        this.teacherList = http.result;
      } else {
        this.teacherList = [];
      }
    }
  };
}
