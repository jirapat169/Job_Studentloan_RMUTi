import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { AppService } from "src/app/services/app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile-std",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  @Input("route") route: any;
  public student101: any = {
    userInfo: {},
    profile: {},
    birthAddress: {},
    currentAddress: {},
    bachelor: {},
    scholarship: [],
    borrow: [],
    support: {}
  };
  public pageWaitting: boolean = false;
  public teacher: any = null;

  constructor(
    private formBuilder: FormBuilder,
    public service: AppService,
    private router: Router
  ) {}

  async ngOnInit() {
    console.log(this.route);
    this.pageWaitting = true;

    await this.getInitialBorrow();
    await this.getProfileForm();
    await this.getBirthAddress();
    await this.getCurrentAddress();
    await this.getTeacher();
    await this.getBachelor();
    await this.getScholarship();
    await this.getBorrow();
    await this.getSupport();

    this.pageWaitting = false;

    console.log(this.student101);
  }

  private getProfileForm = async () => {
    let profile: any = await this.service.http.get(
      `101_profile/get/${this.route.username}`
    );

    if (profile.result.length > 0) {
      Object.keys(profile.result[0]).forEach(key => {
        this.student101.profile[key] = profile.result[0][key];
      });
      this.student101.profile["bdate"] = new Date(
        parseInt(profile.result[0]["bdate"])
      );
    }
  };

  private getBirthAddress = async () => {
    let birthAddress: any = await this.service.http.get(
      `101_birthaddress/get/${this.route.username}`
    );

    if (birthAddress.result.length > 0) {
      Object.keys(birthAddress.result[0]).forEach(key => {
        this.student101.birthAddress[key] = birthAddress.result[0][key];
      });
    }
  };

  private getInitialBorrow = async () => {
    let dataInitial: any = await this.service.http.get(
      "/Initial_borrow/getall"
    );

    if (dataInitial.rowCount > 0) {
      this.student101.userInfo = this.service.underscore.where(
        dataInitial.result,
        {
          username: this.route.username,
          term: "1",
          year: this.service.yearOnSystem()
        }
      )[0];
    }
  };

  private getCurrentAddress = async () => {
    let currentAddress: any = await this.service.http.get(
      `101_currentaddress/get/${this.route.username}`
    );

    if (currentAddress.result.length > 0) {
      Object.keys(currentAddress.result[0]).forEach(key => {
        this.student101.currentAddress[key] = currentAddress.result[0][key];
      });
    }
  };

  public calBdate = date => {
    // คำนวนวันเกิด
    const dt = new Date(date);
    const ageDate = new Date(new Date().getTime() - dt.getTime());
    return ageDate.getUTCFullYear() - 1970;
  };

  private getTeacher = async () => {
    let http: any = await this.service.http.get("member/getmember/3500");
    if (http.rowCount > 0) {
      this.teacher = this.service.underscore.where(http.result, {
        username: this.student101.profile["advisors"]
      })[0];
    }
  };

  private getBachelor = async () => {
    let bachelor: any = await this.service.http.get(
      `101_bachelor/get/${this.route.username}`
    );

    if (bachelor.result.length > 0) {
      Object.keys(bachelor.result[0]).forEach(key => {
        this.student101.bachelor[key] = bachelor.result[0][key];
      });
    }
  };

  private getScholarship = async () => {
    let http: any = await this.service.http.get(
      `101_scholarship/get/${this.route.username}`
    );

    if (http.result.length > 0) {
      http.result.forEach(i => {
        this.student101.scholarship.push(i);
      });
    }
  };

  private getBorrow = async () => {
    let http: any = await this.service.http.get(
      `101_borrow/get/${this.route.username}`
    );

    if (http.result.length > 0) {
      http.result.forEach(i => {
        this.student101.borrow.push(i);
      });
    }
  };

  private getSupport = async () => {
    let support: any = await this.service.http.get(
      `101_support/get/${this.route.username}`
    );

    if (support.result.length > 0) {
      Object.keys(support.result[0]).forEach(key => {
        this.student101.support[key] = support.result[0][key];
      });
    }
  };
}
