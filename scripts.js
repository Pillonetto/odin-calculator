//To control the display's text content
let displayResult = document.querySelector('.displayResult');
let displayDigits = document.querySelector('.displayDigits');
//To add event listeners to all buttons
let numbers = document.querySelectorAll('.num');
let operators = document.querySelectorAll('.op');
let equals = document.querySelector('.equals');
//To keep track of whether an operator has been selected, and what the selection was
let hasOperator = false;
let selectedOperation;
//To store the first and second values inputed to calculator
let a = 0;
let b = 0;

//Event Listeners and function calls

numbers.forEach(number => 
    number.addEventListener('click', () => updateDisplay(number)));

operators.forEach(op =>     
    op.addEventListener('click', () => updateDisplayOp(op)));


equals.addEventListener('click', () => realizeOperation(a, b));

let clear = document.querySelector('.clear');
clear.addEventListener('click', () => clearDisplay());

/////////////////////////////////////FUNCTION DECLARATIONS

function updateDisplay(number){

    if(displayDigits.textContent.length < 14)
        displayDigits.textContent += number.textContent;
    else
        alert("Maximum number of digits reached.");
}

function updateDisplayOp(op){

    
    if(displayDigits.textContent.length > 13)
        return alert("Maximum number of digits reached.");

    if(!hasOperator){
        
        a = displayDigits.textContent;
    
        displayDigits.textContent +=  ' ' + op.textContent + ' ';
        hasOperator = true;
        selectedOperation = op.textContent;
    }
    else {
        realizeOperation(a, b);
        //Updates to new display content
        a = displayResult.textContent;

        displayDigits.textContent = a + ' ' + op.textContent + ' ';
        selectedOperation = op.textContent;

    }

}

function realizeOperation(a, b){
    
    //Length of number a + ' ' + operator + ' '
    b = displayDigits.textContent.substring(a.length + 3);
    a = parseInt(a);
    b = parseInt(b);

    if(selectedOperation == '/' && b == 0){
        clearDisplay();
        return alert('Are you trying to crash my calculator? Wow.');
    }
    toBeDisplayed = (hasOperator) ? operate(a, b, selectedOperation) : displayDigits.textContent;

    displayResult.textContent = toBeDisplayed;

}

function clearDisplay(){
    a = 0;
    b = 0;
    displayResult.textContent = ' ';
    displayDigits.textContent = ' ';
    hasOperator = false;
    selectedOperation = '';
}

// Operation functions

 function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(a, b, operator){
    switch(operator){
        case '+':
            return add(a,b);
            break;
        case '-':
            return subtract(a,b);
            break;
        case 'x':
            return  multiply(a,b);
            break;
        case '/':
            return divide(a,b);
            break;
    }
}