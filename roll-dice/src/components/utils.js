export function createRandomDice(numberOfDice = 2) {
  const diceArray = [];

  for (let i = 0; i < numberOfDice; i++) {
    diceArray.push(Math.floor(Math.random() * 6 + 1));
  }

  return diceArray;
}
