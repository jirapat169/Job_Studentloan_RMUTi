import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public organize: Array<any> = null;
  public formRegister: FormGroup;
  public submitWaiting: boolean = false;

  constructor(
    public service: AppService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  public submitRegister = async () => {
    if (this.formRegister.valid) {
      this.submitWaiting = true;
      let formBody = new FormData();
      Object.keys(this.formRegister.value).forEach(key => {
        formBody.append(key, this.formRegister.value[key]);
      });
      let http: any = await this.service.http.post(
        "member/st_register",
        formBody
      );
      this.submitWaiting = false;
      if (http.connect) {
        if (http.success) {
          this.service.alert.alert("success", "ลงทะเบียนสำเร็จ");
          this.router.navigate(["/login"]);
        } else {
          // console.log(http);
          this.service.alert.alert(
            "error",
            "ลงทะเบียนผิดพลาด",
            "โปรดติดต่อผู้ดูแลระบบ"
          );
        }
      }
    } else {
      this.service.alert.alert("warning", "โปรดตรวจสอบข้อมูลให้ถูกต้อง");
    }
  };

  private initialFormRegister = () => {
    this.formRegister = this.formBuilder.group({
      username: ["", Validators.required],
      title: ["", Validators.required],
      fname: ["", Validators.required],
      lname: ["", Validators.required],
      studentId: [
        "",
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13)
        ]
      ],
      personalId: [
        "",
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13)
        ]
      ],
      email: ["", [Validators.required, Validators.email]],
      phone: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      campus: ["", Validators.required],
      department: ["", Validators.required],
      group: ["", Validators.required],
      branch: ["", Validators.required],
      password: ["", Validators.required]
    });
  };

  ngOnInit() {
    this.initialFormRegister();
    this.service.http.get("organize").then((value: any) => {
      if (value.connect) {
        if (value.rowCount > 0) this.organize = value.result;
        else this.organize = null;
      } else this.organize = null;
    });
  }

  public getCampus = () => {
    return this.service.underscore.where(this.organize, {
      parent: "0000"
    });
  };

  public getDepartment = (code: string) => {
    return this.service.underscore.filter(
      this.service.underscore.where(this.organize, {
        parent: code
      }),
      (x: any) => {
        return x.name.includes("คณะ");
      }
    );
  };

  public getGroup = (code: string) => {
    return this.service.underscore.filter(
      this.service.underscore.where(this.organize, {
        parent: code
      }),
      (x: any) => {
        return x.name.includes("กลุ่มสาขา");
      }
    );
  };

  public getBranch = (code: string) => {
    return this.service.underscore.filter(
      this.service.underscore.where(this.organize, {
        parent: code
      }),
      (x: any) => {
        return x.name.includes("สาขา");
      }
    );
  };
}
