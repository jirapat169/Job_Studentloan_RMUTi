import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-edit-organization",
  templateUrl: "./edit-organization.component.html",
  styleUrls: ["./edit-organization.component.scss"]
})
export class EditOrganizationComponent implements OnInit {
  public organize: Array<any> = null;
  public formOrganize: FormGroup;
  public onEdit: boolean = false;

  constructor(private formBuilder: FormBuilder, public service: AppService) {}

  async ngOnInit() {
    this.initialForm();
    this.getOrganize();
  }

  public submitOrganize = async () => {
    let formData = new FormData();
    Object.keys(this.formOrganize.value).forEach(i => {
      formData.append(i, this.formOrganize.value[i]);
    });

    let http: any = await this.service.http.post(
      "member/inup_organization",
      formData
    );
    if (http.success) {
      this.service.alert.alert("success", "บันทึกข้อมูลสำเร็จ");
      this.getOrganize();
      this.service.modalClose("organizationModal");
    } else {
      this.service.alert.alert("error", "บันทึกข้อมูลล้มเหลว", "server error");
    }
    console.log(http);
  };

  public initialForm = () => {
    this.formOrganize = this.formBuilder.group({
      header: [""],
      parent: ["", Validators.required],
      code: ["", Validators.required],
      name: ["", Validators.required]
    });
  };

  private getOrganize = () => {
    this.service.http.get("organize").then((value: any) => {
      if (value.rowCount > 0) this.organize = value.result;
      else this.organize = null;
    });
  };

  public getCampus = () => {
    return this.service.underscore.where(this.organize, {
      parent: "0000"
    });
  };

  public getDepartment = (code: string) => {
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
