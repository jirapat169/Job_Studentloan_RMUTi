import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.scss"]
})
export class ParentComponent implements OnInit {
  public pageWaitting: boolean = false;
  public listFather: Array<any> = null;
  public listMother: Array<any> = null;
  public listFatherCareer: Array<any> = null;
  public listMotherCareer: Array<any> = null;
  public selectFatherCareer: string = "";
  public selectMotherCareer: string = "";

  constructor(public service: AppService, private formBuilder: FormBuilder) {}

  async ngOnInit() {
    this.pageWaitting = true;

    await this.getFather();
    await this.getMother();

    this.pageWaitting = false;
  }

  public getFatherList = () => {
    if (this.listFather != null) {
      return this.service.underscore.where(this.listFather, {
        career: this.selectFatherCareer,
        life: "ยังมีชีวิตอยู่"
      });
    }

    return [];
  };

  public getMotherList = () => {
    if (this.listFather != null) {
      return this.service.underscore.where(this.listMother, {
        career: this.selectMotherCareer,
        life: "ยังมีชีวิตอยู่"
      });
    }

    return [];
  };

  private getFather = async () => {
    let http: any = await this.service.http.get("101_father/getall");
    if (http.rowCount > 0) {
      this.listFather = http.result;
      this.getCareerFather();
    } else {
      this.listFather = null;
    }
    console.log("listFather", http);
  };

  private getMother = async () => {
    let http: any = await this.service.http.get("101_mother/getall");
    if (http.rowCount > 0) {
      this.listMother = http.result;
      this.getCareerMother();
    } else {
      this.listMother = null;
    }
    console.log("listMother", http);
  };

  public getCareerFather = () => {
    if (this.listFather != null) {
      this.listFatherCareer = [];
      this.listFather.forEach(i => {
        if (i["career"].length > 1) {
          if (!this.listFatherCareer.includes(i["career"])) {
            this.listFatherCareer.push(i["career"]);
          }
        }
      });
    } else {
      this.listFatherCareer = [];
    }
  };

  public getCareerMother = () => {
    if (this.listMother != null) {
      this.listMotherCareer = [];
      this.listMother.forEach(i => {
        if (i["career"].length > 1) {
          if (!this.listMotherCareer.includes(i["career"])) {
            this.listMotherCareer.push(i["career"]);
          }
        }
      });
    } else {
      this.listMotherCareer = [];
    }
  };
}
