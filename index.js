"use strict";

// all of our elements with the class .form-control
const inputElements = document.querySelectorAll('.form-control');

// for each input element with .form-control class
for (let element in inputElements) {
  if (typeof inputElements[element] === 'object') {
    inputElements[element].addEventListener('keyup', () => {
      // the global hook
      processValues();
    });
  }
}

const getInputs = (callback) => {
  // input / dom controlling
  const valArr = {
    'a': document.querySelector('#aInput').value,
    'b': document.querySelector('#bInput').value,
    'c': document.querySelector('#cInput').value,
    'd': document.querySelector('#dInput').value
  };
  
  // empty input tracking
  let empties = [];
  let cycle = 0;
  for (let val in valArr) {
    cycle++;
    if (valArr[val] == "") {
      empties.push(cycle);
    }
  }

  // return the response
  callback(JSON.stringify({ valArr, empties }, null, 2));
};

const processValues = () => {
  // our last step sent us JSON
  let values;
  getInputs((data) => {
    values = JSON.parse(data);
  });
  
  // box alpha is empty, answer using the correct formula
  if (values.empties == 1) {
    const element = document.querySelector('#aInput');
    const math = values.valArr.b * values.valArr.c / values.valArr.d;
    element.classList.add('answered');
    element.placeholder = math;
  }
  // box beta is empty
  if (values.empties == 2) {
    const element = document.querySelector('#bInput');
    const math = values.valArr.a * values.valArr.d / values.valArr.c;
    element.classList.add('answered');
    element.placeholder = math;
  }
  // box gramma is empty
  if (values.empties == 3) {
    const element = document.querySelector('#cInput');
    const math = values.valArr.a * values.valArr.d / values.valArr.b;
    element.classList.add('answered');
    element.placeholder = math;
  }
  // box delta is empty
  if (values.empties == 4) {
    const element = document.querySelector('#dInput');
    const math = values.valArr.b * values.valArr.c / values.valArr.a;
    element.classList.add('answered');
    element.placeholder = math;
  }

  const timer = setInterval(() => {
    // clear the answered css classes
    clearInterval(timer);
    const elements = document.querySelectorAll('.answered');
    for (let element in elements) {
      if (typeof elements[element] === 'object') {
        elements[element].classList.remove('answered');
      }
    }
  }, 5000);

  // attempt to easily copy to clipboard of the answer data
  const elements = document.querySelectorAll('input');
  for (let element in elements) {
    if (typeof elements[element] === 'object') {
      elements[element].addEventListener('click', () => {
        const text = elements[element].placeholder;
        navigator.clipboard.writeText(text);
      });
    }
  }
};