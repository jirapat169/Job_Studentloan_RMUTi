import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppService } from "src/app/services/app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-spouse",
  templateUrl: "./spouse.component.html",
  styleUrls: ["./spouse.component.scss"]
})
export class SpouseComponent implements OnInit {
  public formSpouse: FormGroup;
  public saveWaitting: boolean = false;
  public fetchWaitting: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public service: AppService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.formSpouse = this.formBuilder.group({
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
      status: ["ไม่มีคู่สมรส"]
    });
    await this.getSpouse();
  }

  private getSpouse = async () => {
    this.fetchWaitting = true;
    let http: any = await this.service.http.get(
      `101_spouse/get/${this.service.localStorage.get("userlogin")["username"]}`
    );

    console.log(http);
    if (http.connect) {
      if (http.result.length > 0) {
        Object.keys(http.result[0]).forEach(key => {
          this.formSpouse.patchValue({
            [`${key}`]: http.result[0][key]
          });
        });
      }
    }

    this.fetchWaitting = false;
  };

  public submitSpouse = async () => {
    this.saveWaitting = true;
    let formSpouse = { ...this.formSpouse.value };

    let spouse = new FormData();
    Object.keys(formSpouse).forEach(e => {
      spouse.append(e, formSpouse[e]);
    });
    let http_spouse = await this.service.http.post("101_spouse/inup", spouse);
    console.log("spouse", http_spouse);
    // ------------------------------------------------------------------------
    this.saveWaitting = false;
  };

  public getCareerSpouse = () => {
    return this.formSpouse.value.career;
  };

  public careerSpouseChange = e => {
    if (e.value == "เกษตรกร") {
      this.formSpouse.patchValue({
        typeCareer: "",
        locationCareer: "",
        land: ""
      });
    } else if (e.value == "รับจ้าง") {
      this.formSpouse.patchValue({
        typeCareer: "",
        locationCareer: "-",
        land: "-"
      });
    } else {
      this.formSpouse.patchValue({
        typeCareer: "",
        locationCareer: "",
        land: "-"
      });
    }
  };
}
