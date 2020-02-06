import { Router, NavigationEnd } from "@angular/router";
import { AppService } from "src/app/services/app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-view101",
  templateUrl: "./view101.component.html",
  styleUrls: ["./view101.component.scss"]
})
export class View101Component implements OnInit {
  public listPage = [
    {
      path: "/student/borrow/1/new/101/profile",
      title: "ข้อมูลผู้ขอกู้ยืมเงิน"
    },
    { path: "/student/borrow/1/new/101/parent", title: "ข้อมูลบิดา - มารดา" },
    {
      path: "/student/borrow/1/new/101/nparent",
      title: "ข้อมูลผู้ปกครอง (ถ้ามี)"
    },
    {
      path: "/student/borrow/1/new/101/spouse",
      title: "ข้อมูลคู่สมรส (ถ้ามี)"
    },
    { path: "/student/borrow/1/new/101/confirm", title: "ยืนยันข้อมูล กยศ.101" }
  ];
  public selectedIndex: number = 0;
  public pageWait: boolean = false;

  // Check Confirm
  public onLoadForm: boolean = true;
  public remark: string = "";
  public confirmWait: boolean = false;
  constructor(public service: AppService, private router: Router) {}

  async ngOnInit() {
    await this.getConfirm();
    this.router.events.subscribe(async event => {
      // console.log(event)
      if (event instanceof NavigationEnd) {
        this.selectedIndex = this.listPage
          .map(e => {
            return e.path;
          })
          .indexOf(event.url);
        this.pageWait = true;
        await this.service.delay(100);
        this.pageWait = false;
      }
    });

    this.selectedIndex = this.listPage
      .map(e => {
        return e.path;
      })
      .indexOf(window.location.pathname);
    this.router.navigate([this.listPage[this.selectedIndex].path]);
  }

  private getConfirm = async () => {
    this.confirmWait = true;
    let formData = new FormData();
    formData.append(
      "username",
      this.service.localStorage.get("userlogin")["username"]
    );
    formData.append("year", this.service.yearOnSystem());
    formData.append("term", "1");

    let http_confirm: any = await this.service.http.post(
      `student_confirm/get`,
      formData
    );

    if (http_confirm.result.length > 0) {
      if (
        http_confirm.result[0]["remark"] ==
          "รอการตรวจสอบจากเจ้าหน้าที่กองทุน" &&
        http_confirm.result[0]["formDoc"] == "101"
      ) {
        this.onLoadForm = false;
        this.remark = http_confirm.result[0]["remark"];
      }
    }
    this.confirmWait = false;
    console.log("http_confirm", http_confirm);
  };

  public tabsSelect = async event => {
    this.selectedIndex = event.selectedIndex;
    this.pageWait = true;
    await this.service.delay(100);
    this.pageWait = false;
    this.router.navigate([this.listPage[this.selectedIndex].path]);
  };
}
