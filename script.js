const screenSection = document.getElementById("screen-section");
const numberButtons = document.querySelectorAll(".number");
const equals = document.getElementById("equals");
const allOperators = document.querySelectorAll(".operator");
const clearButton = document.getElementById("clear");
const allClearButton = document.getElementById("all-clear");
const decimal = document.getElementById("decimal");

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

function checkIfError() {
  if (screenSection.textContent === "ERROR") {
    screenSection.textContent = "";
  }
}

decimal.addEventListener("click", function () {
  checkIfError();

  if (screenSection.textContent.includes(".")) {
    return;
  }
  screenSection.textContent += this.textContent;
});

for (btn of numberButtons) {
  btn.addEventListener("click", function () {
    checkIfError();

    if (screenSection.textContent === "0" || screenSection.textContent === "00") {
      screenSection.textContent = "";
    }
    screenSection.textContent += this.textContent;

    console.log(operation);
  });
}

for (operator of allOperators) {
  operator.addEventListener("click", function () {
    if (screenSection.textContent === "ERROR") {
      screenSection.textContent = "";
      return;
    }

    if (screenSection.textContent === "") {
      operation.splice(operation.length - 1, 1); // prevent pushing multiple operators beside each other
    } else {
      operation.push(+screenSection.textContent);
    }

    calcLogic();
    screenSection.textContent = "";
    operation.push(this.textContent);

    console.log(operation);
  });
}

equals.addEventListener("click", function () {
  checkIfError();

  operation.push(+screenSection.textContent);
  console.log(operation);

  calcLogic();

  for (let i = 0; i < operation.length; i += 2) {
    sum += operation[i];
  }
  if (sum === Infinity || sum === -Infinity) {
    screenSection.textContent = "ERROR";
  } else {
    screenSection.textContent = sum;
  }
  if (screenSection.textContent === "NaN") {
    screenSection.textContent = "ERROR";
  }
  operation = [];

  console.log(sum);
  sum = 0;
});

clearButton.addEventListener("click", function () {
  if (screenSection.textContent.length === 1) {
    screenSection.textContent = "0";
  } else {
    screenSection.textContent = screenSection.textContent.slice(0, screenSection.textContent.length - 1);
  }
});

allClearButton.addEventListener("click", function () {
  screenSection.textContent = "0";
  operation = [];
  sum = 0;
});

// keyboard support

document.onkeyup = function (e) {
  switch (e.which) {
    case 48:
      document.getElementById("0").click();
      break;
    case 49:
      document.getElementById("1").click();
      break;
    case 50:
      document.getElementById("2").click();
      break;
    case 51:
      document.getElementById("3").click();
      break;
    case 52:
      document.getElementById("4").click();
      break;
    case 53:
      document.getElementById("5").click();
      break;
    case 54:
      document.getElementById("6").click();
      break;
    case 55:
      document.getElementById("7").click();
      break;
    case 56:
      document.getElementById("8").click();
      break;
    case 57:
      document.getElementById("9").click();
      break;
    case 8: // backspace
      document.getElementById("clear").click();
      break;
    case 67: // C
      document.getElementById("all-clear").click();
      break;
    case 13: // enter
      document.getElementById("equals").click();
      break;
    case 190: // .
      document.getElementById("decimal").click();
      break;
    case 88: // x
      document.getElementById("multiply").click();
      break;
    case 191: // /
      document.getElementById("divide").click();
      break;
    case 77: // m
      document.getElementById("modulo").click();
      break;
    case 61: // +
      document.getElementById("add").click();
      break;
    case 173: // -
      document.getElementById("substract").click();
      break;
  }
}