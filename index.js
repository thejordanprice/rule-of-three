"use strict";

document.querySelectorAll('.form-control').forEach(element => {
  element.addEventListener('keyup', processValues);
});

const getInputs = () => {
  const valArr = ['a', 'b', 'c', 'd'].reduce((acc, val) => {
    acc[val] = document.querySelector(`#${val}Input`).value || 0;
    return acc;
  }, {});

  const empties = Object.keys(valArr).reduce((acc, val, index) => {
    if (valArr[val] === "") {
      acc.push(index + 1);
    }
    return acc;
  }, []);

  return JSON.stringify({ valArr, empties }, null, 2);
};

const processValues = () => {
  const values = JSON.parse(getInputs());
  const boxMapping = {
    1: { element: '#aInput', formula: (b, c, d) => b * c / d },
    2: { element: '#bInput', formula: (a, d, c) => a * d / c },
    3: { element: '#cInput', formula: (a, d, b) => a * d / b },
    4: { element: '#dInput', formula: (b, c, a) => b * c / a }
  };

  const { element, formula } = boxMapping[values.empties[0]];
  const answer = formula(values.valArr.a, values.valArr.b, values.valArr.c, values.valArr.d);

  const inputElement = document.querySelector(element);
  inputElement.placeholder = answer;
  inputElement.classList.add('answered');

  setTimeout(() => {
    inputElement.classList.remove('answered');
  }, 5000);
};
