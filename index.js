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
    'a': document.querySelector('#aInput').value || 0,
    'b': document.querySelector('#bInput').value || 0,
    'c': document.querySelector('#cInput').value || 0,
    'd': document.querySelector('#dInput').value || 0
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

  // init our vars
  let element;
  let answer;
  
  // box alpha is empty, answer using the correct formula
  if (values.empties == 1) {
    element = document.querySelector('#aInput');
    answer = values.valArr.b * values.valArr.c / values.valArr.d;
  }

  // box beta is empty
  if (values.empties == 2) {
    element = document.querySelector('#bInput');
    answer = values.valArr.a * values.valArr.d / values.valArr.c;
  }

  // box gamma is empty
  if (values.empties == 3) {
    element = document.querySelector('#cInput');
    answer = values.valArr.a * values.valArr.d / values.valArr.b;
  }

  // box delta is empty
  if (values.empties == 4) {
    element = document.querySelector('#dInput');
    answer = values.valArr.b * values.valArr.c / values.valArr.a;
  }

  // no matter which box it is
  element.placeholder = answer;
  element.classList.add('answered');

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
};