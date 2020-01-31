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

  constructor(
    private formBuilder: FormBuilder,
    public service: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initialFormProfile();
  }

  private initialFormProfile = () => {
    this.formProfile = this.formBuilder.group({
      profile: this.formBuilder.group({
        // ข้อมูลผู้ขอกู้ยืม
        username: [""],
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
        username: [""],
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
        username: [""],
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
        username: [""],
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
        username: [""],
        name: ["", Validators.required],
        relationship: ["", Validators.required],
        amount: ["", Validators.required]
      })
    });
  };

  public submitProfile = () => {
    console.log(this.formProfile.value);
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

  public addRowScholarship = () => {
    // เพิ่มแถวการรับทุน
    const items = this.formProfile.controls.scholarship.get(
      "items"
    ) as FormArray;
    items.push(
      this.formBuilder.group({
        username: [""],
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
        username: [""],
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
