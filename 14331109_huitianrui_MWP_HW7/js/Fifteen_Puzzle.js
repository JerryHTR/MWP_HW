var stepNum = 0;
var timeNum = 0;
var timer;
var first = true;
var flag = true;
var first_change = false;
var chaos = false;

//生成拼图
window.onload = function() {
    generatePuzzle();
}

//生成拼图
function generatePuzzle() {
    var puzzle = document.getElementById('puzzle');
    for (var i = 0; i < 16; i++) {
        var block = document.createElement('div');
        block.id = "puzzle" + i;
        block.className = "puzzle" + i;
        block.onclick = move;
        puzzle.appendChild(block);
    }
    //开始按钮
    var start = document.getElementById("restart");
    start.onclick = startFun;

    //切换按钮
    var mode = document.getElementById("mode");
    mode.addEventListener("click", changeMode);

    //重置按钮
    var restore = document.getElementById("restore");
    restore.addEventListener("click", getback);
}

//点击拼图时拼图的移动
function move() {
    if (!first) {
        var blank = document.getElementById("puzzle15");
        var left = blank.offsetLeft;
        var top = blank.offsetTop;
        var thisLeft = this.offsetLeft;
        var thisTop = this.offsetTop;
        if ((Math.abs(top - thisTop) < 150
            && Math.abs(top - thisTop) > 50 && left === thisLeft)
            || (Math.abs(left - thisLeft) < 150
            && Math.abs(left - thisLeft) > 50 && top === thisTop)) {
            var temp = this.className;
            this.className = blank.className;
            blank.className = temp;
            stepNum++;
            var step = document.getElementById("step");
            step.innerHTML = "STEP : " + stepNum;
        }

        var blocks = document.getElementById("puzzle").getElementsByTagName("div");
        for (var i = 0; i < 16; i++) {
            if (blocks[i].className != blocks[i].id) {
                flag = false;
                break;
            }
        }
        if (flag && !chaos) {
            alert("Congratulations! You complete this puzzle!\n"
                + "Time : " + timeNum + "s\n"
                + "Step : " + stepNum + "\n");
            first = true;
            chaos = false;
            clearInterval(timer);
            var time = document.getElementById("time");
            time.innerHTML = "TIME : ";
            var step = document.getElementById("step");
            step.innerHTML = "STEP : ";
        }
        flag = true;
    }
}

//点击Restart
//拼图打乱
//游戏重开
function startFun() {
    if (timer)
        clearInterval(timer);
    first = false;
    chaos = true;
    var blocks = document.getElementById("puzzle").getElementsByTagName("div");
    for (var i = 0; i < 16; i++) {
        if (first_change)
            blocks[i].style.cssText = 'background-image: url(static/back2.jpg); transition: left 0s, top 0s;';
        else
            blocks[i].style.cssText = 'background-image: url(static/puzzle.jpg); transition: left 0s, top 0s;';
    }

    for (var j = 0; j < 1000; j++) {
        var choice = Math.floor((Math.random() * 16));
        blocks[choice].click();
    }

    for (var i = 0; i < 16; i++) {
        if (first_change)
            blocks[i].style.cssText = 'background-image: url(static/back2.jpg); transition: left 0.5s, top 0.5s;';
        else
            blocks[i].style.cssText = 'background-image: url(static/puzzle.jpg); transition: left 0.5s, top 0.5s;';
    }
    chaos = false;
    first = true;
    timeNum = 0;
    if (first) {
        timer = setInterval(clock, 1000);
        first = false;
    }
    timeNum = 0;
    stepNum = 0;
    var step = document.getElementById("step");
    step.innerHTML = "STEP : " + stepNum;
}

function clock() {
    var time = document.getElementById("time");
    time.innerHTML = "TIME : " + timeNum + "s";
    timeNum++;
}

//改变背景图
function changeMode() {
    first_change = first_change == true ? false : true;
    if (first_change) {
        var blocks = document.getElementById("puzzle").getElementsByTagName("div");
        var page = document.getElementsByTagName('html');
        page[0].style.backgroundImage = "url(static/back3.jpg)";
        for (var i = 0; i < 16; i++) {
            blocks[i].style.backgroundImage = "url(static/back2.jpg)";
        }
        var passage = document.getElementsByTagName('p');
        for (var j = 0; j < passage.length; j++) {
            passage[j].className = "change";
        }
    }
    else {
        var blocks = document.getElementById("puzzle").getElementsByTagName("div");
        var page = document.getElementsByTagName('html');
        page[0].style.backgroundImage = "url(static/back.jpg)";
        for (var i = 0; i < 16; i++) {
            blocks[i].style.backgroundImage = "url(static/puzzle.jpg)";
        }

        var passage = document.getElementsByTagName('p');
        for (var j = 0; j < passage.length; j++) {
            passage[j].className = "";
        }
    }
    first = true;
    clearInterval(timer);
    var time = document.getElementById("time");
    time.innerHTML = "TIME : ";
    var step = document.getElementById("step");
    step.innerHTML = "STEP : ";
    var blocks = document.getElementById("puzzle").getElementsByTagName("div");
    for (var i = 0; i < 16; i++) {
        blocks[i].className = "puzzle" + i;
    }
}

//重置为拼好状态
function getback() {
    if (!first) {
        var blocks = document.getElementById("puzzle").getElementsByTagName("div");
        for (var i = 0; i < 16; i++) {
            blocks[i].className = blocks[i].id;
        }
        alert("Well, You use the shortcut.\n"
                    + "Time : " + timeNum + "s\n"
                    + "Step : " + stepNum + "\n");
        first = true;
        clearInterval(timer);
        var time = document.getElementById("time");
        time.innerHTML = "TIME : ";
        var step = document.getElementById("step");
        step.innerHTML = "STEP : ";
    }
}
