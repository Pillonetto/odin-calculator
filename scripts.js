//To control the display's text content
let displayResult = document.querySelector('.displayResult');
let displayDigits = document.querySelector('.displayDigits');
//To add event listeners to all buttons
let numbers = document.querySelectorAll('.num');
let decimal = document.querySelector('.dec');
let operators = document.querySelectorAll('.op');
let equals = document.querySelector('.equals');
//To keep track of whether an operator has been selected, and what the selection was
let hasOperator = false;
let selectedOperation;
let hasDecimal = false;
//To store the first and second values inputed to calculator
let a = 0;
let b = 0;

//Event Listeners and function calls

numbers.forEach(number => 
    number.addEventListener('click', () => updateDisplay(number)));

decimal.addEventListener('click', () => updateDisplayDecimal());

operators.forEach(op =>     
    op.addEventListener('click', () => updateDisplayOp(op)));

equals.addEventListener('click', () => realizeOperation(a, b));

let clear = document.querySelector('.clear');
clear.addEventListener('click', () => clearDisplay());

/////////////////////////////////////FUNCTION DECLARATIONS

function updateDisplay(number){

    if(displayDigits.textContent.length < 14)
        displayDigits.textContent += number.textContent;
    else {
        alert("Maximum number of digits reached.");
        clearDisplay();
    }
}

function updateDisplayDecimal(){

    displayDigits.textContent += '.';
    disableDecimal();

}

function disableDecimal(){
    decimal.disabled = true;;
}

function enableDecimal(){
    decimal.disabled = false;
}
function treatDecimal(a){
    if(a[0] == '.')
        a = '0' + a;
    return a;
}

function updateDisplayOp(op){

    
    if(displayDigits.textContent.length > 13)
        return alert("Maximum number of digits reached.");

    if(!hasOperator){
        
        if(displayDigits.textContent == ''){
            a = displayResult.textContent;
            displayDigits.textContent += a;
        }
        else
            a = treatDecimal(displayDigits.textContent);
            
        displayDigits.textContent +=  ' ' + op.textContent + ' ';

        //Update flags
        hasOperator = true;
        selectedOperation = op.textContent;
        //Enables back decimals
        enableDecimal();
    }
    else {

        b = getB(a);
        if(b.length == 0)
            return alert("Invalid Operation!");

        if(displayDigits.textContent != '')
            realizeOperation(a, b);
        //Updates to new display content
        a = treatDecimal(displayResult.textContent);
        console.log(a);

        displayDigits.textContent = a + ' ' + op.textContent + ' ';
        selectedOperation = op.textContent;
        hasOperator = true;
        enableDecimal();

    }

}

function getB(a){
    return displayDigits.textContent.substring(a.length + 3);
}

function realizeOperation(a, b){
    //Length of number a + ' ' + operator + ' '
    b = getB(a);
    
    if(b.length == 0 || a.length == 0)
        return alert('Invalid Operation!');
    
    a = parseFloat(a);
    b = parseFloat(b);

    //If user is trying to divide by 0
    if(selectedOperation == '/' && b == 0){
        return alert('Are you trying to crash my calculator? Wow.');
    }
    //If it has operator, operate. If it doesnt, just copy the number itself
    toBeDisplayed = (hasOperator) ? operate(a, b, selectedOperation) : displayDigits.textContent;

    //Making sure the result isnt bigger than display
    if(toBeDisplayed.toString().length > 8)
        return alert('Result is too long');
    
    displayResult.textContent = toBeDisplayed;

    hasOperator = false;

    clearDisplayUpper();

}

function clearDisplayUpper(){
    displayDigits.textContent = '';
    selectedOperation = '';
    enableDecimal();
}

function clearDisplay(){
    a = 0;
    b = 0;
    // displayResult.textContent = '';
    displayDigits.textContent = '';
    hasOperator = false;
    selectedOperation = '';
    enableDecimal();
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