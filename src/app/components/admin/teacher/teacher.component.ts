import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-teacher",
  templateUrl: "./teacher.component.html",
  styleUrls: ["./teacher.component.scss"]
})
export class TeacherComponent implements OnInit {
  public stateEdit: boolean = false;
  public formTeacher: FormGroup;
  public organize: Array<any> = null;
  public teacherList: Array<any> = null;

  constructor(private formBuilder: FormBuilder, public service: AppService) {}

  ngOnInit() {
    // this.getOrganize();
    // this.getTeacher();
    this.initialForm();
  }

  private getOrganize = () => {
    return false;
  };

  private getTeacher = () => {
    return false;
  };

  public submitForm = () => {
    if (this.stateEdit == false) {
      // Insert
    } else {
      // Update
    }
    console.log(this.formTeacher.value);
  };

  public initialForm = (data: any = null) => {
    this.formTeacher = this.formBuilder.group({
      username: [data != null ? data.username : "", Validators.required],
      title: [data != null ? data.title : "", Validators.required],
      fname: [data != null ? data.fname : "", Validators.required],
      lname: [data != null ? data.lname : "", Validators.required],
      email: [
        data != null ? data.email : "",
        [Validators.required, Validators.email]
      ],
      phone: [
        data != null ? data.phone : "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      campus: [data != null ? data.campus : "", Validators.required],
      department: [data != null ? data.department : "", Validators.required],
      group: [data != null ? data.group : "", Validators.required],
      branch: [data != null ? data.branch : "", Validators.required]
    });
  };
}
