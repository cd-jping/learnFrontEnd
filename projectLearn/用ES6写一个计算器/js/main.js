const keyboardContainer = document.querySelector('.keyboard');

const screen = document.querySelector('.display').value
let currentNumber = '', previousNumber = '', sign = '';


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
    document.querySelector('.display').value = currentNumber;
};

function pushNumber(pressNumber) {

    currentNumber = currentNumber + pressNumber;
    console.log(currentNumber)
}

function clear() {

    currentNumber = '';
}

function operate(id) {
    if (!currentNumber === '' || currentNumber === '0') return;

    switch (id) {

        case 'percent':
            currentNumber = currentNumber / 100;
            updateDisplay();
            console.log(currentNumber);
            console.log(previousNumber);
            break;
        case 'pos-and-neg':
            if (Number(currentNumber) > 0) {
                currentNumber = '-' + currentNumber;
            } else {
                currentNumber = currentNumber.replace('-', '')
            }
            updateDisplay();
            
            console.log(currentNumber);
            console.log(previousNumber);
            break;
        case 'add':
            sign = 'add';
            console.log(sign);
            previousNumber = currentNumber;
            currentNumber = '';
            console.log(previousNumber);
            console.log(currentNumber);
            break;
        case 'subtract':
            sign = 'subtract';
            break;
        case 'multiply':
            sign = 'multiply';
            break;
        case 'divide':
            sign = 'divide';
            break;
        default:
            break;

    }

    // if(id==='percent'){
    //     currentNumber = currentNumber/100;
    // }else if (id==='pos-and-neg'){
    //     if(Number(currentNumber)>0){
    //         currentNumber = '-'+currentNumber;
    //     }else if(Number(currentNumber)<0||Number(currentNumber)==0){
    //         currentNumber = currentNumber.replace('-','')
    //     }
    // }


}
function calculator() {
    let result = 0;
    const previousNum = Number(previousNumber);
    const currentNum = Number(currentNumber);
    switch (sign) {
        case 'add':
            result = previousNum + currentNum;
            break;
    }
    currentNumber = result;
    // previousNumber = '';
    // sign

}