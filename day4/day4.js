const input = require("./day4Input.js");

let data = input.split("\n");

const containsXMASHorizontally = (line, charIndex, direction = -1) => {
  return (
    line[charIndex + 1 * direction] +
      line[charIndex + 2 * direction] +
      line[charIndex + 3 * direction] ===
    "MAS"
  );
};

const containsXMASVertically = (lineIndex, charIndex, direction = -1) => {
  return (
    data[lineIndex + 3 * direction] &&
    data[lineIndex + 1 * direction][charIndex] +
      data[lineIndex + 2 * direction][charIndex] +
      data[lineIndex + 3 * direction][charIndex] ===
      "MAS"
  );
};

const containsXMASDiagonallyTop = (lineIndex, charIndex, direction = -1) => {
  return (
    data[lineIndex - 3] &&
    data[lineIndex - 1][charIndex + 1 * direction] +
      data[lineIndex - 2][charIndex + 2 * direction] +
      data[lineIndex - 3][charIndex + 3 * direction] ===
      "MAS"
  );
};

const containsXMASDiagonallyBottom = (lineIndex, charIndex, direction = -1) => {
  return (
    data[lineIndex + 3] &&
    data[lineIndex + 1][charIndex + 1 * direction] +
      data[lineIndex + 2][charIndex + 2 * direction] +
      data[lineIndex + 3][charIndex + 3 * direction] ===
      "MAS"
  );
};

let total = 0;
data.forEach((line, i) => {
  for (let j = 0; j < line.length; j++) {
    if (line[j] === "X") {
      // backwards and forward
      if (containsXMASHorizontally(line, j)) {
        total++;
      }

      if (containsXMASHorizontally(line, j, 1)) {
        total++;
      }

      // vertical bottom->top and top->bottom
      if (containsXMASVertically(i, j)) {
        total++;
      }

      if (containsXMASVertically(i, j, 1)) {
        total++;
      }

      // diagonally towards top
      if (containsXMASDiagonallyTop(i, j)) {
        total++;
      }

      if (containsXMASDiagonallyTop(i, j, 1)) {
        total++;
      }

      // diagonally towards bottom
      if (containsXMASDiagonallyBottom(i, j)) {
        total++;
      }

      if (containsXMASDiagonallyBottom(i, j, 1)) {
        total++;
      }
    }
  }
});

console.log(total);

//data = [
//"MMMSXXMASM",
//"MSAMXMSMSA",
//"AMXSXMAAMM",
//"MSAMASMSMX",
//"XMASAMXAMM",
//"XXAMMXXAMA",
//"SMSMSASXSS",
//"SAXAMASAAA",
//"MAMMMXMMMM",
//"MXMXAXMASX",
//];

let newTotal = 0;
data.forEach((line, i) => {
  for (let j = 0; j < line.length; j++) {
    if (line[j] == "A") {
      if (data[i - 1] === undefined || data[i + 1] === undefined) {
        continue;
      }

      const topLetters = data[i - 1][j - 1] + data[i - 1][j + 1];
      const bottomLetters = data[i + 1][j - 1] + data[i + 1][j + 1];
      const samePredicate =
        (topLetters === "MM" && bottomLetters === "SS") ||
        (topLetters === "SS" && bottomLetters === "MM");
      const differentPredicate =
        topLetters === bottomLetters &&
        (topLetters === "MS" || topLetters === "SM");

      if (samePredicate || differentPredicate) {
        newTotal++;
      }
    }
  }
});

console.log(newTotal);
