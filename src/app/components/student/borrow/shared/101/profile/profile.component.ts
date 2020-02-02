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

  private getProfile = async () => {
    this.fetchWaitting = true;
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
    // console.log(branch)
    return this.teacherList.filter(value => value.branch.indexOf(branch) > -1);
  };

  private initialFormProfile = () => {
    this.formProfile = this.formBuilder.group({
      profile: this.formBuilder.group({
        // ข้อมูลผู้ขอกู้ยืม
        username: [this.service.localStorage.get("userlogin")["username"]],
        type: ["", Validators.required],
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
      // support: this.formBuilder.group({
      //   // การอุปการะด้านการเงิน
      //   username: [this.service.localStorage.get("userlogin")["username"]],
      //   name: ["", Validators.required],
      //   relationship: ["", Validators.required],
      //   amount: ["", Validators.required]
      // }),
      support: this.formBuilder.group({
        // การอุปการะด้านการเงิน
        username: [this.service.localStorage.get("userlogin")["username"]],
        name: [""],
        relationship: [""],
        amount: [""]
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
    let profileForm = { ...this.formProfile.value };

    let profileFormData = new FormData();
    profileForm.profile.bdate = this.formProfile.value.profile.bdate.getTime();
    Object.keys(profileForm.profile).forEach(e => {
      profileFormData.append(e, profileForm.profile[e]);
    });
    let http_profile = await this.service.http.post(
      "101_profile/inup",
      profileFormData
    );
    // console.log(http_profile);

    let birthAddressFormData = new FormData();
    Object.keys(profileForm.birthAddress).forEach(e => {
      birthAddressFormData.append(e, profileForm.birthAddress[e]);
    });
    let http_birthAddress = await this.service.http.post(
      "101_birthaddress/inup",
      birthAddressFormData
    );
    console.log(http_birthAddress);

    let currentAddressFormData = new FormData();
    Object.keys(profileForm.currentAddress).forEach(e => {
      currentAddressFormData.append(e, profileForm.currentAddress[e]);
    });
    let http_currentAddress = await this.service.http.post(
      "101_currentaddress/inup",
      currentAddressFormData
    );
    console.log(http_currentAddress);

    // this.router.navigate(['/student/borrow/1/new/101/parent'])
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

  public delRowScholarship = (index: string) => {
    const items = this.formProfile.controls.scholarship.get(
      "items"
    ) as FormArray;
    let i = parseInt(index);
    items.removeAt(i);
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

  public delRowBorrow = (index: string) => {
    const items = this.formProfile.controls.borrow.get("items") as FormArray;
    let i = parseInt(index);
    items.removeAt(i);
  };
}
