const input = require("./day2Input");

let data = input.split("\n").map((report) => {
  return report.split(" ").map((level) => +level);
});

const isSafe = (report, isOriginal = true) => {
  //console.log(report, isOriginal);
  let previous = report[0];
  let ignored = 0;
  let increasing = false;
  let safe = true;

  for (let i = 1; i < report.length; i++) {
    const level = report[i];

    if (i == 1) {
      increasing = level > previous;
    }

    let difference = increasing ? level - previous : previous - level;

    if (difference < 1 || difference > 3) {
      if (!isOriginal || ignored >= 1) {
        return false;
      }

      // test removing the previous element
      const removingPreviousIsSafe = isSafe(
        [...report.slice(0, i - 1), ...report.slice(i, report.length)],
        false
      );

      if (removingPreviousIsSafe) {
        return true;
      }

      ignored++;
      continue;
    }

    previous = level;
  }

  return safe;
};

//data = [
//[7, 6, 4, 2, 1],
//[1, 2, 7, 8, 9],
//[9, 7, 6, 2, 1],
//[1, 3, 2, 4, 5],
//[8, 6, 4, 4, 1],
//[1, 3, 6, 7, 9],
//];

let totalSafe = 0;

console.log(data[0]);
//data = [data[0]];

data.forEach((report) => {
  const safe = isSafe(report);
  //console.log(report + " -> " + safe);

  if (safe) {
    totalSafe++;
  }
});

console.log(totalSafe);
