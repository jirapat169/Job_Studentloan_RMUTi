import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-stddoc-std",
  templateUrl: "./stddoc.component.html",
  styleUrls: ["./stddoc.component.scss"]
})
export class StddocComponent implements OnInit {
  @Input("route") route: any;
  @Input("term") term: any;
  @Input("typeDoc") typeDoc: any;

  public pageWaitting = false;
  public formDocConfirm: FormGroup;
  public doc: any = {};
  public confirmFormDoc: any = null;
  constructor(public service: AppService, private formBuilder: FormBuilder) {}

  async ngOnInit() {
    this.pageWaitting = true;
    this.formDocConfirm = this.formBuilder.group({
      username: [this.route.username],
      year: [this.service.yearOnSystem()],
      term: [this.term],
      formDoc: ["doc"],
      remark: ["เอกสารถูกต้อง"],
      remark2: [""]
    });
    await this.getConfirm();
    await this.getDoc();
    this.pageWaitting = false;
  }

  private getDoc = async () => {
    let formData = new FormData();
    formData.append("username", this.route.username);
    formData.append("year", this.service.yearOnSystem());
    formData.append("term", this.term);

    let getDoc: any = await this.service.http.post(
      "document_required/get",
      formData
    );
    if (getDoc.rowCount > 0) {
      Object.keys(getDoc.result[0]).forEach(i => {
        this.doc[i] = getDoc.result[0][i];
      });
    }

    console.log("doc", getDoc);
  };

  public form104ConfirmSubmit = async () => {
    let confirm = await this.service.alert.confirm("ยืนยันการตรวจสอบเอกสาร");
    if (confirm) {
      let formData = new FormData();
      Object.keys(this.formDocConfirm.value).forEach(i => {
        formData.append(i, this.formDocConfirm.value[i]);
      });

      let http: any = await this.service.http.post(
        "/student_confirm/upremark",
        formData
      );
      console.log(http);
      await this.getConfirm();
    }
  };

  private getConfirm = async () => {
    let formData = new FormData();
    formData.append("username", this.route.username);
    formData.append("year", this.service.yearOnSystem());
    formData.append("term", this.term);
    formData.append("formDoc", "doc");

    let http_confirm: any = await this.service.http.post(
      `student_confirm/get`,
      formData
    );

    if (http_confirm.rowCount > 0) {
      this.confirmFormDoc = http_confirm.result[0];
    } else {
      this.confirmFormDoc = null;
    }

    console.log("http_confirm_104", http_confirm);
  };
}
