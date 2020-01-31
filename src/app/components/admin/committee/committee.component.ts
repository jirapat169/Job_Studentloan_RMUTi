import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-committee",
  templateUrl: "./committee.component.html",
  styleUrls: ["./committee.component.scss"]
})
export class CommitteeComponent implements OnInit {
  public stateEdit: boolean = false;
  public formCommittee: FormGroup;
  public campusList: Array<any> = null;
  public committeeList: Array<any> = null;

  constructor(private formBuilder: FormBuilder, public service: AppService) {}

  ngOnInit() {
    // this.getCampus();
    // this.getCommittee();
    this.initialForm();
  }

  private getCampus = () => {
    return false;
  };

  private getCommittee = () => {
    return false;
  };

  public submitForm = () => {
    if (this.stateEdit == false) {
      // Insert
    } else {
      // Update
    }
    console.log(this.formCommittee.value);
  };

  public initialForm = (data: any = null) => {
    this.formCommittee = this.formBuilder.group({
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
      status: [data != null ? data.status : "insert"]
    });
  };
}
