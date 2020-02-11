import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { AppService } from "src/app/services/app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-parent-std",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.scss"]
})
export class ParentComponent implements OnInit {
  @Input("route") route: any;
  public parent: any = {
    father: {},
    mother: {},
    relationship: {},
    brethren: {},
    brethrenStudy: [],
    brethrenWorked: []
  };
  public pageWaitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public service: AppService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.pageWaitting = true;

    await this.getFather();
    await this.getMother();
    await this.getRelationship();
    await this.getBrethren();
    await this.getBrethrenStudy();
    await this.getBrethrenWorked();

    console.log(this.parent);
    this.pageWaitting = false;
  }

  private getFather = async () => {
    let http: any = await this.service.http.get(
      `101_father/get/${this.route.username}`
    );

    if (http.rowCount > 0) {
      Object.keys(http.result[0]).forEach(key => {
        this.parent.father[key] = http.result[0][key];
      });
    }
  };

  private getMother = async () => {
    let http: any = await this.service.http.get(
      `101_mother/get/${this.route.username}`
    );

    if (http.rowCount > 0) {
      Object.keys(http.result[0]).forEach(key => {
        this.parent.mother[key] = http.result[0][key];
      });
    }
  };

  private getRelationship = async () => {
    let http: any = await this.service.http.get(
      `101_relationship/get/${this.route.username}`
    );

    if (http.rowCount > 0) {
      Object.keys(http.result[0]).forEach(key => {
        this.parent.relationship[key] = http.result[0][key];
      });
    }
  };

  private getBrethren = async () => {
    let http: any = await this.service.http.get(
      `101_brethren/get/${this.route.username}`
    );

    if (http.rowCount > 0) {
      Object.keys(http.result[0]).forEach(key => {
        this.parent.brethren[key] = http.result[0][key];
      });
    }
  };

  private getBrethrenStudy = async () => {
    let http: any = await this.service.http.get(
      `101_brethrenStudy/get/${this.route.username}`
    );

    if (http.rowCount > 0) {
      http.result.forEach(i => {
        this.parent.brethrenStudy.push(i);
      });
    }
  };

  private getBrethrenWorked = async () => {
    let http: any = await this.service.http.get(
      `101_brethrenWorked/get/${this.route.username}`
    );

    if (http.rowCount > 0) {
      http.result.forEach(i => {
        this.parent.brethrenWorked.push(i);
      });
    }
  };
}
