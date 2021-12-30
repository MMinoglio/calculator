function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  result = 0;
  switch (operator) {
    case "+":
      result = add(parseFloat(a), parseFloat(b));
      break;
    case "-":
      result = substract(parseFloat(a), parseFloat(b));
      break;
    case "*":
      result = multiply(parseFloat(a), parseFloat(b));
      break;
    case "/":
      result = divide(parseFloat(a), parseFloat(b));
      break;
  }
  return result;
}

function isNumber(button) {
  return (
    button == "0" ||
    button == "1" ||
    button == "2" ||
    button == "3" ||
    button == "4" ||
    button == "5" ||
    button == "6" ||
    button == "7" ||
    button == "8" ||
    button == "9" ||
    button == "."
  );
}

function isOperator(button) {
  return button == "/" || button == "*" || button == "-" || button == "+";
}

function show(input) {
  if (input.toString().length < 7) {
    display().textContent = input.toString();
  } else display().textContent = input.toString().slice(0, 7);
}

function processingButton(button) {
  if (isNumber(button)) {
    operatorPressed = false;
    operanding = operanding + button;
    show(operanding);
    return;
  } else if (isOperator(button)) {
    if (operatorPressed === true) {
      operator = button;
      return;
    }
    operatorPressed = true;
    if (!result) {
      result = operanding;
      operanding = "";
      operator = button;
    } else {
      result = operate(button, result, operanding);
      show(result);
      operanding = "";
      operator = button;
    }
    return;
  } else
    switch (button) {
      case "AC":
        result = "";
        show(0);
        operanding = "";
        operator = "";

        break;

      case "+/-":
        operanding = -operanding;
        show(operanding);
        operator = "";
        break;

      case "%":
        operanding *= 0.01;
        show(operanding);
        operator = "";
        break;

      case "=":
        if (!operator || !operanding) break;
        result = operate(operator, result, operanding);
        operanding = result;
        show(operanding);
        result = "";
        operator = "";
        break;
    }
}

function listenButtons() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      buttonPressed = event.target.textContent;
      processingButton(buttonPressed);
    });
  });
}

let result = "";
let operator = "";
let operanding = "";
let operatorPressed = false;
let blankScreen = true;

const display = () => document.querySelector("#display");

listenButtons();
