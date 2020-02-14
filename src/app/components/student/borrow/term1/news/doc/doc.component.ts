import { Validators } from "@angular/forms";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Component, OnInit, Input } from "@angular/core";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-doc",
  templateUrl: "./doc.component.html",
  styleUrls: ["./doc.component.scss"]
})
export class DocComponent implements OnInit {
  public foundData: boolean = false;
  public onLoadForm: boolean = true;
  public remark: string = null;
  public remark2: string = null;
  public formDoc: FormGroup;
  public pageWaitting: boolean = false;
  @Input("selectBorrow") selectBorrow: string = "news";
  constructor(public service: AppService, private formBuilder: FormBuilder) {}

  async ngOnInit() {
    console.log(this.selectBorrow);
    this.pageWaitting = true;
    this.formDoc = this.formBuilder.group({
      username: [this.service.localStorage.get("userlogin")["username"]],
      year: [this.service.yearOnSystem()],
      term: ["1"],
      eStudentLoan: ["", Validators.required],
      gpx: ["", Validators.required],
      studentDoc: ["", Validators.required],
      fatherDoc: [""],
      motherDoc: [""],
      parentDoc: [""],
      volunteerDoc: ["", Validators.required],
      volunteerImg: ["", Validators.required]
    });

    await this.getDoc();
    await this.getConfirm();

    if (this.selectBorrow == "old") {
      this.formDoc.patchValue({
        studentDoc: "-",
        fatherDoc: "-",
        motherDoc: "-",
        parentDoc: "-"
      });
    }
    this.pageWaitting = false;
  }

  private getConfirm = async () => {
    let formData = new FormData();
    formData.append(
      "username",
      this.service.localStorage.get("userlogin")["username"]
    );
    formData.append("year", this.service.yearOnSystem());
    formData.append("term", "1");
    formData.append("formDoc", "doc");

    let http_confirm: any = await this.service.http.post(
      `student_confirm/get`,
      formData
    );

    if (http_confirm.result.length > 0) {
      if (
        http_confirm.result[0]["remark"] == "รอการตรวจสอบจากเจ้าหน้าที่กองทุน"
      ) {
        this.onLoadForm = false;
      } else if (http_confirm.result[0]["remark"] == "เอกสารถูกต้อง") {
        this.onLoadForm = false;
      }
      this.remark = http_confirm.result[0]["remark"];
      this.remark2 = http_confirm.result[0]["remark2"];
    }
    console.log("http_confirm", http_confirm);
  };

  private getDoc = async () => {
    this.foundData = false;
    let formData = new FormData();
    formData.append(
      "username",
      this.service.localStorage.get("userlogin")["username"]
    );
    formData.append("year", this.service.yearOnSystem());
    formData.append("term", "1");

    let getDoc: any = await this.service.http.post(
      "document_required/get",
      formData
    );
    if (getDoc.rowCount > 0) {
      this.foundData = true;
      Object.keys(getDoc.result[0]).forEach(i => {
        this.formDoc.patchValue({
          [i]: getDoc.result[0][i]
        });
      });
    }
  };

  public submitDoc = async () => {
    if (this.formDoc.valid) {
      let formData = new FormData();
      Object.keys(this.formDoc.value).forEach(i => {
        formData.append(i, this.formDoc.value[i]);
      });

      let http_doc: any = await this.service.http.post(
        "document_required/inup",
        formData
      );
      console.log(http_doc);

      await this.getDoc();
    } else {
      this.service.alert.alert("warning", "โปรดตรวจสอบข้อมูลให้ครบถ้วน");
    }
  };

  public fileUpload = async (event: any, key: string) => {
    let file = new FormData();
    if (event.target.files[0]) {
      if (event.target.files[0].size > 1000000) {
        this.service.alert.alert("error", "ไม่รองรับไฟล์ขนาดเกิน 1MB");
        event.target.value = "";
        return;
      }
      file.append("FileUpload", event.target.files[0]);
      let fileUpload: any = await this.service.http.post("uploadFile", file);
      if (fileUpload.success) {
        this.formDoc.patchValue({
          [`${key}`]: fileUpload.path
        });
      }
      event.target.value = "";
    }
  };

  public submitConfirm = async () => {
    let confirmData: any = await this.service.alert.confirm(
      "ยืนยันข้อมูล เอกสารประกอบ"
    );
    if (confirmData) {
      let formData = new FormData();
      formData.append(
        "username",
        this.service.localStorage.get("userlogin")["username"]
      );
      formData.append("year", this.service.yearOnSystem());
      formData.append("term", "1");
      formData.append("formDoc", "doc");
      formData.append("remark", "รอการตรวจสอบจากเจ้าหน้าที่กองทุน");

      let http_confirm: any = await this.service.http.post(
        "student_confirm/inup",
        formData
      );

      if (http_confirm.success) {
        window.location.reload();
      }
      console.log(http_confirm);
    }
  };
}
