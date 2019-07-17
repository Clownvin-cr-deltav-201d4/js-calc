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

  let calcTable = document.createElement('table');
  calcTable.id = 'calc-table';

  for (let i = 0; i < 7; i++) {
    calcTable.appendChild(document.createElement('col'));
  }

  let tableBody = document.createElement('tbody');
  calcTable.appendChild(tableBody);

  calcElement.appendChild(calcTable);

  let calcInput = document.createElement('input');
  calcInput.type = 'text';
  calcInput.id = 'calc-input';
  calcInput.value = '0';

  let row = document.createElement('tr');
  row.id = 'input-row';
  let td = document.createElement('td');
  td.colSpan = '7';
  td.appendChild(calcInput);
  row.appendChild(td);

  tableBody.appendChild(row);

  //calcNumbers
  let layout = [
    ['7', '8', '9', '', '+', '-', '%'],
    ['4', '5', '6', '', '*', '/', '^'],
    ['1', '2', '3', '', '←', 'c', 'ce'],
    ['--', '0', '.', '', '=']];

  layout.forEach((row) => {
    let tr = document.createElement('tr');
    row.forEach((button) => {
      let td = document.createElement('td');
      let b = document.createElement('button');
      if (button === '') {
        b.classList.add('calc-none');
      } else if (!isNaN(Number(button))) {
        b.classList.add('calc-num');
        b.classList.add('calc-button');
      } else {
        b.classList.add('calc-op');
        b.classList.add('calc-button');
      }
      if (button !== '') {
        b.id = `calc-button-${button}`;
        b.onclick = () => doButton(button);
      }
      if (button === '--') {
        b.innerHTML = '-';
      } else {
        b.innerHTML = button;
      }
      if (button === '=') {
        console.log('setting colspan 3 for '+button);
        td.colSpan = '3';
      }
      td.appendChild(b);
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });

  function doButton(button) {

    //Cast to string just in case, to ensure consistent behavior.
    button = String(button);
    curr = calcInput.value.replace(',', ''); //Remove commas.
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
})();
