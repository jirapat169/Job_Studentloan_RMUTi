import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppService } from "src/app/services/app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-non-parent",
  templateUrl: "./non-parent.component.html",
  styleUrls: ["./non-parent.component.scss"]
})
export class NonParentComponent implements OnInit {
  public formNonParent: FormGroup;
  public saveWaitting: boolean = false;
  public fetchWaitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public service: AppService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.formNonParent = this.formBuilder.group({
      username: [this.service.localStorage.get("userlogin")["username"]],
      name: [""],
      life: ["ยังมีชีวิตอยู่"],
      age: [""],
      personalId: [""],
      levelEducation: [""],
      schoolName: [""],
      career: [""],
      typeCareer: [""],
      locationCareer: [""],
      land: [""],
      income: [""],
      homeNumber: [""],
      villageNumber: [""],
      alley: [""],
      road: [""],
      subDistrict: [""],
      district: [""],
      province: [""],
      zipCode: [""],
      phone: [""],
      status: ["ไม่มีผู้ปกครอง"]
    });

    await this.getNonParent();
  }

  private getNonParent = async () => {
    this.fetchWaitting = true;
    let http: any = await this.service.http.get(
      `101_parent/get/${this.service.localStorage.get("userlogin")["username"]}`
    );

    console.log(http);
    if (http.connect) {
      if (http.result.length > 0) {
        Object.keys(http.result[0]).forEach(key => {
          this.formNonParent.patchValue({
            [`${key}`]: http.result[0][key]
          });
        });
      }
    }

    this.fetchWaitting = false;
  };

  public submitNonParent = async () => {
    this.saveWaitting = true;
    let formNonParent = { ...this.formNonParent.value };

    let nonParent = new FormData();
    Object.keys(formNonParent).forEach(e => {
      nonParent.append(e, formNonParent[e]);
    });
    let http_nonParent = await this.service.http.post(
      "101_parent/inup",
      nonParent
    );
    console.log("nonParent", http_nonParent);
    // ------------------------------------------------------------------------
    this.saveWaitting = false;
  };

  public getCareerNonParent = () => {
    return this.formNonParent.value.career;
  };

  public careerNonParentChange = e => {
    if (e.value == "เกษตรกร") {
      this.formNonParent.patchValue({
        typeCareer: "",
        locationCareer: "",
        land: ""
      });
    } else if (e.value == "รับจ้าง") {
      this.formNonParent.patchValue({
        typeCareer: "",
        locationCareer: "-",
        land: "-"
      });
    } else {
      this.formNonParent.patchValue({
        typeCareer: "",
        locationCareer: "",
        land: "-"
      });
    }
  };
}
