let input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

let map = input.split("\n");

const getFront = (row, col, orientation) => {
  if (orientation === "^") {
    return [row - 1 >= 0 && row - 1, col];
  }

  if (orientation === "v") {
    return [row + 1 < map.length && row + 1, col];
  }

  if (orientation === ">") {
    return [row, col + 1 < map[row].length && col + 1];
  }

  return [row, col - 1 >= 0 && col - 1];
};

const turnRight = (orientation) => {
  if (orientation === "^") return ">";
  if (orientation === ">") return "v";
  if (orientation === "v") return "<";
  return "^";
};

const move = (previous, nextRow, newCol, orientation) => {
  if (nextRow === false || newCol === false) {
    return;
  }

  //console.log(previous);
  //console.log(nextRow, newCol, orientation);

  if (map[nextRow][newCol] === "#") {
    orientation = turnRight(orientation);
    move(
      previous,
      ...getFront(previous[0], previous[1], orientation),
      orientation
    );
  } else {
    let line = map[nextRow];
    map[nextRow] = line.substring(0, newCol) + "X" + line.substring(newCol + 1);
    move(
      [nextRow, newCol],
      ...getFront(nextRow, newCol, orientation),
      orientation
    );
  }
};

for (let row = 0; row < map.length; row++) {
  let orientation =
    map[row][map[row].indexOf("^")] ||
    map[row][map[row].indexOf("v")] ||
    map[row][map[row].indexOf("<")] ||
    map[row][map[row].indexOf(">")];

  if (orientation) {
    let col = map[row].indexOf(orientation);

    console.log("start: " + row + " " + col, "orientation: " + orientation);

    map[row] = map[row].replace(orientation, "X");
    move([row, col], ...getFront(row, col, orientation), orientation);
    break;
  }
}

let total = map.reduce((acc, next) => {
  return acc + next.split("").filter((ch) => ch === "X").length;
}, 0);

console.log(total);
