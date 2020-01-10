import { Injectable } from '@angular/core';
import Phaser from 'phaser-ce';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ConstantsService extends Phaser.State{
  public displayGame: boolean = false;

  timeText;
  movesText;
  resetBtn;
  undoBtn;

  constructor() {
    super();
  }
  create() {
    // some car colors to be randomly assigned to cars
    const carColors = [0x00ff00, 0x0000ff, 0xffff00, 0x00ffff, 0xff00ff];
    // adding the sprite representing the game field
    this.add.sprite(0, 0, "field");
    let gameInstance = gameInstances.pop();
    for (let i = 0; i < gameInstance.Instance.length; i++) {
      // to keep the code clear, I assign carsArray[i] to a variable simply called "car"
      let car = gameInstance.Instance[i];
      // looping through car length
      for (let j = 0; j < car.len; j++) {
        // if the car is horizontal
        if (car.dir == HORIZONTAL) {
          // setting levelArray items overlapped by the car to 1 (not empty);
          levelArray[car.row][car.col + j] = car.name;
        }
        // if the car is vertical... (I know I could have used "else" but being a tutorial it looks better this way)
        if (car.dir == VERTICAL) {
          // setting levelArray items overlapped by the car to 1 (not empty);
          levelArray[car.row + j][car.col] = car.name;
        }
      }
      // adding the sprite representing the car
      // notice car direction (car.dir) is also involved in the placement.
      let carSprite = this.add.sprite(tileSize * car.col + tileSize * car.dir, tileSize * car.row, car.spr);
      // car sprite will be rotated by 90 degrees if the car is VERTICAL and by 0 degrees if the car is HORIZONTAL
      carSprite.angle = 90 * car.dir;
      // Assigning to car sprite some custom data, adding them as an object. We'll store car position, direction and length
      carSprite.data = {
        name: car.name,
        row: car.row,
        col: car.col,
        dir: car.dir,
        len: car.len
      };
      // assigning a random color to the car
      carSprite.tint = carColors[game.rnd.between(0, carColors.length - 1)];
      if (carSprite.data.name == "R")
        carSprite.tint = 0xff0000;
      // the car has input enabled
      carSprite.inputEnabled = true;
      // the car can be dragged
      carSprite.input.enableDrag();
      // the car will snap to a tileSize * tileSize grid but only when it's released
      carSprite.input.enableSnap(tileSize, tileSize, false, true);
      // when the car starts to be dragged, call startDrag function
      carSprite.events.onDragStart.add(startDrag);
      // when the car stops to be dragged, call stopDrag function
      carSprite.events.onDragStop.add(stopDrag);
      // if car direction is VERTICAL then prevent the sprite to be dragged horizontally
      if (car.dir == VERTICAL) {
        carSprite.input.allowHorizontalDrag = false;
      }
      // if car direction is HORIZONTAL then prevent the sprite to be dragged vertically
      if (car.dir == HORIZONTAL) {
        carSprite.input.allowVerticalDrag = false;
      }
    }
    this.resetBtn = this.add.button(this.world.centerX - 30, 0, 'resetButton', Reset);
    this.undoBtn = this.add.button(this.world.centerX + 130, 0, 'undoButton', Undo);
    this.timeText = this.add.text(50, 2, "", {
        font: "20px Comic Sans MS",
        fill: "white",
      }
    );
    this.movesText = this.add.text(50, 25, "", {
        font: "20px Comic Sans MS",
        fill: "white",
      }
    );
  }

  preload() {
    // preloading graphic assets
    this.load.image("field", "assets/field.jpg");
    this.load.image("car", "assets/car.png");
    this.load.image("truck", "assets/truck.png");
    this.load.image("resetButton", "assets/reset.png");
    this.load.image("undoButton", "assets/undo.png");
    this.load.image("winImg", "assets/youWin.png");
    this.load.image("timesup", "assets/timesup.png");
  }

  render() {
    if("Time Remaining: 0:00" == this.timeText.text){
      this.resetBtn.inputEnabled = false;
      this.undoBtn.inputEnabled = false;
      game.paused = true;
      game.add.sprite(186, 211,"timesup");
      setTimeout(lockRender, 5000);
    }
    if("Time Remaining: 0:00" != this.timeText.text)
      this.timeText.setText("Time Remaining: " + timeRemaining(this.game.time.totalElapsedSeconds()));
    this.movesText.setText("Number of Moves: " + moves, 50,40);
  }
}

let game = new Phaser.Game(640,640,Phaser.AUTO,'idan');
let gameScene = new ConstantsService();
game.state.add("PlayGame", gameScene);
game.state.start("PlayGame");

