const data = require("./day1Input.js");

const leftList = [];
const rightList = [];

const fillLists = () => {
  data.split("\n").forEach((pair) => {
    const pairList = pair.split("   ");

    leftList.push(pairList[0]);
    rightList.push(pairList[1]);
  });
};

//fillLists();

leftList.sort((a, b) => b - a);
rightList.sort((a, b) => b - a);

let totalDistance = 0;
while (leftList.length > 0) {
  let distance = leftList.pop() - rightList.pop();
  totalDistance += Math.abs(distance);
}

console.log(totalDistance);
fillLists();

//leftList.push(...[3, 4, 2, 1, 3, 3]);
//rightList.push(...[4, 3, 5, 3, 9, 3]);

let totalScore = 0;
leftList.forEach((number) => {
  const score =
    number *
    rightList.reduce((acc, curr) => {
      if (curr == number) acc++;
      return acc;
    }, 0);

  totalScore += score;
});

console.log(totalScore);
