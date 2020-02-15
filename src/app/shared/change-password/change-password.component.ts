import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  public formRepassword: FormGroup;
  constructor(public service: AppService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formRepassword = this.formBuilder.group({
      username: [this.service.localStorage.get("userlogin")["username"]],
      oldPw: ["", [Validators.required]],
      newPw: [
        "",
        [Validators.required, Validators.maxLength(20), Validators.minLength(8)]
      ],
      c_newPw: [
        "",
        [Validators.required, Validators.maxLength(20), Validators.minLength(8)]
      ]
    });
  }

  public submitFormRepassword = async () => {
    if (
      this.formRepassword.value["newPw"] != this.formRepassword.value["c_newPw"]
    ) {
      this.service.alert.alert("warning", "รหัสผ่านใหม่ไม่ตรงกัน");
      return;
    } else {
      let formData = new FormData();
      Object.keys(this.formRepassword.value).forEach(i => {
        formData.append(i, this.formRepassword.value[i]);
      });

      let http: any = await this.service.http.post("member/rePw", formData);
      if (http.success) {
        this.service.alert.alert("success", "เปลี่ยนรหัสผ่านสำเร็จ");
        window.location.reload();
      } else {
        if (http.message == "รหัสผ่านผิด") {
          this.service.alert.alert("warning", "รหัสผ่านเดิมไม่ถูกต้อง");
          return;
        }
      }
      console.log(http);
    }
  };
}
