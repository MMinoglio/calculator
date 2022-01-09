const display = () => document.getElementById("display");
const buttonsNumber = document.querySelectorAll(".number");
const buttonsOperator = document.querySelectorAll(".operator");
const buttonsFunction = document.querySelectorAll(".function");
let displayValue = "";
prevNumber = "0";
operator = "add";

const refreshDisplay = () => (display().textContent = displayValue);

const operate = (firstValue, secondValue, operator) => {
  if (operator === "add")
    return (parseFloat(firstValue) + parseFloat(secondValue)).toString();
  if (operator === "rest")
    return (parseFloat(firstValue) - parseFloat(secondValue)).toString();
  if (operator === "multiply")
    return (parseFloat(firstValue) * parseFloat(secondValue)).toString();
  if (operator === "divide")
    return (parseFloat(firstValue) / parseFloat(secondValue)).toString();
  if (operator === "percent")
    return (
      (parseFloat(firstValue) / 100) *
      parseFloat(secondValue)
    ).toString();
  if (operator === "pow") {
    return Math.pow(parseFloat(firstValue), parseFloat(secondValue)).toString();
  }
};

const listenNumber = () => {
  buttonsNumber.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (event.target.textContent === "." && displayValue.includes("."))
        return;
      numberPressed = event.target.textContent;
      displayValue += numberPressed;
      refreshDisplay();
    });
  });
};

const listenOperator = () => {
  buttonsOperator.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (displayValue === "" && event.target.name === "rest") {
        displayValue = "-";
        refreshDisplay();
      } else if (displayValue === "-" && event.target.name === "add") {
        displayValue = "";
        refreshDisplay();
      } else if (displayValue !== "" && displayValue !== "-") {
        if (operator === "divide" && displayValue === "0") {
          displayValue = "Error Div 0";
          refreshDisplay();
          prevNumber = 0;
          operator = "add";
          displayValue = "";
          return;
        }
        prevNumber = round(operate(prevNumber, displayValue, operator));
        operator = event.target.name;
        displayValue = prevNumber + event.target.textContent;
        refreshDisplay();
        displayValue = "";
      }
    });
  });
};

const listenFunction = () => {
  buttonsFunction.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (event.target.name === "clear") {
        displayValue = "";
        prevNumber = "0";
        operator = "add";
        refreshDisplay();
        return;
      } else if (event.target.name === "equal") {
        if (!displayValue) {
          displayValue = prevNumber;
          prevNumber = 0;
          operator = "add";
          refreshDisplay();
          return;
        }
        if (operator === "divide" && displayValue === "0") {
          displayValue = "Error Div 0";
          refreshDisplay();
          prevNumber = 0;
          operator = "add";
          displayValue = "";
          return;
        }
        displayValue = round(operate(prevNumber, displayValue, operator));
        prevNumber = 0;
        operator = "add";
        refreshDisplay();
      } else if (event.target.name === "return") {
        if (displayValue === "") {
          displayValue = display().textContent;
          operator = "add";
          prevNumber = 0;
        }
        displayValue = displayValue.toString().slice(0, -1);
        refreshDisplay();
      }
    });
  });
};

const round = (num) => {
  return +(Math.round(num + "e+2") + "e-2");
};

listenNumber();
listenOperator();
listenFunction();
