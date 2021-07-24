// 1、用 button 的 id 来 区分按钮  尝试监听一个 operational 类 来处理 按钮 pressdown 样式 / 数字的监听还是得用 textconent 来处理

// 2、处理 按钮 0 和 按钮 ‘.’ 的显示问题 和传值问题
//     开头不为0的方法 
//     当 curr 值为空 就是长度为0 时 处理为 空  不拼接数字  

//     当开头为 ‘.’时 或者”xxx.“  空值 处理 ‘0.’ 非空 处理 传入 placeholder 此时不能传入 value ，把 curr 值 传入 placeholder 且 清空 display值  继续输入数字后 判断 结尾不是“.”时 重置 placeholder 把curr 传给 displayNumber

// 3、运算优先级 
//     根据规则 
//     preResult  用来存储上一次的 结果 

// 2432 + 234 + 342 * 234 / 423

// a +          // pre = curr ， if curr=‘’ ， result = pre ；//if curr ！=‘’ ， result = result+curr 
// a + b        // curr = b ， preSign = ‘+’ 
// a + b +      // 同级别运算符  if curr ！=‘’ ， result = result + curr ， pre = a 
// a + b *      // 不同级别运算  preResult = result ， curr = b ，result = pre ， pre = curr  
// a + b +      // 又 同级别     curr = pre 
//           
//      result = result（a） + b 
//      1把 result  == display
//      2把 pre = curr（b）     

// a + b *
// if 二级运算 符号
// 上一次符号与当前不同级     
//      1把 pre => preResult
//      2把 curr => pre     

// preResul 再给 pre值
// 并且这时候计算 （）


// 4、正负值

// number  +/-
// 直接处理 -1* number 

// number + +/- if 当前值是 空  让 curr = ‘-0’，if curr 是 ‘-0’ curr = ‘0’  if curr ！=‘’ 

// number + +/- curr 



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