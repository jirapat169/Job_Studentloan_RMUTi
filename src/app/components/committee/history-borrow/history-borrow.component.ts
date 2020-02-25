import { ActivatedRoute } from "@angular/router";
import { AppService } from "src/app/services/app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-history-borrow",
  templateUrl: "./history-borrow.component.html",
  styleUrls: ["./history-borrow.component.scss"]
})
export class HistoryBorrowComponent implements OnInit {
  public history: Array<any> = null;

  constructor(public service: AppService, private route: ActivatedRoute) {}

  async ngOnInit() {
    await this.getInitial();
  }

  private getInitial = async () => {
    let init: any = await this.service.http.get("Initial_borrow/getall");
    if (init.rowCount > 0) {
      this.history = this.service.underscore.where(init.result, {
        username: this.route.snapshot.paramMap.get("username")
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
