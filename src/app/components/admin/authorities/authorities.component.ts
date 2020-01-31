import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-authorities",
  templateUrl: "./authorities.component.html",
  styleUrls: ["./authorities.component.scss"]
})
export class AuthoritiesComponent implements OnInit {
  public stateEdit: boolean = false;
  public formAuthorities: FormGroup;
  public campusList: Array<any> = null;
  public authoritiesList: Array<any> = null;

  constructor(private formBuilder: FormBuilder, public service: AppService) {}

  ngOnInit() {
    // this.getCampus();
    // this.getAuthorities();
    this.initialForm();
  }

  private getCampus = () => {
    return false;
  };

  private getAuthorities = () => {
    return false;
  };

  public submitForm = () => {
    if (this.stateEdit == false) {
      // Insert
    } else {
      // Update
    }
    console.log(this.formAuthorities.value);
  };

  public initialForm = (data: any = null) => {
    this.formAuthorities = this.formBuilder.group({
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
      campus: [data != null ? data.campus : "", Validators.required]
    });
  };
}
