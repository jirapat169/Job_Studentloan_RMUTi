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
  public loadData: boolean = false;
  public databaseSave: boolean = false;
  public saveDataWaitting: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public service: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initialFormFirst();
    this.getFormFirst();
  }

  private getFormFirst = async () => {
    let formData = new FormData();
    let data = {
      username: this.service.localStorage.get("userlogin")["username"],
      year: this.service.yearOnSystem(),
      term: "1"
    };
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    let http: any = await this.service.http.post(
      "Initial_borrow/get",
      formData
    );
    // console.log(http);
    this.loadData = true;
    if (http.connect) {
      if (http.result.length > 0) {
        this.databaseSave = true;
        this.formFirst.patchValue({
          type: http.result[0]["type"],
          termMoney: http.result[0]["termMoney"],
          monthMoney: http.result[0]["monthMoney"]
        });
      }
    }
  };

  private initialFormFirst = () => {
    this.formFirst = this.formBuilder.group({
      username: [this.service.localStorage.get("userlogin")["username"]],
      type: ["", Validators.required],
      termMoney: ["", Validators.required],
      monthMoney: ["", Validators.required],
      year: [this.service.yearOnSystem()],
      term: ["1"]
    });
  };

  public nextPage = async () => {
    let submit = await this.submitFormFirst();
    if (submit == true) {
      this.saveDataWaitting = true;
      let formData = new FormData();
      Object.keys(this.formFirst.value).forEach(key => {
        formData.append(key, this.formFirst.value[key]);
      });

      let http: any = await this.service.http.post(
        "Initial_borrow/inup",
        formData
      );
      this.saveDataWaitting = false;
      // console.log(http);
      if (http.connect) {
        if (http.success) {
          if (this.formFirst.value.type == "รายเก่า") {
            this.router.navigate(["/student/borrow/1/old"]);
          } else {
            this.router.navigate(["/student/borrow/1/new"]);
          }
        }
      }
    } else {
      return false;
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
