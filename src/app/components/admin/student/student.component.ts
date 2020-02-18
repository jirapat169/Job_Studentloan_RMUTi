import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"]
})
export class StudentComponent implements OnInit {
  public stateEdit: boolean = false;
  public formStudent: FormGroup;
  public organize: Array<any> = null;
  public studentList: Array<any> = null;
  public saveWaitting: boolean = false;

  constructor(private formBuilder: FormBuilder, public service: AppService) {}

  ngOnInit() {
    this.getOrganize();
    this.getTeacher();
    this.initialForm();
  }

  public filterStudent = (branch: string) => {
    return this.studentList.filter(value => value.branch.indexOf(branch) > -1);
  };

  private getOrganize = () => {
    this.service.http.get("organize").then((value: any) => {
      if (value.connect) {
        if (value.rowCount > 0) this.organize = value.result;
        else this.organize = null;
      } else this.organize = null;
    });
  };

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

  private getTeacher = async () => {
    this.studentList = null;
    let http: any = await this.service.http.get("member/getmember/4500");
    if (http.connect) {
      if (http.rowCount > 0) {
        this.studentList = http.result;
      } else {
        this.studentList = [];
      }
    }
    console.log(this.studentList);
  };

  public submitForm = async () => {
    this.saveWaitting = true;
    let formData = new FormData();
    Object.keys(this.formStudent.value).forEach(key => {
      formData.append(key, this.formStudent.value[key]);
    });

    console.log(this.formStudent.value)

    let http: any = await this.service.http.post("member/student", formData);
    this.saveWaitting = false;
    console.log(http);
    if (http.connect) {
      if (http.success) {
        this.service.modalClose("StudentModal");
        this.service.alert.alert("success", "บันทึกสำเร็จ");
        this.getTeacher();
      } else {
        this.service.alert.alert("warning", "ไม่สามารถแก้ไขข้อมูลได้", "Server Error");
      }
    }
  };

  public initialForm = (data: any = null) => {
    this.formStudent = this.formBuilder.group({
      username: [data != null ? data.username : "", Validators.required],
      title: [data != null ? data.title : "", Validators.required],
      fname: [data != null ? data.fname : "", Validators.required],
      lname: [data != null ? data.lname : "", Validators.required],
      studentId: [data != null ? data.studentId : "", Validators.required],
      personalId: [data != null ? data.personalId : "", Validators.required],
      email: [
        data != null ? data.email : "",
        [Validators.required, Validators.email]
      ],
      phone: [
        data != null ? data.phone : "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      campus: [data != null ? data.campus : "", Validators.required],
      department: [data != null ? data.department : "", Validators.required],
      group: [data != null ? data.group : "", Validators.required],
      branch: [data != null ? data.branch : "", Validators.required],
      status: [data != null ? "update" : "insert"]
    });
  };
}