// two variables to represent "horizontal" and "vertical" cars. Better using HORIZONTAL and VERTICAL rather than 0 and 1
const HORIZONTAL = 0;
const VERTICAL = 1;
let moves = 0;

// size of each tile, in pixels
const tileSize = 80;

// game board, it's a 6x6 array, initially all its items are set to zero = empty
let levelArray = [
  //0    1    2    3    4    5    6    7
  ["X", "X", "X", "X", "X", "X", "X", "X"],//0
  ["X", 0, 0, 0, 0, 0, 0, "X"],//1
  ["X", 0, 0, 0, 0, 0, 0, "X"],//2
  ["X", 0, 0, 0, 0, 0, 0, 0],//3
  ["X", 0, 0, 0, 0, 0, 0, "X"],//4
  ["X", 0, 0, 0, 0, 0, 0, "X"],//5
  ["X", 0, 0, 0, 0, 0, 0, "X"],//6
  ["X", "X", "X", "X", "X", "X", "X", "X"] //7
];

// these are the cars to place on the board.
// each car is an object with the following properties:
// name: name of the car
// row: car upper row
// col: car leftmost column
// dir: car direction, can be HORIZONTAL or VERTICAL
// spr: name of the image to assign to car sprite
const example = [
  {
    name: "R",
    row: 3,
    col: 2,
    dir: HORIZONTAL,
    len: 2,
    spr: "car"
  },
  {
    name: "a",
    row: 1,
    col: 1,
    dir: HORIZONTAL,
    len: 2,
    spr: "car"
  },
  {
    name: "b",
    row: 1,
    col: 6,
    dir: VERTICAL,
    len: 3,
    spr: "truck"
  },
  {
    name: "c",
    row: 2,
    col: 1,
    dir: VERTICAL,
    len: 3,
    spr: "truck"
  }
];

const easyLevel = [
  {
    name: "R",
    row: 3,
    col: 2,
    dir: HORIZONTAL,
    len: 2,
    spr: "car"
  },
  {
    name: "a",
    row: 1,
    col: 1,
    dir: HORIZONTAL,
    len: 2,
    spr: "car"
  },
  {
    name: "b",
    row: 1,
    col: 6,
    dir: VERTICAL,
    len: 3,
    spr: "truck"
  },
  {
    name: "c",
    row: 2,
    col: 1,
    dir: VERTICAL,
    len: 3,
    spr: "truck"
  },
  {
    name: "d",
    row: 2,
    col: 4,
    dir: VERTICAL,
    len: 3,
    spr: "truck"
  },
  {
    name: "e",
    row: 5,
    col: 1,
    dir: VERTICAL,
    len: 2,
    spr: "car"
  },
  {
    name: "f",
    row: 5,
    col: 5,
    dir: HORIZONTAL,
    len: 2,
    spr: "car"
  },
  {
    name: "g",
    row: 6,
    col: 3,
    dir: HORIZONTAL,
    len: 3,
    spr: "truck"
  }
];

const mediumLevel = [
  {
    name: "R",
    row: 3,
    col: 3,
    dir: HORIZONTAL,
    len: 2,
    spr: "car"
  },
  {
    name: "a",
    row: 1,
    col: 2,
    dir: VERTICAL,
    len: 3,
    spr: "truck"
  },
  {
    name: "b",
    row: 1,
    col: 3,
    dir: VERTICAL,
    len: 2,
    spr: "car"
  },
  {
    name: "c",
    row: 1,
    col: 4,
    dir: HORIZONTAL,
    len: 2,
    spr: "car"
  },
  {
    name: "d",
    row: 2,
    col: 6,
    dir: VERTICAL,
    len: 2,
    spr: "car"
  },
  {
    name: "e",
    row: 3,
    col: 5,
    dir: VERTICAL,
    len: 2,
    spr: "car"
  },
  {
    name: "f",
    row: 4,
    col: 1,
    dir: HORIZONTAL,
    len: 2,
    spr: "car"
  },
  {
    name: "g",
    row: 4,
    col: 3,
    dir: HORIZONTAL,
    len: 2,
    spr: "car"
  },
  {
    name: "h",
    row: 4,
    col: 6,
    dir: VERTICAL,
    len: 2,
    spr: "car"
  },
  {
    name: "i",
    row: 5,
    col: 3,
    dir: VERTICAL,
    len: 2,
    spr: "car"
  },
  {
    name: "j",
    row: 5,
    col: 4,
    dir: HORIZONTAL,
    len: 2,
    spr: "car"
  },
  {
    name: "k",
    row: 6,
    col: 1,
    dir: HORIZONTAL,
    len: 2,
    spr: "car"
  }
];

