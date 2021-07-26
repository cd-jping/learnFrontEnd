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




//设置键盘绑定监听事件
const keyboardContainer = document.querySelector('.keyboard');
const screen = document.querySelector('#display').value;
let displayNumber = '', //显示值，接收 计算结果、按钮数字
    currentNumber = '', //当前值
    previousNumber = '', //上一个值
    sign = '';  //操作值（操作符号）

keyboardContainer.addEventListener('click', e => {
    // 捕获 Id、Class、TextContent的内容 来区分不同的button 执行相应的操作。
    const textContent = e.target.textContent;
    const btnId = e.target.id;
    const className = e.target.className;

    //如果Target获取的不是button标签（父级标签）则不处理监听。
    if (e.target.nodeName === 'BUTTON') {
        // 事件处理分为监听获取数字button、运算符号、清除等。
        // 如果是operational类元素 则表示是「操作按钮」；否则就是「数字按钮」。
        if (className === 'operational') {
            operational(btnId);
        } else {
            pressNumber(textContent);
        }
    }
})

//更新显示
function updateDisplay() {
    document.querySelector('#display').value = displayNumber;
};

// 清除功能，第一次按 仅清除了当前数 ；第二次按 清除所有数字
function clean() {
    if (currentNumber != '') {
        displayNumber = '';
        currentNumber = ''
        document.getElementById('clean').textContent = 'AC';
    } else {
        currentNumber = '';
        previousNumber = '';
        displayNumber = '';
        sign = '';
    }
    console.log('Cleared！' + 'prev:' + previousNumber);
}


//preeNumber 用来接收数字；btn_number 用来获取button标签内的值
function pressNumber(btn_number) {
    //有例外情况 为了准确显示 ‘xxx.’情况 临时把值传给placeholder，然后再恢复传给displayNumber

    // 每次输入数字 即将产生当前值，这时候clean键会为「C」；再次按下clean键会变为「AC」
    document.getElementById('clean').textContent = 'C';
    //开头不能为「0」
    if (btn_number === '0' && currentNumber.length == 0 || btn_number === '0' && currentNumber === '-') {  //开头不能为0
        btn_number = ''; //清空得到的「0」
    }

    // 如果开头是「.」,处理成「0.」 
    if (btn_number === '.' && currentNumber.length == 0) {
        currentNumber = '0.'
        // 「0.」不给直接传给input；把数字给placeholder
        document.querySelector('#display').placeholder = String(currentNumber);
    }

    // 只能输入一个小数点；如果当前数字有「.」则屏蔽后面输入的「.」
    if (btn_number === '.' && currentNumber.indexOf('.') != -1) {
        btn_number = '';
    }

    // 把数字给当前值
    
    currentNumber = currentNumber + btn_number;

    // 如果 当前值结尾为「xxx.」
    if (currentNumber.charAt(currentNumber.length - 1) == '.') {
        document.querySelector('#display').placeholder = String(currentNumber);
        displayNumber = ''; //  让placeholder显示出来。
    } else if(currentNumber=='-') {
        document.querySelector('#display').placeholder = String(currentNumber+0);
        displayNumber = ''; //  让placeholder显示出来。
    }else{
        displayNumber = currentNumber;
        document.querySelector('#display').placeholder = '0';
        updateDisplay();
    }

    console.log('curr:' + currentNumber, 'prev:' + previousNumber, 'display:' + displayNumber)
}

// 操作按钮
function operational(btn_id) {
    switch (btn_id) {
        case 'clean':
            console.log('pressed:' + btn_id);
            clean();
            break;
        case 'posi-and-nega':
            if (currentNumber === '') {
                document.querySelector('#display').placeholder = '-0';
                currentNumber = '-';
            } else if (currentNumber === '-') {
                document.querySelector('#display').placeholder = '0';
                currentNumber = '';
            } else {
                currentNumber = -1 * Number(currentNumber);
                displayNumber = currentNumber;
            }
            console.log('pressed:' + btn_id);
            break;
        case 'percent':
            currentNumber = currentNumber / 100;
            displayNumber = currentNumber;
            console.log('pressed:' + btn_id);
            break;
        case 'add':
            console.log('pressed:' + btn_id);
            break;
        case 'subtract':
            console.log('pressed:' + btn_id);
            break;
        case 'multiply':
            console.log('pressed:' + btn_id);
            break;
        case 'divide':
            console.log('pressed:' + btn_id);
            break;
        case 'equal':
            console.log('pressed:' + btn_id);
            break;
    }
    updateDisplay();
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