import { AppService } from "src/app/services/app.service";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  public formProfile: FormGroup;
  public dateNow = new Date();
  public teacherList: Array<any> = null;
  public saveWaitting: boolean = false;
  public fetchWaitting: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public service: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initialFormProfile();
    this.getTeacher();
    this.getProfile();
    // console.log(this.service.localStorage.get("userlogin"));
  }

  private getProfileForm = async () => {
    let profile: any = await this.service.http.get(
      `101_profile/get/${
        this.service.localStorage.get("userlogin")["username"]
      }`
    );
    console.log("profile", profile);
    if (profile.connect) {
      if (profile.result.length > 0) {
        Object.keys(profile.result[0]).forEach(key => {
          this.formProfile.patchValue({
            profile: { [`${key}`]: profile.result[0][key] }
          });
        });

        this.formProfile.patchValue({
          profile: { bdate: new Date(parseInt(profile.result[0]["bdate"])) }
        });
      }
    }
  };

  private getBirthAddress = async () => {
    let birthAddress: any = await this.service.http.get(
      `101_birthaddress/get/${
        this.service.localStorage.get("userlogin")["username"]
      }`
    );
    console.log("birthAddress", birthAddress);
    if (birthAddress.connect) {
      if (birthAddress.result.length > 0) {
        Object.keys(birthAddress.result[0]).forEach(key => {
          this.formProfile.patchValue({
            birthAddress: { [`${key}`]: birthAddress.result[0][key] }
          });
        });
      }
    }
  };

  private getCurrentAddress = async () => {
    let currentAddress: any = await this.service.http.get(
      `101_currentaddress/get/${
        this.service.localStorage.get("userlogin")["username"]
      }`
    );
    console.log("currentAddress", currentAddress);
    if (currentAddress.connect) {
      if (currentAddress.result.length > 0) {
        Object.keys(currentAddress.result[0]).forEach(key => {
          this.formProfile.patchValue({
            currentAddress: { [`${key}`]: currentAddress.result[0][key] }
          });
        });
      }
    }
  };

  private getBachelor = async () => {
    let bachelor: any = await this.service.http.get(
      `101_bachelor/get/${
        this.service.localStorage.get("userlogin")["username"]
      }`
    );
    console.log("bachelor", bachelor);
    if (bachelor.connect) {
      if (bachelor.result.length > 0) {
        Object.keys(bachelor.result[0]).forEach(key => {
          this.formProfile.patchValue({
            bachelor: { [`${key}`]: bachelor.result[0][key] }
          });
        });
      }
    }
  };

  private getSupport = async () => {
    let support: any = await this.service.http.get(
      `101_support/get/${
        this.service.localStorage.get("userlogin")["username"]
      }`
    );
    console.log("support", support);
    if (support.connect) {
      if (support.result.length > 0) {
        Object.keys(support.result[0]).forEach(key => {
          this.formProfile.patchValue({
            support: { [`${key}`]: support.result[0][key] }
          });
        });
      }
    }
  };

  private getProfile = async () => {
    this.fetchWaitting = true;

    await this.getScholarship();
    await this.getBorrow();
    await this.getProfileForm();
    await this.getBirthAddress();
    await this.getCurrentAddress();
    await this.getBachelor();
    await this.getSupport();

    this.fetchWaitting = false;
  };

  private getTeacher = async () => {
    this.teacherList = null;
    let http: any = await this.service.http.get("member/getmember/3500");
    if (http.connect) {
      if (http.rowCount > 0) {
        this.teacherList = http.result;
      } else {
        this.teacherList = [];
      }
    }
  };

  public getTeacherInBranch = branch => {
    return this.teacherList.filter(value => value.branch.indexOf(branch) > -1);
  };

  private initialFormProfile = () => {
    this.formProfile = this.formBuilder.group({
      profile: this.formBuilder.group({
        // ข้อมูลผู้ขอกู้ยืม
        username: [this.service.localStorage.get("userlogin")["username"]],
        type: ["กยศ.เดิม", Validators.required],
        bdate: ["", Validators.required],
        age: ["", Validators.required],
        nationality: ["", Validators.required],
        race: ["", Validators.required],
        educationLevel: ["", Validators.required],
        level: ["", Validators.required],
        gpx: ["", Validators.required],
        advisors: ["", Validators.required]
      }),
      birthAddress: this.formBuilder.group({
        // ที่อยู่ตามทะเบียนบ้าน
        username: [this.service.localStorage.get("userlogin")["username"]],
        homeNumber: ["", Validators.required],
        villageNumber: ["", Validators.required],
        alley: ["", Validators.required],
        road: ["", Validators.required],
        subDistrict: ["", Validators.required],
        district: ["", Validators.required],
        province: ["", Validators.required],
        zipCode: ["", Validators.required],
        phone: ["", Validators.required]
      }),
      currentAddress: this.formBuilder.group({
        // ที่อยู่ปัจจุบัน
        username: [this.service.localStorage.get("userlogin")["username"]],
        homeNumber: ["", Validators.required],
        villageNumber: ["", Validators.required],
        alley: ["", Validators.required],
        road: ["", Validators.required],
        subDistrict: ["", Validators.required],
        district: ["", Validators.required],
        province: ["", Validators.required],
        zipCode: ["", Validators.required],
        phone: ["", Validators.required]
      }),
      bachelor: this.formBuilder.group({
        // สำเร็จการศึกษาระดับปริญญาตรี
        username: [this.service.localStorage.get("userlogin")["username"]],
        status: ["ไม่เคย"],
        schoolName: [""],
        department: [""],
        branch: [""]
      }),
      scholarship: this.formBuilder.group({
        // เคยได้รับทุน
        status: ["ไม่เคย"],
        items: this.formBuilder.array([])
      }),
      borrow: this.formBuilder.group({
        // เคยกู้เงิน
        type: [""],
        status: ["ไม่เคย"],
        items: this.formBuilder.array([])
      }),
      support: this.formBuilder.group({
        // การอุปการะด้านการเงิน
        username: [this.service.localStorage.get("userlogin")["username"]],
        name: ["", Validators.required],
        relationship: ["", Validators.required],
        amount: ["", Validators.required]
      })
    });
  };

  public addressCopy = () => {
    Object.keys(this.formProfile.value.birthAddress).forEach(key => {
      this.formProfile.patchValue({
        currentAddress: {
          [`${key}`]: this.formProfile.value.birthAddress[key]
        }
      });
    });
  };

  public submitProfile = async () => {
    // Profile
    this.saveWaitting = true;
    let profileForm = { ...this.formProfile.value };

    let profileFormData = new FormData();
    Object.keys(profileForm.profile).forEach(e => {
      profileFormData.append(e, profileForm.profile[e]);
    });
    profileFormData.append(
      "bdate",
      this.formProfile.value.profile.bdate.getTime()
    );
    let http_profile = await this.service.http.post(
      "101_profile/inup",
      profileFormData
    );
    console.log(http_profile);
    // ------------------------------------------------------------------------

    let birthAddressFormData = new FormData();
    Object.keys(profileForm.birthAddress).forEach(e => {
      birthAddressFormData.append(e, profileForm.birthAddress[e]);
    });
    let http_birthAddress = await this.service.http.post(
      "101_birthaddress/inup",
      birthAddressFormData
    );
    console.log(http_birthAddress);
    // ------------------------------------------------------------------------

    let currentAddressFormData = new FormData();
    Object.keys(profileForm.currentAddress).forEach(e => {
      currentAddressFormData.append(e, profileForm.currentAddress[e]);
    });
    let http_currentAddress = await this.service.http.post(
      "101_currentaddress/inup",
      currentAddressFormData
    );
    console.log(http_currentAddress);
    // ------------------------------------------------------------------------

    let bachelorFormData = new FormData();
    Object.keys(profileForm.bachelor).forEach(e => {
      bachelorFormData.append(e, profileForm.bachelor[e]);
    });
    let http_bachelor = await this.service.http.post(
      "101_bachelor/inup",
      bachelorFormData
    );
    console.log(http_bachelor);
    // ------------------------------------------------------------------------

    let scholarshipFormData: FormData;
    Object.keys(profileForm.scholarship.items).forEach(async i => {
      scholarshipFormData = new FormData();
      Object.keys(profileForm.scholarship.items[i]).forEach(j => {
        scholarshipFormData.append(j, profileForm.scholarship.items[i][j]);
      });
      scholarshipFormData.append("status", profileForm.scholarship.status);

      let http_scholarship = await this.service.http.post(
        "101_scholarship/inup",
        scholarshipFormData
      );
      console.log(http_scholarship);
    });
    await this.getScholarship();
    // ------------------------------------------------------------------------

    let borrowFormData: FormData;
    Object.keys(profileForm.borrow.items).forEach(async i => {
      borrowFormData = new FormData();
      Object.keys(profileForm.borrow.items[i]).forEach(j => {
        borrowFormData.append(j, profileForm.borrow.items[i][j]);
      });
      borrowFormData.append("status", profileForm.borrow.status);
      borrowFormData.append("type", profileForm.borrow.type);

      let http_borrow = await this.service.http.post(
        "101_borrow/inup",
        borrowFormData
      );
      console.log(http_borrow);
    });
    await this.getBorrow();
    // ------------------------------------------------------------------------

    let supportFormData = new FormData();
    Object.keys(profileForm.support).forEach(e => {
      supportFormData.append(e, profileForm.support[e]);
    });
    let http_support = await this.service.http.post(
      "101_support/inup",
      supportFormData
    );
    console.log(http_support);
    // ------------------------------------------------------------------------

    this.saveWaitting = false;
    this.router.navigate(['/student/borrow/1/new/101/parent'])
  };

  public calBdate = date => {
    // คำนวนวันเกิด
    const dt = new Date(date);
    const ageDate = new Date(Date.now() - dt.getTime());
    this.formProfile.patchValue({
      profile: {
        age: ageDate.getUTCFullYear() - 1970
      }
    });
  };

  private getScholarship = async () => {
    const items = this.formProfile.controls.scholarship.get(
      "items"
    ) as FormArray;
    items.clear();
    let http: any = await this.service.http.get(
      `101_scholarship/get/${
        this.service.localStorage.get("userlogin")["username"]
      }`
    );

    if (http.connect) {
      if (http.result.length > 0) {
        http.result.forEach(i => {
          this.formProfile.patchValue({
            scholarship: {
              status: i["status"]
            }
          });
          items.push(this.formBuilder.group(i));
        });
      }
    }
  };

  public addRowScholarship = () => {
    // เพิ่มแถวการรับทุน
    const items = this.formProfile.controls.scholarship.get(
      "items"
    ) as FormArray;
    items.push(
      this.formBuilder.group({
        username: [this.service.localStorage.get("userlogin")["username"]],
        year: [""],
        type: [""],
        name: [""],
        amount: [""],
        row: [""]
      })
    );
  };

  public getRowScholarship = () => {
    // อ่านจำนวนแถวการรับทุน
    const items = this.formProfile.controls.scholarship.get(
      "items"
    ) as FormArray;

    return items.controls;
  };

  public delRowScholarship = async (index: string) => {
    let confirm = await this.service.alert.confirm("ยืนยันการลบข้อมูล");
    const items = this.formProfile.controls.scholarship.get(
      "items"
    ) as FormArray;
    let i = parseInt(index);
    if (confirm) {
      let http: any = await this.service.http.get(
        `/101_scholarship/delete/${items.controls[i].value["row"]}`
      );
      console.log(http);
      if (http.connect) {
        if (http.success) {
          this.service.alert.alert("success", "ลบข้อมูลสำเร็จ");
        }
      }
      await this.getScholarship();
    }
  };

  private getBorrow = async () => {
    const items = this.formProfile.controls.borrow.get("items") as FormArray;
    items.clear();
    let http: any = await this.service.http.get(
      `101_borrow/get/${this.service.localStorage.get("userlogin")["username"]}`
    );
    if (http.connect) {
      if (http.result.length > 0) {
        http.result.forEach(i => {
          this.formProfile.patchValue({
            borrow: {
              status: i["status"],
              type: i["type"]
            }
          });
          items.push(this.formBuilder.group(i));
        });
      }
    }
  };

  public addRowBorrow = () => {
    // เพิ่มแถวการกู้เงิน
    const items = this.formProfile.controls.borrow.get("items") as FormArray;
    items.push(
      this.formBuilder.group({
        username: [this.service.localStorage.get("userlogin")["username"]],
        year: [""],
        educationLevel: [""],
        level: [""],
        schoolName: [""],
        amount: [""],
        row: [""]
      })
    );
  };

  public getRowBorrow = () => {
    // อ่านจำนวนแถวการรกู้เงิน
    const items = this.formProfile.controls.borrow.get("items") as FormArray;

    return items.controls;
  };

  public delRowBorrow = async (index: string) => {
    let confirm = await this.service.alert.confirm("ยืนยันการลบข้อมูล");
    const items = this.formProfile.controls.borrow.get("items") as FormArray;
    let i = parseInt(index);
    if (confirm) {
      let http: any = await this.service.http.get(
        `/101_borrow/delete/${items.controls[i].value["row"]}`
      );
      console.log(http);
      if (http.connect) {
        if (http.success) {
          this.service.alert.alert("success", "ลบข้อมูลสำเร็จ");
        }
      }
      await this.getBorrow();
    }
  };
}
