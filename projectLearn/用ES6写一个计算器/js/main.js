const keyboardContainer = document.querySelector('.keyboard');

const screen = document.querySelector('.display').value
let displayNumber, currentNumber = '', previousNumber = '', sign = '';


keyboardContainer.addEventListener('click', e => {
    const type = e.target.dataset.type;
    const text = e.target.textContent;
    const operateId = e.target.id;
    // console.log(e.target.nodeName)
    if (e.target.nodeName === 'BUTTON') {
        if (type === 'operate') {
            console.log('操作符', operateId)
            operate(operateId);
        } else {
            if (type === 'equal') {
                console.log('计算结果', type)
                    calculator();
                    // previousNumber ='';
                    // currentNumber = '';
            } else if (type === 'clear') {
                console.log('清除按钮', type)
                clear();
            } else {
                console.log('数字按钮', text)

                pushNumber(text);
            }
            updateDisplay();
        }


    }

})

function updateDisplay() {

    document.querySelector('.display').value = displayNumber;
};

function pushNumber(pressNumber) {
    
    currentNumber = currentNumber + pressNumber;
    displayNumber = currentNumber;

}

function clear() {

    displayNumber = '';
    currentNumber = '';
    previousNumber = '';
    sign='';
}

function Continuous() {
    if (previousNumber != '' && currentNumber != '') {

        calculator();
        updateDisplay();
        currentNumber = '';
    }
}

function operate(id) {
    // if (currentNumber === '' || currentNumber === '0') return;
    // 判断有没有 当前值和历史值有的话 根据获取的sign 计算 ； 只有 历史值的话 或  继续 （ ）

    switch (id) {

        case 'percent':
            // Continuous();
            currentNumber = currentNumber / 100;
            displayNumber = currentNumber;
            updateDisplay();
            console.log(currentNumber);
            console.log(previousNumber);
            break;
        case 'pos-and-neg':
            // Continuous();
            if (Number(currentNumber) > 0) {
                currentNumber = '-' + currentNumber;
            } else {
                currentNumber = currentNumber.replace('-', '')
            }
            displayNumber = currentNumber;
            updateDisplay();


            break;
        case 'add':
            Continuous();
            previousNumber = displayNumber;
            // currentNumber = '';
            
            if (currentNumber !== '') {
                previousNumber = currentNumber;
                displayNumber = previousNumber;
                currentNumber = '';
                console.log('if');
                
            } else if (currentNumber == '') {
                sign = 'add';
                console.log('else');
            }
            sign = 'add';
            console.log(currentNumber);
            console.log(previousNumber);
            break;
        case 'subtract':
            Continuous();
            previousNumber = displayNumber;
            if (currentNumber !== '') {
                previousNumber = currentNumber;
                displayNumber = currentNumber;
                currentNumber = '';
            } else if (currentNumber === '') {

                sign = 'subtract';
            }
            sign = 'subtract';
            console.log('curr' + currentNumber);
            console.log('prev' + previousNumber);
            break;
        case 'multiply':
            Continuous();
            previousNumber = displayNumber;
            if (currentNumber !== '') {
                previousNumber = currentNumber;
                displayNumber = currentNumber;
                currentNumber = '';
            } else if (currentNumber === '') {

                sign = 'multiply';
            }
            sign = 'multiply';

            break;
        case 'divide':
            Continuous();
            previousNumber = displayNumber;
            if (currentNumber !== '') {
                previousNumber = currentNumber;
                displayNumber = currentNumber;
                currentNumber = '';
            } else if (currentNumber === '') {

                sign = 'divide';
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
    console.log('符号' + sign);
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
            // let temp = currentNumber;
            console.log(currentNumber);
            if (currentNumber === '') {
                currentNumber = previousNumber;
                console.log('zhixing wole ma???')
                result = Number(previousNumber) - Number(currentNumber);
                // previousNumber = result;
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
                // previousNumber = result;
            } else {
                result = Number(previousNumber) / Number(currentNumber);
                previousNumber = result;
            }

            break;


    }
    displayNumber = result;

    previousNumber = result;
    // currentNumber ='';
    // displayNumber = currentNumber;
    console.log(previousNumber, currentNumber, displayNumber)


}