import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-confirm",
  templateUrl: "./confirm.component.html",
  styleUrls: ["./confirm.component.scss"]
})
export class ConfirmComponent implements OnInit, OnDestroy {
  public remarkList: Array<any> = null;
  public selectStudent: any = null;
  public formRemark: FormGroup;
  constructor(public service: AppService, private formBuilder: FormBuilder) {}

  ngOnDestroy() {
    this.remarkList = null;
    this.selectStudent = null;
  }

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
      selectRemark: ["เห็นสมควร", Validators.required],
      remark: ["เห็นสมควร", Validators.required]
    });
  };

  private getRemark = async () => {
    this.remarkList = null;
    this.selectStudent = null;
    let http_remark: any = await this.service.http.get(
      "103_teacherremark/getall"
    );

    if (http_remark.rowCount > 0) {
      this.remarkList = http_remark.result.slice(0, 5);
    }

    this.remarkList.forEach((e, i) => {
      this.remarkList[i]["remark"] = "รอความเห็นจากอาจารย์ที่ปรึกษา";
    });
  };

  public submitForm = async () => {
    console.log(this.formRemark.value);
    this.remarkList.forEach((e, i) => {
      if (this.remarkList[i]["username"] == this.formRemark.value.username) {
        this.remarkList[i]["remark"] = this.formRemark.value.remark;
      }
    });
    this.service.alert.alert("success", "บันทึกข้อมูลสำเร็จ");
    this.service.modalClose("remarkStudent");
  };
}
