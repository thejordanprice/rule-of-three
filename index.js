// all of our elements with the class .form-control
const inputElems = document.querySelectorAll('.form-control');

// for each input element with .form-control class
for (let elem in inputElems) {
  // make sure its an object, not a function or number
  if (typeof inputElems[elem] === 'object') {
    // create event listener
    inputElems[elem].addEventListener('keypress', (event) => {
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
    callback(values.valArr.b * values.valArr.c / values.valArr.d);
  }
  if (values.empties == 2) {
    callback(values.valArr.a * values.valArr.d / values.valArr.c);
  }
  if (values.empties == 3) {
    callback(values.valArr.a * values.valArr.d / values.valArr.b);
  }
  if (values.empties == 4) {
    callback(values.valArr.b * values.valArr.c / values.valArr.a);
  }
};