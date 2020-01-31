import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public listPath = [
    {path:"/student/borrow/1/new/101", title:"กยศ.101"},
    {path:"/student/borrow/1/new/102", title:"เอกสารรับรองรายได้"},
    {path:"/student/borrow/1/new/103", title:"กยศ.103"},
    {path:"/student/borrow/1/new/104", title:"กยศ.104"},
    {path:"/student/borrow/1/new/doc", title:"เอกสารประกอบ"},
  ]
  constructor() { }

  ngOnInit() {
  }

}
