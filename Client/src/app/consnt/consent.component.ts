import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../common/services/constants.service';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css']
})
export class ConsentComponent implements OnInit {

  isAgreed: boolean=false;

  constructor(private _c: ConstantsService) {
  }

  ngOnInit() {
  }


}
