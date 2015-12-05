//禁止八进制表示法
"use strict"

var expression = "";

var flag = false;

//动态绑定事件及其处理函数
var buttons = document.getElementById("buttons").getElementsByTagName("input");
for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].getAttribute("value") === "CE") {
        buttons[i].onclick = clear;
    }
    else if (buttons[i].getAttribute("value") === "←") {
        buttons[i].onclick = backspace;
    }
    else if (buttons[i].getAttribute("value") === "=") {
        buttons[i].onclick = compute;
    }
    else {
        buttons[i].onclick = nomal;
    }
}

//按下常规按键
function nomal() {
    var value = this.getAttribute("value");
    if (!isNaN(parseInt(value)) && flag === true) {
        expression = value;
        var input_content = document.getElementById("expression");
        input_content.value = expression;
        flag = false;
        return;
    }
    var input_content = document.getElementById("expression");
    expression += value;
    input_content.value = expression;
    flag = false;
}

//按下"CE"
function clear() {
    expression = "";
    var input_content = document.getElementById("expression");
    input_content.value = expression;
}

//按下'←'
function backspace() {
    expression = expression.substring(0, expression.length - 1);
    var input_content = document.getElementById("expression");
    input_content.value = expression;
}

//按下'='
function compute() {
    try {
        flag = true;

        for (var i = 0; i < expression.length; i++) {

            //操作符错误
            if ((expression[i] === "+" || expression[i] === "-") && (expression[i + 1] === "*"
                || expression[i + 1] === "/")) {
                throw "Operator error";
            }
            if ((expression[i] === "/" || expression[i] === "*") && (expression[i + 1] === "*"
                || expression[i + 1] === "/" || expression[i + 1] === "+"
                || expression[i + 1] === "-")) {
                throw "Operator error";
            }
        }

        //空表达式
        if (!expression)
            throw "empty expression";

        //一般错误
        var result = eval(expression);
        if (isNaN(result)) throw "wrong expression";

        //浮点数精度丢失问题
        //使用重写的toFixed方法，保留10位小数后再将多余的0去除
        result = result.toFixed(10);
        result = result.toString();
        var str = result;
        var len = result.length;
        for (var i = result.length - 1; i >= 0; i--) {
            if (result[i] == '.') {
                str = result.substring(0, len - 1);
                break;
            }
            if (result[i] != '0')
                break;
            str = result.substring(0, len - 1);
            len--;
        }
        result = str;

        //输出结果
        expression = result;
        //除数为0问题
        if (expression === "Infinity") throw "The divisor can not be zero";

        var input_content = document.getElementById("expression");
        input_content.value = expression;
    }
    catch(err) {
        alert(err);
        expression = "";
        var input_content = document.getElementById("expression");
        input_content.value = "";
    }
}

//重写toFixed方法
Number.prototype.toFixed = function(n) {
    var power = Math.pow(10, n);
    var fixed = (Math.round(this * power) / power).toString();
    if(n == 0) return fixed;
    if(fixed.indexOf('.') < 0) fixed += '.';
    var padding = n + 1 - (fixed.length - fixed.indexOf('.'));
    for(var i = 0; i < padding; i++) fixed += '0';
    return fixed;
};
