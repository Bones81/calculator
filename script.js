//grab all buttons and display and store in variables
const btnEquals = document.getElementById('equals');
const addBtn = document.getElementById('add');
const subtractBtn = document.getElementById('subtract');
const multiplyBtn = document.getElementById('multiply');
const divideBtn = document.getElementById('divide');
const decimalBtn = document.getElementById('decimal');
const clearBtn = document.getElementById('backspace');
const allClearBtn = document.getElementById('all-clear');

const btn0 = document.getElementById('0');
const btn1 = document.getElementById('1');
const btn2 = document.getElementById('2');
const btn3 = document.getElementById('3');
const btn4 = document.getElementById('4');
const btn5 = document.getElementById('5');
const btn6 = document.getElementById('6');
const btn7 = document.getElementById('7');
const btn8 = document.getElementById('8');
const btn9 = document.getElementById('9');
const disp = document.getElementById('display');

//console.log(disp.textContent);

const digits = document.querySelectorAll('.digit-btn');
const digitsArray = Array.from(digits);

//each number button adds that number to a string in display, 
//but then that string needs to be converted into a number before any operation runs

//all the operations as functions
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
    if(b === 0) {
        return 'ERROR';
    } else {
        return a/b; 
    }
}
//limit length of result with rounding/length restriction 

//Digit button responses
for (i=0; i<digitsArray.length; i++) {
    digitsArray[i].addEventListener('click', pressDigit);
}

function pressDigit(e) {
    console.log(e);
    if (disp.textContent === '0') {
        disp.textContent = '';
    }    
    disp.textContent = disp.textContent.concat(`${e.target.textContent}`);
    console.log(disp.textContent);
    
}


//how to update the display


function convertDisplay() {
    commasRmvd = Number(disp.textContent.replace(/,/g,''));
    return commasRmvd;
}

//how to chain operations

//when to enable/disable decimal button function
decimalBtn.addEventListener('click', placeDecimal);
function placeDecimal() {
    if(disp.textContent.indexOf('.') === -1) {
        disp.textContent = disp.textContent.concat('.');    
    }
    console.log(disp.textContent);
}
//backspace function on 'C' key
clearBtn.addEventListener('click', backspace);
function backspace() {
    disp.textContent = disp.textContent.slice(0, -1);
    if (disp.textContent === "") {
        disp.textContent = '0';
    }
    console.log(disp.textContent);
}
//full clear on AC button
allClearBtn.addEventListener('click', fullClear);
function fullClear() {
    disp.textContent = '0';
    operand1 = '';
    operand2 = '';
    operator = '';
    console.log(disp.textContent);
}

//pressing equals button multiple times repeats last operator and operand

//if divide by 0, display = error msg

//if display.length > however many spaces are available, then {round it to nearest appropriate decimal}

//place commas every three digits in display, if necessary. 

//before grabbing number, must remove any commas, using split/join/toNumber on the string in the display field?

/* Example 
When someone presses '2', '+', '7', '=', '-', '3', '=', '=', 'AC', '=' what should happen?

First, '2':
    Display should replace default value ('0') with '2'. 
    
Next, '+':
    '2' should be stored as operand1.
    Display should stay on '2'.
    Store 'add' as 'operator'.    

Next, '7':
    Display should change to '7'.
    Store '7' as operand2.

Next, '=':
    
    switch case (operator === 'add')
        Add function should be run with operand1 ('2') and operand2 ('7') as arguments.
        function should return 9.
    Display should change to 9.
    '9' should then be stored as operand1. 

Next, '-' :
    operand1 = Number(disp.textContent). Should become 9 in this case.
    Display should still show '9'
    Store 'subtract' as operator

Next, '3' :
    Display should change to '3'
    Store '3' as operand2.

Next, '=' :
    switch(operator) {}
        case 'subtract' 
            run subtract function(9,3)
            return 9-3;
            break;
        }
    disp should change to '6'
    '6' should then be stored as operand1.

Next, '=' again : 
    switch(operator) {
        case 'subtract': 
            run subtract (6,3)
            return 6-3;
            break;
    }
    disp should change to '3'.
    3 should then be stored as operand1.
        
Next, 'AC' :
    operand1 = "";
    operand2 = "";
    operator = "";
    disp.textContent = '0';    
*/