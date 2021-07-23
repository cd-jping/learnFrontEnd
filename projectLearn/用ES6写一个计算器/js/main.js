const keyboardContainer = document.querySelector('.keyboard');

const screen = document.querySelector('.display').value
let displayNumber = '', currentNumber = '', previousNumber = '', sign = '', prevType = '', btnId = '';

keyboardContainer.addEventListener('click', e => {
    console.log('pervType: ' + prevType);
    const type = e.target.dataset.type;
    const text = e.target.textContent;
    const operateId = e.target.id;
    // console.log(e.target.nodeName)
    if (e.target.nodeName === 'BUTTON') {
        if (type === 'operate') {
            console.log('操作符', operateId)
            console.log('dangqianzhi', currentNumber);
            if (prevType === 'equal') {

                sign = '';
                currentNumber = '';

                console.log('执行了 sign')
            }
            operate(operateId);

        } else {
            if (type === 'equal') {
                console.log('计算结果', type)

                calculator();
                updateDisplay();
            } else if (type === 'clear') {
                console.log('清除按钮', type)
                clear();
                updateDisplay();
            } else {
                console.log('数字按钮', text)
                if (prevType === 'equal') {

                    currentNumber = '';
                    previousNumber = '';
                    pushNumber(text);
                    console.log('执行了 if')
                } else {
                    pushNumber(text);
                    console.log('执行了 else')
                }
            }

        }


    }
    prevType = type;
    btnId = operateId;
    console.log('btnID:' + btnId);

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
    console.log('before clean' + currentNumber);
    if (currentNumber != '') {
        displayNumber = '';
        currentNumber = ''
        console.log('only curr')
        document.getElementById('AC').textContent = 'AC';
    } else {
        currentNumber = '';
        pressNumber = '';
        displayNumber = '';
        sign = '';
        console.log('all clean')
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
            console.log(currentNumber);
            console.log(previousNumber);
            break;
        case 'pos-and-neg':
            console.log('currentNumber');
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
            console.log(currentNumber);
            console.log(previousNumber);
            break;
        case 'subtract':
            Continuous();
            if (displayNumber != '') {
                previousNumber = displayNumber;
                currentNumber = '';
            }
            sign = 'subtract';
            console.log('curr' + currentNumber);
            console.log('prev' + previousNumber);
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
            console.log(currentNumber);
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
            console.log(currentNumber);
            if (currentNumber === '') {
                currentNumber = previousNumber;
                console.log('zhixing wole ma???')
                result = Number(previousNumber) / Number(currentNumber);
            } else {
                result = Number(previousNumber) / Number(currentNumber);

                previousNumber = result;


            }
            break;
    }
    displayNumber = result;
    previousNumber = result;
    console.log(previousNumber, currentNumber, displayNumber)
}