const display = document.getElementById('display');

function appendToDisplay(value) {
  if (display.value === '0' || display.value === 'Error') {
    display.value = value;
  } else {
    display.value += value;
  }
}

function calculateResult() {
  try {
    let expression = display.value
      .replace(/√/g, 'Math.sqrt')
      .replace(/÷/g, '/')
      .replace(/×/g, '*')
      .replace(/\^/g, '**');
    let result = Function('"use strict"; return (' + expression + ')')();
    display.value = result;
  } catch {
    display.value = 'Error';
  }
}

function clearDisplay() {
  display.value = '0';
}

document.addEventListener('keydown', function (event) {
  const key = event.key;
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const operators = ['+', '-', '*', '/'];

  if (numbers.includes(key) || key === '.') {
    appendToDisplay(key);
  } else if (operators.includes(key)) {
    appendToDisplay(key);
  } else if (key === 'Enter' || key === '=') {
    event.preventDefault();
    calculateResult();
  } else if (key === 'Backspace') {
    event.preventDefault();
    clearDisplay();
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  } else if (key === '%') {
    appendToDisplay('%');
  } else if (key === '^') {
    appendToDisplay('^');
  }
});
