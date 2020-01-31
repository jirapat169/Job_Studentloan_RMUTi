import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
  constructor(
    private formBuilder: FormBuilder,
    public service: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initialFormParent();
  }

  public submitParent = () => {
    console.log(this.formParent.value);
  };
  
  private initialFormParent = () => {
    this.formParent = this.formBuilder.group({
      father: this.formBuilder.group({
        username: [""],
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
        alley: ["-", Validators.required],
        road: ["-", Validators.required],
        subDistrict: ["", Validators.required],
        district: ["", Validators.required],
        province: ["", Validators.required],
        zipCode: ["", Validators.required],
        phone: ["", Validators.required]
      })
    });
  };
}
