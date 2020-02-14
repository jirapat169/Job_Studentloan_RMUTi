import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-std102-std",
  templateUrl: "./std102.component.html",
  styleUrls: ["./std102.component.scss"]
})
export class Std102Component implements OnInit {
  @Input("route") route: any;
  public confirmForm102: any = null;
  public pageWaitting = false;
  public form102Confirm: FormGroup;
  public income: any = {};
  constructor(public service: AppService, private formBuilder: FormBuilder) {}

  async ngOnInit() {
    this.pageWaitting = true;
    this.form102Confirm = this.formBuilder.group({
      username: [this.route.username],
      year: ["2562"],
      term: ["1"],
      formDoc: ["102"],
      remark: ["เอกสารถูกต้อง"],
      remark2: [""]
    });
    await this.getConfirm();
    await this.getIncome();
    this.pageWaitting = false;
  }

  private getConfirm = async () => {
    let formData = new FormData();
    formData.append("username", this.route.username);
    formData.append("year", "2562");
    formData.append("term", "1");
    formData.append("formDoc", "102");

    let http_confirm: any = await this.service.http.post(
      `student_confirm/get`,
      formData
    );

    if (http_confirm.rowCount > 0) {
      this.confirmForm102 = http_confirm.result[0];
    } else {
      this.confirmForm102 = null;
    }

    console.log("http_confirm_102", http_confirm);
  };

  public form102ConfirmSubmit = async () => {
    let confirm = await this.service.alert.confirm("ยืนยันการตรวจสอบเอกสาร");
    if (confirm) {
      let formData = new FormData();
      Object.keys(this.form102Confirm.value).forEach(i => {
        formData.append(i, this.form102Confirm.value[i]);
      });

      let http: any = await this.service.http.post(
        "/student_confirm/upremark",
        formData
      );
      console.log(http);
      await this.getConfirm();
    }
  };

  private getIncome = async () => {
    let http_income: any = await this.service.http.get(
      `102_income/get/${this.route.username}`
    );

    if (http_income.rowCount > 0) {
      Object.keys(http_income.result[0]).forEach(i => {
        this.income[`${i}`] = http_income.result[0][i];
      });
    }

    console.log("income", this.income);
  };
}
