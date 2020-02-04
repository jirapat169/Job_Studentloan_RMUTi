import { AppService } from "./../../../services/app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-check-doc",
  templateUrl: "./check-doc.component.html",
  styleUrls: ["./check-doc.component.scss"]
})
export class CheckDocComponent implements OnInit {
  public organize: Array<any> = null;
  public studentInitial: Array<any> = null;

  constructor(public service: AppService) {}

  ngOnInit() {
    console.log(this.service.localStorage.get("userlogin"));
    this.getInitialBorrow();
    this.getOrganize();
  }

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
}
