import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  first: any;
  second: any;
  third: any;
  cur: any;

  constructor() {
    this.first = {title: "First", int: 1};
    this.second = {title: "Second", int: 2};
    this.third = {title: "Third", int: 3};
  }

  ngOnInit() {
    this.cur=this.second;
  }


}

