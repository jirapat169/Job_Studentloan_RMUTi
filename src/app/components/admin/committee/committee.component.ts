import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-committee",
  templateUrl: "./committee.component.html",
  styleUrls: ["./committee.component.scss"]
})
export class CommitteeComponent implements OnInit {
  public stateEdit: boolean = false;
  public formCommittee: FormGroup;
  public organize: Array<any> = null;
  public committeeList: Array<any> = null;
  public saveWaitting: boolean = false;

  constructor(private formBuilder: FormBuilder, public service: AppService) {}

  async ngOnInit() {
    this.getOrganize();
    this.initialForm();
    await this.getCommittee();
  }

  public deleteMember = async (username: string) => {
    if (await this.service.alert.confirm("ยือยันการลบข้อมูล")) {
      let http: any = await this.service.http.get(
        `member/ad_delmem/${username}`
      );
      if (http.success) {
        this.service.alert.alert("success", "ลบข้อมูลสำเร็จ");
      } else {
        this.service.alert.alert("error", "ลบข้อมูลผิดพลาด", "server error");
      }
      console.log(http);
      await this.getCommittee();
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

  public getCampus = () => {
    return this.service.underscore.where(this.organize, {
      parent: "0000"
    });
  };

  public filterCommittee = (campus: string) => {
    return this.committeeList.filter(
      value => value.campus.indexOf(campus) > -1
    );
  };

  private getCommittee = async () => {
    this.committeeList = null;
    let http: any = await this.service.http.get("member/getmember/1500");
    if (http.connect) {
      if (http.rowCount > 0) {
        this.committeeList = http.result;
      } else {
        this.committeeList = [];
      }
    }
    return false;
  };

  public submitForm = async () => {
    // console.log(this.formCommittee.value);
    this.saveWaitting = true;
    let formData = new FormData();
    Object.keys(this.formCommittee.value).forEach(key => {
      formData.append(key, this.formCommittee.value[key]);
    });
    let http: any = await this.service.http.post("member/committee", formData);
    this.saveWaitting = false;
    console.log(http);
    if (http.connect) {
      if (http.success) {
        this.service.modalClose("CommitteeModal");
        this.service.alert.alert("success", "บันทึกสำเร็จ");
        this.getCommittee();
      } else {
        this.service.alert.alert("warning", "ไม่สามารถใช้อีเมล์นี้ได้");
      }
    }
  };

  public initialForm = (data: any = null) => {
    this.formCommittee = this.formBuilder.group({
      username: [data != null ? data.username : "", Validators.required],
      title: [data != null ? data.title : "", Validators.required],
      fname: [data != null ? data.fname : "", Validators.required],
      lname: [data != null ? data.lname : "", Validators.required],
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
      status: [data != null ? "update" : "insert"]
    });
  };
}
