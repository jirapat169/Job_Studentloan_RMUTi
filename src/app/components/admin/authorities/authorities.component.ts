import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-authorities",
  templateUrl: "./authorities.component.html",
  styleUrls: ["./authorities.component.scss"]
})
export class AuthoritiesComponent implements OnInit {
  public stateEdit: boolean = false;
  public formAuthorities: FormGroup;
  public organize: Array<any> = null;
  public authoritiesList: Array<any> = null;
  public saveWaitting: boolean = false;

  constructor(private formBuilder: FormBuilder, public service: AppService) {}

  ngOnInit() {
    this.getOrganize();
    this.getAuthorities();
    this.initialForm();
  }

  public filterAuthorities = (campus: string) => {
    return this.authoritiesList.filter(
      value => value.campus.indexOf(campus) > -1
    );
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

  private getAuthorities = async () => {
    this.authoritiesList = null;
    let http: any = await this.service.http.get("member/getmember/2500");
    if (http.connect) {
      if (http.rowCount > 0) {
        this.authoritiesList = http.result;
      } else {
        this.authoritiesList = [];
      }
    }
    return false;
  };

  public submitForm = async () => {
    this.saveWaitting = true;
    let formData = new FormData();
    Object.keys(this.formAuthorities.value).forEach(key => {
      formData.append(key, this.formAuthorities.value[key]);
    });

    let http: any = await this.service.http.post(
      "member/authorities",
      formData
    );
    this.saveWaitting = false;
    console.log(http);
    if (http.connect) {
      if (http.success) {
        this.service.modalClose("AuthoritiesModal");
        this.service.alert.alert("success", "บันทึกสำเร็จ");
        this.getAuthorities();
      } else {
        this.service.alert.alert("warning", "ไม่สามารถใช้อีเมล์นี้ได้");
      }
    }
  };

  public initialForm = (data: any = null) => {
    this.formAuthorities = this.formBuilder.group({
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
