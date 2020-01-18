import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  public loginWaiting: boolean = false;

  constructor(public service: AppService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initalFormLogin();
  }

  private initalFormLogin = () => {
    this.formLogin = this.formBuilder.group({
      role: ["4500", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  };

  public submitLogin = async () => {
    if (this.formLogin.valid) {
      this.loginWaiting = true;
      let formData = new FormData();
      Object.keys(this.formLogin.value).forEach(key => {
        formData.append(key, this.formLogin.value[key]);
      });
      let http: any = await this.service.http.post("member/st_login", formData);
      this.loginWaiting = false;
      console.log(http);
    } else {
      this.service.alert.alert("warning", "โปรดตรวจสอบข้อมูลให้ถูกต้อง");
    }
  };
}