const hardLevel = [
  {
    name: "R",
    row: 3,
    col: 3,
    dir: HORIZONTAL,
    len: 2,
    spr: "car"
  },
  {
    name: "a",
    row: 1,
    col: 2,
    dir: VERTICAL,
    len: 3,
    spr: "truck"
  },
  {
    name: "b",
    row: 1,
    col: 3,
    dir: VERTICAL,
    len: 2,
    spr: "car"
  },
  {
    name: "c",
    row: 1,
    col: 4,
    dir: HORIZONTAL,
    len: 2,
    spr: "car"
  },
  {
    name: "d",
    row: 3,
    col: 5,
    dir: VERTICAL,
    len: 2,
    spr: "car"
  },
  {
    name: "e",
    row: 4,
    col: 1,
    dir: HORIZONTAL,
    len: 2,
    spr: "car"
  },
  {
    name: "f",
    row: 4,
    col: 6,
    dir: VERTICAL,
    len: 3,
    spr: "truck"
  },
  {
    name: "g",
    row: 5,
    col: 5,
    dir: VERTICAL,
    len: 2,
    spr: "car"
  },
  {
    name: "h",
    row: 6,
    col: 1,
    dir: HORIZONTAL,
    len: 2,
    spr: "car"
  },
  {
    name: "i",
    row: 6,
    col: 3,
    dir: HORIZONTAL,
    len: 2,
    spr: "car"
  }
];

let gameInstances = [
  {
    Instance: hardLevel,
  },
  {
    Instance: mediumLevel,
  },
  {
    Instance: easyLevel,
  },

];
gameInstances.push({ Instance: example });
let gameStack = [];

function lockRender(){
  game.lockRender = true;
}

function timeRemaining(totalElapsedSeconds){
  let gameTime = 600;
  let time = gameTime - totalElapsedSeconds;
  let minutes = (time/60) | 0 ;
  let seconds = (time%60) | 0 ;
  //let minutes = parseInt(time / 60, 10);
  //let seconds = parseInt(time % 60, 10);
  let timeStr = minutes + ":" + seconds;
  if (seconds < 10)
    timeStr = minutes + ":0" + seconds;
  return timeStr;
}

// function to be called when a car is dragged. "s" is the reference of the car itself
function startDrag(s) {
  // declaring some variables here because I am using them
  let i;
  let from;
  let to;
  // if the car is horizontal...
  if (s.data.dir == HORIZONTAL) {
    // from is the leftmost column occupied by the car
    from = s.data.col;
    // to is the rightmost column occupied by the car
    to = s.data.col + s.data.len - 1;
    // now we are going from the leftmost column backward until column zero, the first column
    for (i = s.data.col - 1; i >= 0; i--) {
      // if it's an empty spot, then we update "from" position
      if (levelArray[s.data.row][i] == 0) {
        from = i;
      }
      // otherwise we exit the loop
      else {
        break;
      }
    }
    // now we are going from the rightmost column forward until column five, the last column
    for (i = s.data.col + s.data.len; i < 8; i++) {
      // if it's an empty spot, then we update "to" position
      if (levelArray[s.data.row][i] == 0) {
        to = i;
      }
      // otherwise we exit the loop
      else {
        break;
      }
    }
    // at this time, we assign the car a bounding box which will limit its movements. Think about it as a fence,
    // the car cannot cross the fence
    s.input.boundsRect = new Phaser.Rectangle(from * tileSize, s.y, (to - from + 1) * tileSize, tileSize);
  }
  // the same thing applies to vertical cars, just remember this time they are rotated by 90 degrees
  if (s.data.dir == VERTICAL) {
    from = s.data.row;
    to = s.data.row + s.data.len - 1;
    for (i = s.data.row - 1; i >= 0; i--) {
      if (levelArray[i][s.data.col] == 0) {
        from = i;
      } else {
        break;
      }
    }
    for (i = s.data.row + s.data.len; i < 8; i++) {
      if (levelArray[i][s.data.col] == 0) {
        to = i;
      } else {
        break;
      }
    }
    s.input.boundsRect = new Phaser.Rectangle(s.x, from * tileSize, s.x + s.data.len * tileSize, (to - from + 2 - s.data.len) * tileSize);
  }
}

