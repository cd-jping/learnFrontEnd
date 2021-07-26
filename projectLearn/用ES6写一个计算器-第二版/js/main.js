const keyboardContainer = document.querySelector('.keyboard');
const screen = document.querySelector('.display').value
let displayNumber = '', currentNumber = '', previousNumber = '', sign = '', prevType = '', btnId = '';

keyboardContainer.addEventListener('click', e => {

    const type = e.target.dataset.type;
    const text = e.target.textContent;
    const operateId = e.target.id;
    if (e.target.nodeName === 'BUTTON') {
        if (type === 'operate') {
            operate(operateId);
            if (prevType === 'equal') {
                sign = '';
                currentNumber = '';
            }
        } else {
            if (type === 'equal') {
                calculator();
                updateDisplay();
            } else if (type === 'clear') {
                clear();
                updateDisplay();
            } else {
                if (prevType === 'equal') {

                    currentNumber = '';
                    previousNumber = '';
                    pushNumber(text);
                } else {
                    pushNumber(text);
                }
            }

        }


    }
    prevType = type;
    btnId = operateId;
})


function updateDisplay() {
    document.querySelector('.display').value = displayNumber;
};

function pushNumber(pressNumber) {

    // 小数点输入 和 00000前缀 没有屏蔽
    document.getElementById('AC').textContent = 'C';
    currentNumber = currentNumber + pressNumber;
    displayNumber = currentNumber;
    updateDisplay();
}
function clear() {
    if (currentNumber != '') {
        displayNumber = '';
        currentNumber = ''
        document.getElementById('AC').textContent = 'AC';
    } else {
        currentNumber = '';
        pressNumber = '';
        displayNumber = '';
        sign = '';
    }
}

function Continuous() {//一个封装方法 是否直接运算？ 连续运算时，判断是否需要计算之前两个值。
    if (previousNumber != '' && currentNumber != '') { //两个值不为‘’时候才运算。
        calculator();
        updateDisplay();
    }
}

function operate(id) {

    switch (id) {

        case 'percent':
            currentNumber = displayNumber;
            currentNumber = currentNumber / 100;
            displayNumber = currentNumber;
            updateDisplay();
            break;
        case 'pos-and-neg':

            if (currentNumber != '') {
                currentNumber = -1 * Number(currentNumber);
                displayNumber = currentNumber;
            }
            displayNumber = Number(currentNumber);
            updateDisplay();
            break;
        case 'add':
            // if (sign == 'add') {  //连续运算时候，如果上一次的符号与这次相同直接相加，否则跳过运算；只改变符号。
            Continuous();
            if (displayNumber != '') {
                previousNumber = displayNumber;
                currentNumber = '';
            }
            sign = 'add';
            break;
        case 'subtract':
            Continuous();
            if (displayNumber != '') {
                previousNumber = displayNumber;
                currentNumber = '';
            }
            sign = 'subtract';
            break;
        case 'multiply':
            Continuous();
            if (displayNumber != '') {
                previousNumber = displayNumber;
                currentNumber = '';
            }
            sign = 'multiply';

            break;
        case 'divide':
            Continuous();
            if (displayNumber != '') {
                previousNumber = displayNumber;
                currentNumber = '';
            }
            sign = 'divide';
            break;
        default:
            break;

    }
}

function calculator() {
    let result = 0;
    if (sign == '') {
        result = currentNumber;
    }
    switch (sign) {
        case 'add':
            if (currentNumber == '') {
                currentNumber = Number(previousNumber);
                result = Number(previousNumber) + Number(currentNumber);
                previousNumber = result;
            } else {
                result = Number(previousNumber) + Number(currentNumber);
                previousNumber = result;
            }
            break;
        case 'subtract':
            if (currentNumber === '') {
                currentNumber = previousNumber;
                console.log('zhixing wole ma???')
                result = Number(previousNumber) - Number(currentNumber);
            } else {
                result = Number(previousNumber) - Number(currentNumber);
                previousNumber = result;
            }
            break;
        case 'multiply':
            if (currentNumber == '') {
                currentNumber = Number(previousNumber);
                result = Number(previousNumber) * Number(currentNumber);
                previousNumber = result;
            } else {
                result = Number(previousNumber) * Number(currentNumber);
                //需要处理 精度问题 除法 需要处理0的结果
                previousNumber = result;
            }
            break;
        case 'divide':
            if (currentNumber === '') {
                currentNumber = previousNumber;
                console.log('zhixing wole ma???')
                result = Number(previousNumber) / Number(currentNumber);
            } else {
                result = Number(previousNumber) / Number(currentNumber);
                previousNumber = result;
            } break;
    }
    displayNumber = result;
    previousNumber = result;
}