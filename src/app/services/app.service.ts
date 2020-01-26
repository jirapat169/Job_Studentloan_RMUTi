import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { HttpClient } from "@angular/common/http";

const _window: any = window;
const _localStorage: any = new _window.SecureLS({
  encodingType: "des",
  isCompression: false,
  encryptionSecret: "studentloan_LocalStorage"
});

@Injectable({
  providedIn: "root"
})
export class AppService {
  private rootAPI: string = "http://172.16.20.134/studentloan/api/";
  public underscore = _window._;
  // LocalStorage
  public localStorage = {
    get: (key: string) => {
      if (window.localStorage.getItem(`${"studentLoan_"}${key}`)) {
        return _localStorage.get(`${"studentLoan_"}${key}`);
      } else {
        return null;
      }
    },
    set: (key: string, data: any) => {
      _localStorage.set(`${"studentLoan_"}${key}`, data);
    },
    clear: () => {
      _localStorage.clear();
    }
  };

  // SweetAlert
  public alert = {
    alert: (
      type: "error" | "success" | "warning",
      title: string,
      text: string = null
    ) => {
      Swal.fire({
        type: type,
        title: title,
        text: text,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "ตกลง"
      });
    },
    confirm: (title: string, text: string = null) => {
      return new Promise(resolve => {
        Swal.fire({
          title: title,
          text: text,
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ตกลง",
          cancelButtonText: "ยกเลิก",
          focusCancel: true,
          focusConfirm: false
        }).then(result => {
          if (result.value) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    }
  };

  // HttpClient
  public http = {
    get: (url: string) => {
      return new Promise(resolve => {
        this._http
          .get(`${this.rootAPI}${url}`)
          .toPromise()
          .then(value => {
            resolve({ connect: true, ...value });
          })
          .catch(reason => {
            console.log(reason);
            this.alert.alert(
              "error",
              "การเชื่อมต่อเซิร์ฟเวอร์ผิดพลาด",
              `${reason.status} ${reason.statusText}`
            );
            resolve({ connect: false, ...reason });
          });
      });
    },
    post: (url: string, body: any = null) => {
      return new Promise(resolve => {
        this._http
          .post(`${this.rootAPI}${url}`, body)
          .toPromise()
          .then(value => {
            resolve({ connect: true, ...value });
          })
          .catch(reason => {
            console.log(reason);
            this.alert.alert(
              "error",
              "การเชื่อมต่อเซิร์ฟเวอร์ผิดพลาด",
              `${reason.status} ${reason.statusText}`
            );
            resolve({ connect: false, ...reason });
          });
      });
    }
  };

  constructor(private _http: HttpClient) {}

  public yearOnSystem = () => {
    return new Date().getMonth() < 5
      ? `${new Date().getFullYear() + 542}`
      : `${new Date().getFullYear() + 543}`;
  };
}