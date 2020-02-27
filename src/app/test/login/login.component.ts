import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public service: AppService,
    public router: Router
  ) {}

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  public submitLogin = () => {
    if (
      this.formLogin.value.username != "test" &&
      this.formLogin.value.password != "test"
    ) {
      this.service.alert.alert(
        "warning",
        "โปรดกรอกชื่อผู้ใช้ และรหัสผ่านที่กำหนดไว้"
      );
      return;
    }

    this.router.navigate(["/test/confirm"]);
  };
}
