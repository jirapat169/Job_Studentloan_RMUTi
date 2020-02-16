import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-confirm-borrow",
  templateUrl: "./confirm-borrow.component.html",
  styleUrls: ["./confirm-borrow.component.scss"]
})
export class ConfirmBorrowComponent implements OnInit {
  public organize: Array<any> = null;
  public studentInitial: Array<any> = null;
  public termSelect: string = "1";
  public confirmList: Array<any> = null;
  public teacherRemark: Array<any> = null;
  public selectStudent: any = null;
  public formFirst: FormGroup;

  constructor(public service: AppService, private formBuilder: FormBuilder) {}

  public submitFormFirst = async () => {
    let formData = new FormData();
    Object.keys(this.formFirst.value).forEach(i => {
      formData.append(i, this.formFirst.value[i]);
    });

    let http: any = await this.service.http.post(
      "Initial_borrow/upremark",
      formData
    );
    if (http.success) {
      this.service.modalClose("confirmInitial");
      this.service.alert.alert("success", "บันทึกข้อมูลสำเร็จ");
      await this.getInitialBorrow();
    }
  };

  public studentSelect = (data: any = null) => {
    this.selectStudent = data;
    this.formFirst = this.formBuilder.group({
      username: [data != null ? data.username : ""],
      remark: ["อนุมัติให้กู้ยืม", Validators.required],
      remark2: [""],
      year: [this.service.yearOnSystem()],
      term: [this.termSelect]
    });
  };

  async ngOnInit() {
    this.getInitialBorrow();
    this.getOrganize();
    this.studentSelect();
    await this.getConfirm();
    await this.getTeacherRemark();
  }

  private getConfirm = async () => {
    let http: any = await this.service.http.get("student_confirm/getall");
    if (http.rowCount > 0) {
      this.confirmList = http.result;
    }
  };

  private getTeacherRemark = async () => {
    let http: any = await this.service.http.get("103_teacherremark/getall");
    if (http.rowCount > 0) {
      this.teacherRemark = http.result;
    }
  };

  public getListComfirm = (username: string, type: string) => {
    let listRemark: Array<any> = this.service.underscore.where(
      this.teacherRemark,
      {
        username: username,
        term: this.termSelect,
        year: this.service.yearOnSystem(),
        remark: "เห็นสมควร"
      }
    );
    let listConfirm: Array<any> = this.service.underscore.where(
      this.confirmList,
      {
        username: username,
        term: this.termSelect,
        year: this.service.yearOnSystem(),
        remark: "เอกสารถูกต้อง"
      }
    );

    if (this.termSelect == "1") {
      if (type != "รายเก่า") {
        return listConfirm.length == 4 && listRemark.length == 1;
      } else {
        return (
          (listConfirm.length == 2 || listConfirm.length == 4) &&
          listRemark.length == 1
        );
      }
    } else if (this.termSelect == "2") {
      return listConfirm.length == 1;
    }
  };

  public searchStudent = (branch: string = "") => {
    if (branch.length > 0) {
      let student: Array<any> = this.service.underscore.where(
        this.studentInitial,
        {
          branch: branch,
          term: this.termSelect
        }
      );

      let confirm = [];

      if (student.length > 0) {
        student.forEach(i => {
          if (this.getListComfirm(i.username, i.type)) {
            confirm.push(i);
          }
        });
      }

      return confirm;
    } else
      return this.service.underscore.where(this.studentInitial, {
        term: this.termSelect
      });
  };

  private getOrganize = () => {
    this.service.http.get("organize").then((value: any) => {
      if (value.connect) {
        if (value.rowCount > 0) this.organize = value.result;
        else this.organize = null;
      } else this.organize = null;
    });
  };

  private getInitialBorrow = async () => {
    let dataInitial: any = await this.service.http.get(
      "/Initial_borrow/getall"
    );

    if (dataInitial.connect) {
      this.studentInitial = dataInitial.result;
    }

    console.log(dataInitial);
  };

  public getDepartment = (code: string = "1000") => {
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
