/*Caching DOM*/
const screen = document.querySelector('#screen');
const buttonContainer = document.querySelector('.buttoncontainer');
const numberButtons = buttonContainer.querySelectorAll('.btn');
const btnOperator = buttonContainer.querySelectorAll('.btn-operator');
const clearButton = buttonContainer.querySelector('#clear');
/*Variable declaration*/
let storedValue = [];
let storedOperator = [];
let result;
let backspace;
let toStrings;

/*Operator Functions*/
function add(a,b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return screen.textContent = storedValue[0];
    } else {
        return a+b;
    }
}
function subtract(a,b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return screen.textContent = storedValue[0];
    } else {
        return a-b;
    }
}
function multiply(a,b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return screen.textContent = storedValue[0];
    } else {
        return a*b;
    }
}
function divide(a,b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return screen.textContent = storedValue[0];
    } else if (b === 0) {
        return screen.textContent = 'Error!';
    } else {
        return a/b;
    }
}
function findFactorial(factorial) {
    let multiply = 1;
    if (typeof factorial !== 'number') {
        return screen.textContent = storedValue[0];
    } else {
        for (; factorial !== 0; factorial--) {
            multiply *= factorial;
        }
        return multiply;
    }
}
/*Function calls operator function*/
function getOperatorTwo(operatorFunction) {
    storedValue.push(+screen.textContent);
    screen.textContent = '';
    result = operatorFunction((storedValue[storedValue.length-2]), (storedValue[storedValue.length-1]));
    screen.textContent = result;
    storedValue.push(+screen.textContent);
    storedValue.push('clear');
    storedOperator = [];
}

/*Function to check operator type and assign type operator function*/
function getOperatorFunction() {
    if (storedOperator[storedOperator.length-1] === '+') {
            getOperatorTwo(add);
    } else if (storedOperator[storedOperator.length-1] === '-') {
            getOperatorTwo(subtract);
    } else if (storedOperator[storedOperator.length-1] === '*') {
            getOperatorTwo(multiply);
    } else if (storedOperator[storedOperator.length-1] === '/') {
            getOperatorTwo(divide);
    } else {
        if (storedOperator[storedOperator.length-1] !== 'string') {
            return;
        }
    }
}

/*Function push screen display number and operator type to array*/
function pushOperator(operator) {
    storedValue.push(+screen.textContent);
    storedValue.push(operator);
    storedOperator.push(operator);
}
/*Function to populate screen with numbers from buttons*/
function populateScreen(e) {
    screen.textContent = '';
    storedValue.pop();
    screen.textContent += e.target.textContent;
}
/*Button function to respond under certain conditions*/
function numberBtn(e,a){
    if (e.target.textContent === a && typeof storedValue[storedValue.length-1] === 'string') {
        populateScreen(e);
    } else {
        if (e.target.textContent === a) {
            screen.textContent += e.target.textContent;
        }
    }
}
/*This is just to remove repeated code*/
function operatorAction(operator) {
    getOperatorFunction();
    storedValue = [];
    pushOperator(operator);
}
/*For operating numbers with decimals*/
function addDecimal(e) {
    if (e.target.textContent === '.' && typeof storedValue[storedValue.length-1] === 'string') {
		screen.textContent = '0';
		storedValue.pop();
		screen.textContent += e.target.textContent;
	} else if (e.target.textContent === '.' && (screen.textContent).indexOf('.') >= 0) {
		return;
	} else {
		if (e.target.textContent === '.' && screen.textContent !== '') {
			screen.textContent += e.target.textContent;
		} else if (e.target.textContent === '.' && screen.textContent === '') {
			screen.textContent = '0';
			screen.textContent += e.target.textContent;
		}
	}
}

/*Operator function uses all the above function for its logic*/
function operator(e) {

    /*Operator action*/
    if (e.target.value === '-') {
        operatorAction('-');
    } else if (e.target.value === '+') {
        operatorAction('+');
    } else if (e.target.value === '/') {
        operatorAction('/');
    } else if (e.target.value === '*') {
        operatorAction('*');
    } else if (e.target.value === '!') {
        if (screen.textContent === 'Error!') {
            return;
        } else {
            storedValue.push(+screen.textContent);
            screen.textContent = '';
            result = findFactorial(storedValue[storedValue.length-1]);
            screen.textContent = result;
            storedValue.push(+screen.textContent);
            storedValue.push('clear');
        }
    } else if (e.target.value === '=') {
        getOperatorFunction();
    }
    /*For floating number*/
    addDecimal(e);

    /*Button action*/
    numberBtn(e,'1');
    numberBtn(e,'2');
    numberBtn(e,'3');
    numberBtn(e,'4');
    numberBtn(e,'5');
    numberBtn(e,'6');
    numberBtn(e,'7');
    numberBtn(e,'8');
    numberBtn(e,'9');
    numberBtn(e,'0');

    /*Clears each digit on button click*/
    if (e.target.textContent === '<=') {
        backspace = [];
        backspace = [...screen.textContent+''];
        backspace.pop(backspace[backspace.length-1]);
        result = backspace.toString();
        toStrings = result.replace(/,/g, '');
        screen.textContent = '';
        screen.textContent = toStrings;
    }
}
/*Event listeners*/
buttonContainer.addEventListener('click', operator);
clearButton.addEventListener('click', () => {
    screen.textContent = '';
    storedValue = [];
    storedOperator = [];
});