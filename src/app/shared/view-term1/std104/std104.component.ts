import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-std104-std",
  templateUrl: "./std104.component.html",
  styleUrls: ["./std104.component.scss"]
})
export class Std104Component implements OnInit {
  @Input("route") route: any;
  public pageWaitting = false;
  public form104Confirm: FormGroup;
  public map: any = {};
  public confirmForm104: any = null;
  constructor(public service: AppService, private formBuilder: FormBuilder) {}

  async ngOnInit() {
    this.pageWaitting = true;
    this.form104Confirm = this.formBuilder.group({
      username: [this.route.username],
      year: ["2562"],
      term: ["1"],
      formDoc: ["104"],
      remark: ["เอกสารถูกต้อง"],
      remark2: [""]
    });
    await this.getConfirm();
    await this.getMap();
    this.pageWaitting = false;
  }

  private getMap = async () => {
    let map: any = await this.service.http.get(
      `104_homemap/get/${this.route.username}`
    );

    if (map.result.length > 0) {
      Object.keys(map.result[0]).forEach(i => {
        this.map[i] = map.result[0][i];
      });
    }

    console.log("map", map);
  };

  private getConfirm = async () => {
    let formData = new FormData();
    formData.append("username", this.route.username);
    formData.append("year", this.service.yearOnSystem());
    formData.append("term", "1");
    formData.append("formDoc", "104");

    let http_confirm: any = await this.service.http.post(
      `student_confirm/get`,
      formData
    );

    if (http_confirm.rowCount > 0) {
      this.confirmForm104 = http_confirm.result[0];
    } else {
      this.confirmForm104 = null;
    }

    console.log("http_confirm_104", http_confirm);
  };

  public form104ConfirmSubmit = async () => {
    let confirm = await this.service.alert.confirm("ยืนยันการตรวจสอบเอกสาร");
    if (confirm) {
      let formData = new FormData();
      Object.keys(this.form104Confirm.value).forEach(i => {
        formData.append(i, this.form104Confirm.value[i]);
      });

      let http: any = await this.service.http.post(
        "/student_confirm/upremark",
        formData
      );
      console.log(http);
      await this.getConfirm();
    }
  };
}
