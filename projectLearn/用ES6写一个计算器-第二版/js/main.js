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
let previousNumber = '', //上一个值
    currentNumber = '', //当前值
    displayNumber = '', //显示值，接收 计算结果、按钮数字
    preResult = '', //用来存储 遇到二级运算时 保存上一次结果
    preSign = '', //记录变更运算级别之前的sign
    sign = '';  //记录上次运算操作符号

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
        document.querySelector('#display').placeholder = '0';
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
    if (btn_number === '0' && currentNumber.length == 0 || btn_number === '0' && currentNumber === '-0') {  //开头不能为0
        btn_number = ''; //清空得到的「0」
    }

    // || btn_number === '0' && currentNumber === '-'

    // 如果开头是「.」,处理成「0.」 
    if (btn_number === '.' && currentNumber.length == 0) {
        currentNumber = '0.'
        // 「0.」不给直接传给input；把数字给placeholder
        document.querySelector('#display').placeholder = String(currentNumber);
    } else if (btn_number === '.' && currentNumber === '-') {
        currentNumber = '-0.'
    }

    // 只能输入一个小数点；如果当前数字有「.」则屏蔽后面输入的「.」
    if (btn_number === '.' && currentNumber.indexOf('.') != -1) {
        btn_number = '';
    }

    if (currentNumber === '-0' && btn_number !== '.') {
        currentNumber = '-';
    }

    // 把数字给当前值

    currentNumber = currentNumber + btn_number;

    // 如果 当前值结尾为「xxx.」
    if (currentNumber.charAt(currentNumber.length - 1) == '.') {
        document.querySelector('#display').placeholder = String(currentNumber);
        displayNumber = ''; //  让placeholder显示出来。
        console.log('running');
        updateDisplay();
    } else {
        displayNumber = currentNumber;
        document.querySelector('#display').placeholder = '0';

        updateDisplay();
    }

    console.log('curr:' + currentNumber, 'prev:' + previousNumber, 'display:' + displayNumber)
}

// 操作按钮
function operational(btn_id) {
    // if (currentNumber === '-') {
    //     currentNumber = '';
    // }
    switch (btn_id) {
        case 'clean':
            console.log('pressed:' + btn_id);
            clean();
            break;
        case 'posi-and-nega':
            if (currentNumber === '') {
                document.querySelector('#display').placeholder = '-0';
                currentNumber = '-';
                console.log(currentNumber);
            } else if (currentNumber === '-') {
                document.querySelector('#display').placeholder = '0';
                currentNumber = '';
            } else {
                currentNumber = -1 * Number(currentNumber);
                displayNumber = currentNumber;
                console.log('curr Type:' + currentNumber);
            }
            console.log('pressed:' + btn_id);
            break;
        case 'percent':
            currentNumber = currentNumber / 100;
            //处理精度
            // ？？？？
            displayNumber = currentNumber;
            console.log('pressed:' + btn_id);
            break;
        case 'add':
            console.log('pressed:' + btn_id);

            opr_Judgment(btn_id);

            break;
        case 'subtract':
            console.log('pressed:' + btn_id);
            opr_Judgment(btn_id);
            break;
        case 'multiply':
            console.log('pressed:' + btn_id);
            opr_Judgment(btn_id);
            break;
        case 'divide':
            console.log('pressed:' + btn_id);
            opr_Judgment(btn_id);
            break;
        case 'equal':
            calculator();
            console.log('pressed:' + btn_id);
            break;
    }
    updateDisplay();
}

// 1获取符号、2判断运算优先级
function opr_Judgment(curr_sign) { //curr_sign 当前符号

    if (previousNumber !== '' && currentNumber !== '') {
        console.log('do calu!')
        // 判断优先级
        // 可以直接继续计算
        // 保留上一值 优先运算2级

        // 计算 （计算完 要清空 当前值

        // 从二级运算降到一级运算
        if ((curr_sign === 'add' || curr_sign === 'subtract') && (sign === 'multiply' || sign === 'divide')) {

            console.log('2 to 1 !');

            //currentNumber = previousNumber;
            // previousNumber = result;


        }
        // 从一级运算升到二级运算
        if ((curr_sign === 'multiply' || curr_sign === 'divide') && (sign === 'add' || sign === 'subtract')) {
            // previousNumber
            console.log('1 to 2 !');

            preResult = previousNumber;
            previousNumber = currentNumber;
            currentNumber = '';

            // preSign 用来存储让次变化优先级前的符号
            preSign = sign;
        }
        calculator(sign);

    } else if (currentNumber !== '') {
        previousNumber = currentNumber;
        currentNumber = '';
        console.log('Yes!' + previousNumber)
        sign = curr_sign; //把当前符号记录下来 下次计算
    }
    console.log('preResult: ' + preResult + ' preNumber: ' + previousNumber + ' currNumber: ' + currentNumber + ' display: ' + displayNumber + ' preSign: ' + preSign);
}