// function to be called when a car is not dragged anymore. "s" is the reference of the car itself
function stopDrag(s) {
  if ((s.data.dir == HORIZONTAL && s.x / tileSize == s.data.col) || (s.data.dir == VERTICAL && s.y / tileSize == s.data.row))
    return;
  moves++;
  let data =
    {
      carObj: s,
      row: s.data.row,
      col: s.data.col,
      lastRow: s.y / tileSize,
      lastCol: s.x / tileSize,
    };
  if (s.data.dir == VERTICAL) {
    data.lastCol = data.col;
  }

  gameStack.push(data);
  //console.log("move-carName:" + s.data.name + "-from:" + data.row + "," + data.col + "-to:" + data.lastRow + "," + data.lastCol + "-time:" + this.phaserGame.time.totalElapsedSeconds());
  // here we just update levelArray items according to the car we moved.
  // first, we set to zero all items where the car was initially placed
  for (let i = 0; i < s.data.len; i++) {
    if (s.data.dir == HORIZONTAL) {
      levelArray[s.data.row][s.data.col + i] = 0;
    }
    if (s.data.dir == VERTICAL) {
      levelArray[s.data.row + i][s.data.col] = 0;
    }
  }
  // then we set to 1 all items where the car is placed now
  if (s.data.dir == HORIZONTAL) {
    updateCar(s, s.x / tileSize);
    for (let i = 0; i < s.data.len; i++) {
      levelArray[s.data.row][s.data.col + i] = s.data.name;
    }
  }
  if (s.data.dir == VERTICAL) {
    updateCar(s, s.y / tileSize);
    for (let i = 0; i < s.data.len; i++) {
      levelArray[s.data.row + i][s.data.col] = s.data.name;
    }
  }
  if (s.data.name == "R" && s.data.col == 6) {
    winning();
  }
}

function updateCar(s, num) {
  if (s.data.dir == HORIZONTAL) {
    s.data.col = num;
  }
  if (s.data.dir == VERTICAL) {
    s.data.row = num;
  }
}

function winning() {
  //console.log("win-time:" + this.game.time.totalElapsedSeconds() + "-moves:" + Moves);
  game.add.sprite(120, 131, "winImg");
  game.paused = true;
}

function Reset() {
  if (gameStack.length == 0)
    return;
  //console.log("reset-time:" + this.game.time.totalElapsedSeconds());
  while (gameStack.length > 0) {
    Undo();
  }
}

function Undo() {
  if (gameStack.length == 0)
    return;
  let lastState = gameStack.pop();
  //console.log("undo-carName:" + lastState.carObj.data.name + "-from:" + lastState.lastRow + "," + lastState.lastCol  + "-to:" + lastState.row + "," + lastState.col + "-time:" + this.game.time.totalElapsedSeconds());
  for (let i = 0; i < lastState.carObj.data.len; i++) {
    if (lastState.carObj.data.dir == HORIZONTAL) {
      levelArray[lastState.lastRow][lastState.lastCol + i] = 0;
    }
    if (lastState.carObj.data.dir == VERTICAL) {
      levelArray[lastState.lastRow + i][lastState.lastCol] = 0;
    }
  }
  // then we set to 1 all items where the car is placed now
  if (lastState.carObj.data.dir == HORIZONTAL) {
    updateCar(lastState.carObj, lastState.col);
    for (let i = 0; i < lastState.carObj.data.len; i++) {
      levelArray[lastState.row][lastState.col + i] = lastState.carObj.data.name;
    }
    lastState.carObj.x = tileSize * lastState.col + tileSize * lastState.carObj.data.dir;
    lastState.carObj.y = tileSize * lastState.row;
  }
  if (lastState.carObj.data.dir == VERTICAL) {
    updateCar(lastState.carObj, lastState.row);
    for (let i = 0; i < lastState.carObj.data.len; i++) {
      levelArray[lastState.row + i][lastState.col] = lastState.carObj.data.name;
    }
    lastState.carObj.x = tileSize * lastState.col + tileSize * lastState.carObj.data.dir;
    lastState.carObj.y = tileSize * lastState.row;
  }
}

function newGame() {
  gameStack = [];
  levelArray = [
    //0    1    2    3    4    5    6    7
    ["X", "X", "X", "X", "X", "X", "X", "X"],//0
    ["X",  0,   0,   0,   0,   0,   0,  "X"],//1
    ["X",  0,   0,   0,   0,   0,   0,  "X"],//2
    ["X",  0,   0,   0,   0,   0,   0,   0],//3
    ["X",  0,   0,   0,   0,   0,   0,  "X"],//4
    ["X",  0,   0,   0,   0,   0,   0,  "X"],//5
    ["X",  0,   0,   0,   0,   0,   0,  "X"],//6
    ["X", "X", "X", "X", "X", "X", "X", "X"] //7
  ];
  moves = 0;
  // creation of "PlayGame" state
  game.state.add("PlayGame", gameScene);
  // launching "PlayGame" state
  game.state.start("PlayGame");
  game.paused = false;
  gameScene.resetBtn.inputEnabled = true;
  gameScene.undoBtn.inputEnabled = true;
  game.time.reset();
}
