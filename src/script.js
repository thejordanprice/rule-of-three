// global var hooks
const answer = document.querySelector('#answer');
const submit = document.querySelector('#submit');

const getInputs = () => {
  // input / dom controlling
  const aInput = document.querySelector('#aInput').value;
  const bInput = document.querySelector('#bInput').value;
  const cInput = document.querySelector('#cInput').value;
  const dInput = document.querySelector('#dInput').value;
  const valArr = {
    'a': aInput,
    'b': bInput,
    'c': cInput,
    'd': dInput
  };
  
  // empty input tracking
  let empties = [];
  let emptyCount = 0;
  let cycle = 0;
  for (let val in valArr) {
    cycle++;
    if (valArr[val] == "") {
      emptyCount++;
      empties.push(cycle);
    }
  }
  return JSON.stringify({ valArr, empties }, null, 2);
};

const processValues = () => {
	// our last step sent us JSON
  let values = JSON.parse(getInputs());
  
  // error handling
  if (values.empties.length > 1) {
  	return 'Insufficient inputs.';
  }
  
  // if box is empty use the correct formula
  if (values.empties == 1) {
    return values.valArr.b * values.valArr.c / values.valArr.d;
  }
  if (values.empties == 2) {
    return values.valArr.a * values.valArr.d / values.valArr.c;
  }
  if (values.empties == 3) {
    return values.valArr.a * values.valArr.d / values.valArr.b;
  }
  if (values.empties == 4) {
    return values.valArr.b * values.valArr.c / values.valArr.a;
  }
};

submit.addEventListener('click', (event) => {
	// the global hook
  answer.innerHTML = processValues();
});