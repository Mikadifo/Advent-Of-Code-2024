let input = require("./day5Input.js");

//input = `47|53
//97|13
//97|61
//97|47
//75|29
//61|13
//75|53
//29|13
//97|29
//53|29
//61|53
//97|53
//61|29
//47|13
//75|47
//97|75
//47|61
//75|61
//47|29
//75|13
//53|13

//75,47,61,53,29
//97,61,53,29,13
//75,29,13
//75,97,47,61,53
//61,13,29
//97,13,75,29,47`.split("\n\n");

const rules = input[0].split("\n");
const updates = input[1].split("\n");

const getCorrectTotal = () => {
  let total = 0;
  const splitRules = rules.map((rule) => rule.split("|"));

  updates.forEach((update) => {
    let isCorrect = true;

    for (let i = 0; i < splitRules.length; i++) {
      const pageX = splitRules[i][0];
      const pageY = splitRules[i][1];
      const incorrectOrderRegex = RegExp(`${pageY}.*${pageX}`, "g");

      if (incorrectOrderRegex.test(update)) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      update = update.split(",");
      let middleIndex = ~~(update.length / 2);
      total += +update[middleIndex];
    }
  });

  console.log(total);
};

//getCorrectTotal();

const totalOfIncorrectFixed = () => {
  let total = 0;

  updates.forEach((update) => {
    let isCorrect = true;

    for (let i = 0; i < rules.length; i++) {
      const pageX = rules[i].substring(0, 2);
      const pageY = rules[i].substring(3);
      const incorrectOrderRegex = RegExp(`${pageY}.*${pageX}`, "g");

      if (incorrectOrderRegex.test(update)) {
        console.log(update);
        isCorrect = false;
        break;
      }
    }

    if (!isCorrect) {
      update = update.split(",");
      for (let i = 0; i < update.length - 1; i++) {
        for (let j = i + 1; j < update.length; j++) {
          if (!rules.includes(`${update[i]}|${update[j]}`)) {
            let temp = update[i];
            update[i] = update[j];
            update[j] = temp;
          }
        }
      }

      console.log(update);
      let middleIndex = ~~(update.length / 2);
      total += +update[middleIndex];
    }
  });

  console.log(total);
};

totalOfIncorrectFixed();
