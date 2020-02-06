import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.scss"]
})
export class ParentComponent implements OnInit {
  public formParent: FormGroup;
  public saveWaitting: boolean = false;
  public fetchWaitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public service: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initialFormParent();
    this.getParent();
  }

  private getParent = () => {
    this.fetchWaitting = true;
    this.getFather();
    this.getMother();
    this.getRelationship();
    this.getBrethren();
    this.getBrethrenStudy();
    this.getBrethrenWorked();

    setTimeout(() => {
      this.fetchWaitting = false;
    }, 2000);
  };

  private getFather = async () => {
    let http: any = await this.service.http.get(
      `101_father/get/${this.service.localStorage.get("userlogin")["username"]}`
    );

    console.log(http);
    if (http.connect) {
      if (http.result.length > 0) {
        Object.keys(http.result[0]).forEach(key => {
          this.formParent.patchValue({
            father: { [`${key}`]: http.result[0][key] }
          });
        });
      }
    }
  };

  private getMother = async () => {
    let http: any = await this.service.http.get(
      `101_mother/get/${this.service.localStorage.get("userlogin")["username"]}`
    );

    console.log(http);
    if (http.connect) {
      if (http.result.length > 0) {
        Object.keys(http.result[0]).forEach(key => {
          this.formParent.patchValue({
            mother: { [`${key}`]: http.result[0][key] }
          });
        });
      }
    }
  };

  private getRelationship = async () => {
    let http: any = await this.service.http.get(
      `101_relationship/get/${
        this.service.localStorage.get("userlogin")["username"]
      }`
    );

    console.log(http);
    if (http.connect) {
      if (http.result.length > 0) {
        Object.keys(http.result[0]).forEach(key => {
          this.formParent.patchValue({
            relationship: { [`${key}`]: http.result[0][key] }
          });
        });
      }
    }
  };

  private getBrethren = async () => {
    let http: any = await this.service.http.get(
      `101_brethren/get/${
        this.service.localStorage.get("userlogin")["username"]
      }`
    );

    console.log(http);
    if (http.connect) {
      if (http.result.length > 0) {
        Object.keys(http.result[0]).forEach(key => {
          this.formParent.patchValue({
            brethren: { [`${key}`]: http.result[0][key] }
          });
        });
      }
    }
  };

  private getBrethrenStudy = async () => {
    const items = this.formParent.get("brethrenStudy") as FormArray;
    items.clear();
    let http: any = await this.service.http.get(
      `101_brethrenStudy/get/${
        this.service.localStorage.get("userlogin")["username"]
      }`
    );
    console.log("101_brethrenStudy", http);
    if (http.connect) {
      if (http.result.length > 0) {
        http.result.forEach(i => {
          items.push(this.formBuilder.group(i));
        });
      }
    }
  };

  private getBrethrenWorked = async () => {
    const items = this.formParent.get("brethrenWorked") as FormArray;
    items.clear();
    let http: any = await this.service.http.get(
      `101_brethrenWorked/get/${
        this.service.localStorage.get("userlogin")["username"]
      }`
    );
    console.log("101_brethrenWorked", http);
    if (http.connect) {
      if (http.result.length > 0) {
        http.result.forEach(i => {
          items.push(this.formBuilder.group(i));
        });
      }
    }
  };

  public submitParent = async () => {
    this.saveWaitting = true;
    let formParent = { ...this.formParent.value };
    console.log(this.formParent.value);

    let father = new FormData();
    Object.keys(formParent.father).forEach(e => {
      father.append(e, formParent.father[e]);
    });
    let http_father = await this.service.http.post("101_father/inup", father);
    console.log("father", http_father);
    // ------------------------------------------------------------------------

    let mother = new FormData();
    Object.keys(formParent.mother).forEach(e => {
      mother.append(e, formParent.mother[e]);
    });
    let http_mother = await this.service.http.post("101_mother/inup", mother);
    console.log("mother", http_mother);
    // ------------------------------------------------------------------------

    let relationship = new FormData();
    Object.keys(formParent.relationship).forEach(e => {
      relationship.append(e, formParent.relationship[e]);
    });
    let http_relationship = await this.service.http.post(
      "101_relationship/inup",
      relationship
    );
    console.log("relationship", http_relationship);
    // ------------------------------------------------------------------------

    let brethren = new FormData();
    Object.keys(formParent.brethren).forEach(e => {
      brethren.append(e, formParent.brethren[e]);
    });
    let http_brethren = await this.service.http.post(
      "101_brethren/inup",
      brethren
    );
    console.log("brethren", http_brethren);
    // ------------------------------------------------------------------------

    let brethrenStudy: FormData;
    Object.keys(formParent.brethrenStudy).forEach(async i => {
      brethrenStudy = new FormData();
      Object.keys(formParent.brethrenStudy[i]).forEach(j => {
        brethrenStudy.append(j, formParent.brethrenStudy[i][j]);
      });

      let http_brethrenStudy = await this.service.http.post(
        "101_brethrenStudy/inup",
        brethrenStudy
      );
      console.log("brethrenStudy", http_brethrenStudy);
    });
    await this.service.delay(200);
    await this.getBrethrenStudy();

    // ------------------------------------------------------------------------

    let brethrenWorked: FormData;
    Object.keys(formParent.brethrenWorked).forEach(async i => {
      brethrenWorked = new FormData();
      Object.keys(formParent.brethrenWorked[i]).forEach(j => {
        brethrenWorked.append(j, formParent.brethrenWorked[i][j]);
      });

      let http_brethrenWorked = await this.service.http.post(
        "101_brethrenWorked/inup",
        brethrenWorked
      );
      console.log("brethrenStudy", http_brethrenWorked);
    });
    await this.service.delay(200);
    await this.getBrethrenWorked();
    // ------------------------------------------------------------------------
    this.router.navigate(["/student/borrow/1/new/101/nparent"]);
    this.saveWaitting = false;
  };

  private initialFormParent = () => {
    this.formParent = this.formBuilder.group({
      father: this.formBuilder.group({
        username: [this.service.localStorage.get("userlogin")["username"]],
        name: ["", Validators.required],
        life: ["ยังมีชีวิตอยู่", Validators.required],
        age: ["", Validators.required],
        personalId: ["", Validators.required],
        levelEducation: ["", Validators.required],
        schoolName: ["", Validators.required],
        career: ["", Validators.required],
        typeCareer: ["", Validators.required],
        locationCareer: ["", Validators.required],
        land: ["", Validators.required],
        income: ["", Validators.required],
        homeNumber: ["", Validators.required],
        villageNumber: ["", Validators.required],
        alley: ["", Validators.required],
        road: ["", Validators.required],
        subDistrict: ["", Validators.required],
        district: ["", Validators.required],
        province: ["", Validators.required],
        zipCode: ["", Validators.required],
        phone: ["", Validators.required],
        status: [""]
      }),
      mother: this.formBuilder.group({
        username: [this.service.localStorage.get("userlogin")["username"]],
        name: ["", Validators.required],
        life: ["ยังมีชีวิตอยู่", Validators.required],
        age: ["", Validators.required],
        personalId: ["", Validators.required],
        levelEducation: ["", Validators.required],
        schoolName: ["", Validators.required],
        career: ["", Validators.required],
        typeCareer: ["", Validators.required],
        locationCareer: ["", Validators.required],
        land: ["", Validators.required],
        income: ["", Validators.required],
        homeNumber: ["", Validators.required],
        villageNumber: ["", Validators.required],
        alley: ["", Validators.required],
        road: ["", Validators.required],
        subDistrict: ["", Validators.required],
        district: ["", Validators.required],
        province: ["", Validators.required],
        zipCode: ["", Validators.required],
        phone: ["", Validators.required],
        status: [""]
      }),
      relationship: this.formBuilder.group({
        username: [this.service.localStorage.get("userlogin")["username"]],
        status: ["", Validators.required],
        remark: ["-", Validators.required]
      }),
      brethren: this.formBuilder.group({
        username: [this.service.localStorage.get("userlogin")["username"]],
        amount: ["", Validators.required],
        male: ["", Validators.required],
        female: ["", Validators.required],
        iNum: ["", Validators.required],
        study: ["", Validators.required],
        worked: ["", Validators.required]
      }),
      brethrenStudy: this.formBuilder.array([]),
      brethrenWorked: this.formBuilder.array([])
    });
  };

  public getCareerFather = () => {
    return this.formParent.value.father.career;
  };

  public careerFatherChange = e => {
    if (e.value == "เกษตรกร") {
      this.formParent.patchValue({
        father: {
          typeCareer: "",
          locationCareer: "",
          land: ""
        }
      });
    } else if (e.value == "รับจ้าง") {
      this.formParent.patchValue({
        father: {
          typeCareer: "",
          locationCareer: "-",
          land: "-"
        }
      });
    } else {
      this.formParent.patchValue({
        father: {
          typeCareer: "",
          locationCareer: "",
          land: "-"
        }
      });
    }
  };

  public getCareerMother = () => {
    return this.formParent.value.mother.career;
  };

  public careerMotherChange = e => {
    // console.log(e.value);
    if (e.value == "เกษตรกร") {
      this.formParent.patchValue({
        mother: {
          typeCareer: "",
          locationCareer: "",
          land: ""
        }
      });
    } else if (e.value == "รับจ้าง") {
      this.formParent.patchValue({
        mother: {
          typeCareer: "",
          locationCareer: "-",
          land: "-"
        }
      });
    } else {
      this.formParent.patchValue({
        mother: {
          typeCareer: "",
          locationCareer: "",
          land: "-"
        }
      });
    }
  };

  public getReletionship = () => {
    return this.formParent.value.relationship.status;
  };

  public addRowBrethrenStudy = () => {
    // เพิ่มแถวการรับทุน
    const items = this.formParent.get("brethrenStudy") as FormArray;
    items.push(
      this.formBuilder.group({
        username: [this.service.localStorage.get("userlogin").username],
        num: [""],
        sex: [""],
        age: [""],
        level: [""],
        schoolName: [""],
        row: [""]
      })
    );
  };

  public getRowBrethrenStudy = () => {
    const items = this.formParent.get("brethrenStudy") as FormArray;
    return items.controls;
  };

  public delRowBrethrenStudy = async index => {
    let confirm = await this.service.alert.confirm("ยืนยันการลบข้อมูล");
    let i = parseInt(index);
    const items = this.formParent.get("brethrenStudy") as FormArray;
    if (confirm) {
      let http: any = await this.service.http.get(
        `/101_brethrenStudy/delete/${items.controls[i].value["row"]}`
      );
      console.log(http);
      if (http.connect) {
        if (http.success) {
          this.service.alert.alert("success", "ลบข้อมูลสำเร็จ");
        }
      }
      await this.getBrethrenStudy();
    }
  };

  public addRowBrethrenWorked = () => {
    // เพิ่มแถวการรับทุน
    const items = this.formParent.get("brethrenWorked") as FormArray;
    items.push(
      this.formBuilder.group({
        username: [this.service.localStorage.get("userlogin")["username"]],
        num: [""],
        sex: [""],
        age: [""],
        level: [""],
        workName: [""],
        amount: [""],
        row: [""]
      })
    );
  };

  public getRowBrethrenWorked = () => {
    const items = this.formParent.get("brethrenWorked") as FormArray;
    return items.controls;
  };

  public delRowBrethrenWorked = async index => {
    let confirm = await this.service.alert.confirm("ยืนยันการลบข้อมูล");
    let i = parseInt(index);
    const items = this.formParent.get("brethrenWorked") as FormArray;
    if (confirm) {
      let http: any = await this.service.http.get(
        `/101_brethrenWorked/delete/${items.controls[i].value["row"]}`
      );
      console.log(http);
      if (http.connect) {
        if (http.success) {
          this.service.alert.alert("success", "ลบข้อมูลสำเร็จ");
        }
      }
      await this.getBrethrenWorked();
    }
  };
}
