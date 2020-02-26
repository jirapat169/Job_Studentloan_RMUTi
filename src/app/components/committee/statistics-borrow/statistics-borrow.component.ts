import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-statistics-borrow",
  templateUrl: "./statistics-borrow.component.html",
  styleUrls: ["./statistics-borrow.component.scss"]
})
export class StatisticsBorrowComponent implements OnInit {
  public initialBorrow: Array<any> = null;
  public listProvince: Array<any> = null;
  public pageWaitting: boolean = false;
  public provinceSelect: string = "";

  constructor(public service: AppService, private formBuilder: FormBuilder) {}

  async ngOnInit() {
    this.pageWaitting = true;

    await this.getInitialBorrow();
    this.getProvince();

    this.pageWaitting = false;
  }

  private getInitialBorrow = async () => {
    let dataInitial: any = await this.service.http.get(
      "/Initial_borrow/getall"
    );

    if (dataInitial.rowCount > 0) {
      this.initialBorrow = dataInitial.result;
    } else {
      this.initialBorrow = null;
    }

    console.log(this.initialBorrow);
  };

  public getBorrow = () => {
    if (this.initialBorrow != null) {
      return this.service.underscore.where(this.initialBorrow, {
        year: this.service.yearOnSystem(),
        province: this.provinceSelect
      });
    }

    return [];
  };

  public getProvince = () => {
    if (this.initialBorrow != null) {
      this.listProvince = [];
      this.initialBorrow.forEach(i => {
        if (i["province"] != null) {
          if (!this.listProvince.includes(i["province"])) {
            this.listProvince.push(i["province"]);
          }
        }
      });
    } else {
      this.listProvince = null;
    }
  };
}
