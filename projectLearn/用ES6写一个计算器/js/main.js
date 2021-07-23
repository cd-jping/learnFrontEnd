const keyboardContainer = document.querySelector('.keyboard');
const screen = document.querySelector('.display').value

// diaplayNumber 用来显示当前值 或 结果；
// prevType 用来存储 上一次按钮的operate 值
//btnId 用来获取按钮的id //主要是为了处理 “.”按钮和 “0”按钮  还没实现
//sign 用来记录 运算符号
let displayNumber = '', currentNumber = '', previousNumber = '', sign = '', prevType = '', btnId = '';


// 给按钮添加监听事件 ，为了方便添加 使用了 事件冒泡的方式

keyboardContainer.addEventListener('click', e => {
    // 为了区分不同的 button 标签 根据date-type 和 id 等来分别区分；
    const type = e.target.dataset.type;
    const text = e.target.textContent;
    const operateId = e.target.id;
    if (e.target.nodeName === 'BUTTON') {  //只处理 button 标签！防止 监听获取button与button 之间的缝隙而获得其他元素值。
        if (type === 'operate') {  //运算符 
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
                if (prevType === 'equal') {  //如果上一次按钮 按的是 等号 ，则表示计算完成 保留displayNumer 值 清空其他的值 ，防止累加 运算。

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


function updateDisplay() {  // 更新显示屏的 数字
    document.querySelector('.display').value = displayNumber;
};

function pushNumber(pressNumber) {

    // 小数点输入 和 00000前缀 没有屏蔽

    document.getElementById('AC').textContent = 'C'; //一旦输入值后，将 按钮 AC 恢复为 C
    currentNumber = currentNumber + pressNumber;
    displayNumber = currentNumber;
    updateDisplay();
}
function clear() {
    // 按钮分两种清空 第一次 按下 只清空当前值 和 显示值 
    // 第二次按钮下 会清空所有值 

    if (currentNumber != '') { //如果当前有值 则 仅仅 清楚当前值 可以继续计算
        displayNumber = '';
        currentNumber = ''
        document.getElementById('AC').textContent = 'AC'; // 清除后 将按钮 显示为 AC 表示再次按下即 清除所有 All Clean  ，开始全新的计算。
     } else {  
        currentNumber = '';
        pressNumber = '';
        displayNumber = '';
        sign = '';
    }
}

function Continuous() {//一个封装方法 是否直接运算？ 连续运算时，判断是否需要计算之前两个值。
    if (previousNumber != '' && currentNumber != '') { //两个值不为‘’时候才运算。
        calculator();//计算方法的函数
        updateDisplay();
    }
}

function operate(id) {

    switch (id) { // 根据 operate的id值 来区分不同的按钮 来处理不同的动作

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
            // if (sign == 'add') {  //连续运算时候，如果上一次的符号与这次相同直接相加，否则跳过运算；只改变符号。  这里如果启用 好像 会出现其他的bug 
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
    if (sign == '') {  //直接按等号键  不处理计算
        result = currentNumber;
    }
    switch (sign) {
        case 'add':
            if (currentNumber == '') { //如果当前值 为空 则 进行 自加
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
    displayNumber = result; //将结果 显示出来
    previousNumber = result; // 将结果存入 上一值 为了可以累计 运算
}