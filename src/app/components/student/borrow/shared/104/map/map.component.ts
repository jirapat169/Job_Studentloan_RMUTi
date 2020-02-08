import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  public formMap: FormGroup;
  public pageWaitting: boolean = false;
  public foundData: boolean = false;
  public onLoadForm: boolean = true;
  public remark: string = null;

  constructor(private formBuilder: FormBuilder, public service: AppService) {}

  async ngOnInit() {
    this.pageWaitting = true;
    this.formMap = this.formBuilder.group({
      username: this.service.localStorage.get("userlogin")["username"],
      guesthouse_title: ["", Validators.required],
      guesthouse_fname: ["", Validators.required],
      guesthouse_lname: ["", Validators.required],
      guesthouse_related: ["", Validators.required],
      ownerhouse_title: ["", Validators.required],
      ownerhouse_fname: ["", Validators.required],
      ownerhouse_lname: ["", Validators.required],
      ownerhouse_related: ["", Validators.required],
      address_num: ["", Validators.required],
      address_village: ["", Validators.required],
      address_alley: ["", Validators.required],
      address_road: ["", Validators.required],
      address_subdis: ["", Validators.required],
      address_district: ["", Validators.required],
      address_province: ["", Validators.required],
      phone: ["", Validators.required],
      googlemap_text: ["", Validators.required]
    });

    await this.getConfirm();
    await this.getMap();
    this.pageWaitting = false;
  }

  private getConfirm = async () => {
    let formData = new FormData();
    formData.append(
      "username",
      this.service.localStorage.get("userlogin")["username"]
    );
    formData.append("year", this.service.yearOnSystem());
    formData.append("term", "1");
    formData.append("formDoc", "104");

    let http_confirm: any = await this.service.http.post(
      `student_confirm/get`,
      formData
    );

    if (http_confirm.result.length > 0) {
      if (
        http_confirm.result[0]["remark"] == "รอการตรวจสอบจากเจ้าหน้าที่กองทุน"
      ) {
        this.onLoadForm = false;
        this.remark = http_confirm.result[0]["remark"];
      }
    }
    console.log("http_confirm", http_confirm);
  };

  private getMap = async () => {
    let map: any = await this.service.http.get(
      `104_homemap/get/${
        this.service.localStorage.get("userlogin")["username"]
      }`
    );

    if (map.result.length > 0) {
      this.foundData = true;
      Object.keys(map.result[0]).forEach(i => {
        this.formMap.patchValue({
          [i]: map.result[0][i]
        });
      });
    }
  };

  public submitFormMap = async () => {
    let formData = new FormData();
    Object.keys(this.formMap.value).forEach(i => {
      formData.append(i, this.formMap.value[i]);
    });
    let httpMap: any = await this.service.http.post(
      `104_homemap/inup`,
      formData
    );
    console.log("httpMap", httpMap);
    await this.getMap();
  };

  public submitConfirm = async () => {
    let confirmData: any = await this.service.alert.confirm(
      "ยืนยันข้อมูล กยศ.104"
    );
    if (confirmData) {
      let formData = new FormData();
      formData.append(
        "username",
        this.service.localStorage.get("userlogin")["username"]
      );
      formData.append("year", this.service.yearOnSystem());
      formData.append("term", "1");
      formData.append("formDoc", "104");
      formData.append("remark", "รอการตรวจสอบจากเจ้าหน้าที่กองทุน");

      let http_confirm: any = await this.service.http.post(
        "student_confirm/inup",
        formData
      );

      if (http_confirm.success) {
        window.location.reload();
      }
      console.log(http_confirm);
    }
  };
}
