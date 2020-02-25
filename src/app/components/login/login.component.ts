import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  public loginWaiting: boolean = false;

  constructor(
    public service: AppService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

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
      if (http.connect) {
        if (http.success) {
          this.service.localStorage.set("userlogin", http.result[0]);
          this.router.navigate([
            http.result[0]["role"] == "4500"
              ? "/student"
              : http.result[0]["role"] == "3500"
              ? "/teacher"
              : http.result[0]["role"] == "2500"
              ? "/authorities"
              : http.result[0]["role"] == "1500"
              ? "/committee"
              : http.result[0]["role"] == "500"
              ? "/admin"
              : "/notfound"
          ]);
        } else {
          this.service.localStorage.clear();
          this.service.alert.alert(
            "warning",
            "ไม่พบบัญชีผู้ใช้งาน",
            "โปรดติดต่อเจ้าหน้าที่ผู้ปฏิบัติงานกองทุนหรือผู้ดูแลระบบ "
          );
        }
      } else this.service.localStorage.clear();

      console.log(http);
    } else {
      this.service.alert.alert("warning", "โปรดตรวจสอบข้อมูลให้ถูกต้อง");
    }
  };
}
