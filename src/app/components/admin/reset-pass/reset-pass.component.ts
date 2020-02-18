import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-reset-pass",
  templateUrl: "./reset-pass.component.html",
  styleUrls: ["./reset-pass.component.scss"]
})
export class ResetPassComponent implements OnInit, OnChanges {
  @Input("username") username: any;
  public formResetPass: FormGroup;
  constructor(public service: AppService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initialFormReset();
  }

  private initialFormReset = () => {
    this.formResetPass = this.formBuilder.group({
      username: [this.username],
      newPw: ["", Validators.required],
      c_newPw: ["", Validators.required]
    });
  };

  ngOnChanges(events) {
    this.initialFormReset();
  }

  public submitReset = async () => {
    if (
      this.formResetPass.value["newPw"] != this.formResetPass.value["c_newPw"]
    ) {
      this.service.alert.alert("warning", "รหัสผ่านไม่ตรงกัน");
      return;
    } else {
      if (await this.service.alert.confirm("ยืนยันการรีเซ็ตรหัสผ่าน")) {
        let formData = new FormData();
        Object.keys(this.formResetPass.value).forEach(i => {
          formData.append(i, this.formResetPass.value[i]);
        });

        let http: any = await this.service.http.post("member/adrePw", formData);
        if (http.success) {
          this.service.alert.alert("success", "รีเซ็ตรหัสผ่านสำเร็จ");
          this.service.modalClose("resetPassModal");
        } else {
          this.service.alert.alert(
            "error",
            "รีเซ็ตรหัสผ่านผิดพลาด",
            "server error"
          );
        }
        // console.log(http);
      }
    }
  };
}
