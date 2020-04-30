const screenSection = document.getElementById("screen-section");
const numberButtons = document.querySelectorAll(".number");
const equals = document.getElementById("equals");
const allOperators = document.querySelectorAll(".operator");

let operation = [];
let sum = 0;

function precedence() {
  for (let i = 1; i < operation.length; i += 2) { // every operator
    switch (operation[i]) {
      case "*":
        operation.splice([i] - 1, 3, operation[i - 1] * operation[i + 1]);
        break;
      case "/":
        operation.splice([i] - 1, 3, operation[i - 1] / operation[i + 1]);
        break;
      case "%":
        operation.splice([i] - 1, 3, operation[i - 1] % operation[i + 1]);
        break;
    }
  }
}

function minusBehaviour() {
  for (let i = 0; i < operation.length; i += 2) { // every number
    if (operation[i - 1] === "-") {
      operation.splice([i] - 1, 2, "+", -operation[i]);
    }
  }
}

function calcLogic() {
  minusBehaviour();
  precedence();
}

for (btn of numberButtons) {
  btn.addEventListener("click", function () {
    if (screenSection.textContent === "0" || screenSection.textContent === "00") { // on click, the starting 0 will dissapear
      screenSection.textContent = "";
    }
    screenSection.textContent += this.textContent;

    console.log(operation);
  });
}

for (operator of allOperators) {
  operator.addEventListener("click", function () {
    operation.push(+screenSection.textContent);
    calcLogic();

    screenSection.textContent = "";
    operation.push(this.textContent);

    console.log(operation);
  });
}

equals.addEventListener("click", function () {
  operation.push(+screenSection.textContent);
  calcLogic();

  for (let i = 0; i < operation.length; i += 2) {
    sum += operation[i];
  }
  screenSection.textContent = sum;
  operation = [];

  console.log(sum);
  console.log(operation);
});