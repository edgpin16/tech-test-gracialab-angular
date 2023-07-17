import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-response',
  templateUrl: './page-response.component.html',
  styleUrls: ['./page-response.component.css']
})
export class PageResponseComponent implements OnInit{
  public responseData: any = {};
  constructor() { }
  ngOnInit(): void {
    this.responseData = history?.state?.response;
    this.responseData = JSON.stringify(this.responseData, null, 2);
  }

  isObjEmpty(): boolean {
    const obj : any = this.responseData;
    for(let key in obj)
      if(obj.hasOwnProperty(key)) return false;
    return true;
  }
}
