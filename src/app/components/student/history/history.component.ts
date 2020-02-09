import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"]
})
export class HistoryComponent implements OnInit {
  public history: Array<any> = null;

  constructor(public service: AppService) {}

  async ngOnInit() {
    await this.getInitial();
  }

  private getInitial = async () => {
    let init: any = await this.service.http.get("Initial_borrow/getall");
    if (init.rowCount > 0) {
      this.history = this.service.underscore.where(init.result, {
        username: this.service.localStorage.get("userlogin")["username"]
      });
    }
    console.log(this.history);
  };

  public cal = () => {
    let money = {
      term: 0,
      month: 0
    };
    this.history.forEach(i => {
      if (i["remark"] == "อนุมัติให้กู้ยืม") {
        money.term += parseInt(i["termMoney"]);
        money.month += parseInt(i["monthMoney"] == "กู้" ? "14400" : "0");
      }
    });

    return money;
  };
}
