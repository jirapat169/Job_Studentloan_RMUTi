import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "src/app/services/app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-term2",
  templateUrl: "./term2.component.html",
  styleUrls: ["./term2.component.scss"]
})
export class Term2Component implements OnInit {
  public formFirst: FormGroup;
  public loadData: boolean = false;
  public databaseSave: boolean = false;
  public saveDataWaitting: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public service: AppService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.initialFormFirst();
    await this.getFormFirst();
  }

  private getFormFirst = async () => {
    let formData = new FormData();
    let data = {
      username: this.service.localStorage.get("userlogin")["username"],
      year: this.service.yearOnSystem(),
      term: "2"
    };
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    let http: any = await this.service.http.post(
      "Initial_borrow/get",
      formData
    );
    console.log(http);
    this.loadData = true;

    if (http.result.length > 0) {
      this.databaseSave = true;
      this.formFirst.patchValue({
        termMoney: http.result[0]["termMoney"],
        monthMoney: http.result[0]["monthMoney"]
      });
    } else {
      let http: any = await this.service.http.get("time_borrow/get/2");
      if (http.rowCount > 0) {
        let dt = new Date().getTime();
        if (
          dt >= parseInt(http.result[0]["open"]) &&
          dt <= parseInt(http.result[0]["close"])
        ) {
        } else {
          this.service.alert.alert(
            "warning",
            "ไม่อยู่ในช่วงที่กำหนด",
            "ภาคเรียนที่ 2"
          );
          this.router.navigate(["/student/borrow/"]);
        }
      }
      console.log(http);
    }
  };

  private initialFormFirst = () => {
    this.formFirst = this.formBuilder.group({
      username: [this.service.localStorage.get("userlogin")["username"]],
      type: ["ภาคเรียนที่2"],
      termMoney: ["", Validators.required],
      monthMoney: ["", Validators.required],
      year: [this.service.yearOnSystem()],
      term: ["2"]
    });
  };

  public nextPage = async () => {
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
        this.router.navigate(["/student/borrow/2/doc"]);
      }
    }
  };
}