function calculator(sign) {
    switch (sign) {
        case 'add':
            result = Number(previousNumber) + Number(currentNumber);
            // previousNumber = result;
            break;
    }
    displayNumber = result;
}


// // 1获取符号、2判断运算优先级
// function opr_Judgment(btn_id) {

//     if (currentNumber === '-') {
//         currentNumber = '';
//     }
//     //从一级运算 遇到 二级运算
//     if ((btn_id === 'mutiply' || btn_id === 'divide') && (preSign === 'add' || preSign === 'subtract')) {
//         preResult = previousNumber;
//         previousNumber = currentNumber;
//         preSign = sign;
//         //calculator(sign);// 计算得出  新的 previousNumber
//         currentNumber = '';
//         displayNumber = previousNumber;
//         console.log('1 to 2 change-' + 'preResult: ' + preResult + ' preNumber: ' + previousNumber + ' currNumber: ' + currentNumber + ' display: ' + displayNumber + ' preSign: ' + preSign);

//     } else if ((btn_id === 'add' || btn_id === 'subtract') && (preSign === 'mutiply' || preSign === 'divide')) {
//         currentNumber = previousNumber;
//         previousNumber = preResult;

//         calculator(preSign);// 把之前的preResult算出来。重新变成新的 previousNumber
//         preResult = '';
//         displayNumber = previousNumber;
//         console.log('2 to 1 change-' + 'preResult: ' + preResult + ' preNumber: ' + previousNumber + ' currNumber: ' + currentNumber + ' display: ' + displayNumber + ' preSign: ' + preSign);
//     } else {//平级运算连续运算
//         if (currentNumber !== '') calculator(sign);
//         preSign = '';
//         currentNumber = '';

//         console.log('0 to 0 change-' + 'preResult: ' + preResult + ' preNumber: ' + previousNumber + ' currNumber: ' + currentNumber + ' display: ' + displayNumber + ' preSign: ' + preSign);
//     }

//         previousNumber = currentNumber;
//         displayNumber = previousNumber;

//     sign = btn_id;


// }


// function calculator() {
//     let result = 0;
//     if (sign == '') {
//         result = currentNumber;
//     }
//     switch (sign) {
//         case 'add':
//             if (currentNumber == '') {
//                 currentNumber = Number(previousNumber);
//                 result = Number(previousNumber) + Number(currentNumber);
//                 previousNumber = result;
//             } else {
//                 result = Number(previousNumber) + Number(currentNumber);
//                 previousNumber = result;
//             }
//             break;
//         case 'subtract':
//             if (currentNumber === '') {
//                 currentNumber = previousNumber;
//                 console.log('zhixing wole ma???')
//                 result = Number(previousNumber) - Number(currentNumber);
//             } else {
//                 result = Number(previousNumber) - Number(currentNumber);
//                 previousNumber = result;
//             }
//             break;
//         case 'multiply':
//             if (currentNumber == '') {
//                 currentNumber = Number(previousNumber);
//                 result = Number(previousNumber) * Number(currentNumber);
//                 previousNumber = result;
//             } else {
//                 result = Number(previousNumber) * Number(currentNumber);
//                 //需要处理 精度问题 除法 需要处理0的结果
//                 previousNumber = result;
//             }
//             break;
//         case 'divide':
//             if (currentNumber === '') {
//                 currentNumber = previousNumber;
//                 console.log('zhixing wole ma???')
//                 result = Number(previousNumber) / Number(currentNumber);
//             } else {
//                 result = Number(previousNumber) / Number(currentNumber);
//                 previousNumber = result;
//             } break;
//     }
//     displayNumber = result;
//     previousNumber = result;
// }