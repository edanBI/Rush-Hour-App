import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../common/services/constants.service';
import { Router } from '@angular/router'
import { Location } from '@angular/common'

@Component({
  selector: 'app-game-instances',
  templateUrl: './game-instances.component.html',
  styleUrls: ['./game-instances.component.css']
})
export class GameInstancesComponent implements OnInit {

  constructor(private _c:ConstantsService, private _router:Router, private _location:Location) {
  }

  ngOnInit() {
  }

}


