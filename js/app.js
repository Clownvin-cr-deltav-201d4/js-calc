(() => {
  'use strict';

  let prev = '0';
  let prevOp = '+';
  let curr = '0';
  let didOp = false;
  let isDec = false;

  let calcElement = document.getElementById('js-calc');

  let calcHistory = document.createElement('ul');
  calcHistory.id = 'calc-history';

  let calcInput = document.createElement('input');
  calcInput.type = 'text';
  calcInput.id = 'calc-input';

  let calcNumbers = document.createElement('section');
  calcNumbers.id = 'calc-numbers';

  let calcOperations = document.createElement('section');
  calcOperations.id = 'calc-operations';

  calcElement.appendChild(calcInput);

  calcElement.appendChild(calcHistory);
  calcElement.appendChild(calcNumbers);
  calcElement.appendChild(calcOperations);

  function doButton(button) {

    //Cast to string just in case, to ensure consistent behavior.
    button = String(button);
    curr = calcInput.value;
    let child;
    switch (button) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      if (didOp || curr === '0') {
        curr = button;
        didOp = false;
        break;
      }
      curr += button;
      break;
      case '.':
      if (didOp) {
        curr = '0.';
        didOp = false;
        break;
      }
      if (isDec) {
        if (curr.endsWith('.')) {
          curr = curr.substring(0, curr.length - 1);
          isDec = false;
        }
        break;
      }
      curr += button;
      isDec = true;
      break;
      case '--':
      if (curr.startsWith('-')) {
        curr = curr.substring(1, curr.length);
        break;
      }
      curr = '-' + curr;
      break;
      case '+':
      case '-':
      case '*':
      case '/':
      case '^':
      case '%':
      switch (prevOp) {
        case '+':
        child = document.createElement('li');
        child.classList.add('calc-history');
        child.innerHTML = `${prev} + ${curr} = ${curr = prev = String(Number(prev) + Number(curr))}`;
        calcHistory.appendChild(child);
        break;
        case '-':
        child = document.createElement('li');
        child.classList.add('calc-history');
        child.innerHTML = `${prev} - ${curr} = ${curr = prev = String(Number(prev) - Number(curr))}`;
        calcHistory.appendChild(child);
        break;
        case '*':
        child = document.createElement('li');
        child.classList.add('calc-history');
        child.innerHTML = `${prev} * ${curr} = ${curr = prev = String(Number(prev) * Number(curr))}`;
        calcHistory.appendChild(child);
        break;
        case '/':
        child = document.createElement('li');
        child.classList.add('calc-history');
        child.innerHTML = `${prev} / ${curr} = ${curr = prev = String(Number(prev) / Number(curr))}`;
        calcHistory.appendChild(child);
        break;
        case '^':
        child = document.createElement('li');
        child.classList.add('calc-history');
        child.innerHTML = `${prev} ^ ${curr} = ${curr = prev = String(Math.pow(Number(prev), Number(curr)))}`;
        calcHistory.appendChild(child);
        break;
        case '%':
        child = document.createElement('li');
        child.classList.add('calc-history');
        child.innerHTML = `${prev} % ${curr} = ${curr = prev = String(Number(prev) % Number(curr))}`;
        calcHistory.appendChild(child);
        break;
      }
      if (isNaN(Number(curr))) {
        curr = 'Error';
      }
      prevOp = button;
      didOp = true;
      isDec = false;
      break;
      case '=':
      switch (prevOp) {
        case '+':
        child = document.createElement('li');
        child.classList.add('calc-history');
        child.innerHTML = `${prev} + ${curr} = ${curr = String(Number(prev) + Number(curr))}`;
        calcHistory.appendChild(child);
        break;
        case '-':
        child = document.createElement('li');
        child.classList.add('calc-history');
        child.innerHTML = `${prev} - ${curr} = ${curr = String(Number(prev) - Number(curr))}`;
        calcHistory.appendChild(child);
        break;
        case '*':
        child = document.createElement('li');
        child.classList.add('calc-history');
        child.innerHTML = `${prev} * ${curr} = ${curr = String(Number(prev) * Number(curr))}`;
        calcHistory.appendChild(child);
        break;
        case '/':
        child = document.createElement('li');
        child.classList.add('calc-history');
        child.innerHTML = `${prev} / ${curr} = ${curr = String(Number(prev) / Number(curr))}`;
        calcHistory.appendChild(child);
        break;
        case '^':
        child = document.createElement('li');
        child.classList.add('calc-history');
        child.innerHTML = `${prev} ^ ${curr} = ${curr = String(Math.pow(Number(prev), Number(curr)))}`;
        calcHistory.appendChild(child);
        break;
        case '%':
        child = document.createElement('li');
        child.classList.add('calc-history');
        child.innerHTML = `${prev} % ${curr} = ${curr = String(Number(prev) % Number(curr))}`;
        calcHistory.appendChild(child);
        break;
      }
      if (isNaN(Number(curr))) {
        curr = 'Error';
      }
      isDec = false;
      didOp = true;
      prevOp = '+';
      prev = '0';
      break;
      case 'ce': //Clear everything
      prevOp = '+';
      prev = '0';
      isDec = false;
      didOp = true;
      curr = '0';
      break;
      case 'c': //Clear
      isDec = false;
      didOp = true;
      curr = '0';
      break;
      case '←':
      if (curr.charAt(curr.length - 1) === '.') {
        isDec = false;
      }
      curr = curr.substring(0, curr.length - 1);
      break;
    }
    calcInput.value = curr;
  }

  //calcNumbers

  for (let i = 7; i < 10; i++) {
    let numButton = document.createElement('button');
    numButton.classList.add('calc-button');
    numButton.classList.add('calc-num');
    numButton.id = `calc-num-${i}`;
    numButton.onclick = () => doButton(String(i));
    numButton.innerHTML = i;
    calcNumbers.appendChild(numButton);
  }
  calcNumbers.append(document.createElement('br'));
  for (let i = 4; i < 7; i++) {
    let numButton = document.createElement('button');
    numButton.classList.add('calc-button');
    numButton.classList.add('calc-num');
    numButton.id = `calc-num-${i}`;
    numButton.onclick = () => doButton(String(i));
    numButton.innerHTML = i;
    calcNumbers.appendChild(numButton);
  }
  calcNumbers.append(document.createElement('br'));
  for (let i = 1; i < 4; i++) {
    let numButton = document.createElement('button');
    numButton.classList.add('calc-button');
    numButton.classList.add('calc-num');
    numButton.id = `calc-num-${i}`;
    numButton.onclick = () => doButton(String(i));
    numButton.innerHTML = i;
    calcNumbers.appendChild(numButton);
  }
  calcNumbers.append(document.createElement('br'));

  let button = document.createElement('button');
  button.classList.add('calc-button');
  button.classList.add('calc-num');
  button.id = 'calc-op-minus';
  button.onclick = () => doButton('--');
  button.innerHTML = '-';
  calcNumbers.appendChild(button);

  button = document.createElement('button');
  button.classList.add('calc-button');
  button.classList.add('calc-num');
  button.id = 'calc-num-0';
  button.onclick = () => doButton('0');
  button.innerHTML = '0';
  calcNumbers.appendChild(button);

  button = document.createElement('button');
  button.classList.add('calc-button');
  button.classList.add('calc-num');
  button.id = 'calc-op-decimal';
  button.onclick = () => doButton('.');
  button.innerHTML = '.';
  calcNumbers.appendChild(button);

  //calcOperations

  button = document.createElement('button');
  button.classList.add('calc-button');
  button.classList.add('calc-op');
  button.id = 'calc-op-add';
  button.onclick = () => doButton('+');
  button.innerHTML = '+';
  calcOperations.appendChild(button);

  button = document.createElement('button');
  button.classList.add('calc-button');
  button.classList.add('calc-op');
  button.id = 'calc-op-subract';
  button.onclick = () => doButton('-');
  button.innerHTML = '-';
  calcOperations.appendChild(button);

  button = document.createElement('button');
  button.classList.add('calc-button');
  button.classList.add('calc-op');
  button.id = 'calc-op-modulus';
  button.onclick = () => doButton('%');
  button.innerHTML = '%';
  calcOperations.appendChild(button);

  calcOperations.append(document.createElement('br'));

  button = document.createElement('button');
  button.classList.add('calc-button');
  button.classList.add('calc-op');
  button.id = 'calc-op-multiply';
  button.onclick = () => doButton('*');
  button.innerHTML = '*';
  calcOperations.appendChild(button);

  button = document.createElement('button');
  button.classList.add('calc-button');
  button.classList.add('calc-op');
  button.id = 'calc-op-divide';
  button.onclick = () => doButton('/');
  button.innerHTML = '/';
  calcOperations.appendChild(button);

  button = document.createElement('button');
  button.classList.add('calc-button');
  button.classList.add('calc-op');
  button.id = 'calc-op-power';
  button.onclick = () => doButton('^');
  button.innerHTML = '^';
  calcOperations.appendChild(button);

  calcOperations.append(document.createElement('br'));

  button = document.createElement('button');
  button.classList.add('calc-button');
  button.classList.add('calc-op');
  button.id = 'calc-op-clear';
  button.onclick = () => doButton('←');
  button.innerHTML = '←';
  calcOperations.appendChild(button);

  button = document.createElement('button');
  button.classList.add('calc-button');
  button.classList.add('calc-op');
  button.id = 'calc-op-clear';
  button.onclick = () => doButton('c');
  button.innerHTML = 'C';
  calcOperations.appendChild(button);

  button = document.createElement('button');
  button.classList.add('calc-button');
  button.classList.add('calc-op');
  button.id = 'calc-op-clear';
  button.onclick = () => doButton('ce');
  button.innerHTML = 'CE';
  calcOperations.appendChild(button);

  calcOperations.append(document.createElement('br'));

  button = document.createElement('button');
  button.classList.add('calc-button');
  button.classList.add('calc-op');
  button.id = 'calc-op-equals';
  button.onclick = () => doButton('=');
  button.innerHTML = '=';
  calcOperations.appendChild(button);
})();
