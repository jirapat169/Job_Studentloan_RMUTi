import { AppService } from "src/app/services/app.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-term1",
  templateUrl: "./term1.component.html",
  styleUrls: ["./term1.component.scss"]
})
export class Term1Component implements OnInit {
  public formFirst: FormGroup;
  private formStateEdit: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public service: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initialFormFirst();
  }

  private initialFormFirst = () => {
    this.formFirst = this.formBuilder.group({
      username: [""],
      type: ["", Validators.required],
      termMoney: ["", Validators.required],
      monthMoney: ["", Validators.required],
      year: [this.service.yearOnSystem()],
      term: [this.service.termOnSystem()]
    });

    this.formFirst.valueChanges.subscribe(v => {
      // Edit Event
      this.formStateEdit = true;
    });
  };

  public nextPage = async () => {
    if (this.formStateEdit) {
      // Save Data
      let submit = await this.submitFormFirst();
      this.formStateEdit = false;
    } else {
    }

    if (this.formFirst.value.type == "รายเก่า") {
      this.router.navigate(["/student/borrow/1/old"]);
    } else {
      this.router.navigate(["/student/borrow/1/new"]);
    }
  };

  private submitFormFirst = () => {
    return new Promise(resolve => {
      if (
        this.formFirst.value.termMoney == "ไม่กู้" &&
        this.formFirst.value.monthMoney == "ไม่กู้"
      ) {
        this.service.alert.alert(
          "warning",
          "โปรดเลือกค่าใช้จ่ายอย่างน้อย 1 อย่าง"
        );
        resolve(false);
      } else {
        // Save data
        resolve(true);
      }
    });
  };
}
