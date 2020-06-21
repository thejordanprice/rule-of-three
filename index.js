"use strict";

// all of our elements with the class .form-control
const inputElements = document.querySelectorAll('.form-control');

// for each input element with .form-control class
for (let element in inputElements) {
  if (typeof inputElements[element] === 'object') {
    inputElements[element].addEventListener('keyup', (event) => {
      // the global hook
      processValues((calculated) => {
        document.querySelector('#answer').innerHTML = calculated;
      });
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

const processValues = (callback) => {
  // our last step sent us JSON
  let values;
  getInputs((data) => {
    values = JSON.parse(data);
  });

  // error handling
  if (values.empties.length !== 1) {
    callback('You must input 3 variables.');
  }

  // box is empty, answer using the correct formula
  if (values.empties == 1) {
    const element = document.querySelector('#aInput');
    element.classList.add('answered');
    callback(values.valArr.b * values.valArr.c / values.valArr.d);
  }
  if (values.empties == 2) {
    const element = document.querySelector('#bInput');
    element.classList.add('answered');
    callback(values.valArr.a * values.valArr.d / values.valArr.c);
  }
  if (values.empties == 3) {
    const element = document.querySelector('#cInput');
    element.classList.add('answered');
    callback(values.valArr.a * values.valArr.d / values.valArr.b);
  }
  if (values.empties == 4) {
    const element = document.querySelector('#dInput');
    element.classList.add('answered');
    callback(values.valArr.b * values.valArr.c / values.valArr.a);
  }

  setInterval(() => {
    const elements = document.querySelectorAll('.answered');
    for (let element in elements) {
      if (typeof elements[element] === 'object') {
        elements[element].classList.remove('answered');
      }
    }
  }, 7000);
};