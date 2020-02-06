import { AppService } from "./../../../../../../services/app.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-income",
  templateUrl: "./income.component.html",
  styleUrls: ["./income.component.scss"]
})
export class IncomeComponent implements OnInit {
  public formIncome: FormGroup;
  public saveWaitting: boolean = false;
  public uploadWaitting: boolean = false;
  public foundData: boolean = false;

  // Check Confirm
  public onLoadForm: boolean = true;
  public remark: string = "";
  public confirmWait: boolean = false;

  // ValShow
  public fileDump = {
    file1: null,
    file2: null
  };
  constructor(public service: AppService, private formBuilder: FormBuilder) {}

  async ngOnInit() {
    this.initialFormIncome();
    await this.getConfirm();
    await this.getIncome();
  }

  public fileInput = async (event: any, type: string) => {
    this.uploadWaitting = true;
    event.preventDefault();
    if (event.target.files[0]) {
      if (event.target.files[0].size > 1000000) {
        this.service.alert.alert("error", "ไม่รองรับไฟล์ขนาดเกิน 1MB");
        event.target.value = "";
        this.uploadWaitting = false;
        return;
      }
      // console.log(event.target.files[0]);
      let file = new FormData();
      file.append("FileUpload", event.target.files[0]);
      let http_upload: any = await this.service.http.post("/uploadFile", file);
      console.log(http_upload);
      this.uploadWaitting = false;
      if (
        type == "มีรายได้ประจำ" ||
        type == "สำเนาบัตรสวัสดิการแห่งรัฐของมารดา"
      ) {
        this.fileDump.file2 = event.target.files[0];
        if (http_upload.success) {
          this.formIncome.patchValue({
            val2: http_upload.path
          });
        }
      } else if (type == "สำเนาบัตรสวัสดิการแห่งรัฐของบิดา") {
        this.fileDump.file1 = event.target.files[0];
        if (http_upload.success) {
          this.formIncome.patchValue({
            val1: http_upload.path
          });
        }
      }
    }
    this.uploadWaitting = false;
  };

  public submitIncome = async () => {
    let formData = new FormData();
    Object.keys(this.formIncome.value).forEach(i => {
      formData.append(i, this.formIncome.value[i]);
    });

    let http_income = await this.service.http.post("102_income/inup", formData);
    console.log(http_income);
  };

  private initialFormIncome = () => {
    this.formIncome = this.formBuilder.group({
      username: [this.service.localStorage.get("userlogin")["username"]],
      type: ["มีรายได้ประจำ", Validators.required],
      year: [this.service.yearOnSystem()],
      term: ["1"],
      val1: ["", Validators.required],
      val2: ["", Validators.required]
    });
  };

  private getIncome = async () => {
    this.confirmWait = true;
    let formData = new FormData();
    formData.append(
      "username",
      this.service.localStorage.get("userlogin")["username"]
    );
    formData.append("year", this.service.yearOnSystem());
    formData.append("term", "1");

    let http_income: any = await this.service.http.get(
      `102_income/get/${this.service.localStorage.get("userlogin")["username"]}`
    );
    console.log(http_income);
    if (http_income.rowCount > 0) {
      this.foundData = true;
      Object.keys(http_income.result[0]).forEach(i => {
        this.formIncome.patchValue({
          [`${i}`]: http_income.result[0][i]
        });
      });
    }
    this.confirmWait = false;
  };

  private getConfirm = async () => {
    this.confirmWait = true;
    let formData = new FormData();
    formData.append(
      "username",
      this.service.localStorage.get("userlogin")["username"]
    );
    formData.append("year", this.service.yearOnSystem());
    formData.append("term", "1");
    formData.append("formDoc", "102");

    let http_confirm: any = await this.service.http.post(
      `student_confirm/get`,
      formData
    );

    if (http_confirm.result.length > 0) {
      if (
        http_confirm.result[0]["remark"] == "รอการตรวจสอบจากเจ้าหน้าที่กองทุน"
      ) {
        this.onLoadForm = false;
        this.remark = http_confirm.result[0]["remark"];
      }
    }
    this.confirmWait = false;
    console.log("http_confirm", http_confirm);
  };
}
