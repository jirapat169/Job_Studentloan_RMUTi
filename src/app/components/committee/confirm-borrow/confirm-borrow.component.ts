import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-confirm-borrow",
  templateUrl: "./confirm-borrow.component.html",
  styleUrls: ["./confirm-borrow.component.scss"]
})
export class ConfirmBorrowComponent implements OnInit {
  public organize: Array<any> = null;
  public studentInitial: Array<any> = null;
  public termSelect: string = "1";

  constructor(public service: AppService) {}

  ngOnInit() {
    this.getInitialBorrow();
    this.getOrganize();
  }

  public searchStudent = (branch: string = "") => {
    if (branch.length > 0)
      return this.service.underscore.where(this.studentInitial, {
        branch: branch,
        term: this.termSelect
      });
    else
      return this.service.underscore.where(this.studentInitial, {
        term: this.termSelect
      });
  };

  private getOrganize = () => {
    this.service.http.get("organize").then((value: any) => {
      if (value.connect) {
        if (value.rowCount > 0) this.organize = value.result;
        else this.organize = null;
      } else this.organize = null;
    });
  };

  private getInitialBorrow = async () => {
    let dataInitial: any = await this.service.http.get(
      "/Initial_borrow/getall"
    );

    if (dataInitial.connect) {
      this.studentInitial = dataInitial.result;
    }

    console.log(dataInitial);
  };

  public getDepartment = (code: string = "1000") => {
    return this.service.underscore.filter(
      this.service.underscore.where(this.organize, {
        parent: code
      }),
      (x: any) => {
        return x.name.includes("คณะ");
      }
    );
  };

  public getGroup = (code: string) => {
    return this.service.underscore.filter(
      this.service.underscore.where(this.organize, {
        parent: code
      }),
      (x: any) => {
        return x.name.includes("กลุ่มสาขา");
      }
    );
  };

  public getBranch = (code: string) => {
    return this.service.underscore.filter(
      this.service.underscore.where(this.organize, {
        parent: code
      }),
      (x: any) => {
        return x.name.includes("สาขา");
      }
    );
  };
}
