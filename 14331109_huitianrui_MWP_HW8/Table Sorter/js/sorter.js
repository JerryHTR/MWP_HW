$(function() {
    var taskArr1 = [];
    var taskArr2 = [];
    $("#todo thead tr th").click(function() {sorter(this, 1, taskArr1);});
    $("#todo tbody tr").each(function() {buildTask(this, taskArr1);});
    $("#staff thead tr th").click(function() {sorter(this, 2, taskArr2);});
    $("#staff tbody tr").each(function() {buildTask(this, taskArr2);});
    $("th").each(function() {$(this).attr("ascend", "false");});//添加属性判断升降序
    $("button").click(function() {$("th").each(function() {$(this).removeClass("click1 click2");});});
});

//构造函数
function Task(thing, time, place) {
    this.thing = thing;
    this.time = time;
    this.place = place;
}

function buildTask(obj, taskArr) {
    var row = $(obj).children();
    var thing = $(row[0]).text();
    var time = $(row[1]).text();
    var place = $(row[2]).text();
    var newTask = new Task(thing, time, place);
    taskArr.push(newTask);
}

function sorter(obj, flag, taskArr) {
    if ($(obj).attr("ascend") == "false") $(obj).attr("ascend", "true");
    else $(obj).attr("ascend", "false");
    var head = $(obj).text();
    if (head == "What?" || head == "First name") head = "thing";
    else if (head == "When?" || head == "Last name") head = "time";
    else head = "place";
    taskArr.sort(compare(obj, head));
    restore(flag);
    callRewrite(flag, obj, taskArr);
}

//根据属性来进行比较
function compare(obj, head) {
    return function(obj1, obj2) {
        var val1 = obj1[head];
        var val2 = obj2[head];
        if ($(obj).attr("ascend") == "true") return val2 < val1;
        else return val2 > val1;
    }
}

function callRewrite(flag, obj, taskArr) {
    if (flag == 1) $("#todo tbody tr").each(function() {rewriteRow(this, taskArr);});
    else $("#staff tbody tr").each(function() {rewriteRow(this, taskArr);});
    alterStyle(obj);
}

//排完序后重写每一行
function rewriteRow(obj, taskArr) {
    var index = $(obj).index();
    var rowCont = $(obj).children();
    $(rowCont[0]).html(taskArr[index]["thing"]);
    $(rowCont[1]).html(taskArr[index]["time"]);
    $(rowCont[2]).html(taskArr[index]["place"]);
}

//修改被选中列的样式
function alterStyle(obj) {
    if ($(obj).attr("ascend") == "true") {
        $(obj).addClass("click1");
        $(obj).removeClass("click2");
    } else {
        $(obj).addClass("click2");
        $(obj).removeClass("click1");
    }
}

//重置表格样式
function restore(flag) {
    if (flag == 1) $("#todo th").each(function() {$(this).removeClass("click1 click2");});
    else $("#staff th").each(function() {$(this).removeClass("click1 click2");});
}
