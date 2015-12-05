var stepNum = 0;
var timeNum = 0;
var timer;
var first = true;
var flag = true;
var first_change = false;
var chaos = false;
var puzzleIndex = 0;

$(function() {
    generatePuzzle();//生成拼图
});

function generatePuzzle() {
    _.times(16, generateBlock);
    $("#restart").click(startFun);
    $("#mode").click(changeMode);
    $("#restore").click(getback);
}

function generateBlock() {
    var block = $("<div></div>");
    $(block).addClass("puzzle" + puzzleIndex);
    $(block).attr("id", "puzzle" + puzzleIndex);
    $(block).click(move);
    $("#puzzle").append(block);
    puzzleIndex++;
}

function getNum(text){//利用正则表达式获取字符串中的数字
    var value = text.replace(/[^0-9]/ig,"");
    return value;
}

function changeClass(obj) {
    var temp = $(obj).attr("class");
    $(obj).attr("class", $("#puzzle15").attr("class"));
    $("#puzzle15").attr("class", temp);
}

function showStep() {
    stepNum++;
    $("#step").html("STEP : " + stepNum);
}

function judgeSuccess() {//判断游戏是否成功
    $("#puzzle div").each(function() {if ($(this).attr("class") != $(this).attr("id")) flag = false;});
    if (flag && !chaos) {
        alert("Congratulations! You complete this puzzle!\n" + "Time : " + timeNum + "s\n"
            + "Step : " + stepNum + "\n");
            first = true;
            chaos = false;
            resetTime();
            resetStep();
    }
}

function resetTime() {//重置时间
    clearInterval(timer);
    $("#time").html("TIME : ");
}

function resetStep() {//重置步数
    $("#step").html("STEP : ");
}

function move() {//移动拼图
    if (!first) {
        var blankClass = getNum($("#puzzle15").attr("class"));
        var thisClass = getNum($(this).attr("class"));
        if (Math.abs(blankClass - thisClass) == 4 || Math.abs(blankClass - thisClass) == 1) {
            changeClass(this);
            showStep();
        }
        judgeSuccess();
        flag = true;
    }
}

function beforeRestart() {
    $("#puzzle div").each(function() {
        if (first_change)
            this.style.cssText = 'background-image: url(static/back2.jpg); transition: left 0s, top 0s;';
        else
            this.style.cssText = 'background-image: url(static/puzzle.jpg); transition: left 0s, top 0s;';
    })
}

function afterRestart() {
    $("#puzzle div").each(function() {
        if (first_change)
            this.style.cssText = 'background-image: url(static/back2.jpg); transition: left 0.5s, top 0.5s;';
        else
            this.style.cssText = 'background-image: url(static/puzzle.jpg); transition: left 0.5s, top 0.5s;';
    })
}

function randomClick() {//随机点击打乱拼图
    _.times(1000, function() {$("#puzzle div")[_.random(0, 15)].click();});
}

function startFun() {
    if (timer) clearInterval(timer);
    first = false;
    chaos = true;
    beforeRestart();
    randomClick();
    afterRestart();
    chaos = false;
    first = true;
    timeAndStepHandler();
}

function timeAndStepHandler() {
    timeNum = stepNum = 0;
    if (first) {
        timer = setInterval(clock, 1000);
        first = false;
    }
    $("#step").html("STEP : " + stepNum);
}

function clock() {
    $("#time").html("TIME : " + timeNum + "s");
    timeNum++;
}

function changeToRikka() {//背景切换
    $("html")[0].style.backgroundImage = "url(static/back3.jpg)";
    $("#puzzle div").each(function() {this.style.backgroundImage = "url(static/back2.jpg)";});
    $("p").each(function() {$(this).addClass("change");});
}

function changeToJack() {//背景切换
    $("html")[0].style.backgroundImage = "url(static/back.jpg)";
    $("#puzzle div").each(function() {this.style.backgroundImage = "url(static/puzzle.jpg)";});
    $("p").each(function() {$(this).removeAttr("class");});
}

function resetImgPos() {
    var blocks = $("#puzzle div");
    for (var i = 0; i < 16; i++) {
        blocks[i].className = "puzzle" + i;
    }
}

function changeMode() {
    first_change = first_change == true ? false : true;
    if (first_change) changeToRikka();
    else changeToJack();
    resetSomething();
}

function getback() {
    if (!first) {
        resetSomething();
        alert("Well, You use the shortcut.\n" + "Time : " + timeNum + "s\n"
            + "Step : " + stepNum + "\n");
    }
}

function resetSomething() {
    first = true;
    resetTime();
    resetStep();
    $("#puzzle div").each(function() {$(this).attr("class", $(this).attr("id"))});
}
