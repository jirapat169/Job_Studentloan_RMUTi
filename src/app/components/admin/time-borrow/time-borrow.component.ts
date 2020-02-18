import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-time-borrow",
  templateUrl: "./time-borrow.component.html",
  styleUrls: ["./time-borrow.component.scss"]
})
export class TimeBorrowComponent implements OnInit {
  public formDateBorrow: FormGroup;

  constructor(private formBuilder: FormBuilder, public service: AppService) {}

  async ngOnInit() {
    this.formDateBorrow = this.formBuilder.group({
      term1: this.formBuilder.group({
        open: ["", Validators.required],
        close: ["", Validators.required]
      }),
      term2: this.formBuilder.group({
        open: ["", Validators.required],
        close: ["", Validators.required]
      })
    });

    await this.getDateBorrow();
  }

  private getDateBorrow = async () => {
    let term1: any = await this.service.http.post("time_borrow/get/1");
    if (term1.rowCount > 0) {
      this.formDateBorrow.patchValue({
        term1: {
          open: new Date(parseInt(term1.result[0]["open"])),
          close: new Date(parseInt(term1.result[0]["close"]))
        }
      });
    }

    let term2: any = await this.service.http.post("time_borrow/get/2");
    if (term2.rowCount > 0) {
      this.formDateBorrow.patchValue({
        term2: {
          open: new Date(parseInt(term2.result[0]["open"])),
          close: new Date(parseInt(term2.result[0]["close"]))
        }
      });
    }

    console.log("Form", this.formDateBorrow.value);
    console.log("term1", term1);
    console.log("term2", term2);
  };

  public submitDateBorrow = async () => {
    let formData = new FormData();
    formData.append("term", "1");
    formData.append("open", this.formDateBorrow.value.term1.open.getTime());
    formData.append("close", this.formDateBorrow.value.term1.close.getTime());
    let term1: any = await this.service.http.post("time_borrow/inup", formData);

    let formData2 = new FormData();
    formData2.append("term", "2");
    formData2.append("open", this.formDateBorrow.value.term2.open.getTime());
    formData2.append("close", this.formDateBorrow.value.term2.close.getTime());
    let term2: any = await this.service.http.post(
      "time_borrow/inup",
      formData2
    );

    console.log(term1, term2);
    await this.getDateBorrow();
  };
}
