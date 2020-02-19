import { AppService } from "./../../../services/app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-check-doc",
  templateUrl: "./check-doc.component.html",
  styleUrls: ["./check-doc.component.scss"]
})
export class CheckDocComponent implements OnInit {
  public organize: Array<any> = null;
  public studentInitial: Array<any> = null;
  public termSelect: string = "1";
  public confirmList: Array<any> = null;
  public teacherRemark: Array<any> = null;

  constructor(public service: AppService) {}

  async ngOnInit() {
    //  console.log(this.service.localStorage.get("userlogin"));
    await this.getConfirm();
    await this.getTeacherRemark();
    this.getOrganize();
    this.getInitialBorrow();
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

  public createExcel = async (branch: string) => {
    let http: any = await this.service.http.get(
      `excel01/${branch}/${this.service.yearOnSystem()}/${this.termSelect}`
    );
    window.open(`${this.service.filePath}${http.message}`);
  };

  public searchStudent = (branch: string = "") => {
    if (branch.length > 0)
      return this.service.underscore.where(this.studentInitial, {
        branch: branch,
        term: this.termSelect
      });
    else
      return this.service.underscore.where(this.studentInitial, {
        term: this.termSelect
      });
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
        year: this.service.yearOnSystem()
      }
    );

    if (this.termSelect == "1") {
      if (type != "รายเก่า") {
        let complete: Array<any> = this.service.underscore.where(listConfirm, {
          username: username,
          term: this.termSelect,
          year: this.service.yearOnSystem(),
          remark: "เอกสารถูกต้อง"
        });
        let nonComplete: Array<any> = this.service.underscore.where(
          listConfirm,
          {
            username: username,
            term: this.termSelect,
            year: this.service.yearOnSystem(),
            remark: "เอกสารไม่ถูกต้อง"
          }
        );
        let waitCheck: Array<any> = this.service.underscore.where(listConfirm, {
          username: username,
          term: this.termSelect,
          year: this.service.yearOnSystem(),
          remark: "รอการตรวจสอบจากเจ้าหน้าที่กองทุน"
        });

        if (waitCheck.length > 0 || listRemark.length <= 0) {
          return "รอตรวจสอบเอกสาร";
        } else if (nonComplete.length > 0) {
          return "รอการแก้ไขจากนักศึกษา";
        } else if (complete.length >= 4) {
          return "เอกสารสมบูรณ์";
        }
      } else {
        let form102: Array<any> = this.service.underscore.where(listConfirm, {
          username: username,
          term: this.termSelect,
          year: this.service.yearOnSystem(),
          formDoc: "102"
        });
        let formDoc: Array<any> = this.service.underscore.where(listConfirm, {
          username: username,
          term: this.termSelect,
          year: this.service.yearOnSystem(),
          formDoc: "doc"
        });

        let form: Array<any> = [...form102, ...formDoc];

        let complete: Array<any> = this.service.underscore.where(form, {
          username: username,
          term: this.termSelect,
          year: this.service.yearOnSystem(),
          remark: "เอกสารถูกต้อง"
        });
        let nonComplete: Array<any> = this.service.underscore.where(form, {
          username: username,
          term: this.termSelect,
          year: this.service.yearOnSystem(),
          remark: "เอกสารไม่ถูกต้อง"
        });
        let waitCheck: Array<any> = this.service.underscore.where(form, {
          username: username,
          term: this.termSelect,
          year: this.service.yearOnSystem(),
          remark: "รอการตรวจสอบจากเจ้าหน้าที่กองทุน"
        });

        if (waitCheck.length > 0 || listRemark.length <= 0) {
          return "รอตรวจสอบเอกสาร";
        } else if (nonComplete.length > 0) {
          return "รอการแก้ไขจากนักศึกษา";
        } else if (complete.length >= 2) {
          return "เอกสารสมบูรณ์";
        }
      }
    } else if (this.termSelect == "2") {
      if (listConfirm[0]["remark"] == "รอการตรวจสอบจากเจ้าหน้าที่กองทุน") {
        return "รอตรวจสอบเอกสาร";
      } else if (listConfirm[0]["remark"] == "เอกสารไม่ถูกต้อง") {
        return "รอการแก้ไขจากนักศึกษา";
      } else {
        return "เอกสารสมบูรณ์";
      }
    }
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
