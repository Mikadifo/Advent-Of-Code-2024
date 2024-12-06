let input = require("./day6Input.js");

//input = `....#.....
//.........#
//..........
//..#.......
//.......#..
//..........
//.#..^.....
//........#.
//#.........
//......#...`;

let map = input.split("\n").map((line) => line.split(""));

const move = (row, col) => {
  while (true) {
    // move up until border or #
    for (row; map[row][col] !== "#" && row >= 0; row--) {
      map[row][col] = "X";
    }

    // if is border, break, else goes back 1
    if (row < 0) {
      return;
    }
    row++;

    // move right until border or #
    for (col; col < map[row].length && map[row][col] !== "#"; col++) {
      map[row][col] = "X";
    }

    //if is border, break, else goes back 1
    if (col >= map[row].length) {
      return;
    }
    col--;

    // move down until border or #
    for (row; row < map.length && map[row][col] !== "#"; row++) {
      map[row][col] = "X";
    }

    //if is border, break, else goes back 1
    if (row >= map.length) {
      return;
    }
    row--;

    // move left until border or #
    for (col; map[row][col] !== "#" && col >= 0; col--) {
      map[row][col] = "X";
    }

    //if is border, break, else goes back 1
    if (col < 0) {
      return;
    }
    col++;
  }
};

for (let row = 0; row < map.length; row++) {
  let orientation = map[row][map[row].indexOf("^")];

  if (orientation) {
    let col = map[row].indexOf(orientation);

    console.log("start: " + row + " " + col, "orientation: " + orientation);

    move(row, col);
    break;
  }
}

let total = map.reduce((acc, next) => {
  return acc + next.filter((ch) => ch === "X").length;
}, 0);

console.log(total);
