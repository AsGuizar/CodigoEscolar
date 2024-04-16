const numbers = [45, 4, 9, 16, 25];
let txt = "";
numbers.forEach((value, index, array) => {
  txt += value + "<br>";
});

///////////////////////////////////////////////////////////////

const numbers1 = [45, 4, 9, 16, 25];
const numbers2 = numbers1.map((value, index, array) => {
  return value * 2;
});

////////////////////////////////////////////////////////////////

/*const numbers = [45, 4, 9, 16, 25];
const over18 = numbers.filter((value, index, array) => {
  return value > 18;
});*/
