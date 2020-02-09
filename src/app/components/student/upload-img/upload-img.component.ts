import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-upload-img",
  templateUrl: "./upload-img.component.html",
  styleUrls: ["./upload-img.component.scss"]
})
export class UploadImgComponent implements OnInit {
  public imgShow: string = null;
  constructor(public service: AppService) {}

  ngOnInit() {}

  public submitProfile = async () => {
    let formData = new FormData();
    formData.append(
      "username",
      this.service.localStorage.get("userlogin")["username"]
    );
    formData.append("path", this.imgShow);
    let http_profile: any = await this.service.http.post(
      "member/updateIMG",
      formData
    );
    console.log(http_profile);
    if (http_profile.success) {
      let userlogin: any = this.service.localStorage.get("userlogin");
      userlogin.imgpath = this.imgShow;
      this.service.localStorage.set("userlogin", userlogin);
    }
  };

  public fileUpload = async (event: any) => {
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
        console.log(fileUpload);
        this.imgShow = fileUpload.path;
      }
      event.target.value = "";
    }
  };
}
