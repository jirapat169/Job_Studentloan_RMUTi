import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-check103",
  templateUrl: "./check103.component.html",
  styleUrls: ["./check103.component.scss"]
})
export class Check103Component implements OnInit {
  public remarkList: Array<any> = null;
  public selectStudent: any = null;
  public formRemark: FormGroup;
  constructor(public service: AppService, private formBuilder: FormBuilder) {}

  async ngOnInit() {
    this.initialForm();
    await this.getRemark();
  }

  public initialForm = (data: any = null) => {
    this.formRemark = this.formBuilder.group({
      username: [data != null ? data.username : ""],
      term: [data != null ? data.term : ""],
      year: [data != null ? data.year : ""],
      teacher: [this.service.localStorage.get("userlogin")["username"]],
      selectRemark: ["อนุมัติให้กู้ยืม", Validators.required],
      remark: ["อนุมัติให้กู้ยืม", Validators.required]
    });
  };

  private getRemark = async () => {
    this.remarkList = null;
    this.selectStudent = null;
    let http_remark: any = await this.service.http.get(
      "103_teacherremark/getall"
    );
    if (http_remark.rowCount > 0) {
      this.remarkList = this.service.underscore.where(http_remark.result, {
        teacher: this.service.localStorage.get("userlogin")["username"]
      });
    }
    console.log("remarkList", this.remarkList);
  };

  public submitForm = async () => {
    let formData = new FormData();
    Object.keys(this.formRemark.value).forEach(i => {
      formData.append(i, this.formRemark.value[i]);
    });

    let http_teacherConfirm: any = await this.service.http.post(
      "103_teacherremark/inup",
      formData
    );
    console.log(http_teacherConfirm);
    if (http_teacherConfirm.success) {
      this.service.modalClose("remarkStudent");
      await this.getRemark();
    }
  };
}
