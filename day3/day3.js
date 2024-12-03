let data = require("./day3Input");

//let data =
//"xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

const regex = /mul\(\d{1,3},\d{1,3}\)/g;
const results = [...data.matchAll(regex)].map((match) => match[0]);

const multiply = (match) => {
  let numberX = match.substring(4, match.indexOf(","));
  let numberY = match.substring(match.indexOf(",") + 1, match.length - 1);

  console.log(numberX, numberY);
  return numberX * numberY;
};

let total = 0;
for (let match of results) {
  total += multiply(match);
}
console.log(total);

const newRegex = /(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g;
const newResults = [...data.matchAll(newRegex)].map((match) => match[0]);

let newTotal = 0;
let multiplicationEnabled = true;
for (let match of newResults) {
  if (match === "do()") {
    multiplicationEnabled = true;
  } else if (match === "don't()") {
    multiplicationEnabled = false;
  } else if (multiplicationEnabled) {
    newTotal += multiply(match);
  }
}

console.log(newResults);
console.log(newTotal);
