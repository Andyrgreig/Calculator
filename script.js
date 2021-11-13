//Variables
let firstNumber = 0;
let secondNumber = 0;
let inputNumber = 0;
let operator = "";
let operatorName = "";
let calculate = false;
let answer = 0;
let switchSigns = false;

//DOM variable assignments
const inputDisplay = document.getElementById("input");
const expressionDisplay = document.getElementById("expression");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");
const plusMinus = document.querySelector(".plusMinus");
const operators = document.querySelectorAll(".operators");
const numbers = document.querySelectorAll(".numbers");
const equals = document.querySelector(".equals");
const point = document.querySelector(".point");

//Event Listeners
clear.addEventListener("click", resetVariables);
backspace.addEventListener("click", deleteLast);
plusMinus.addEventListener("click", changeSign);
equals.addEventListener("click", calculateExpression);
point.addEventListener("click", addDecimalPoint);
numbers.forEach((number) =>
  number.addEventListener("click", function () {
    addNumber(this.textContent);
  })
);
operators.forEach((operator) =>
  operator.addEventListener("click", function () {
    addOperator(operator.textContent, operator.id);
  })
);

//Keyboard Support
document.addEventListener("keydown", keyboardEvents);

function keyboardEvents(e) {
  console.log(e);
  if (e.key >= 0 && e.key <= 9) addNumber(e.key);
  if (e.key === "Backspace") deleteLast();
  if (e.key === "Delete") resetVariables();
  if (e.key === "Enter") calculateExpression();
  if (e.key === ".") addDecimalPoint();
  if (e.key === "/") addOperator(e.key, e.code.substr(6, 12).toLowerCase());
  if (e.key === "*") addOperator(e.key, e.code.substr(6, 14).toLowerCase());
  if (e.key === "-") addOperator(e.key, e.code.substr(6, 14).toLowerCase());
  if (e.key === "+") addOperator(e.key, e.code.substr(6, 9).toLowerCase());
}

//Maths functions
function add(num1, num2) {
  const result = num1 + num2;
  return roundNumber(result);
}

function subtract(num1, num2) {
  const result = num1 - num2;
  return roundNumber(result);
}

function multiply(num1, num2) {
  const result = num1 * num2;
  return roundNumber(result);
}

function divide(num1, num2) {
  const result = num1 / num2;
  if (num2 === 0) {
    return "Error";
  }
  return roundNumber(result);
}

function roundNumber(num) {
  if (num.toString().length > 14) {
    let decimalPosition = num.toString().indexOf(".") + 1;
    let decimalPrecision = 14 - decimalPosition;
    num =
      Math.round(num * Math.pow(10, decimalPrecision)) /
      Math.pow(10, decimalPrecision);
  }
  return num;
}

function operate(num1, num2, str) {
  if (str === "add") return add(num1, num2);
  else if (str === "subtract") return subtract(num1, num2);
  else if (str === "multiply") return multiply(num1, num2);
  else if (str === "divide") return divide(num1, num2);
}

//
//
function updateDisplay() {
  //
  if (answer == "Error") {
    inputDisplay.innerHTML = answer;
    expressionDisplay.innerHTML = "";
  } else if (operator == "") {
    firstNumber = inputNumber;
    inputDisplay.innerHTML = firstNumber;
    expressionDisplay.innerHTML = "";
  } else if (calculate) {
    secondNumber = inputNumber;
    expressionDisplay.innerHTML =
      firstNumber + " " + operator + " " + secondNumber + " =";
    inputDisplay.innerHTML = answer;
  } else if (switchSigns) {
    firstNumber = inputNumber;
    inputDisplay.innerHTML = firstNumber;
    expressionDisplay.innerHTML = `Negate(${answer})`;
  } else if (answer !== 0) {
    secondNumber = inputNumber;
    inputDisplay.innerHTML = secondNumber;
    expressionDisplay.innerHTML =
      firstNumber + " " + operator + " " + secondNumber;
  } else {
    secondNumber = inputNumber;
    expressionDisplay.innerHTML =
      firstNumber + " " + operator + " " + secondNumber;
  }
}

function resetVariables() {
  firstNumber = 0;
  secondNumber = 0;
  inputNumber = 0;
  operator = "";
  operatorName = "";
  answer = 0;
  calculate = false;
  updateDisplay();
}

function addNumber(num) {
  if (answer == "Error") resetVariables();
  if (inputNumber === 0) inputNumber = num;
  else if (inputNumber.toString().length < 14) inputNumber += num;
  updateDisplay();
}

function addDecimalPoint() {
  let numLength = inputNumber.toString().length;
  let findDecimal = inputNumber.toString().indexOf(".");
  if (numLength < 14 && findDecimal < 0) inputNumber += ".";
}

function deleteLast() {
  if (inputNumber !== 0 && inputNumber !== "")
    inputNumber = (inputNumber / 10) | 0;
  updateDisplay();
}

function changeSign() {
  if (answer !== 0 && answer !== "Error") {
    console.log("x");
    inputNumber = answer;
    switchSigns = true;
  }
  inputNumber = 0 - inputNumber;
  updateDisplay();
  switchSigns = false;
}

function addOperator(operSymbol, operName) {
  if (answer !== "Error") {
    operator = operSymbol;
    operatorName = operName;
    inputNumber = "";
    updateDisplay();
  }
}

function calculateExpression() {
  firstNumber = parseInt(firstNumber);
  secondNumber = parseInt(secondNumber);
  calculate = true;
  answer = operate(firstNumber, secondNumber, operatorName);

  updateDisplay();
  calculate = false;
  firstNumber = answer;
  inputNumber = 0;
}

//Populate display on load
updateDisplay();
