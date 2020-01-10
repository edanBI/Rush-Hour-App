import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../common/services/constants.service';


@Component({
  selector: 'app-thnks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit {

  userName: string;

  constructor(private _c:ConstantsService) {
    this.userName ="x5G9oOG4edU";
  }

  ngOnInit() {
  }

}
