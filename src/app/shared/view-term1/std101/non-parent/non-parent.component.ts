import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-non-parent-std',
  templateUrl: './non-parent.component.html',
  styleUrls: ['./non-parent.component.scss']
})
export class NonParentComponent implements OnInit {
  @Input("route") route: string;
  constructor() { }

  ngOnInit() {
    console.log(this.route);
  }

}
