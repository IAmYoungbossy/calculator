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
    return a+b;
}
function subtract(a,b) {
    return a-b;
}
function multiply(a,b) {
    return a*b;
}
function divide(a,b) {
    return a/b;
}
function findFactorial(factorial) {
    let multiply = 1;
    for (; factorial !== 0; factorial--) {
        multiply *= factorial;
    }
    return multiply;
}

/*Function to check operator type and assign type operator function*/
function getOperatorFunction() {
    if (storedOperator[storedOperator.length-1] === '+') {
        storedValue.push(+screen.textContent);
        screen.textContent = '';
        result = add((storedValue[storedValue.length-2]), (storedValue[storedValue.length-1]));
        screen.textContent = result;
        storedValue.push(+screen.textContent);
        storedValue.push('clear');
    } else if (storedOperator[storedOperator.length-1] === '-') {
        storedValue.push(+screen.textContent);
        screen.textContent = '';
        result = subtract((storedValue[storedValue.length-2]), (storedValue[storedValue.length-1]));
        screen.textContent = result;
        storedValue.push(+screen.textContent);
        storedValue.push('clear');
    } else if (storedOperator[storedOperator.length-1] === '*') {
        storedValue.push(+screen.textContent);
        screen.textContent = '';
        result = multiply((storedValue[storedValue.length-2]), (storedValue[storedValue.length-1]));
        screen.textContent = result;
        storedValue.push(+screen.textContent);
        storedValue.push('clear');
    } else if (storedOperator[storedOperator.length-1] === '/') {
        storedValue.push(+screen.textContent);
        screen.textContent = '';
        result = divide((storedValue[storedValue.length-2]), (storedValue[storedValue.length-1]));
        screen.textContent = result;
        storedValue.push(+screen.textContent);
        storedValue.push('clear');
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
    storedValue.pop(storedValue[storedValue.length-2]);
    screen.textContent += e.target.textContent;
}

function operator(e) {
    /*Operator action*/
    if (e.target.value === '-') {
        getOperatorFunction();
        pushOperator('-');
    } else if (e.target.value === '+') {
        getOperatorFunction();
        pushOperator('+');
    } else if (e.target.value === '/') {
        getOperatorFunction();
        pushOperator('/');
    } else if (e.target.value === '*') {
        getOperatorFunction();
        pushOperator('*');
    } else if (e.target.value === '!n') {
        storedValue.push(+screen.textContent);
        screen.textContent = '';
        result = findFactorial(storedValue[storedValue.length-1]);
        screen.textContent = result;
        storedValue.push(+screen.textContent);
        storedValue.push('clear');
    } else if (e.target.value === '=') {
        getOperatorFunction();
    }

    /*Button action*/
    if (e.target.textContent === '1' && typeof storedValue[storedValue.length-1] === 'string') {
        populateScreen(e);
    } else {
        if (e.target.textContent === '1') {
            screen.textContent += e.target.textContent;
        }
    }
    if (e.target.textContent === '2' && typeof storedValue[storedValue.length-1] === 'string') {
        populateScreen(e);
    } else {
        if (e.target.textContent === '2') {
            screen.textContent += e.target.textContent;
        }
    }
    if (e.target.textContent === '3' && typeof storedValue[storedValue.length-1] === 'string') {
        populateScreen(e);
    } else {
        if (e.target.textContent === '3') {
            screen.textContent += e.target.textContent;
        }
    }
    if (e.target.textContent === '4' && typeof storedValue[storedValue.length-1] === 'string') {
        populateScreen(e);
    } else {
        if (e.target.textContent === '4') {
            screen.textContent += e.target.textContent;
        }
    }
    if (e.target.textContent === '5' && typeof storedValue[storedValue.length-1] === 'string') {
        populateScreen(e);
    } else {
        if (e.target.textContent === '5') {
            screen.textContent += e.target.textContent;
        }
    }
    if (e.target.textContent === '6' && typeof storedValue[storedValue.length-1] === 'string') {
        populateScreen(e);
    } else {
        if (e.target.textContent === '6') {
            screen.textContent += e.target.textContent;
        }
    }
    if (e.target.textContent === '7' && typeof storedValue[storedValue.length-1] === 'string') {
        populateScreen(e);
    } else {
        if (e.target.textContent === '7') {
            screen.textContent += e.target.textContent;
        }
    }
    if (e.target.textContent === '8' && typeof storedValue[storedValue.length-1] === 'string') {
        populateScreen(e);
    } else {
        if (e.target.textContent === '8') {
            screen.textContent += e.target.textContent;
        }
    }
    if (e.target.textContent === '9' && typeof storedValue[storedValue.length-1] === 'string') {
        populateScreen(e);
    } else {
        if (e.target.textContent === '9') {
            screen.textContent += e.target.textContent;
        }
    }
    if (e.target.textContent === '0' && typeof storedValue[storedValue.length-1] === 'string') {
        populateScreen(e);
    } else {
        if (e.target.textContent === '0') {
            screen.textContent += e.target.textContent;
        }
    }
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